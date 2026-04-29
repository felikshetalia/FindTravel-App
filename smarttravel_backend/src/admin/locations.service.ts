import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateLocationDto) {
    return this._prismaService.location.create({ data: dto });
  }

  findAll() {
    return this._prismaService.location.findMany({
      orderBy: [{ country: 'asc' }, { city: 'asc' }],
    });
  }
}
