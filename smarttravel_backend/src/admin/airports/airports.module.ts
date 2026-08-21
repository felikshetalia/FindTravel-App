import { Module } from '@nestjs/common';
import { AdminAirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminAirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}
