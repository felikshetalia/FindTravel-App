import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { OffersService } from './offers.service';

// your connect to the service for the logic but this file defines the endpoints
@Controller('offers')
export class OffersController {
  constructor(private readonly _offersService: OffersService) {}
  @Get()
  getAll() {
    return this._offersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this._offersService.findOne(id);
  }
}
