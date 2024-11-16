// import React, { useEffect, useRef } from 'react';
// import './ProductList.css';
// import { deleteProductFromCart } from '../services/cartAPI';

// const ProductList = ({ cart, updateCart, token }) => {
//   const isMobile = window.innerWidth <= 640;
//   const productHeight = isMobile ? 50 : 100; // Wysokość produktu: mniejsze wartości dla trybu komórkowego
//   const visibleProducts = 4; // Liczba widocznych produktów przed przewijaniem
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     let interval;

//     if (container) {
//       const scrollContent = () => {
//         const maxScrollTop = container.scrollHeight - container.clientHeight;
//         if (container.scrollTop >= maxScrollTop) {
//           container.scrollTop = 0;
//         } else {
//           container.scrollTop += productHeight;
//         }
//       };

//       interval = setInterval(scrollContent, 2000); // Ustawienia czasu przewijania

//       container.addEventListener('mouseenter', () => clearInterval(interval));
//       container.addEventListener('mouseleave', () => {
//         interval = setInterval(scrollContent, 2000);
//       });

//       return () => clearInterval(interval);
//     }
//   }, [productHeight, cart.length]);

//   // Funkcja do usuwania produktu z koszyka
//   const handleDeleteProduct = async (productId) => {
//     const response = await deleteProductFromCart(token, productId);
//     if (!response.error) {
//       const updatedCart = cart.filter(item => item.product_id !== productId);
//       updateCart(updatedCart);
//     } else {
//       console.error('Failed to remove product:', response.error);
//     }
//   };

//   return (
//     <div className={`common-container ${isMobile ? 'mobile' : 'desktop'} bg-white p-2 sm:p-4 rounded-lg shadow-lg relative flex flex-col mb-8 sm:mb-0`}>
//       <h2 className={`text-lg sm:text-xl font-bold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="flex flex-col flex-grow" ref={containerRef}>
//           <div
//             className="flex-grow overflow-y-auto space-y-2 hide-scrollbar relative"
//             style={{
//               maxHeight: `${productHeight * visibleProducts}px`,  // wysokość zależna od liczby widocznych produktów
//             }}
//           >
//             <div className="product-container space-y-2" style={{ minHeight: `${productHeight * cart.length}px` }}>
//               {cart.map((item) => (
//                 <div key={item.product_id} className="flex items-center bg-gray-100 p-2 rounded-lg sm:space-x-4 space-x-1 sm:space-y-0 space-y-1 sm:flex-row flex-col">
//                   <img src={item.images[0]} alt={item.name} className="w-12 h-12 sm:w-12 sm:h-12" />
//                   <div className="flex-grow text-left">
//                     <p className="font-semibold text-xs sm:text-base">{item.name}</p>
//                     <p className="text-[#5B0101] font-bold mt-1 text-xs sm:text-base">Price: ${item.price}</p>
//                     <p className="text-[#5B0101] font-bold mt-1 text-xs sm:text-base">
//                       Total: ${(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>

//                   <div className="ml-1 sm:ml-2 flex items-center space-x-1">
//                     <button
//                       onClick={() => updateCart(cart.map((prod) => 
//                         prod.product_id === item.product_id 
//                           ? { ...prod, quantity: prod.quantity - 1 }
//                           : prod
//                       ))}
//                       disabled={item.quantity <= 1}
//                       className="text-[#5B0101] font-semibold text-xs sm:text-sm border p-1 rounded"
//                     >
//                       -
//                     </button>
//                     <span className="text-xs sm:text-sm">{item.quantity}</span>
//                     <button
//                       onClick={() => updateCart(cart.map((prod) => 
//                         prod.product_id === item.product_id 
//                           ? { ...prod, quantity: prod.quantity + 1 }
//                           : prod
//                       ))}
//                       className="text-[#5B0101] font-semibold text-xs sm:text-sm border p-1 rounded"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="ml-1 sm:ml-2">
//                     <button
//                       onClick={() => handleDeleteProduct(item.product_id)}
//                       className="text-[#5B0101] font-semibold text-xs sm:text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="border-t pt-2 mt-auto">
//             <h3 className="text-xs sm:text-lg font-semibold text-green-600">
//               Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
//             </h3>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;
import React, { useEffect, useRef } from 'react';
import './ProductList.css';
import { deleteProductFromCart } from '../services/cartAPI';

const ProductList = ({ cart, updateCart, token }) => {
  const isMobile = window.innerWidth <= 640;
  const productHeight = isMobile ? 50 : 60; // Wysokość produktu: mniejsze wartości dla trybu komórkowego
  const visibleProducts = 4; // Liczba widocznych produktów przed przewijaniem
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let interval;

    if (container) {
      const scrollContent = () => {
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        if (container.scrollTop >= maxScrollTop) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += productHeight;
        }
      };

      interval = setInterval(scrollContent, 2000); // Ustawienia czasu przewijania

      container.addEventListener('mouseenter', () => clearInterval(interval));
      container.addEventListener('mouseleave', () => {
        interval = setInterval(scrollContent, 2000);
      });

      return () => clearInterval(interval);
    }
  }, [productHeight, cart.length]);

  // Funkcja do usuwania produktu z koszyka
  const handleDeleteProduct = async (productId) => {
    const response = await deleteProductFromCart(token, productId);
    if (!response.error) {
      const updatedCart = cart.filter(item => item.product_id !== productId);
      updateCart(updatedCart);
    } else {
      console.error('Failed to remove product:', response.error);
    }
  };

  return (
    <div className={`common-container ${isMobile ? 'mobile' : 'desktop'} bg-white p-2 sm:p-4 rounded-lg shadow-lg relative flex flex-col mb-8 sm:mb-0`}>
      <h2 className={`text-lg sm:text-xl font-bold mb-4 ${isMobile ? 'text-xl' : 'text-lg'}`}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col flex-grow" ref={containerRef}>
          <div
            className="flex-grow overflow-y-auto space-y-2 hide-scrollbar relative"
            style={{
              maxHeight: `${productHeight * visibleProducts}px`,  // wysokość zależna od liczby widocznych produktów
            }}
          >
            <div className="product-container space-y-2" style={{ minHeight: `${productHeight * cart.length}px` }}>
              {cart.map((item) => (
                <div key={item.product_id} className="flex items-center bg-gray-100 p-2 rounded-lg sm:space-x-4 space-x-1 sm:space-y-0 space-y-1 sm:flex-row flex-col">
                  <img src={item.images[0]} alt={item.name} className="w-12 h-12 sm:w-12 sm:h-12" />
                  <div className="flex-grow text-left">
                    <p className="font-semibold text-xs sm:text-sm">{item.name}</p>
                    <p className="text-[#5B0101] font-bold mt-1 text-sm sm:text-base">Price: ${item.price}</p>
                    <p className="text-[#5B0101] font-bold mt-1 text-sm sm:text-base">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="ml-1 sm:ml-2 flex items-center space-x-1">
                    <button
                      onClick={() => updateCart(cart.map((prod) => 
                        prod.product_id === item.product_id 
                          ? { ...prod, quantity: prod.quantity - 1 }
                          : prod
                      ))}
                      disabled={item.quantity <= 1}
                      className="text-[#5B0101] font-semibold text-sm sm:text-sm border p-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-sm sm:text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateCart(cart.map((prod) => 
                        prod.product_id === item.product_id 
                          ? { ...prod, quantity: prod.quantity + 1 }
                          : prod
                      ))}
                      className="text-[#5B0101] font-semibold text-sm sm:text-sm border p-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <div className="ml-1 sm:ml-2">
                    <button
                      onClick={() => handleDeleteProduct(item.product_id)}
                      className="text-[#5B0101] font-semibold text-sm sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-2 mt-auto">
            <h3 className="text-sm sm:text-lg font-semibold text-green-600">
              Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
