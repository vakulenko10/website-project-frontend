// ProductList.js
import React from 'react';
import { AuthData } from './contexts/AuthWrapper';

const ProductList = ({ products }) => {
    const { addToCart } = AuthData();

    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.map((product) => (
                <div key={product.id} className="product">
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
