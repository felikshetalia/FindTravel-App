import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/flights')
export class AdminFlightsController {
  constructor(private readonly _flightsService: FlightsService) {}

  @Get()
  findAll() {
    return this._flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this._flightsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateFlightDto) {
    return this._flightsService.create(dto);
  }

  @Patch(':id')
  edit(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: UpdateFlightDto,
  ) {
    return this._flightsService.update(id, newData);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this._flightsService.remove(id);
  }
}
