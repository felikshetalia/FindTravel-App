import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/locations')
export class AdminLocationsController {
  constructor(private readonly _locationsService: LocationsService) {}

  @Get()
  findAll() {
    return this._locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this._locationsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this._locationsService.create(dto);
  }

  @Patch(':id')
  edit(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: UpdateLocationDto,
  ) {
    return this._locationsService.update(id, newData);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this._locationsService.remove(id);
  }
}
