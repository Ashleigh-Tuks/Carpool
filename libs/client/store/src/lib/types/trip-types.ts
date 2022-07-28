import { Error } from './auth-types';

export type CreateTrip = {
  trip: string;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripCreateType = {
  tripId: string;
  driver: Driver;
  tripDate: string;
  createdAt: string;
  price: number;
  coordinates: Location[];
};

export type UpcomingTrip = {
  trip: TripUpcomingType | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripUpcomingType = {
  tripId: string;
  tripDate: string;
  coordinates: Location[];
};

export type TripList = {
  trips: TripListType[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripListType = {
  tripId: string;
  driver: Driver;
  tripDate: string;
  createdAt: string;
  coordinates: Location[];
  price: string;
};

export type Location = {
  address: string;
  latitude: string;
  longitude: string;
};

export type Passenger = {
  bookingId: string;
};

export type Driver = {
  id: string;
  name: string;
  surname: string;
  profilePic: string;
};

export type TripDetails = {
  trip: TripDetailsType | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripDetailsType = {
  tripId: string;
  driver: Driver;
  tripDate: string;
  createdAt: string;
  seatsAvailable?: string;
  price: string;
  coordinates: Location[];
};

export type TripBooking = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type AcceptTripRequest = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type UpdatePaymentStatusType = {
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type BookingIdType = {
  bookingId: string | null;
};
export type StartTrip = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type EndTrip = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
