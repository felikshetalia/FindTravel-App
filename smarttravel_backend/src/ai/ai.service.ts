import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PreferencesJson, RequestDto, UserRequestDto } from './dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { semanticKeywords, semanticLocations } from './semantic-tags';

@Injectable()
export class AiService {
  constructor(private readonly _prismaService: PrismaService) {}

  private readonly _ollamaUrl = process.env['OLLAMA_CHAT_URL_POST'];
  private readonly _llm = 'qwen2.5:3b';

  async recommend(dto: UserRequestDto) {
    const preferences = await this._extractPreferences(
      dto.prompt,
      dto.promptLanguage ?? 'English',
    );

    const widerInterests = this._expandInterests(preferences.interests);
    console.log(widerInterests);
    const widerDestinations = this._expandDestination(preferences.destination);
    const offers = await this._loadOffers(preferences, widerDestinations);

    if (offers.length === 0) {
      return {
        recommendations: null,
        message: 'No matching travel offers are available.',
        preferences: preferences,
      };
    }

    const recommendations = await this._rankOffers(preferences, offers);
    return {
      recommendations: recommendations,
    };
  }

  private async _loadOffers(
    preferences: PreferencesJson,
    destinationMatches: string[],
  ) {
    const offers = await this._prismaService.offer.findMany({
      where: {
        ...(destinationMatches.length > 0
          ? {
              location: {
                OR: [
                  ...destinationMatches.map((value) => ({
                    city: {
                      equals: value,
                      mode: 'insensitive' as const,
                    },
                  })),
                  ...destinationMatches.map((value) => ({
                    country: {
                      equals: value,
                      mode: 'insensitive' as const,
                    },
                  })),
                ],
              },
            }
          : {}),
      },
      include: {
        location: true,
        accommodation: true,
        outboundFlight: true,
        returnFlight: true,
      },
      take: 10,
    });

    return offers.map((offer) => ({
      id: offer.id,
      destination: `${offer.location.city}, ${offer.location.country}`,
      fee: offer.fee,
      currency: offer.currency,
      accommodation: offer.accommodation.name,
      outboundFlight: offer.outboundFlight.flightNumber,
      returnFlight: offer.returnFlight.flightNumber,
    }));
  }

  private async _extractPreferences(
    prompt: string,
    promptLanguage: string,
  ): Promise<PreferencesJson> {
    const res = await fetch(this._ollamaUrl!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this._llm,
        stream: false,
        format: 'json',
        messages: [
          {
            role: 'system',
            content: `
'Extract travel preferences. Return only valid JSON. Missing values must be null.'
        `.trim(),
          },
          {
            role: 'user',
            content: `
User text:
"${prompt}"

Detected response language:
"${promptLanguage}"

Return JSON exactly like:
{
  "origin": "string or null",
  "destination": "string or null",
  "duration": number or null,
  "budget": number or null,
  "currency": "string or null",
  "interests": ["string"],
  "season": "string or null",
  "promptLanguage": "${promptLanguage}"
}
        `.trim(),
          },
        ],
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Ollama error: ', res.status, error);
      throw new InternalServerErrorException('Ollama request failed');
    }
    const data = await res.json();
    try {
      return JSON.parse(data.message.content);
    } catch {
      console.error('Invalid model response:', data.message.content);
      throw new InternalServerErrorException('Invalid JSON returned by model');
    }
  }

  private async _rankOffers(preferences: PreferencesJson, offers: any[]) {
    const res = await fetch(this._ollamaUrl!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this._llm,
        stream: false,
        format: 'json',
        messages: [
          {
            role: 'system',
            content: `
            You are a travel recommendation engine.
            Return only valid JSON.
            Do not use markdown.
            Recommend only from the provided offers.
            Do not invent offer IDs, destinations, hotels, prices, or flights.
            Do not infer duration from flight times.
            Use only the "nights" field as duration.
            The field "fee" is the total offer price. It already includes flights and accommodation.
            When explaining budget, refer only to "total offer price", not separate flight or accommodation costs.
            All explanation text must be in ${preferences.promptLanguage ?? 'English'}.
          `.trim(),
          },
          {
            role: 'user',
            content: `
User preferences:
${JSON.stringify(preferences, null, 2)}

Available offers:
${JSON.stringify(offers, null, 2)}

Choose the best matching offers.

Return exactly:
{
  "recommendations": [
    {
      "offerId": "string",
      "destination": "string",
      "reason": "string",
      "budget": number,
      "duration": number
    }
  ]
}
          `.trim(),
          },
        ],
      }),
    });

    const data = await res.json();

    try {
      const parsed = JSON.parse(data.message.content);
      return parsed.recommendations;
    } catch {
      throw new InternalServerErrorException('Invalid JSON returned by model');
    }
  }

  private _expandInterests(interests: string[] = []) {
    if (!Array.isArray(interests)) return [];

    const expanded = new Set<string>();

    for (const interest of interests) {
      const normalized = interest.toLowerCase();

      expanded.add(normalized);

      for (const [key, keywords] of Object.entries(semanticKeywords)) {
        if (key.toLowerCase() === normalized || keywords.includes(normalized)) {
          keywords.forEach((keyword) => expanded.add(keyword));
        }
      }
    }
    return Array.from(expanded);
  }
  private _expandDestination(destination?: string | null) {
    if (!destination) return [];

    const normalized = destination.toLowerCase();

    for (const [key, countries] of Object.entries(semanticLocations)) {
      if (key.toLowerCase() === normalized) {
        return countries;
      }
    }

    return [destination];
  }
}
