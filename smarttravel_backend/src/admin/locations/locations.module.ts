import { Module } from '@nestjs/common';
import { AdminLocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminLocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
