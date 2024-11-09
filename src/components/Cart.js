import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import './Cart.css';

const Cart = () => {
  const { cart, loading, updateCart } = AuthData();
  const [localCart, setLocalCart] = useState([]);

  // Funkcja pomocnicza do uzyskania URL zdjęcia na podstawie product_id
  const getImageByProductId = (productId) => {
    const product = cart.items.find(item => item.product_id === productId);
    if (product && product.images && product.images.length > 0) {
      return product.images[0].url; // Zakładam, że chcemy pierwszy URL zdjęcia
    }
    return ''; // Zwracamy pusty string, jeśli brak zdjęcia
  };

  useEffect(() => {
    if (cart && cart.items) {
      // Mapowanie elementów koszyka z dodatkowymi informacjami (w tym URL zdjęcia)
      const cartWithDetails = cart.items.map(item => ({
        ...item,
        suma: item.price * item.quantity,
        // Używamy funkcji do uzyskania URL zdjęcia na podstawie product_id
        images: getImageByProductId(item.product_id),
        name: item.name, // Nazwa produktu
      }));
      setLocalCart(cartWithDetails);
    }
  }, [cart]);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return; // Zabezpieczenie przed złą ilością
    const updatedCart = [...localCart];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].suma = updatedCart[index].price * newQuantity;
    setLocalCart(updatedCart);

    const updatedItems = updatedCart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      images: item.images, // Link do zdjęcia produktu
      name: item.name, // Nazwa produktu
    }));
    updateCart(updatedItems);
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-wrapper">
      <div className="cart-left">
        <h2>Your Order Details</h2>
        {/* Możesz dodać więcej szczegółów po lewej stronie */}
      </div>

      <div className="cart-right">
        <div className="cart-background">
          <h2>Shopping Cart</h2>
          {(!cart || cart.items.length === 0) ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul className="cart-items">
                {localCart.map((item, index) => (
                  <li key={item.product_id} className="cart-item">
                    <div className="cart-item-image">
                      {/* Wyświetlanie zdjęcia produktu lub domyślnego zdjęcia */}
                      <img src={item.images || 'path/to/placeholder-image.jpg'} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price"> ${item.price}</p>
                      <p className="cart-item-total">Total: ${item.suma.toFixed(2)}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                      <input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                        className="quantity-input"
                      />
                      <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <h3>Total: ${localCart.reduce((total, item) => total + item.suma, 0).toFixed(2)}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
