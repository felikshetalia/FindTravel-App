import { Injectable, NotFoundException } from '@nestjs/common';
import { connect } from 'http2';
import { CreateOfferDto } from 'src/admin/offers/dto/create-offer.dto';
import { UpdateOfferDto } from 'src/admin/offers/dto/update-offer.sto';
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

  create(dto: CreateOfferDto) {
    return this._prismaService.offer.create({
      data: {
        description: dto.description,
        fee: dto.fee,
        currency: dto.currency,
        location: {
          connect: { id: dto.locationId },
        },
        accommodation: {
          connect: { id: dto.accommodationId },
        },
        outboundFlight: {
          connect: { id: dto.outboundFlightId },
        },
        returnFlight: {
          connect: { id: dto.returnFlightId },
        },
      },
    });
  }

  async update(id: string, newData: UpdateOfferDto) {
    return this._prismaService.offer.update({
      where: { id },
      data: newData,
    });
  }

  async remove(id: string) {
    return this._prismaService.offer.delete({
      where: { id },
    });
  }
}
