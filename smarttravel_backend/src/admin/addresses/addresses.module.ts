import { Module } from '@nestjs/common';
import { AdminAddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  controllers: [AdminAddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
