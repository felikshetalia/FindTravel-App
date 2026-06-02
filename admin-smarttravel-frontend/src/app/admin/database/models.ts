export interface Location {
  id: string;
  city: string;
  state?: string;
  country: string;
  [key: string]: any;
}

export interface Address {
  id: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  location: Location;
}

export interface Accommodation {
  id: string;
  name: string;
  location: Location;
  costPerNight: number;
  currency: string;
  address: Address;
  nights: number;
  [key: string]: any;
}

export interface Airport {
  iataCode: string;
  name: string;
  location: Location;
  [key: string]: any;
}

export interface Flight {
  id: string;
  airlineName: string;
  flightNumber: string;
  fromIataCode: string;
  departureTime: string;
  toIataCode: string;
  arrivalTime: string;
  price: number;
  currency: string;
  [key: string]: any;
}

export interface Offer {
  id: string;
  description: string;
  price: number;
  currency: string;
  createdAt: string; // date
  tags: string[];
  location: Location;
  accommodation: Accommodation[];
  outboundFlight: Flight;
  returnFlight: Flight;
  [key: string]: any;
}
