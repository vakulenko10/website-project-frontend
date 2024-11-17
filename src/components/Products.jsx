import React, { useState, useEffect } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { fetchProducts, updateProduct } from '../services/productAPI';
import './pages/Shop/Shop.css';
import { FaShoppingCart } from 'react-icons/fa';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
const Products = () => {
  const { user, addToCart, token, products, setProducts } = AuthData();
  console.log("user:", user)
  const [loading, setLoading] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // nowy stan do kontrolowania widoczności nakładki
  const [formData, setFormData] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();
  // const debouncedUpdateProducts = debounce(async (updatedProducts) => {
  //   if (token) {
  //     try {
  //       const data = await updateCart(updatedProducts);
  //       if (data) {
  //         console.log("Products updated in backend:", data);
  //       } else {
  //         console.error("Failed to update products:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error updating products:", error);
  //     }
  //   }
  // }, 1000);
  useEffect(() => {
    // Zablokowanie przewijania tła, gdy overlay jest otwarty
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden'; // Zablokowanie scrolla strony
    } else {
      document.body.style.overflow = 'auto'; // Przywrócenie scrolla strony
    }

    // Pobieranie produktów
    // const fetchProductsData = async () => {
    //   setLoading(true);
    //   const productsResponse = await fetchProducts(token);
    //   if (productsResponse) {
    //     setProducts(productsResponse);
    //   } else {
    //     console.error('Failed to fetch products');
    //   }
    //   setLoading(false);
    // };

    // fetchProductsData();

    return () => {
      // Przywrócenie scrolla po zamknięciu komponentu
      document.body.style.overflow = 'auto';
    };
  }, [isOverlayOpen, token]);
useEffect(()=>{
  const fetchProductsData = async () => {
    setLoading(true);
    const productsResponse = await fetchProducts();
    if (productsResponse) {
      setProducts(productsResponse);
    } else {
      console.error('Failed to fetch products');
    }
    setLoading(false);
  };

  fetchProductsData();
}, [])
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
    // setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] }); // reset formularza
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({ ...prevState, [name]: value }));
  // };
  const handleEditProduct = (product) =>{
    console.log("product:",product)
    setEditingProductId(product.id);
    setFormData(product);
    toggleOverlay();
  }
  useEffect(()=>{
    !isOverlayOpen && setEditingProductId(null)
  },[isOverlayOpen])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProduct(editingProductId, token, formData);
      if (data) {
        alert(data.message || 'Product saved successfully');
        const updatedProducts = await fetchProducts();
        if (updatedProducts) setProducts(updatedProducts);
        toggleOverlay(); // zamknij nakładkę po zapisaniu
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-bg5 min-h-screen py-8 pt-[100px]">
      {user.isAdmin && (
        <button
          onClick={toggleOverlay}
          className="bg-color6 text-text1 px-4 py-2 mb-4 rounded hover:bg-text6 transition"
        >
          Create Product
        </button>
      )}

      <h2 className="text-text3 font-display text-2xl mb-6">Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card bg-text1 hover:">
            <div className="flex justify-between items-center mb-0 pb-0">
              <span className="text-text7 font-serif text-lg">
                {product.name}
              </span>
              <div className="pl-2 hover:text-text2 text-text3">
                <button
                  onClick={() => addToCart(product.id, 1)}
                  className="px-3 py-1 rounded  transition"
                >
                  <FaShoppingCart className="text-xl" />
                </button>
              </div>
            </div>
            <div className="flex justify-center mb-0  pb-0">
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                />
              )}
            </div>
            <div className="flex justify-between items-center mt-auto pt-0">
              <span className="text-text5">Material:</span>
              <span className="text-text5">{product.material}</span>
            </div>
            <div className="flex justify-between items-center mt-auto pt-0">
              <span className="text-text3 font-bold">${product.price}</span>
            </div>
            {/* Only show the edit button for admin */}
            <div className='flex justify-between'>
            <button onClick={()=>{navigate(`/product/${product.id}`)}} className='bg-color6 text-text1 px-4 py-2 rounded mt-2 hover:bg-text6 transition'>open</button>
            {user.isAdmin && (
              <button
                onClick={() => handleEditProduct(product)
                }
                className="bg-color6 text-text1 px-4 py-2 rounded mt-2 hover:bg-text6 transition"
              >
                Edit
              </button>
            )}
            </div>
          </div>
        ))}
      </div>

      {/* {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <h2 className="text-text3 font-display text-2xl mb-4">{editingProductId ? 'Edit Product' : 'Create New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh]">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border border-color4 p-2 rounded"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border border-color4 p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border border-color4 p-2 rounded"
                required
              />
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="Material"
                className="w-full border border-color4 p-2 rounded"
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
                className="w-full border border-color4 p-2 rounded"
              />
              <input
                type="text"
                name="images"
                value={formData.images[0] || ''}
                onChange={(e) => handleChange({ target: { name: 'images', value: [e.target.value] } })}
                placeholder="Image URL"
                className="w-full border border-color4 p-2 rounded"
              />
              <button
                type="submit"
                className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
              >
                {editingProductId ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={toggleOverlay}
                className="bg-color8 text-text1 px-4 py-2 rounded hover:bg-color10 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )} */}
      <ProductForm
  isOverlayOpen={isOverlayOpen}
  editingProductId={editingProductId}
  formData={formData}
  setFormData={setFormData}
  handleSubmit={handleSubmit}
  toggleOverlay={toggleOverlay}
/>
    </div>
  );
};

export default Products;