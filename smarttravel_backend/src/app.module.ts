import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { OffersModule } from './offers/offers.module';
import { AccommodationsModule } from './admin/accommodations/accommodations.module';
import { LocationsModule } from './admin/locations/locations.module';
import { AddressesModule } from './admin/addresses/addresses.module';
import { AdminAddressesController } from './admin/admin-addresses/admin-addresses.controller';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    OffersModule,
    AccommodationsModule,
    LocationsModule,
    AddressesModule,
  ],
  controllers: [AppController, AdminAddressesController],
  providers: [AppService],
})
export class AppModule {}
