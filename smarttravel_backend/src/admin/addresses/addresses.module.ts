import { Module } from '@nestjs/common';
import { AdminAddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminAddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
