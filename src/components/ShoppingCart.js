import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { deleteAllProductsFromCart, deleteProductFromCart } from '../services/cartAPI';
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
const ShoppingCart = () => {
    const { cart, updateCart, products, token } = AuthData();
  const [localCart, setLocalCart] = useState([]);
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
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(localCart));
  }, [localCart])
  
  return (
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
  )
}

export default ShoppingCart