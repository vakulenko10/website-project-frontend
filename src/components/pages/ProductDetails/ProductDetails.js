import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../../services/productAPI'; // Assume this API call exists

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetchProductById(id); // Fetch product details by ID
      setProduct(productData[0]);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail bg-bg5 min-h-screen py-8">
      <h1 className="text-3xl font-display">{product.name}</h1>
      <img
        src={product.images[0]}
        alt={product.name}
        className="product-image"
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Material: {product.material}</p>
      <p>Color: {product.color}</p>
    </div>
  );
};

export default ProductDetails;
