import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { OffersModule } from './offers/offers.module';
import { AccommodationsModule } from './admin/accommodations/accommodations.module';
import { LocationsModule } from './admin/locations/locations.module';
import { AddressesModule } from './admin/addresses/addresses.module';
import { AirportsModule } from './admin/airports/airports.module';
import { FlightsModule } from './admin/flights/flights.module';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';

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
    AiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
