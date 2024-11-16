import React, { useState } from 'react';
import ProductList from './ProductList';
import OrderForm from './OrderForm';

const CartOverlay = ({ cart, setShowCart, updateCart, token }) => {
  const [activeTab, setActiveTab] = useState('contact');
  
  const tabOrder = ['contact', 'delivery', 'payment'];

  const nextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabOrder.length;
    setActiveTab(tabOrder[nextIndex]);
  };

  const prevTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const prevIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
    setActiveTab(tabOrder[prevIndex]);
  };

  return (
    <div className="fixed inset-0 bg-[#BAA291] bg-opacity-90 flex items-start justify-center z-50 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:space-x-8 w-full max-w-screen-xl">
        
        {/* Form Section */}
        <div className="common-container bg-white p-4 sm:p-6 rounded-lg shadow-lg w-96 relative mb-8 sm:mb-0">
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevTab} 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#5B0101] text-xl sm:text-2xl font-bold sm:hidden">
            &larr;
          </button>
          <button 
            onClick={nextTab} 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#5B0101] text-xl sm:text-2xl font-bold sm:hidden">
            &rarr;
          </button>

          {/* Tab Indicator */}
          <div className="flex justify-between mb-2 mt-2 sm:mt-4 sm:mb-4">
            <button 
              className={`w-4 h-4 flex items-center justify-center rounded-full ${activeTab === 'contact' ? 'bg-[#5B0101]' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('contact')}
            />
            <button 
              className={`w-4 h-4 flex items-center justify-center rounded-full ${activeTab === 'delivery' ? 'bg-[#5B0101]' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('delivery')}
            />
            <button 
              className={`w-4 h-4 flex items-center justify-center rounded-full ${activeTab === 'payment' ? 'bg-[#5B0101]' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('payment')}
            />
          </div>

          {/* Form Content */}
          <div className="max-h-80 overflow-y-auto">
            {activeTab === 'contact' && <OrderForm type="contact" />}
            {activeTab === 'delivery' && <OrderForm type="delivery" />}
            {activeTab === 'payment' && <OrderForm type="payment" />}
          </div>
        </div>

        {/* Product List Section */}
        <ProductList cart={cart} updateCart={updateCart} token={token} />

      </div>

      {/* Close Button */}
      <button 
        onClick={() => setShowCart(false)} 
        className="absolute top-4 right-4 text-white font-semibold text-2xl sm:text-3xl">
        &times;
      </button>
    </div>
  );
};

export default CartOverlay;
