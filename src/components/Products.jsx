import React, { useState, useEffect } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { fetchProducts, updateProduct } from '../services/productAPI';
import './pages/Shop/Shop.css';
import { FaShoppingCart } from 'react-icons/fa';
import ProductForm from './ProductForm';
import { Link, useNavigate } from 'react-router-dom';
import Filter from './Filter';

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
  const [formData, setFormData] = useState({ color:'', description: '', id: '', images: [], material: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [localProducts, setLocalProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null)
  const navigate = useNavigate();
  const [hoveredImageIndex, setHoveredImageIndex] = useState({});
  const handleMouseEnter = (productId) => {
    setHoveredImageIndex((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % products.find(p => p.id === productId).images.length,
    }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredImageIndex((prev) => ({
      ...prev,
      [productId]: 0, // Reset to the first image when mouse leaves
    }));
  };
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
      localStorage.setItem("products", JSON.stringify(productsResponse))
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
        localStorage.setItem('products', JSON.stringify(updatedProducts))
        setLocalProducts(updatedProducts)
        if (updatedProducts) setProducts(updatedProducts);
        toggleOverlay(); // zamknij nakładkę po zapisaniu
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setLocalProducts(JSON.parse(savedProducts));
    }
    setLoading(false);
  }, []);
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
      <Filter items={localProducts} setFilteredItems={setFilteredProducts} itemsName={'products'}/>
      <div className="products-container">
        {filteredProducts&&filteredProducts.map((product) => (
            <div key={product.id}  className="product-card bg-text1 hover:">
            <div className="flex justify-between items-center mb-0 pb-0">
              <span className="text-text7 font-serif text-lg">
                {product.name}
              </span>
              <div className="pl-2 hover:text-text2 text-text3">
                {user.isAuthenticated&&<button
                  onClick={() => addToCart(product.id, 1)}
                  className="px-3 py-1 rounded  transition"
                >
                  <FaShoppingCart className="text-xl" />
                </button>}
              </div>
            </div>
            <div className="flex justify-center mb-0  pb-0">
              {/* {product.images && product.images.length > 0 && (
                <img
                src={product.images[hoveredImageIndex[product.id] || 0]}
                  alt={product.name}
                  className="product-image"
                 
                />
              )} */}
              <img
                src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                 
                />
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
            <Link to={`/product/${product.id}`} target="_blank" className='bg-color6 text-text1 px-4 py-2 rounded mt-2 hover:bg-text6 transition'>open</Link>
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
        {!filteredProducts&&localProducts.map((product) => (
            <div key={product.id}  className="product-card bg-text1 hover:">
            <div className="flex justify-between items-center mb-0 pb-0">
              <span className="text-text7 font-serif text-lg">
                {product.name}
              </span>
              <div className="pl-2 hover:text-text2 text-text3">
                {user.isAuthenticated&&<button
                  onClick={() => addToCart(product.id, 1)}
                  className="px-3 py-1 rounded  transition"
                >
                  <FaShoppingCart className="text-xl" />
                </button>}
              </div>
            </div>
            <div className="flex justify-center mb-0  pb-0">
              {/* {product.images && product.images.length > 0 && (
                <img
                src={product.images[hoveredImageIndex[product.id] || 0]}
                  alt={product.name}
                  className="product-image"
                 
                />
              )} */}
              <img
                src={product.images[0]}
                  alt={product.name}
                  className="product-image"
                 
                />
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
            <Link to={`/product/${product.id}`} target="_blank" className='bg-color6 text-text1 px-4 py-2 rounded mt-2 hover:bg-text6 transition'>open</Link>
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