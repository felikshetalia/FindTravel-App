import { Module } from '@nestjs/common';
import { AdminAccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminAccommodationsController],
  providers: [AccommodationsService],
})
export class AccommodationsModule {}
