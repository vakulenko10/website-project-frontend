import React, { useState } from 'react';

const AdminPanel = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    material: '',
    color: '',
    status: 'available',
    images: []
  });
  const [productId, setProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProductData(prevState => ({
      ...prevState,
      images: [e.target.value] // Only a single image for simplicity; you can extend to multiple images.
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/products/${productId}`
      : 'http://localhost:5000/products';

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}` // Adjust based on token storage
        },
        body: JSON.stringify(productData)
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Product saved successfully');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required />
        <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="material" value={productData.material} onChange={handleChange} placeholder="Material" />
        <input type="text" name="color" value={productData.color} onChange={handleChange} placeholder="Color" />
        
        <select name="status" value={productData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <input type="text" name="image" value={productData.images[0] || ''} onChange={handleImageChange} placeholder="Image URL" />
        
        <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
      </form>

      {/* Optional: Set editing mode */}
      <button onClick={() => setIsEditing(false)}>Create Mode</button>
      <button onClick={() => setIsEditing(true)}>Edit Mode</button>
    </div>
  );
};

export default AdminPanel;
