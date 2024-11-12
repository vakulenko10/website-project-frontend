// import React, { useEffect, useState } from 'react';
// import { AuthData } from '../auth/AuthWrapper';
// import { deleteProductFromCart } from '../services/cartAPI';
// import './Cart.css';

// const Cart = () => {
//   const { cart, loading, updateCart, products, token } = AuthData();
//   const [localCart, setLocalCart] = useState([]);

//   const getProductDetailsForCart = (cartItems, allProducts) => {
//     return cartItems.map(cartItem => {
//       const productDetails = allProducts.find(product => product.id === cartItem.product_id);
//       return {
//         ...cartItem,
//         images: productDetails?.images || [],
//         name: productDetails?.name || 'Unknown Product',
//       };
//     });
//   };

//   useEffect(() => {
//     if (cart && cart.items && products) {
//       const cartWithDetails = getProductDetailsForCart(cart.items, products);
//       const detailedCart = cartWithDetails.map(item => ({
//         ...item,
//         suma: item.price * item.quantity,
//       }));
//       setLocalCart(detailedCart);
//     }
//   }, [cart, products]);

//   const handleQuantityChange = (index, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updatedCart = [...localCart];
//     updatedCart[index].quantity = newQuantity;
//     updatedCart[index].suma = updatedCart[index].price * newQuantity;
//     setLocalCart(updatedCart);

//     const updatedItems = updatedCart.map(item => ({
//       product_id: item.product_id,
//       quantity: item.quantity,
//       images: item.images,
//       name: item.name,
//     }));
//     updateCart(updatedItems);
//   };

//   const handleDeleteProduct = async (productId) => {
//     const response = await deleteProductFromCart(token, productId);
//     if (!response.error) {
//       const updatedCart = localCart.filter(item => item.product_id !== productId);
//       setLocalCart(updatedCart);
//       updateCart(updatedCart.map(item => ({ product_id: item.product_id, quantity: item.quantity })));
//     } else {
//       console.error('Failed to remove product:', response.error);
//     }
//   };

//   if (loading) return <p>Loading cart...</p>;

//   return (
//     <div className="flex bg-[#BAA291] min-h-screen p-6">
//       <div className="flex-grow">
//         <h2 className="text-2xl font-semibold">Your Order Details</h2>
//       </div>

//       <div className="w-96 bg-white p-4 rounded-lg shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        
//         {(!cart || cart.items.length === 0) ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             <ul className="space-y-4">
//               {localCart.map((item, index) => (
//                 <li key={item.product_id} className="flex items-center bg-gray-100 p-4 rounded-lg">
//                   <div className="w-16 h-16 flex-shrink-0 mr-4">
//                     <img 
//                       src={item.images[0] || 'path/to/placeholder-image.jpg'} 
//                       alt={item.name} 
//                       className="w-full h-full object-cover rounded-md" 
//                     />
//                   </div>
//                   <div className="flex-grow text-left">
//                     <p className="font-semibold text-xl ">{item.name}</p>
//                     <p className="text-[#5B0101] font-bold mt-1">Price: ${item.price}</p>
//                     <div className="flex items-center border border-black rounded-sm w-20 h-5 px-3 py-3 space-x-1"> {/* Reduced width of the frame */}
//                       <button 
//                         onClick={() => handleQuantityChange(index, item.quantity - 1)} 
//                         className="text-gray-700 text-lg ">
//                         -
//                       </button>
//                       <input 
//                         type="number"
//                         min="1"
//                         value={item.quantity}
//                         onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
//                         className="w-6 h-4 text-center text-lg outline-none appearance-none bg-transparent" /> {/* Reduced size of the input */}
//                       <button 
//                         onClick={() => handleQuantityChange(index, item.quantity + 1)} 
//                         className="text-gray-700 text-lg ">
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <div className="text-right" style={{ transform: 'translateX(60px)' }}>
//                     <p className="text-green-600 font-semibold mb-1 -mt-12">${item.suma.toFixed(2)}</p>
//                   </div>
//                   {/* Delete Button added on the left side inside the product item */}
//                   <div className="ml-4 mt-16"> {/* Added margin top to move button down */}
//                     <button 
//                       onClick={() => handleDeleteProduct(item.product_id)} 
//                       className="text-[#5B0101] font-semibold text-sm">
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <div className="border-t pt-4">
//               <h3 className="text-lg font-semibold text-green-600">
//                 Total: ${localCart.reduce((total, item) => total + item.suma, 0).toFixed(2)}
//               </h3>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import Font Awesome icon from react-icons
import { AuthData } from '../auth/AuthWrapper';
import { deleteProductFromCart } from '../services/cartAPI';
import './Cart.css';

const Cart = () => {
  const { cart, loading, updateCart, products, token } = AuthData();
  const [localCart, setLocalCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // State to manage the cart overlay visibility

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
    updateCart(updatedItems);
  };

  const handleDeleteProduct = async (productId) => {
    const response = await deleteProductFromCart(token, productId);
    if (!response.error) {
      const updatedCart = localCart.filter(item => item.product_id !== productId);
      setLocalCart(updatedCart);
      updateCart(updatedCart.map(item => ({ product_id: item.product_id, quantity: item.quantity })));
    } else {
      console.error('Failed to remove product:', response.error);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <button 
        onClick={() => setShowCart(true)} 
        className="fixed bottom-4 right-4 bg-[#BAA291] text-[#5B0101] p-4 rounded-full shadow-lg">
        <FaShoppingCart className="text-xl" /> {/* Cart icon in #5B0101 */}
      </button>

      {/* Overlay for Cart and Order Details */}
      {showCart && (
        <div className="fixed inset-0 bg-[#BAA291] bg-opacity-90 flex items-start justify-center z-50 p-8">
          <div className="flex space-x-8">
            
            {/* Order Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
              <h2 className="text-2xl font-semibold mb-4">Your Order Details</h2>
              <p>Summary of your order and additional information.</p>
              {/* Additional Order Details content goes here */}
            </div>

            {/* Shopping Cart */}
            <div className="w-96 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
              {(!cart || cart.items.length === 0) ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
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
                              className="text-gray-700 text-lg">
                              -
                            </button>
                            <input 
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                              className="w-6 h-4 text-center text-lg outline-none appearance-none bg-transparent" />
                            <button 
                              onClick={() => handleQuantityChange(index, item.quantity + 1)} 
                              className="text-gray-700 text-lg">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right" style={{ transform: 'translateX(60px)' }}>
                          <p className="text-green-600 font-semibold mb-1 -mt-12">${item.suma.toFixed(2)}</p>
                        </div>
                        <div className="ml-4 mt-16">
                          <button 
                            onClick={() => handleDeleteProduct(item.product_id)} 
                            className="text-[#5B0101] font-semibold text-sm">
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-green-600">
                      Total: ${localCart.reduce((total, item) => total + item.suma, 0).toFixed(2)}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setShowCart(false)} 
            className="absolute top-4 right-4 text-white font-semibold text-2xl">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
