import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateFlightDto) {
    return this._prismaService.flight.create({
      data: {
        airlineName: dto.airlineName,
        flightNumber: dto.flightNumber,
        departureTime: dto.departureTime,
        arrivalTime: dto.arrivalTime,
        price: dto.price,
        currency: dto.currency,
        fromIataCode: dto.fromIataCode,
        toIataCode: dto.toIataCode,
      },
    });
  }

  findAll() {
    return this._prismaService.flight.findMany({
      orderBy: [{ departureTime: 'asc' }],
    });
  }

  async update(id: string, newData: UpdateFlightDto) {
    return this._prismaService.flight.update({
      where: { id },
      data: newData,
    });
  }

  async remove(id: string) {
    return this._prismaService.flight.delete({
      where: { id },
    });
  }
}
