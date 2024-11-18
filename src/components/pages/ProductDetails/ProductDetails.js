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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // nowy stan do kontrolowania widoczności nakładki
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
    !isOverlayOpen && setEditingProductId(null);
  }, [isOverlayOpen]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <main className="product-detail bg-bg5 max-h-screen h-screen overflow-hidden box-border max-w-screen py-8 pt-[100px] relative">
      <Container classes="relative">
        <div className="grid grid-cols-2 relative">
          <Carousel
            slides={product.images}
            classes={"bg-color3 bg-opacity-50"}
          />
          <div className="flex flex-col gap-2 text-start pl-10">
            <h1 className="text-3xl text-text5 font-display pb-2">
              {product.name}
            </h1>
            <h1 className="text-text3 font-serif font-extrabold text-6xl pb-4">
              ${product.price}{" "}
              <span className="line-through text-text6 decoration-4 decoration-text3">
                {(product.price * 1.4).toFixed(2)}
              </span>
            </h1>
            <p className="text-color4 font-display  text-2xl">
              <span className="pr-2">Material -</span> {product.material}
            </p>
            <p className="text-color4 font-display  text-2xl">
              <span className="pr-2">Color -</span> {product.color}
            </p>
            <p className="text-color4 font-serif  text-xl">
              {product.description}
            </p>
            {user.isAdmin && (
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-color6 text-text1 px-4 py-2 rounded mt-2 hover:bg-text6 transition"
              >
                Edit
              </button>
            )}
            <button
                  onClick={() => addToCart(product.id, 1)}
                  className=" transition w-10 flex justify-center rounded-full items-center"
                >
                  <FaShoppingCart className="text-6xl fill-text3 hover:fill-text6 transition" />
                </button>
                
          </div>
        </div>
        
      </Container>
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
