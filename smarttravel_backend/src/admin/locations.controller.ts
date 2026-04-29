import { Body, Controller, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('admin/locations')
export class AdminLocationsController {
  constructor(private readonly _locationsService: LocationsService) {}
  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this._locationsService.create(dto);
  }
}
