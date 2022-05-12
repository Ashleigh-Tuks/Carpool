import { User } from '@carpool/api/authentication/entities';
import { Trip, Booking } from '@carpool/api/trips/api/shared';
import { TripsService } from '@carpool/api/trips/service/feature';
import { Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

@Resolver()
export class TripsResolver {
  constructor(private readonly tripsService: TripsService) {}

  @ResolveField(() => [Booking])
  async passengers(@Root() trip: Trip): Promise<Booking[]> {
    return await this.tripsService.findBookingByTrip(trip.tripId);
  }

  /* @ResolveField(() => User)
  async driver(@Root() trip: Trip): Promise<User> {
    return await this.tripsService.findDriverByTrip(trip.tripId);
  }*/

  @Query(() => [Trip])
  async findAll(): Promise<Trip[]> {
    return await this.tripsService.findAll();
  }
  @Query(() => [Trip])
  async findByDriver(driverId: string): Promise<Trip[]> {
    return await this.tripsService.findByDriver(driverId);
  }

  @Query(() => [Trip])
  async findByPassenger(PassengerId: string): Promise<Trip[]> {
    return await this.tripsService.findByDriver(PassengerId);
  }

  @Mutation(() => Trip)
  async create(
    tripDate: Date,
    seatsAvailable: number,
    price: number,
    startLocation: string,
    destination: string,
    category: string,
    status: string,
    driver: User
  ): Promise<Trip> {
    return await this.tripsService.create(
      tripDate,
      seatsAvailable,
      price,
      startLocation,
      destination,
      category,
      status,
      driver
    );
  }

  @Mutation(() => Trip)
  async delete(tripId: string): Promise<Trip> {
    return await this.tripsService.delete(tripId);
  }

  @Mutation(() => Trip)
  async update(
    tripId: string,
    seatsAvailable: number,
    price: number,
    status: string
  ): Promise<Trip> {
    return await this.tripsService.update(
      tripId,
      seatsAvailable,
      price,
      status
    );
  }

  @Mutation(() => Booking)
  async bookTrip(
    userId: string,
    tripId: string,
    bookingDate: Date,
    seatsBooked: number,
    status: string,
    price: number
  ): Promise<Booking> {
    return await this.tripsService.bookTrip(
      userId,
      tripId,
      bookingDate,
      seatsBooked,
      status,
      price
    );
  }
}
