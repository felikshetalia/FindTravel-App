import { Module } from '@nestjs/common';
import { AdminAddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminAddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
