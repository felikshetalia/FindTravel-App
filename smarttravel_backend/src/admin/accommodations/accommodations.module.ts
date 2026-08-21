import { Module } from '@nestjs/common';
import { AdminAccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminAccommodationsController],
  providers: [AccommodationsService],
})
export class AccommodationsModule {}
