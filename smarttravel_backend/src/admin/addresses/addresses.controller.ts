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
import { AddressesService } from './addresses.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('admin/addresses')
export class AdminAddressesController {
  constructor(private readonly _addressService: AddressesService) {}

  @Get()
  findAll() {
    return this._addressService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this._addressService.create(dto);
  }

  @Patch(':id')
  edit(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: UpdateAddressDto,
  ) {
    return this._addressService.update(id, newData);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this._addressService.remove(id);
  }
}
