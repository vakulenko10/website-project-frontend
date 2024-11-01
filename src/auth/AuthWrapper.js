import { createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false, isAdmin: false });
  const [cart, setCart] = useState({ items: [], total: 0.0 });
  const [loading, setLoading] = useState(true);
  const handleSignup = async (username, email, password, role = 'user') => {
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          role: role,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data.message);
        // Optionally, you could log the user in immediately or navigate to login
      } else {
        console.log('Signup failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.log('Failed to sign up. Please try again.');
    }
  };
  
  const handleLogin = async (username, password, email) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('jwt', data.access_token); // Store JWT in localStorage
        console.log("Login successful", "JWT token:", data.access_token);

        // Check if the user is admin from the response data
        const isAdmin = data.role === 'admin'; // Adjust based on your API response structure

        setUser({ name: data.name || username, isAuthenticated: true, isAdmin : isAdmin});
      } else {
        console.log('Login failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.log('Failed to login. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt'); // Clear the JWT on logout
    setUser({ name: "", isAuthenticated: false, isAdmin: false });
  };
  const fetchCart = async () => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:5000/cart', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        const data = await response.json();
        setCart(data);
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
    setLoading(false);
};

// Add item to cart function
const addToCart = async (productId, quantity) => {
    try {
        const response = await fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ product_id: productId, quantity })
        });
        console.log(response)
        if (response.ok) {
            const updatedCart = await response.json();
            console.log("updatedCart:",updatedCart)
            setCart(updatedCart.cart);
        } else {
            const errorData = await response.json();
            console.error('Error adding to cart:', errorData);
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

useEffect(() => {
    fetchCart();
}, []);
const updateCart = async (updatedItems) => {
  try {
    const response = await fetch('http://localhost:5000/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ items: updatedItems }),
    });

    if (response.ok) {
      const updatedCart = await response.json();
      setCart(updatedCart.cart);
    } else {
      const errorData = await response.json();
      console.error('Error updating cart:', errorData);
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

useEffect(() => {
  fetchCart();
}, []);
  return (
    <AuthContext.Provider value={{ user, logout, handleLogin, handleSignup, cart, loading, addToCart, fetchCart, updateCart }}>
      {children}
    </AuthContext.Provider>
  );
};
