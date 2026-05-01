import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Injectable()
export class AirportsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateAirportDto) {
    return this._prismaService.airport.create({
      data: {
        iataCode: dto.iataCode,
        name: dto.name,
        location: {
          connect: { id: dto.locationId },
        },
      },
    });
  }

  findAll() {
    return this._prismaService.airport.findMany({
      orderBy: [{ iataCode: 'asc' }],
    });
  }

  async update(iata: string, newData: UpdateAirportDto) {
    return this._prismaService.airport.update({
      where: { iataCode: iata },
      data: newData,
    });
  }

  async remove(iata: string) {
    return this._prismaService.airport.delete({
      where: { iataCode: iata },
    });
  }
}
