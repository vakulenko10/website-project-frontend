import React from 'react';

const OrderForm = ({ type }) => {
  const formLabels = {
    contact: ['Name', 'Last Name', 'Phone Number', 'Email'],
    delivery: ['Country', 'State', 'City/Town', 'Postal Address'],
    payment: ['Cardholder Name', 'Card Number', 'Expiration Date', 'CVV']
  };

  return (
    <form className="space-y-4">
      {formLabels[type].map((label, idx) => (
        <div key={idx} className="flex space-x-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium">{label}</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-300 p-2"
              placeholder={label}
            />
          </div>
        </div>
      ))}
    </form>
  );
};

export default OrderForm;
