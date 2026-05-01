import { Module } from '@nestjs/common';
import { AdminAirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminAirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}
