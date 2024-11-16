export const fetchProducts = async (token) =>{
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const data = await response.json();
      return data
      // setProducts(data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      // setLoading(false);
    }
  }
  
  
export const updateProduct = async (editingProductId, token, formData) =>{
    const url = editingProductId
        ? `http://localhost:5000/products/${editingProductId}`
        : 'http://localhost:5000/products';
      const method = editingProductId ? 'PUT' : 'POST';
      console.log("url:", url)
      console.log("method:", method)
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            
          },
          credentials: 'include', 
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
        return data
      }catch (error) {
        console.error('Error saving product:', error);
      }
  }
