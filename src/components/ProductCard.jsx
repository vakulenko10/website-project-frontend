// import React from "react";
// import { AuthData } from "../auth/AuthWrapper";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Ikony gwiazdek

// const ProductCard = ({ product, handleEditProduct, handleDeleteProduct }) => {
//   const { user, addToCart } = AuthData();

//   const handleClick = (e) => {
//     e.preventDefault();
//     window.open(`/product/${product.id}`, "_blank");
//   };

//   const handleChildClick = (e) => {
//     e.stopPropagation(); // Prevent the parent onClick from being triggered
//   };

//   // Funkcja do generowania losowej liczby ocen w zakresie od 3.9 do 4.8
//   const generateRandomRating = () => {
//     return (Math.random() * (4.8 - 3.9) + 3.9).toFixed(1); // Losowa liczba między 3.9 a 4.8 z jednym miejscem po przecinku
//   };

//   // Nowa cena z dodaną losową liczbą
//   const randomDiscount = Math.floor(Math.random() * 10) + 1; // Losowa liczba między 1 a 10
//   const newPrice = product.price + randomDiscount;

//   // Funkcja do generowania gwiazdek na podstawie oceny
//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating); // Pełne gwiazdki
//     const halfStar = rating % 1 !== 0; // Pół gwiazdki, jeśli ocena nie jest liczbą całkowitą
//     const emptyStars = 5 - Math.ceil(rating); // Puste gwiazdki

//     let stars = [];
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
//     }
//     if (halfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
//     }
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
//     }

//     return stars;
//   };

//   // Losowa ocena dla produktu
//   const randomRating = generateRandomRating();

//   return (
//     <div
//       key={product.id}
//       className="product-card border-color3 transition group bg-text1 h-[400px] relative overflow-hidden rounded-lg" // Zaokrąglony kontener
//       onClick={handleClick}
//     >
//       {/* Product Image with rounded corners (górne i dolne) */}
//       <img
//         src={product.images[0]}
//         alt={product.name}
//         className="product-image w-full h-[60%] object-cover object-center rounded-t-lg rounded-b-lg group-hover:scale-105 transition"
//       />

//       {/* Attributes Container */}
//       <div className="attributesContainer p-3 bg-white rounded-b-lg flex flex-col justify-between h-[40%]">
//         {/* Product Name and Price */}
//         <div className="flex justify-between items-center">
//           <span className="text-black font-serif text-sm text-left">{product.name}</span>

//           {/* Stara cena - zielona i bez przekreślenia */}
//           <span className="text-green-600 font-bold text-lg">${product.price}</span>

//           {/* Nowa cena - czarna i przekreślona */}
//           <span className="text-black font-bold text-lg line-through">${newPrice}</span>
//         </div>

//         {/* Product Status */}
//         <div className="flex flex-col justify-start items-start my-2">
//           <span className="text-black text-xs font-serif">Status: {product.status}</span>
//         </div>

//         {/* Product Rating (gwiazdki i ocena w nawiasach) */}
//         <div className="flex items-center my-2">
//           <div className="flex">
//             {/* Wyświetlanie gwiazdek */}
//             {renderStars(randomRating)} 
//           </div>
//           {/* Wyświetlanie oceny w nawiasach */}
//           <span className="text-black text-xs ml-2">({randomRating})</span>
//         </div>

//         {/* Action Buttons */}
//         <div
//           className="action-buttons flex justify-start space-x-4 mt-4"
//           onClick={handleChildClick} // Prevent parent redirection
//         >
//           {user.isAuthenticated && (
//             <button
//               onClick={() => addToCart(product.id, 1)}
//               className="border border-black text-[#114B5F] px-4 py-2 rounded hover:bg-gray-200 transition"
//             >
//               <FaShoppingCart className="text-xl" />
//             </button>
//           )}
//           {user.isAdmin && (
//             <>
//               <button
//                 onClick={() => handleDeleteProduct(product.id)}
//                 className="border border-black text-black px-4 py-2 rounded hover:bg-gray-200 transition"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleEditProduct(product)}
//                 className="border border-black text-black px-4 py-2 rounded hover:bg-gray-200 transition"
//               >
//                 Edit
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { AuthData } from "../auth/AuthWrapper";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Ikony gwiazdek

const ProductCard = ({ product, handleEditProduct, handleDeleteProduct }) => {
  const { user, addToCart } = AuthData();

  const handleClick = (e) => {
    e.preventDefault();
    window.open(`/product/${product.id}`, "_blank");
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // Prevent the parent onClick from being triggered
  };

  // Funkcja do generowania losowej liczby ocen w zakresie od 3.9 do 4.8
  const generateRandomRating = () => {
    return (Math.random() * (4.8 - 3.9) + 3.9).toFixed(1); // Losowa liczba między 3.9 a 4.8 z jednym miejscem po przecinku
  };

  // Nowa cena z dodaną losową liczbą
  const randomDiscount = Math.floor(Math.random() * 10) + 1; // Losowa liczba między 1 a 10
  const newPrice = product.price + randomDiscount;

  // Obliczanie procentu oszczędności
  const savingsPercentage = ((product.price - newPrice) / product.price) * 100;

  // Funkcja do generowania gwiazdek na podstawie oceny
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Pełne gwiazdki
    const halfStar = rating % 1 !== 0; // Pół gwiazdki, jeśli ocena nie jest liczbą całkowitą
    const emptyStars = 5 - Math.ceil(rating); // Puste gwiazdki

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  // Losowa ocena dla produktu
  const randomRating = generateRandomRating();

  // Funkcja obsługująca dodawanie do koszyka
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Zapobiegamy propagacji kliknięcia, aby nie uruchomić domyślnych akcji
    addToCart(product.id, 1); // Zakładając, że domyślnie dodajemy 1 produkt do koszyka
  };

  return (
    <div
      key={product.id}
      className="product-card border-color3 transition group bg-text1 h-[400px] relative overflow-hidden rounded-lg bg-bg6"
      onClick={handleClick}
    >
      {/* Product Image with rounded corners */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="product-image w-full h-[60%] object-cover object-center rounded-t-lg group-hover:scale-105 transition"
      />

      {/* Attributes Container */}
      <div className="attributesContainer p-3 bg-white rounded-b-lg flex flex-col justify-between h-[40%] relative">
        {/* Product Name and Price */}
        <div className="flex justify-between items-center">
          <span className="text-black font-serif text-sm text-left">{product.name}</span>

          {/* Stara cena - zielona */}
          <span className="text-green-600 font-bold text-lg">${product.price}</span>
        </div>

        {/* Nowa cena - czarna i poniżej */}
        <div className="flex justify-between items-center">
          <span className="text-black font-bold text-lg line-through">${newPrice}</span>

          {/* Procent oszczędności */}
          <span className="text-red-500 font-bold text-lg">
            {savingsPercentage.toFixed(2)}% Off
          </span>
        </div>

        {/* Product Status */}
        <div className="flex flex-col justify-start items-start my-2">
          <span className="text-black text-xs font-serif">Status: {product.status}</span>
        </div>

        {/* Product Rating (gwiazdki i ocena w nawiasach) */}
        <div className="flex items-center my-2">
          <div className="flex">
            {/* Wyświetlanie gwiazdek */}
            {renderStars(randomRating)}
          </div>
          {/* Wyświetlanie oceny w nawiasach */}
          <span className="text-black text-xs ml-2">({randomRating})</span>

          {/* Koszyk na prawo od gwiazdek */}
          <button
            onClick={handleAddToCart} // Wywołanie funkcji obsługującej dodawanie do koszyka
            className="border border-black text-[#114B5F] px-2 py-1 text-xs rounded hover:bg-gray-200 transition ml-4"
          >
            <FaShoppingCart className="text-lg" />
          </button>
        </div>

        {/* Action Buttons (Delete and Edit buttons on the right) */}
        <div
          className="action-buttons flex justify-end space-x-2 mt-2 absolute top-14 right-0"
          onClick={handleChildClick} // Prevent parent redirection
        >
          {user.isAdmin && (
            <>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="border border-black text-black px-2 py-1 text-xxs rounded hover:bg-gray-200 transition"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditProduct(product)}
                className="border border-black text-black px-2 py-1 text-xxs rounded hover:bg-gray-200 transition"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

