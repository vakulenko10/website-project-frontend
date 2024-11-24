import React from 'react';
import { AuthData } from '../auth/AuthWrapper';

const RefreshToken = () => {
    const {user, setToken} = AuthData();
    const refreshToken = async () => {
        try {
          const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/refresh', {
            method: 'POST',
            credentials: 'include',  // Include cookies in the request
          });
          
          if (response.ok) {
            const data = await response.json();
            setToken(data.access_token)
            // localStorage.setItem('jwt', data.access_token); // Store the new access token
            return data.access_token;
          } else {
            console.error("Failed to refresh token");
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
        return null;
      };
      

  return (
    <button onClick={refreshToken}>
      Refresh Token
    </button>
  );
};

export default RefreshToken;
