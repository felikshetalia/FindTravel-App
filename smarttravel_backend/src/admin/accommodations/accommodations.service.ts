import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@Injectable()
export class AccommodationsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateAccommodationDto) {
    return this._prismaService.accommodation.create({
      data: {
        name: dto.name,
        nights: dto.nights,
        costPerNight: dto.costPerNight,
        currency: dto.currency,
        address: {
          connect: { id: dto.addressId },
        },
      },
    });
  }

  findAll() {
    return this._prismaService.accommodation.findMany({
      orderBy: [{ id: 'asc' }],
    });
  }

  async update(id: string, newData: UpdateAccommodationDto) {
    return this._prismaService.accommodation.update({
      where: { id },
      data: newData,
    });
  }

  async remove(id: string) {
    return this._prismaService.accommodation.delete({
      where: { id },
    });
  }
}
