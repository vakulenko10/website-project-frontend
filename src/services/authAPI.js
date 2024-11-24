export const signup = async (username, password, email, role = 'user') => {
    try {
      const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, role }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data.message);
        return data.message;
      } else {
        console.error('Signup failed:', data.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
export const login = async (username, password, email) =>{
    try {
        const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
          credentials: 'include', 
        });
  
        const data = await response.json();
        if (response.ok) {
        //   setToken(data.access_token)
          // localStorage.setItem('jwt', data.access_token); // Store JWT in localStorage
        //   console.log("Login successful", "JWT token:", data.access_token);
  
        //   // Check if the user is admin from the response data
        const isAdmin = data.role === 'admin'; // Adjust based on your API response structure
  
        //   setUser({ name: data.name || username, isAuthenticated: true, isAdmin: isAdmin});
        return {user:{name: data.name || username, isAuthenticated: true, isAdmin: isAdmin}, token: data.access_token, refresh_token: data.refresh_token}
        } else {
          console.log('Login failed: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        console.log('Failed to login. Please try again.');
      }
}
export const getProfile = async (token) =>{
    try {
        const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token if necessary
          },  
          
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        return data
        // setProfileData(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // setLoading(false); // Ensure loading is stopped even if there's an error
      }
}

export const refreshAccessToken = async (token) => {
  try {
    const response = await fetch("https://handmade-shop-a953b604ceb8.herokuapp.com/refresh", {
      method: "POST",
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${token}`, // Include JWT token if necessary
      }, 
    });

    if (response.ok) {
      const { access_token } = await response.json();
      console.log("Access token refreshed:", access_token);
      // Cookies.set("access_token", access_token, { secure: true, sameSite: "Strict" });
      return access_token;
    } else {
      console.error("Failed to refresh token");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};