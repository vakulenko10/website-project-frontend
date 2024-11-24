export const getCart = async (token) => {
    // setLoading(true);
    try {
        const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/cart', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data
        // setCart(data);
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
    // setLoading(false);
  };
  
  export const addItemToTheCart = async (productId, quantity, token) => {
    try {
        const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ product_id: productId, quantity })
        });
        console.log(response)
        if (response.ok) {
            const updatedCart = await response.json();
            console.log("updatedCart:",updatedCart)
            return updatedCart
            // setCart(updatedCart.cart);
        } else {
            const errorData = await response.json();
            console.error('Error adding to cart:', errorData);
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
  };
  export const updateCartItems = async (updatedItems, token) => {
  try {
    const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: updatedItems }),
    });
  
    if (response.ok) {
      const updatedCart = await response.json();
      return updatedCart.cart
      // setCart(updatedCart.cart);
    } else {
      const errorData = await response.json();
      console.error('Error updating cart:', errorData);
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
  };
  
  export const deleteProductFromCart = async (token, productId) => {
    // URL of the cart deletion endpoint
    const url = 'https://handmade-shop-a953b604ceb8.herokuapp.com/cart'; // Adjust this URL to match your backend URL
  
    // Request body
    const body = JSON.stringify({
      product_id: productId, // Product to be removed
    });
  
    // Fetch request with DELETE method
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // JWT token for authentication
          'Content-Type': 'application/json', // Setting the content type to JSON
        },
        body: body,
      });
  
      // Handle response
      if (response.ok) {
        const data = await response.json();
        console.log('Product removed successfully', data);
        return data; // Return the updated cart data
      } else {
        const errorData = await response.json();
        console.error('Error removing product from cart:', errorData);
        return { error: errorData.error }; // Return error message if product removal fails
      }
    } catch (error) {
      console.error('Error with the fetch operation:', error);
      return { error: 'An error occurred while trying to remove the product' }; // Handle network errors
    }
  };
  export const deleteAllProductsFromCart = async (token) => {
    const url = 'https://handmade-shop-a953b604ceb8.herokuapp.com/cart/all'; // Adjust this URL based on your backend endpoint
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('All products removed successfully:', data);
        return data; // Return the updated cart data
      } else {
        const errorData = await response.json();
        console.error('Error removing all products from cart:', errorData);
        return { error: errorData.error }; // Return error message if deletion fails
      }
    } catch (error) {
      console.error('Error with the fetch operation:', error);
      return { error: 'An error occurred while trying to remove all products' }; // Handle network errors
    }
  };
  