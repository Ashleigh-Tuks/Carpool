import React from 'react';
import { PayfastPageProps } from '../NavigationTypes/navigation-types';
import { PayfastView } from '@carpool/client/components';

export function PayfastPage({ route, navigation }: PayfastPageProps) {
  const { description, cost } = route.params;

  const paymentData = {
    merchant_id: 10000100,
    merchant_key: '46f0cd694581a',
    amount: cost,
    item_name: description,
  };

  setTimeout(() => {
    navigation.navigate('CheckoutTrips');
  }, 10000);

  return (
    <PayfastView
      title="Pay Now"
      data={paymentData}
      sandbox={true}
      signature={false}
      passphrase={''}
    />
  );
}

export default PayfastPage;
