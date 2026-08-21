import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminOffersController } from 'src/admin/offers/admin-offers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [OffersController, AdminOffersController],
  providers: [OffersService],
})
export class OffersModule {}
