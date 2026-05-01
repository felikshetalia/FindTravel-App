import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Controller('admin/airports')
export class AdminAirportsController {
  constructor(private readonly _airportService: AirportsService) {}
  @Get()
  findAll() {
    return this._airportService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAirportDto) {
    return this._airportService.create(dto);
  }

  @Patch(':id')
  edit(iata: string, @Body() newData: UpdateAirportDto) {
    return this._airportService.update(iata, newData);
  }

  @Delete(':id')
  delete(iata: string) {
    return this._airportService.remove(iata);
  }
}
