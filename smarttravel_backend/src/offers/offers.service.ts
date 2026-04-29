import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// main methods for each http request
@Injectable()
export class OffersService {
  constructor(private readonly _prismaService: PrismaService) {}
  private readonly offerInclude = {
    location: true,
    accommodation: {
      include: {
        address: {
          include: {
            location: true,
          },
        },
      },
    },
    outboundFlight: {
      include: {
        from: true,
        to: true,
      },
    },
    returnFlight: {
      include: {
        from: true,
        to: true,
      },
    },
  };
  async findAll() {
    return this._prismaService.offer.findMany({
      include: this.offerInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findOne(id: string) {
    const offer = await this._prismaService.offer.findUnique({
      where: { id },
      include: this.offerInclude,
    });

    if (!offer) {
      throw new NotFoundException(`Offer with id ${id} was not found`);
    }

    return offer;
  }
}
