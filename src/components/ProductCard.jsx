import React from "react";
import { AuthData } from "../auth/AuthWrapper";
import { FaShoppingCart } from "react-icons/fa";
import { useCursor } from "./CursorWrapper";
// import { Link } from 'react-router-dom';

const ProductCard = ({ product, handleEditProduct, handleDeleteProduct }) => {
  const { user, addToCart } = AuthData();
  const { updateCursorData } = useCursor(); 

  const handleClick = (e) => {
    e.preventDefault();
    window.open(`/product/${product.id}`, "_blank");
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // Prevent the parent onClick from being triggered
  };
  const handleMouseEnter = () => {
    updateCursorData(`click`);
  };

  // Handle mouse leave to clear cursor data
  const handleMouseLeave = () => {
    updateCursorData(null);
  };

  return (
    <div
      key={product.id}
      className="product-card border-color3 transition group bg-text1 h-[400px] relative overflow-hidden"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="product-image w-full h-full absolute inset-0 object-cover object-end z-0 group-hover:scale-105 transition"
      />

      {/* Attributes Container */}
      <div
        className="attributesContainer absolute bottom-0 left-0 w-full p-3 bg-color5 
        transform transition-all duration-300 group-hover:max-h-[60%] max-h-[20%] overflow-hidden"
      >
        {/* Product Name and Price */}
        <div className="flex justify-between items-center">
          <span className="text-text1 font-serif text-xs text-left">{product.name}</span>
          <span className="text-text1 font-bold">${product.price}</span>
        </div>
        <div className=" flex flex-col justify-start items-start opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-text1 text-xs font-serif my-1">
            status: {product.status}
          </span>
        </div>
        {/* Action Buttons (hidden by default) */}
        <div
          className="action-buttons flex justify-around mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleChildClick} // Prevent parent redirection
        >
          {/* <Link
            to={`/product/${product.id}`}
            target="_blank"
            className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
          >
            Open
          </Link> */}
          {user.isAuthenticated && (
            <button
              onClick={() => addToCart(product.id, 1)}
              className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
            >
              <FaShoppingCart className="text-xl" />
            </button>
          )}
          {user.isAdmin && (
            <>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
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
