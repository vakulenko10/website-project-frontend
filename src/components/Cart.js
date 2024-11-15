import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import Font Awesome icon from react-icons
import { AuthData } from '../auth/AuthWrapper';
import { deleteAllProductsFromCart, deleteProductFromCart } from '../services/cartAPI';
import './Cart.css'; // Make sure you have the CSS styles below

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
const Cart = () => {
  const { cart, loading, updateCart, products, token } = AuthData();
  const [localCart, setLocalCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // State to manage the cart overlay visibility
  const [activeTab, setActiveTab] = useState('contact'); // Active tab state

  const getProductDetailsForCart = (cartItems, allProducts) => {
    return cartItems.map(cartItem => {
      const productDetails = allProducts.find(product => product.id === cartItem.product_id);
      return {
        ...cartItem,
        images: productDetails?.images || [],
        name: productDetails?.name || 'Unknown Product',
      };
    });
  };

  useEffect(() => {
    if (cart && cart.items && products) {
      const cartWithDetails = getProductDetailsForCart(cart.items, products);
      const detailedCart = cartWithDetails.map(item => ({
        ...item,
        suma: item.price * item.quantity,
      }));
      setLocalCart(detailedCart);
    }
  }, [cart, products]);
  const debouncedUpdateCart = debounce(async (updatedItems) => {
    if (token) {
      try {
        const data = await updateCart(updatedItems);
        if (data) {
          console.log("Cart updated in backend:", data);
        } else {
          console.error("Failed to update cart:", data);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  }, 1000);
  const handleDeleteAll = async () => {
    // Clear local cart
    setLocalCart([]);
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  
    // Call backend to clear the cart
    if (token) {
      try {
        const response = await deleteAllProductsFromCart(token);
        if (response) {
          console.log('Cart cleared:', response);
        } else {
          console.error('Failed to clear the cart in backend:', response);
        }
      } catch (error) {
        console.error('Error clearing the cart:', error);
      }
    }
  };
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...localCart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].suma = updatedCart[index].price * newQuantity;
    setLocalCart(updatedCart);

    const updatedItems = updatedCart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      images: item.images,
      name: item.name,
    }));

    // Update the localStorage immediately
    localStorage.setItem('cart', JSON.stringify({ items: updatedItems }));
    
    // Call the debounced function to update the backend after a delay
    debouncedUpdateCart(updatedItems);
  };

  const handleDeleteProduct = async (productId) => {
    // Remove the item from the local state
    const updatedCart = localCart.filter(item => item.product_id !== productId);
    setLocalCart(updatedCart);
    
    // Update localStorage immediately
    localStorage.setItem('cart', JSON.stringify({ items: updatedCart }));
  
    // Call the backend API to delete the product from the cart
    if (token) {
      try {
        const response = await deleteProductFromCart(token, productId);
        if (response) {
          console.log(response);
        } else {
          console.error("Failed to delete product from backend", response);
        }
      } catch (error) {
        console.error("Error deleting product from backend:", error);
      }
    }
  
    // Call the debounced function to sync the updated cart to the backend
    // debouncedUpdateCart(updatedCart.map(item => ({ product_id: item.product_id, quantity: item.quantity })));
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
            document.body.classList.add("cart-no-scroll");
        } else {
            document.body.classList.remove("cart-no-scroll");
        }
        
        return isOpen;
    });
};
useEffect(()=>{
  localStorage.setItem('cart', JSON.stringify(localCart));
}, [localCart])
  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <button
        onClick={() => handleCartOpen()}
        className="fixed bottom-4 right-4 bg-[#BAA291] text-[#5B0101] p-4 rounded-full shadow-lg"
      >
        <FaShoppingCart className="text-xl" /> {/* Cart icon in #5B0101 */}
      </button>

      {/* Overlay for Cart and Order Details */}
      {showCart && (
        <div className="fixed inset-0 bg-[#BAA291] bg-opacity-90 flex items-start justify-center z-50 p-8">
          <div className="flex space-x-8">
            {/* Order Details with Tabs */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full overflow-hidden relative">
              {/* Strzałki nawigacyjne */}
              <button
                onClick={prevTab}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#5B0101] text-2xl font-bold"
              >
                &larr;
              </button>
              <button
                onClick={nextTab}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#5B0101] text-2xl font-bold"
              >
                &rarr;
              </button>

              {/* Dekoracyjne przyciski kółkowe */}
              <div className="flex justify-between mb-2 mt-2">
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    activeTab === "contact" ? "bg-[#5B0101]" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("contact")}
                  aria-label="Contact tab"
                />
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    activeTab === "delivery" ? "bg-[#5B0101]" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("delivery")}
                  aria-label="Delivery tab"
                />
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    activeTab === "payment" ? "bg-[#5B0101]" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("payment")}
                  aria-label="Payment tab"
                />
              </div>

              {/* Tab Content */}
              <div className="max-h-80 overflow-y-auto">
                {activeTab === "contact" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Contact Information
                    </h3>
                    <form className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Last Name"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Phone Number"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "delivery" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Delivery Information
                    </h3>
                    <form className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Country
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Country"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            State
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="State"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            City/Town
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="City/Town"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Postal Address
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Postal Address"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Payment Information
                    </h3>
                    <form className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Cardholder Name"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Card Number"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Expiration Date
                          </label>
                          <input
                            type="month"
                            className="w-full border-b-2 border-gray-300 p-2"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="w-96 bg-white p-4 rounded-lg shadow-lg h-96 relative">
              <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
              {!cart || cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  <div className="custom-scrollbar max-h-64 overflow-y-auto">
                    <ul className="space-y-4">
                      {localCart.map((item, index) => (
                        <li
                          key={item.product_id}
                          className="flex items-center bg-gray-100 p-4 rounded-lg"
                        >
                          <div className="w-16 h-16 flex-shrink-0 mr-4">
                            <img
                              src={
                                item.images[0] ||
                                "path/to/placeholder-image.jpg"
                              }
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-grow text-left">
                            <p className="font-semibold text-xl">{item.name}</p>
                            <p className="text-[#5B0101] font-bold mt-1">
                              Price: ${item.price}
                            </p>
                            <div className="flex items-center border border-black rounded-sm w-20 h-5 px-3 py-3 space-x-1">
                              <button
                                onClick={() =>
                                  handleQuantityChange(index, item.quantity - 1)
                                }
                                className="text-gray-700 text-lg"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    index,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="w-6 h-4 text-center text-lg outline-none appearance-none bg-transparent"
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(index, item.quantity + 1)
                                }
                                className="text-gray-700 text-lg"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div
                            className="text-right"
                            style={{ transform: "translateX(60px)" }}
                          >
                            <p className="text-green-600 font-semibold mb-1 -mt-12">
                              ${item.suma.toFixed(2)}
                            </p>
                          </div>
                          <div className="ml-4 mt-16">
                            <button
                              onClick={() =>
                                handleDeleteProduct(item.product_id)
                              }
                              className="text-[#5B0101] font-semibold text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold text-green-600">
                        Total: $
                        {localCart
                          .reduce((total, item) => total + item.suma, 0)
                          .toFixed(2)}
                      </h3>
                    </div> */}
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center justify-self-end">
                    <h3 className="text-lg font-semibold text-green-600">
                      Total: $
                      {localCart
                        .reduce((total, item) => total + item.suma, 0)
                        .toFixed(2)}
                    </h3>
                    <button
                      onClick={() => handleDeleteAll()}
                      className="bg-red-600 text-white px-4 rounded-md shadow-md hover:bg-red-700"
                    >
                      Delete All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => handleCartOpen()}
            className="absolute top-4 right-4 text-white font-semibold text-2xl"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
