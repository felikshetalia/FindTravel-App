import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateLocationDto) {
    return this._prismaService.location.create({
      data: {
        country: dto.country,
        city: dto.city,
        state: dto.state,
      },
    });
  }

  findAll() {
    return this._prismaService.location.findMany({
      orderBy: [{ country: 'asc' }, { city: 'asc' }],
    });
  }

  async update(id: string, newData: UpdateLocationDto) {
    return this._prismaService.location.update({
      where: { id },
      data: newData,
    });
  }

  async remove(id: string) {
    return this._prismaService.location.delete({
      where: { id },
    });
  }
}
