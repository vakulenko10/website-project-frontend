import { createContext, useContext, useState, useEffect } from "react";
import { addItemToTheCart, fetchProducts, getCart, getProfile, login, signup, updateCartItems } from '../services';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { refreshAccessToken } from "../services/authAPI";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem("user");
    return cachedUser ? JSON.parse(cachedUser) : { name: "", isAuthenticated: false, isAdmin: false };
  });

  const [cart, setCart] = useState({ items: [], total: 0.0 });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState(null);
  const [refreshTimeout, setRefreshTimeout] = useState(null);
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);

  const setAccessToken = (newToken) => {
    Cookies.set("access_token", newToken, { secure: true, sameSite: "Strict" });
    setToken(newToken);
    scheduleTokenRefresh(newToken); // Schedule refresh whenever a new token is set
  };

  const getAccessToken = () => Cookies.get("access_token");

  const setRefreshToken = (token) => {
    Cookies.set("refresh_token", token, { secure: true, sameSite: "Strict" });
  };

  const getRefreshToken = () => Cookies.get("refresh_token");

  const scheduleTokenRefresh = (token) => {
    if (refreshTimeout) clearTimeout(refreshTimeout);

    try {
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp * 1000;
      const refreshTime = expiresAt - Date.now() - 20 * 1000; // Show prompt 20 seconds before expiry

      if (refreshTime > 0) {
        const timeout = setTimeout(() => {
          console.warn("Token is near expiry; showing refresh prompt");
          setShowRefreshPrompt(true); // Show the refresh prompt
        }, refreshTime);
        setRefreshTimeout(timeout);
      }
    } catch (error) {
      console.error("Error decoding token for refresh scheduling:", error);
      logout();
    }
  };

  const handleManualRefresh = async () => {
    try {
      const newToken = await refreshAccessToken(getRefreshToken());
      if (newToken) {
        setAccessToken(newToken);
        setShowRefreshPrompt(false);
        console.log("Token refreshed successfully");
      } else {
        console.log("Failed to manually refresh token");
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token manually:", error);
      logout();
    }
  };

  const handleSignup = async (username, email, password, role = "user") => {
    const message = await signup(username, password, email, role);
    if (message) console.log("Signup successful:", message);
  };

  const handleLogin = async (username, password, email) => {
    const data = await login(username, password, email);

    if (data) {
      console.log("data:", data);
      setAccessToken(data.token);
      setToken(data.token);
      setRefreshToken(data.refresh_token);
      console.log("refresh_token:", data.refresh_token);
      setUser({ ...data.user, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify({ ...data.user, isAuthenticated: true }));
      console.log("Login successful");
      console.log(user);
    } else {
      console.log("Login failed");
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    // Preserve products in localStorage
    const cachedProducts = localStorage.getItem("products");

    // Clear all user-related data but keep products
    localStorage.clear();

    // Restore products if they were cached
    if (cachedProducts) {
      localStorage.setItem("products", cachedProducts);
    }

    setUser({ name: "", isAuthenticated: false, isAdmin: false });
    setCart({ items: [], total: 0.0 });
    console.log("Logged out, but products are preserved");
  };

  // Fetch and store products in local storage
  const fetchAndCacheProducts = async () => {
    try {
      const productsData = await fetchProducts();
      if (productsData) {
        setProducts(productsData);
        localStorage.setItem("products", JSON.stringify(productsData));
        console.log("Products fetched and cached");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user profile and cart data if needed
  const fetchDataIfNeeded = async () => {
    const token = getAccessToken();

    if (user.isAuthenticated) {
      if (!user.name) {
        const profileData = await getProfile(token);
        if (profileData) {
          setUser({ name: profileData.username, isAdmin: profileData.role == "admin", isAuthenticated: true });
          localStorage.setItem("user", JSON.stringify({ name: profileData.username, isAuthenticated: true, isAdmin: profileData.role == "admin" }));
        }
      }

      if (cart.length === 0) {
        const cartData = await getCart(token);
        if (cartData) {
          setCart(cartData);
          localStorage.setItem("cart", JSON.stringify(cartData));
        }
      }
    }
  };

  // Initial effects
  useEffect(() => {
    fetchDataIfNeeded();
  }, [user.isAuthenticated]);

  // Fetch products on initial load (independent of user authentication)
  useEffect(() => {
    fetchAndCacheProducts();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    const data = await getCart(token);
    if (data) {
      setCart(data);
    } else {
      console.log('error fetching cart,', data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getAccessToken();
      if (!token) {
        logout();
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const profileData = await response.json();
          setUser({
            name: profileData.username,
            isAdmin: profileData.role === "admin",
            isAuthenticated: true,
          });
        } else {
          console.log("Invalid or expired token");
          setShowRefreshPrompt(true); // Show prompt on token expiry
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      }
    };

    checkAuthentication();
  }, []);

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
        return data;
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
    <AuthContext.Provider value={{ user, logout, handleLogin, handleSignup, cart, loading, addToCart, fetchCart, updateCart, token, setToken, products, setProducts }}>
      {showRefreshPrompt && (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }} className="h-screen flex-col flex items-center justify-center absolute bottom-0 z-1000">
          <p>Your session is about to expire. Please refresh your token.</p>
          <button onClick={handleManualRefresh}>Refresh Token</button>
          <button onClick={() => { setShowRefreshPrompt(false); logout(); }}>Logout</button>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};
