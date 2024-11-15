import { createContext, useContext, useState, useEffect} from "react";
import {addItemToTheCart, fetchProducts, getCart, getProfile, login, signup, updateCartItems} from '../services';
import Cookies from "js-cookie";
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem("user");
    return cachedUser ? JSON.parse(cachedUser) : { name: "", isAuthenticated: false, isAdmin: false };
  });
  
  const [cart, setCart] = useState({ items: [], total: 0.0 });
  const [loading, setLoading] = useState(true);
  const [token, setToken ] = useState(null)
  const [products, setProducts] = useState(null)

  const setAccessToken = (token) => {
    Cookies.set("access_token", token, { secure: true, sameSite: "Strict" });
  };

  const getAccessToken = () => Cookies.get("access_token");

  const setRefreshToken = (token) => {
    Cookies.set("refresh_token", token, { secure: true, sameSite: "Strict" });
  };

  const getRefreshToken = () => Cookies.get("refresh_token");
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

  const handleSignup = async (username, email, password, role = "user") => {
    const message = await signup(username, password, email, role);
    if (message) console.log("Signup successful:", message);
  };

  const handleLogin = async (username, password, email) => {
    const data = await login(username, password, email);
    
    if (data) {
      console.log("data:", data)
      setAccessToken(data.token);
      setToken(data.token)
      setRefreshToken(data.refresh_token);
      setUser({...data.user, isAuthenticated: true});
      localStorage.setItem("user", JSON.stringify({...data.user, isAuthenticated: true}));
      console.log("Login successful");
      console.log(user)
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
            setUser({name: profileData.username, isAdmin: profileData.role == "admin", isAuthenticated:true});
            localStorage.setItem("user", JSON.stringify({name: profileData.username,  isAuthenticated:true, isAdmin: profileData.role == "admin",}));
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
          const authenticatedUser = {
            name: profileData.username,
            isAdmin: profileData.role === "admin",
            isAuthenticated: true,
          };
    
          localStorage.setItem("user", JSON.stringify(authenticatedUser));
          setUser(authenticatedUser);
          setToken(token)
          console.log("User authenticated:", authenticatedUser);
        } else {
          console.log("Invalid or expired token");
          logout();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      }
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
useEffect(() => {
  checkAuthentication();
}, []);
// useEffect(()=>{
//   const cachedUser = localStorage.getItem("user");
//   if(cachedUser){
//     setUser(cachedUser)
//   }
// }, [])
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
