import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ order, onPaymentSuccess, user}) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm order={order} onPaymentSuccess={onPaymentSuccess} user={user}/> {/* Pass order to PaymentForm */}
    </Elements>
  );
};

export default Checkout;
