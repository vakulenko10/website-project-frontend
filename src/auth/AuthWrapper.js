import { createContext, useContext, useState, useEffect} from "react";
import {addItemToTheCart, getCart, login, signup, updateCartItems} from '../services';
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false, isAdmin: false });
  const [cart, setCart] = useState({ items: [], total: 0.0 });
  const [loading, setLoading] = useState(true);
  const [token, setToken ] = useState(null)
  const [products, setProducts] = useState(null)
  const handleSignup = async (username, email, password, role = 'user') => {
    const message = await signup(username, password, email, role);
    if (message) {
      console.log("Signup successful:", message);
      // Optional: Log in the user or redirect to the login page
    }
  };
  
  const handleLogin = async (username, password, email) => {
    const data = await login(username, password, email);
    if (data) {
      setToken(data.token);
      setUser(data.user);
    } else {
      console.log("Login failed");
    }
  };

  const logout = () => {
    setToken(null)
    // localStorage.removeItem('jwt'); // Clear the JWT on logout
    setUser({ name: "", isAuthenticated: false, isAdmin: false });
  };
  const fetchCart = async () => {
    setLoading(true);
    const data = await getCart(token)
    if(data){
      setCart(data)
    }
    else{
      console.log('error fetching cart,', data)
    }
    setLoading(false);
};

// Add item to cart function
const addToCart = async (productId, quantity) => {
  try {
      const data = await addItemToTheCart(productId, quantity, token);
      if (data) {
          console.log("Item added to cart:", data);
          await fetchCart(); // Refetch the cart
      } else {
          console.log('Error adding to cart:', data);
      }
  } catch (error) {
      console.error('Error adding item to cart:', error);
  }
};


const updateCart = async (updatedItems) => {
  try {
      const data = await updateCartItems(updatedItems, token);
      if (data) {
          console.log("Cart updated:", data);
          await fetchCart(); // Refetch the cart
      } else {
          console.log('Error updating the cart:', data);
      }
  } catch (error) {
      console.error('Error updating cart:', error);
  }
};


useEffect(() => {
  if (token) {
      fetchCart();
  }
}, [token]);
  return (
    <AuthContext.Provider value={{ user, logout, handleLogin, handleSignup, cart, loading, addToCart, fetchCart, updateCart, token, setToken, products, setProducts}}>
      {children}
    </AuthContext.Provider>
  );
};
