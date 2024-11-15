import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  addItemToTheCart,
  getCart,
  login,
  signup,
  fetchProducts,
  getProfile,
  updateCartItems,
} from "../services";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem("user");
    return cachedUser
      ? JSON.parse(cachedUser)
      : { name: "", isAuthenticated: false, isAdmin: false };
  });

  const [cart, setCart] = useState(() => {
    const cachedCart = localStorage.getItem("cart");
    return cachedCart ? JSON.parse(cachedCart) : { items: [], total: 0.0 };
  });

  const [products, setProducts] = useState(() => {
    const cachedProducts = localStorage.getItem("products");
    return cachedProducts ? JSON.parse(cachedProducts) : null;
  });

  // Cookie functions
  const setAccessToken = (token) => {
    Cookies.set("access_token", token, { secure: true, sameSite: "Strict" });
  };

  const getAccessToken = () => Cookies.get("access_token");

  const setRefreshToken = (token) => {
    Cookies.set("refresh_token", token, { secure: true, sameSite: "Strict" });
  };

  const getRefreshToken = () => Cookies.get("refresh_token");

  // Refresh token logic
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/refresh", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const { access_token } = await response.json();
        setAccessToken(access_token);
        console.log("Access token refreshed");
      } else {
        console.log("Failed to refresh token");
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // Authentication functions
  const handleSignup = async (username, email, password, role = "user") => {
    const message = await signup(username, password, email, role);
    if (message) console.log("Signup successful:", message);
  };

  const handleLogin = async (username, password, email) => {
    const data = await login(username, password, email);
    if (data) {
      setAccessToken(data.token);
      setRefreshToken(data.refresh_token);
      const authenticatedUser = { ...data.user, isAuthenticated: true };
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      console.log("Login successful");
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
          setUser({ ...profileData, isAuthenticated: true });
          localStorage.setItem("user", JSON.stringify(profileData));
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
    checkAuthentication();
  }, []);

  useEffect(() => {
    fetchDataIfNeeded();
  }, [user.isAuthenticated]);

  // Fetch products on initial load (independent of user authentication)
  useEffect(() => {
    fetchAndCacheProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshAccessToken, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Check authentication on initial load
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
        const authenticatedUser = { ...profileData, isAuthenticated: true };
        setUser(authenticatedUser);
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        console.log("User authenticated");
      } else {
        console.log("Invalid or expired token");
        logout();
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      logout();
    }
  };

  const addToCart = (productId, quantity) => {
    const token = getAccessToken();
  
    // Step 1: Update localStorage and UI immediately
    const existingCart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0.0 };
  
    // Ensure existingCart.items is an array
    if (!Array.isArray(existingCart.items)) {
      existingCart.items = [];
    }
  
    // Check if the product already exists in the cart
    const itemIndex = existingCart.items.findIndex((item) => item.productId === productId);
  
    if (itemIndex > -1) {
      // Increment the quantity if the item exists
      existingCart.items[itemIndex].quantity += quantity;
    } else {
      // Add the new item
      existingCart.items.push({ productId, quantity });
    }
  
    // Update localStorage and UI state
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
    console.log('Cart updated locally');
  
    // Step 2: Push changes to backend after a delay
    if (token) {
      setTimeout(async () => {
        try {
          const backendUpdatedCart = await updateCartItems(existingCart.items, token);
          if (backendUpdatedCart) {
            console.log('Backend cart updated successfully:', backendUpdatedCart);
            setCart(backendUpdatedCart); // Sync with backend response
          } else {
            console.log('Backend update failed');
          }
        } catch (error) {
          console.error('Error updating backend cart:', error);
        }
      }, 3000); // 3-second delay
    } else {
      console.log('No token found. Backend update skipped.');
    }
  };
  
  const updateCart = (updatedItems) => {
    const token = getAccessToken();
  
    // Ensure the updated items are valid
    if (!Array.isArray(updatedItems)) {
      console.error('Invalid cart items:', updatedItems);
      return;
    }
  
    // Step 1: Update the cart in localStorage and state immediately
    const updatedCart = { ...cart, items: updatedItems };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    console.log('Cart updated locally');
  
    // Step 2: Push changes to backend after a delay
    if (token) {
      setTimeout(async () => {
        try {
          const backendUpdatedCart = await updateCartItems(updatedItems, token);
          if (backendUpdatedCart) {
            console.log('Backend cart updated successfully:', backendUpdatedCart);
            setCart(backendUpdatedCart); // Sync with backend response
          } else {
            console.log('Backend update failed');
          }
        } catch (error) {
          console.error('Error updating backend cart:', error);
        }
      }, 3000); // 3-second delay
    } else {
      console.log('No token found. Backend update skipped.');
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        handleLogin,
        handleSignup,
        cart,
        updateCart,
        addToCart,
        products,
        setProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
