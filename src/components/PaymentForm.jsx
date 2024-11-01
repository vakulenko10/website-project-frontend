// PaymentForm.js
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ order, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Create Payment Intent
      const paymentIntentResponse = await fetch('http://127.0.0.1:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ order_id: order.id, total: order.total }),
      });

      const paymentData = await paymentIntentResponse.json();
      if (!paymentIntentResponse.ok) throw new Error(paymentData.error || 'Failed to create payment intent');

      const { clientSecret } = paymentData;

      // Step 2: Confirm Payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: 'Valerii Brazuka' },
        },
      });

      if (error) {
        setError(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful!');
        setIsProcessing(false);

        // Call onPaymentSuccess to update the order status
        if (onPaymentSuccess) onPaymentSuccess(order.id, 'Paid');
      }
    } catch (error) {
      setError(error.message || 'Failed to process payment.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default PaymentForm;
