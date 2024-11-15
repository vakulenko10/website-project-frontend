import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthData } from '../auth/AuthWrapper';
import { deleteProductFromCart } from '../services/cartAPI';
import './Cart.css';

const Cart = () => {
  const { cart, loading, updateCart,products, token } = AuthData();
  const [localCart, setLocalCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const getProductDetailsForCart = (cartItems, allProducts) => {
    return cartItems.map((cartItem) => {
      const productDetails = allProducts.find(
        (product) => product.id === cartItem.product_id
      );
      return {
        ...cartItem,
        images: productDetails?.images || [],
        name: productDetails?.name || 'Unknown Product',
        price: productDetails?.price || 0,
      };
    });
  };

  useEffect(() => {
    if (cart && cart.items && products) {
      const cartWithDetails = getProductDetailsForCart(cart.items, products);
      const detailedCart = cartWithDetails.map((item) => ({
        ...item,
        suma: item.price * item.quantity,
      }));
      setLocalCart(detailedCart);
    }
  }, [cart, products]);

  // Calculate the cart total
  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.suma, 0).toFixed(2);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return; // Ensure quantity is at least 1
    const updatedCart = [...localCart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].suma = updatedCart[index].price * newQuantity;
    setLocalCart(updatedCart);

    const updatedItems = updatedCart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      
    }));
    updateCart(updatedItems); // Update backend and global cart state
  };

  const handleDeleteProduct = async (productId) => {
    const response = await deleteProductFromCart(token, productId);
    if (!response.error) {
      const updatedCart = localCart.filter(
        (item) => item.product_id !== productId
      );
      setLocalCart(updatedCart);
      updateCart(updatedCart.map((item) => ({ product_id: item.product_id, quantity: item.quantity })));
    } else {
      console.error('Failed to remove product:', response.error);
    }
  };

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

  const handleCartOpen = () => {
    setShowCart((prevState) => {
      const isOpen = !prevState;
      if (isOpen) {
        document.body.classList.add('cart-no-scroll');
      } else {
        document.body.classList.remove('cart-no-scroll');
      }
      return isOpen;
    });
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <button
        onClick={handleCartOpen}
        className="fixed bottom-4 right-4 bg-[#BAA291] text-[#5B0101] p-4 rounded-full shadow-lg"
      >
        <FaShoppingCart className="text-xl" />
      </button>

      {/* Overlay for Cart and Order Details */}
      {showCart && (
        <div className="fixed inset-0 bg-[#BAA291] bg-opacity-90 flex items-start justify-center z-50 p-8">
          <div className="flex space-x-8">
            {/* Shopping Cart */}
            <div className="w-96 bg-white p-4 rounded-lg shadow-lg h-96 relative">
              <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
              {!localCart.length ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  <div className="custom-scrollbar max-h-64 overflow-y-auto">
                    <ul className="space-y-4">
                      {localCart.map((item, index) => (
                        <li key={item.product_id} className="flex items-center bg-gray-100 p-4 rounded-lg">
                          <div className="w-16 h-16 flex-shrink-0 mr-4">
                            <img
                              src={item.images[0] || 'path/to/placeholder-image.jpg'}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-grow text-left">
                            <p className="font-semibold text-xl">{item.name}</p>
                            <p className="text-[#5B0101] font-bold mt-1">Price: ${item.price}</p>
                            <div className="flex items-center border border-black rounded-sm w-20 h-5 px-3 py-3 space-x-1">
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                className="text-gray-700 text-lg"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                                className="w-6 h-4 text-center text-lg outline-none appearance-none bg-transparent"
                              />
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                className="text-gray-700 text-lg"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right" style={{ transform: 'translateX(60px)' }}>
                            <p className="text-green-600 font-semibold mb-1 -mt-12">
                              ${item.suma.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteProduct(item.product_id)}
                            className="ml-4 mt-16 text-[#5B0101] font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold text-green-600">
                        Total: ${calculateTotal(localCart)}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button onClick={handleCartOpen} className="absolute top-4 right-4 text-white font-semibold text-2xl">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
