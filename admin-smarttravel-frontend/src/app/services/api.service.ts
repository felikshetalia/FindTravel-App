import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiUrl = 'http://localhost:3000/api/admin';

  private _httpClient = inject(HttpClient);

  createEntity<T>(entityName: string, data: unknown) {
    return entityName === 'offer'
      ? this._httpClient.post<T>(`http://localhost:3000/api/offers`, data)
      : this._httpClient.post<T>(`${this._apiUrl}/${entityName}`, data);
  }

  deleteEntity(entityName: string, id: string) {
    return this._httpClient.delete(`${this._apiUrl}/${entityName}/${id}`);
  }

  getEntities<T>(entityName: string) {
    return entityName === 'offers'
      ? this._httpClient.get<T[]>(`http://localhost:3000/api/offers`)
      : this._httpClient.get<T[]>(`${this._apiUrl}/${entityName}`);
  }

  getEntityById<T>(entityType: string, id: string) {
    return this._httpClient.get<T>(`${this._apiUrl}/${entityType}/${id}`);
  }

  updateEntity<T>(entityName: string, id: string, data: unknown) {
    return this._httpClient.patch<T>(`${this._apiUrl}/${entityName}/${id}`, data);
  }

  getAirportsWithRelations(): Observable<any[]> {
    return forkJoin({
      airports: this.getEntities<any>('airports'),
      locations: this.getEntities<any>('locations'),
    }).pipe(
      map(({ airports, locations }) => {
        const locationMap = new Map(locations.map((loc: any) => [loc.id, loc]));

        return airports.map((airport: any) => ({
          ...airport,
          location: locationMap.get(airport.locationId),
        }));
      }),
    );
  }

  getAccommodationsWithRelations(): Observable<any[]> {
    return forkJoin({
      accommodations: this.getEntities<any>('accommodations'),
      addresses: this.getEntities<any>('addresses'),
      locations: this.getEntities<any>('locations'),
    }).pipe(
      map(({ accommodations, addresses, locations }) => {
        const addressMap = new Map(addresses.map((addr: any) => [addr.id, addr]));
        const locationMap = new Map(locations.map((loc: any) => [loc.id, loc]));

        return accommodations.map((acc: any) => {
          let address = null;
          let location = null;

          // Try to find address by addressId
          if (acc.addressId) {
            address = addressMap.get(acc.addressId);
            // If address has location, use it
            if (address?.location) {
              location = address.location;
            } else if (address?.locationId) {
              location = locationMap.get(address.locationId);
            }
          }

          // Try to find location by locationId if not found from address
          if (!location && acc.locationId) {
            location = locationMap.get(acc.locationId);
          }

          return {
            ...acc,
            address: address,
            location: location,
          };
        });
      }),
    );
  }

  getOffersWithRelations(): Observable<any[]> {
    return forkJoin({
      offers: this.getEntities<any>('offers'),
      accommodations: this.getEntities<any>('accommodations'),
      flights: this.getEntities<any>('flights'),
      locations: this.getEntities<any>('locations'),
    }).pipe(
      map(({ offers, accommodations, flights, locations }) => {
        const accommodationMap = new Map(accommodations.map((acc: any) => [acc.id, acc]));
        const flightMap = new Map(flights.map((flight: any) => [flight.id, flight]));
        const locationMap = new Map(locations.map((loc: any) => [loc.id, loc]));

        // Handle both array and non-array responses
        const offersArray = Array.isArray(offers) ? offers : [offers];

        return offersArray.map((offer: any) => ({
          ...offer,
          accommodation:
            offer.accommodationIds?.map((id: string) => accommodationMap.get(id)).filter(Boolean) ||
            [],
          outboundFlight: flightMap.get(offer.outboundFlightId),
          returnFlight: flightMap.get(offer.returnFlightId),
          location: locationMap.get(offer.locationId),
        }));
      }),
    );
  }

}
