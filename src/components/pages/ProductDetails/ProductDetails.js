import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../../services/productAPI"; // Assume this API call exists
import Container from "../../Container";
import "./ProductDetails.css";
import Carousel from "../../Carousel";
import { AuthData } from "../../../auth/AuthWrapper";
import ProductForm from "../../ProductForm";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const { user, addToCart, token, products, setProducts } = AuthData();
  console.log("user:", user);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Control overlay visibility
  const [formData, setFormData] = useState({
    color: "",
    description: "",
    id: "",
    images: [],
    material: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const productData = await fetchProductById(id); // Fetch product details by ID
    setProduct(productData[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProduct(editingProductId, token, formData);
      if (data) {
        alert(data.message || "Product saved successfully");
        await fetchProduct();
        toggleOverlay();
      } else {
        alert("Error saving product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleEditProduct = (product) => {
    console.log("product:", product);
    setEditingProductId(product.id);
    setFormData(product);
    toggleOverlay();
  };

  useEffect(() => {
    if (!isOverlayOpen) {
      setEditingProductId(null);
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <main className="product-detail bg-bg6 min-h-screen overflow-hidden box-border max-w-screen py-8 pt-[100px] relative">
      <Container classes="relative">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">
          {/* Carousel Section */}
          <div className="w-full md:w-1/2">
            <Carousel
              slides={product.images}
              classes="bg-color3 bg-opacity-50 rounded-lg shadow-lg"
            />
          </div>

          {/* Product Information Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-display text-text5 ">
              {product.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-text3 font-serif font-extrabold text-4xl md:text-6xl">
                ${product.price}
              </span>
              <span className="line-through text-text6 decoration-4 decoration-text3 text-xl md:text-2xl ml-4">
                ${(product.price * 1.4).toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-color4 font-display text-lg md:text-xl">
                <span className="">Material:</span> {product.material}
              </p>
              <p className="text-color4 font-display text-lg md:text-xl">
                <span className="">Color:</span> {product.color}
              </p>
            </div>
            <p className="text-color4 font-serif text-base md:text-lg">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-4">
              {user.isAdmin && (
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-color6 text-text1 px-6 py-2 rounded-lg hover:bg-text6 transition duration-300"
                >
                  Edit
                </button>
              )}
              {user.isAuthenticated && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id, 1);
                  }}
                  className="bg-color6 text-text1 px-6 py-3 rounded-full hover:bg-text6 transition shadow-lg top-3 right-3 flex items-center justify-center space-x-2 "
                >
                  <FaShoppingCart className="text-xl" />
                  <span className="text-xs font-serif">Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Product Form Overlay */}
      <Container classes="overflow-hidden">
        <ProductForm
          isOverlayOpen={isOverlayOpen}
          editingProductId={editingProductId}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          toggleOverlay={toggleOverlay}
        />
      </Container>
    </main>
  );
};

export default ProductDetails;
