import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LIST_TRIPS,
  TRIP_DETAILS,
  UPCOMING_TRIP,
} from '../queries/trip-queries';
import * as SecureStore from 'expo-secure-store';
import {
  TripListType,
  TripDetailsType,
  TripUpcomingType,
} from '../types/trip-types';

export const listTrips = createAsyncThunk<
  TripListType[],
  undefined,
  { rejectValue: Error }
>('trips/list', async (__, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: LIST_TRIPS,
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findAllTrips;

  SecureStore.deleteItemAsync('trips');
  SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const fetchUpcomingTrip = createAsyncThunk<
  TripUpcomingType,
  undefined,
  { rejectValue: Error }
>('trips/upcoming', async (__, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: UPCOMING_TRIP,
  });

  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findUpcomingTrip;

  // SecureStore.deleteItemAsync('trips');
  // SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const fetchTripDetails = createAsyncThunk<
  TripDetailsType,
  string,
  { rejectValue: Error }
>('trip/details', async (tripId: string, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: TRIP_DETAILS,
    variables: {
      id: tripId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findTripById;

  console.log(res);

  return res;
});
