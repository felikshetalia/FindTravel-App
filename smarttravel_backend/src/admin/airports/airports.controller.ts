import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Get(':iataCode')
  findOne(@Param('iataCode') iataCode: string) {
    return this._airportService.findOne(iataCode);
  }

  @Patch(':iataCode')
  edit(@Param('iataCode') iataCode: string, @Body() newData: UpdateAirportDto) {
    return this._airportService.update(iataCode, newData);
  }

  @Delete(':iataCode')
  delete(@Param('iataCode') iataCode: string) {
    return this._airportService.remove(iataCode);
  }
}
