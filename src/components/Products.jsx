import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { fetchProducts, updateProduct } from '../services';

const Products = () => {
  const { user, addToCart, token } = AuthData();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true); // Ensure loading state is set before fetching
      const productsResponse = await fetchProducts(token);
      if (productsResponse) {
        setProducts(productsResponse);
      } else {
        console.error('Failed to fetch products');
      }
      setLoading(false);
    };

    fetchProductsData();
  }, [token]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle submit for creating or updating product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProduct(editingProductId, token, formData);
      if (data) {
        alert(data.message || 'Product saved successfully');
        setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] });
        setEditingProductId(null);
        setIsEditing(false);
        const updatedProducts = await fetchProducts(token); // Refresh product list
        if (updatedProducts) setProducts(updatedProducts);
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Start editing a product
  const handleEdit = (product) => {
    if (user.isAdmin) {
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
      alert('You do not have permission to edit products.');
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
            <input
              type="text"
              name="images"
              value={formData.images[0] || ''}
              onChange={(e) => handleChange({ target: { name: 'images', value: [e.target.value] } })}
              placeholder="Image URL"
            />
            <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
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
            <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
            {user.isAdmin && <button onClick={() => handleEdit(product)}>Edit</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
