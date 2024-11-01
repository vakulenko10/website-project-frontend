import React, { useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';

const Cart = () => {
  const { cart, loading, updateCart } = AuthData();
  const [localCart, setLocalCart] = useState(cart.items);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...localCart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].suma = updatedCart[index].price * newQuantity;
    setLocalCart(updatedCart);
  };

  const handleUpdateCart = () => {
    const updatedItems = localCart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));
    updateCart(updatedItems);  // Call updateCart from AuthContext
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {!cart.items ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {localCart.map((item, index) => (
              <li key={item.product_id}>
                <span>Product ID: {item.product_id}</span>
                <span>Price per item: ${item.price}</span>
                <span>Total: ${item.suma.toFixed(2)}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
              </li>
            ))}
          </ul>
          <button onClick={handleUpdateCart}>Update Cart</button>
          <h3>Total: ${cart.total}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
