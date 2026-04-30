import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

@Controller('admin/accommodations')
export class AdminAccommodationsController {
  constructor(private readonly _accommodationService: AccommodationsService) {}
  @Get()
  findAll() {
    return this._accommodationService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAccommodationDto) {
    return this._accommodationService.create(dto);
  }

  @Patch(':id')
  edit(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: UpdateAccommodationDto,
  ) {
    return this._accommodationService.update(id, newData);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this._accommodationService.remove(id);
  }
}
