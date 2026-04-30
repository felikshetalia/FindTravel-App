import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressesService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateAddressDto) {
    return this._prismaService.address.create({
      data: {
        street: dto.street,
        houseNumber: dto.houseNumber,
        postalCode: dto.postalCode,
        location: {
          connect: { id: dto.locationId },
        },
      },
    });
  }

  findAll() {
    return this._prismaService.address.findMany({
      orderBy: [{ id: 'asc' }],
    });
  }

  async update(id: string, newData: UpdateAddressDto) {
    return this._prismaService.address.update({
      where: { id },
      data: newData,
    });
  }

  async remove(id: string) {
    return this._prismaService.address.delete({
      where: { id },
    });
  }
}
