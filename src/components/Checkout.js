import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51PErshJiYElw1VN6T9wRwkl4OAkGQloWVC2zPVoE19kGERb8ccj3znnTo3Lu6GQNxRcFz3gERmxe71FtlYspvPaG00wIXTHfxw');

const Checkout = ({ order, onPaymentSuccess}) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm order={order} onPaymentSuccess={onPaymentSuccess}/> {/* Pass order to PaymentForm */}
    </Elements>
  );
};

export default Checkout;
