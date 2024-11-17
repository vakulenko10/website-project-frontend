import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import Font Awesome icon from react-icons
import './Cart.css'; // Make sure you have the CSS styles below
import OrderForm from './OrderForm';
import ShoppingCart from './ShoppingCart';
import { AuthData } from '../auth/AuthWrapper';
import Container from './Container';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const {user, loading} = AuthData();
  const [showCart, setShowCart] = useState(false); // State to manage the cart overlay visibility
  const [activeTab, setActiveTab] = useState('contact'); // Active tab state
  const tabOrder = ['contact', 'delivery', 'payment'];
  const location = useLocation();
  const renderCart = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && user.isAuthenticated;
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
  const handleCartOpen = () => {
    setShowCart((prevState) => {
        const isOpen = !prevState;
        
        if (isOpen) {
            document.body.classList.add("cart-no-scroll");
        } else {
            document.body.classList.remove("cart-no-scroll");
        }
        
        return isOpen;
    });
};

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      {renderCart?<button
        onClick={() => handleCartOpen()}
        className="fixed bottom-4 right-4 bg-[#BAA291] text-[#5B0101] p-4 rounded-full shadow-lg z-[10]"
      >
        <FaShoppingCart className="text-xl" /> {/* Cart icon in #5B0101 */}
      </button>:<></>}

      {/* Overlay for Cart and Order Details */}
      {showCart && (
        <div className="fixed w-screen h-screen inset-0 bg-[#BAA291] bg-opacity-90 flex justify-center z-50 p-8">
          <Container>
          <div className="h-full flex flex-col md:flex-row md:justify-center justify-center  items-center md:items-stretch space-x-8 relative">
            {/* Order Details with Tabs */}
            <OrderForm nextTab={nextTab} prevTab={prevTab} setActiveTab={setActiveTab} activeTab={activeTab}/>

            {/* Shopping Cart */}
            <ShoppingCart />
          </div>
          </Container>
          {/* Close Button */}
          <button
            onClick={() => handleCartOpen()}
            className="absolute top-4 right-4 bg-text3 rounded-lg p-2 text-white font-semibold text-2xl"
          >
            &times;
          </button>
        </div>
        
      )}
    </div>
  );
};

export default Cart;
