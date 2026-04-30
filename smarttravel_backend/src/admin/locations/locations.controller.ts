import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('admin/locations')
export class AdminLocationsController {
  constructor(private readonly _locationsService: LocationsService) {}

  @Get()
  findAll() {
    return this._locationsService.findAll();
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
