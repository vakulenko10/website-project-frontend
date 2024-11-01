import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';

const Products = () => {
  const {user, addToCart} = AuthData()
  console.log("user:", user)
  console.log(user.isAdmin)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin); 
  console.log("isAdmin:",isAdmin)// Admin status state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    material: '',
    color: '',
    images: []
  });
  const [editingProductId, setEditingProductId] = useState(null);
  
  // Fetch products on component load
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const adminStatus = localStorage.getItem('is_admin') === 'true'; // Assume admin status in localStorage
    setIsAdmin(adminStatus);
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle submit for creating or updating product
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          Authorization: `Bearer ${localStorage.getItem('jwt')}` // Adjust token retrieval as needed
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Product saved successfully');
        setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] });
        setEditingProductId(null);
        setIsEditing(false);
        fetchProducts(); // Refresh product list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Start editing a product
  const handleEdit = (product) => {
    if (user.isAdmin) { // Check if user is admin before allowing edit
      setIsEditing(true);
      setEditingProductId(product.id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        material: product.material,
        color: product.color,
        images: product.images
      });
    } else {
      alert("You do not have permission to edit products.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      
      {user.isAdmin && (
        <>
          <h2>{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="Material" />
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
            <input type="text" name="images" value={formData.images[0] || ''} onChange={(e) => handleChange({ target: { name: 'images', value: [e.target.value] } })} placeholder="Image URL" />
            <button type="submit" onClick={handleSubmit}>{isEditing ? 'Update Product' : 'Create Product'}</button>
          </form>
        </>
      )}

      <h2>Products</h2>
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.images[0]} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-material">Material: {product.material}</p>
            <p className="product-color">Color: {product.color}</p>
            <button onClick={() => addToCart(product.id, 1)}>add to the cart</button>
            {user.isAdmin && <button onClick={() => handleEdit(product)}>Edit</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
