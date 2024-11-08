export const getCart = async (token) => {
    // setLoading(true);
    try {
        const response = await fetch('http://localhost:5000/cart', {
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
        const response = await fetch('http://localhost:5000/cart', {
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
    const response = await fetch('http://localhost:5000/cart', {
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
  