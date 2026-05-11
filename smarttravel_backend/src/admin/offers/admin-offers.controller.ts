import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { OffersService } from 'src/offers/offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.sto';

// your connect to the service for the logic but this file defines the endpoints
@Controller('admin/offers')
export class AdminOffersController {
  constructor(private readonly _offersService: OffersService) {}
  @Get()
  getAll() {
    return this._offersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this._offersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateOfferDto) {
    return this._offersService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: UpdateOfferDto,
  ) {
    return this._offersService.update(id, newData);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this._offersService.remove(id);
  }
}
