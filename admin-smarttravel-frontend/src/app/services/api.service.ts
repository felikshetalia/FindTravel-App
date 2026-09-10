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

  getEntityById<T>(entityType: string, id: string) {
    return this._httpClient.get<T>(`${this._apiUrl}/${entityType}/${id}`);
  }

  updateEntity<T>(entityName: string, id: string, data: unknown) {
    return this._httpClient.patch<T>(`${this._apiUrl}/${entityName}/${id}`, data);
  }

  // Locations
  getLocations(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this._apiUrl}/locations`);
  }

  createLocation(data: any): Observable<any> {
    return this._httpClient.post(`${this._apiUrl}/locations`, data);
  }

  updateLocation(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`${this._apiUrl}/locations/${id}`, data);
  }

  deleteLocation(id: string): Observable<any> {
    return this._httpClient.delete(`${this._apiUrl}/locations/${id}`);
  }

  // Addresses
  getAddresses(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this._apiUrl}/addresses`);
  }

  createAddress(data: any): Observable<any> {
    return this._httpClient.post(`${this._apiUrl}/addresses`, data);
  }

  updateAddress(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`${this._apiUrl}/addresses/${id}`, data);
  }

  deleteAddress(id: string): Observable<any> {
    return this._httpClient.delete(`${this._apiUrl}/addresses/${id}`);
  }

  // Airports
  getAirports(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this._apiUrl}/airports`);
  }

  getAirportsWithRelations(): Observable<any[]> {
    return forkJoin({
      airports: this.getAirports(),
      locations: this.getLocations(),
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

  createAirport(data: any): Observable<any> {
    return this._httpClient.post(`${this._apiUrl}/airports`, data);
  }

  updateAirport(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`${this._apiUrl}/airports/${id}`, data);
  }

  deleteAirport(id: string): Observable<any> {
    return this._httpClient.delete(`${this._apiUrl}/airports/${id}`);
  }

  // Accommodations
  getAccommodations(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this._apiUrl}/accommodations`);
  }

  getAccommodationsWithRelations(): Observable<any[]> {
    return forkJoin({
      accommodations: this.getAccommodations(),
      addresses: this.getAddresses(),
      locations: this.getLocations(),
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

  createAccommodation(data: any): Observable<any> {
    return this._httpClient.post(`${this._apiUrl}/accommodations`, data);
  }

  updateAccommodation(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`${this._apiUrl}/accommodations/${id}`, data);
  }

  deleteAccommodation(id: string): Observable<any> {
    return this._httpClient.delete(`${this._apiUrl}/accommodations/${id}`);
  }

  // Flights
  getFlights(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this._apiUrl}/flights`);
  }

  createFlight(data: any): Observable<any> {
    return this._httpClient.post(`${this._apiUrl}/flights`, data);
  }

  updateFlight(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`${this._apiUrl}/flights/${id}`, data);
  }

  deleteFlight(id: string): Observable<any> {
    return this._httpClient.delete(`${this._apiUrl}/flights/${id}`);
  }

  // Offers
  getOffers(): Observable<any[]> {
    return this._httpClient.get<any[]>(`http://localhost:3000/api/offers`);
  }

  getOffersWithRelations(): Observable<any[]> {
    return forkJoin({
      offers: this.getOffers(),
      accommodations: this.getAccommodations(),
      flights: this.getFlights(),
      locations: this.getLocations(),
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

  createOffer(data: any): Observable<any> {
    return this._httpClient.post(`http://localhost:3000/api/admin/offers`, data);
  }

  updateOffer(id: string, data: any): Observable<any> {
    return this._httpClient.patch(`http://localhost:3000/api/admin/offers/${id}`, data);
  }

  deleteOffer(id: string): Observable<any> {
    return this._httpClient.delete(`http://localhost:3000/api/admin/offers/${id}`);
  }
}
