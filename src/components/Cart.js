// export default Cart;
import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';

const Cart = () => {
  const { cart, loading, updateCart } = AuthData();
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    // Synchronizuj lokalny stan z koszykiem z kontekstu
    if (cart && cart.items) {
      const cartWithSums = cart.items.map(item => ({
        ...item,
        suma: item.price * item.quantity,
      }));
      setLocalCart(cartWithSums);
    }
  }, [cart]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...localCart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].suma = updatedCart[index].price * newQuantity;
    setLocalCart(updatedCart);

    // Wywołaj updateCart za każdym razem, gdy zmieni się ilość
    const updatedItems = updatedCart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));
    updateCart(updatedItems);
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {(!cart || cart.items.length === 0) ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {localCart && localCart.map((item, index) => (
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
          <h3>Total: ${localCart.reduce((total, item) => total + item.suma, 0).toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
