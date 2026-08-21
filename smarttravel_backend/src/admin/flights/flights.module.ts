import { Module } from '@nestjs/common';
import { AdminFlightsController } from './flights.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FlightsService } from './flights.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminFlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
