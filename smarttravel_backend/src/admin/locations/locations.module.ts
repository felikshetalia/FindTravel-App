import { Module } from '@nestjs/common';
import { AdminLocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminLocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
