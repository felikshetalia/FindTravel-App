import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PreferencesJson, RequestDto, UserRequestDto } from './dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

    const offers = await this._loadOffers(preferences);

    if (offers.length === 0) {
      return {
        recommendations: null,
        message: 'No matching travel offers are available.',
        preferences: preferences,
      };
    }

    const recommendations = await this._rankOffers(preferences, offers);
    return {
      preferences: preferences,
      recommendations: recommendations,
    };
  }

  private async _loadOffers(preferences: PreferencesJson) {
    const offers = await this._prismaService.offer.findMany({
      where: {
        ...(preferences.destination
          ? {
              location: {
                city: {
                  contains: preferences.destination,
                  mode: 'insensitive',
                },
              },
            }
          : {}),
        ...(preferences.budget
          ? {
              fee: {
                lte: preferences.budget,
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
}
