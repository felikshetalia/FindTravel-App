import { Module } from '@nestjs/common';
import { AdminFlightsController } from './flights.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FlightsService } from './flights.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminFlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
