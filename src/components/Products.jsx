import React, { useState, useEffect } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { deleteProductById, fetchProducts, updateProduct } from '../services/productAPI';
import './pages/Shop/Shop.css';
import { FaShoppingCart } from 'react-icons/fa';
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import ProductCard from './ProductCard';
import Container from './Container';

const Products = () => {
  const { user, addToCart, token, setProducts } = AuthData();
  console.log("user:", user)
  const [loading, setLoading] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // nowy stan do kontrolowania widoczności nakładki
  const [formData, setFormData] = useState({ color:'', description: '', id: '', images: [], material: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [localProducts, setLocalProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null)
  useEffect(() => {
    // Zablokowanie przewijania tła, gdy overlay jest otwarty
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden'; // Zablokowanie scrolla strony
    } else {
      document.body.style.overflow = 'auto'; // Przywrócenie scrolla strony
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOverlayOpen, token]);
  const fetchProductsData = async () => {
    setLoading(true);
    const productsResponse = await fetchProducts();
    if (productsResponse) {
      setProducts(productsResponse);
      setLocalProducts(productsResponse)  
      localStorage.setItem("products", JSON.stringify(productsResponse))
    } else {
      console.error('Failed to fetch products');
    }
    setLoading(false);
  };
useEffect(()=>{
  fetchProductsData();
}, [])
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
    // setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] }); // reset formularza
  };

  const handleEditProduct = (product) =>{
    console.log("product:",product)
    setEditingProductId(product.id);
    setFormData(product);
    toggleOverlay();
  }
  const handleDeleteProduct = async (productId) =>{
    try{
      const response = await deleteProductById(productId, token)
      if(response){
        alert(`product with id:${productId} was successfully deleted`)
        await fetchProductsData()
      }else{
        console.error('Failed to delete product in backend:', response);
      }
    }
    catch(error){
      console.error(error);
    }
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
    <div className="bg-bg6 min-h-screen w-full relative py-8 pt-[100px]">
      
        <Filter items={localProducts} setFilteredItems={setFilteredProducts} itemsName={'products'} classes='sticky flex-col overflow-hidden box-border bottom-0  md:w-[300px] py-10 md:text-start px-3'/>
      {user.isAdmin && (
        <button
          onClick={toggleOverlay}
          className="bg-color6 text-text1 px-4 py-2 mb-4 rounded hover:bg-text6 transition"
        >
          Create Product
        </button>
      )}

      {/* <h2 className="text-text3 font-display text-2xl mb-6">Products</h2> */}
      <div >
        <Container classes='md:flex '>
      
      <div className="products-container relative">
        {filteredProducts&&filteredProducts.map((product) => (
           <ProductCard product={product} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}/>
        ))}
        {!filteredProducts&&localProducts.map((product) => (
            <ProductCard product={product} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}/>
        ))}
      </div>
      </Container>
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