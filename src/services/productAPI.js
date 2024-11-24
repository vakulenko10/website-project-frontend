export const fetchProducts = async () =>{
    try {
      const response = await fetch('https://handmade-shop-a953b604ceb8.herokuapp.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
        ? `https://handmade-shop-a953b604ceb8.herokuapp.com/products/${editingProductId}`
        : 'https://handmade-shop-a953b604ceb8.herokuapp.com/products';
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

  export const fetchProductById = async (id) => {
    try {
      const response = await fetch(`https://handmade-shop-a953b604ceb8.herokuapp.com/products?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
  
      const data = await response.json();
      console.log(data);  // Log the response to verify its structure
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

export const deleteProductById = async (id, token) =>{
  try {
    const response = await fetch(`https://handmade-shop-a953b604ceb8.herokuapp.com/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      },  
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    const data = await response.json();
    console.log(data);  // Log the response to verify its structure
    return data;
  } catch (error) {
    console.error('Error deleting product by ID:', error);
  }
} 