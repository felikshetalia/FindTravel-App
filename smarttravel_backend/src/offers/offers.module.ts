import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminOffersController } from 'src/admin/offers/admin-offers.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OffersController, AdminOffersController],
  providers: [OffersService],
})
export class OffersModule {}
