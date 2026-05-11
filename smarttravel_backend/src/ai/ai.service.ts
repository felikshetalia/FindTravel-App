import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RequestDto } from './dto/request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private readonly _prismaService: PrismaService) {}
  private readonly _ollamaUrl = process.env['OLLAMA_CHAT_URL_POST'];
  private readonly _llm = 'qwen2.5:3b';

  async recommend(dto: RequestDto) {
    const lang = dto.promptLanguage ?? 'English';

    const userPreferences = {
      origin: dto.origin ?? null,
      destination: dto.destination ?? null,
      duration: dto.duration ?? null,
      budget: dto.budget ?? null,
      interests: dto.interests ?? [],
      season: dto.season ?? null,
    };

    const offers = await this._loadOffers(dto);
    if (offers.length === 0) {
      return {
        recommendations: [],
        message: 'No matching travel offers are available in the database.',
      };
    }
    console.log(offers);
    // call ollama
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
            All human-readable string values must be in ${lang}. 
            You must recommend only from the provided database offers.
            Do not invent destinations, hotels, flights, prices, durations, or offer IDs.
            `.trim(),
          },
          {
            role: 'user',
            content: `
            User travel preferences:
            ${JSON.stringify(userPreferences, null, 2)}

            Available database offers:
            ${JSON.stringify(offers, null, 2)}

            Choose one recommendation from the available database offers.

            Return exactly this JSON shape:
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

  private async _loadOffers(dto: RequestDto) {
    const offers = await this._prismaService.offer.findMany({
      where: {
        ...(dto.destination
          ? {
              location: {
                city: {
                  contains: dto.destination,
                  mode: 'insensitive',
                },
              },
            }
          : {}),
        ...(dto.budget
          ? {
              fee: {
                lte: dto.budget,
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
}
