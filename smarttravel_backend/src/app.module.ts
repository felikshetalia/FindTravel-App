import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { OffersModule } from './offers/offers.module';
import { AccommodationsModule } from './admin/accommodations/accommodations.module';
import { LocationsModule } from './admin/locations/locations.module';
import { AddressesModule } from './admin/addresses/addresses.module';
import { AirportsService } from './admin/airports/airports.service';
import { AdminAirportsController } from './admin/airports/airports.controller';
import { AirportsModule } from './admin/airports/airports.module';
import { FlightsService } from './admin/flights/flights.service';
import { FlightsModule } from './admin/flights/flights.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    OffersModule,
    AccommodationsModule,
    LocationsModule,
    AddressesModule,
    AirportsModule,
    FlightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
