import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RootStore,
  AppDispatch,
  TripListType,
  resetStart,
  resetEnd,
  findUpcomingTrip,
} from '@carpool/client/store';
import { HomePageProps } from '../NavigationTypes/navigation-types';
import {
  TripCardSmall,
  HomeOptionBox,
  HomeSearchBar,
  HomeMapView,
} from '@carpool/client/components';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { styles } from './home-page.style';

export function HomePage({ navigation }: HomePageProps) {
  const dispatch: AppDispatch = useDispatch();

  const tripState = useSelector((state: RootStore) => state.upcomingTrip);
  const { trip, status } = tripState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  const startTripState = useSelector((state: RootStore) => state.startTrip);
  const { status: tripStartStatus } = startTripState;

  const endTripState = useSelector((state: RootStore) => state.endTrip);
  const { status: endTripStatus } = endTripState;

  useEffect(() => {
    if (userData && userData.id) {
      dispatch(findUpcomingTrip(userData.id));
    }

    if (endTripStatus === 'success') {
      dispatch(resetEnd());
    }

    if (tripStartStatus === 'success') {
      dispatch(resetStart());
    }
  }, [dispatch, endTripStatus, tripStartStatus, userData]);

  const viewTrip = (tripId: string, trip: TripListType) => {
    if (trip.status === 'active') {
      if (trip.driver.id === userData?.id) {
        //**Driver active screen */
        navigation.navigate('DriverActiveTrip', { tripId });
      } else {
        //** Passenger active screen */
        navigation.navigate('DriverActiveTrip', { tripId });
      }
    } else {
      navigation.push('TripDetails', { tripId, type: '__' });
    }
  };

  const createTrip = () => {
    if (userData && userData.isDriver) {
      navigation.navigate('PostTrips');
    } else {
      Alert.alert(
        'You are not registered as a driver',
        'Would you like to register?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              navigation.navigate('RegisterDriver', {
                userId: userData ? userData.id : '',
              });
            },
          },
        ]
      );
    }
  };

  return (
    <View style={[styles.flexCol, { flex: 1 }]}>
      <HomeSearchBar
        onPress={() => navigation.push('SearchPage')}
        onPressCart={() => navigation.push('NotificationsPage')}
      />
      <HomeMapView />
      <View style={styles.bottomContainer}>
        <HomeOptionBox
          onPress={() => navigation.push('SearchPage')}
          onPressCreate={() => createTrip()}
        />
        <View style={styles.cardContainer}>
          {trip && trip.status === 'active' ? (
            <Text style={styles.smallTextBlack}></Text>
          ) : (
            <Text style={styles.smallTextBlack}>Upcoming trip</Text>
          )}

          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : trip ? (
            <TripCardSmall
              key={trip.tripId}
              startLocation={trip.coordinates[0].address}
              destination={trip.coordinates[1].address}
              endLat={trip.coordinates[1].latitude}
              endLong={trip.coordinates[1].longitude}
              date={trip.tripDate}
              type="passenger"
              onPress={() => viewTrip(trip.tripId, trip)}
            />
          ) : (
            <View style={styles.noTripContainer}>
              <Text style={[styles.bigText]}>You have no upcoming trips</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.centeredView}></View>
    </View>
  );
}

export default HomePage;
