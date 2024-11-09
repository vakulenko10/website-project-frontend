// import React, { useEffect, useState } from 'react';
// import { AuthData } from '../auth/AuthWrapper';
// import { fetchProducts, updateProduct } from '../services';
// import './pages/Shop/Shop.css';

// const Products = () => {
//   const { user, addToCart, token } = AuthData();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     material: '',
//     color: '',
//     images: []
//   });
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [hoveredProductId, setHoveredProductId] = useState(null); // Stan do przechowywania ID produktu, który jest najechany

//   useEffect(() => {
//     const fetchProductsData = async () => {
//       setLoading(true);
//       const productsResponse = await fetchProducts(token);
//       if (productsResponse) {
//         setProducts(productsResponse);
//       } else {
//         console.error('Failed to fetch products');
//       }
//       setLoading(false);
//     };

//     fetchProductsData();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await updateProduct(editingProductId, token, formData);
//       if (data) {
//         alert(data.message || 'Product saved successfully');
//         const updatedProducts = await fetchProducts(token);
//         if (updatedProducts) setProducts(updatedProducts);
//         resetForm();
//       } else {
//         alert('Error saving product');
//       }
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   const handleEdit = (product) => {
//     if (user.isAdmin) {
//       setIsEditing(true);
//       setEditingProductId(product.id);
//       setFormData({
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         material: product.material,
//         color: product.color,
//         images: product.images || []
//       });
//     } else {
//       alert('You do not have permission to edit products.');
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] });
//     setEditingProductId(null);
//     setIsEditing(false);
//   };

//   const productImages = [
//     "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731091397/frontend/sirjo8ys9unkz7hiogxb.png",
//     "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731091397/frontend/tzgckqhewyhoscten907.png",
//     "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731091398/frontend/ftpzdd0ddoktyjtjqoy1.png",
//     "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731091400/frontend/kimua6mud7w5batol514.png",
//     "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731091402/frontend/sukcs6rj6gfun58jok7e.png",
//     "https://res.cloudinary.com/dujdz2jbl/image/upload/v1731091402/frontend/lstqkufcngq8oafogobp.png"
//   ];

//   const productsWithImages = products.map((product, index) => ({
//     ...product,
//     images: [productImages[index % productImages.length]]
//   }));

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-bg5 min-h-screen py-8">
//       {user.isAdmin && (
//         <>
//           <h2 className="text-text3 font-display text-2xl mb-4">{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
//           <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//             <input 
//               type="text" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleChange} 
//               placeholder="Product Name" 
//               className="w-full border border-color4 p-2 rounded"
//               required 
//             />
//             <textarea 
//               name="description" 
//               value={formData.description} 
//               onChange={handleChange} 
//               placeholder="Description" 
//               className="w-full border border-color4 p-2 rounded"
//               required 
//             />
//             <input 
//               type="number" 
//               name="price" 
//               value={formData.price} 
//               onChange={handleChange} 
//               placeholder="Price" 
//               className="w-full border border-color4 p-2 rounded"
//               required 
//             />
//             <input 
//               type="text" 
//               name="material" 
//               value={formData.material} 
//               onChange={handleChange} 
//               placeholder="Material" 
//               className="w-full border border-color4 p-2 rounded"
//             />
//             <input 
//               type="text" 
//               name="color" 
//               value={formData.color} 
//               onChange={handleChange} 
//               placeholder="Color" 
//               className="w-full border border-color4 p-2 rounded"
//             />
//             <input
//               type="text"
//               name="images"
//               value={formData.images[0] || ''}
//               onChange={(e) => handleChange({ target: { name: 'images', value: [e.target.value] } })}
//               placeholder="Image URL"
//               className="w-full border border-color4 p-2 rounded"
//             />
//             <button 
//               type="submit" 
//               className="bg-color6 text-text1 px-4 py-2 rounded hover:bg-text6 transition"
//             >
//               {isEditing ? 'Update Product' : 'Create Product'}
//             </button>
//           </form>
//         </>
//       )}

//       <h2 className="text-text3 font-display text-2xl mb-6">Products</h2>
//       <div className="products-container">
//         {productsWithImages.map((product) => (
//           <div 
//             key={product.id} 
//             className={`product-card transition-all ${hoveredProductId === product.id ? 'bg-bg4' : ''}`} // Zmieniamy tło, jeśli produkt jest najechany
//             onMouseEnter={() => setHoveredProductId(product.id)} // Ustawienie ID produktu, gdy najedziemy
//             onMouseLeave={() => setHoveredProductId(null)} // Resetowanie ID po opuszczeniu
//           >
//             <div className="flex justify-between items-center mb-0 border-b border-color4 pb-0">
//               <span className="text-text7 font-serif text-lg">{product.name}</span>
//               <div className="border-l border-color4 pl-2">
//                 <button 
//                   onClick={() => addToCart(product.id, 1)} 
//                   className="px-3 py-1 rounded hover:bg-text2 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-center mb-0 border-b border-color4 pb-0">
//               <img 
//                 src={product.images[0]} 
//                 alt={product.name} 
//                 className="product-image"
//               />
//             </div>
//             <div className="flex justify-between items-center mt-auto border-t border-color4 pt-0">
//               <span className="text-text5">brooch</span>
//               <div className="border-l border-color4 pl-2">
//                 <span className="text-text3 font-bold">${product.price}</span>
//               </div>
//             </div>
//             {user.isAdmin && (
//               <button 
//                 onClick={() => handleEdit(product)} 
//                 className="mt-0 bg-color8 text-text1 px-4 py-2 rounded-b-none hover:bg-color10 transition"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import { fetchProducts, updateProduct } from '../services';
import './pages/Shop/Shop.css';

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
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProduct(editingProductId, token, formData);
      if (data) {
        alert(data.message || 'Product saved successfully');
        const updatedProducts = await fetchProducts(token);
        if (updatedProducts) setProducts(updatedProducts);
        resetForm();
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

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
        images: product.images || []
      });
    } else {
      alert('You do not have permission to edit products.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', material: '', color: '', images: [] });
    setEditingProductId(null);
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-bg5 min-h-screen py-8">
      {user.isAdmin && (
        <>
          <h2 className="text-text3 font-display text-2xl mb-4">{isEditing ? 'Edit Product' : 'Create New Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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
              {isEditing ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        </>
      )}

      <h2 className="text-text3 font-display text-2xl mb-6">Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`product-card transition-all ${hoveredProductId === product.id ? 'bg-bg4' : ''}`} 
            onMouseEnter={() => setHoveredProductId(product.id)} 
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <div className="flex justify-between items-center mb-0 border-b border-color4 pb-0">
              <span className="text-text7 font-serif text-lg">{product.name}</span>
              <div className="border-l border-color4 pl-2">
                <button 
                  onClick={() => addToCart(product.id, 1)} 
                  className="px-3 py-1 rounded hover:bg-text2 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="flex justify-center mb-0 border-b border-color4 pb-0">
              {product.images && product.images.length > 0 && (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="product-image"
                />
              )}
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-color4 pt-0">
              <span className="text-text5">brooch</span>
              <div className="border-l border-color4 pl-2">
                <span className="text-text3 font-bold">${product.price}</span>
              </div>
            </div>
            {user.isAdmin && (
              <button 
                onClick={() => handleEdit(product)} 
                className="mt-0 bg-color8 text-text1 px-4 py-2 rounded-b-none hover:bg-color10 transition"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
