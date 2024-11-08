export const getOrders = async (token) =>{
    try {
      const response = await fetch('http://localhost:5000/orders', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
      });
      const data = await response.json();
      return data
      // setOrders(data);
      // setLoading(false);
  } catch (error) {
      console.error('Error fetching orders:', error);
      return error
      // setLoading(false);
  }
  }
  
  export const editTheOrder = async (orderId, editedOrder, token) => {
    try {
      console.log(`Attempting to update order ${orderId} with data:`, editedOrder);
  
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedOrder),
      });
  
      // Log the response status and body
      console.log(`Response status: ${response.status}`);
  
      // Check for server errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        return {
          success: false,
          error: errorData.error || 'Failed to update order on server',
        };
      }
  
      // Parse successful response
      const result = await response.json();
      console.log('Order updated successfully:', result);
  
      return { success: true, message: 'Order updated successfully' };
    } catch (error) {
      // Log detailed error information
      console.error('Unexpected error occurred while updating order:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  };