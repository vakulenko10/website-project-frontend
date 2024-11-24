// src/api/paymentAPI.js

export const makePayment = async (order, token, stripe, elements, cardElement) => {
    try {
      // Step 1: Create Payment Intent
      const paymentIntentResponse = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_id: order.id, total: order.total }),
      });
  
      const paymentData = await paymentIntentResponse.json();
      if (!paymentIntentResponse.ok) throw new Error(paymentData.error || 'Failed to create payment intent');
  
      const { clientSecret } = paymentData;
  
      // Step 2: Confirm Payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(cardElement),
          billing_details: { name: 'Valerii Brazuka' }, // You can update the name dynamically
        },
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      return paymentIntent.status === 'succeeded' 
        ? { success: true, message: 'Payment successful!' } 
        : { success: false, message: 'Payment failed.' };
    } catch (error) {
      return { success: false, message: error.message || 'Failed to process payment.' };
    }
  };
  