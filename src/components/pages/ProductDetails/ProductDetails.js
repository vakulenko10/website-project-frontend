import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../services/productAPI"; // Assume this API call exists
import Container from "../../Container";
import "./ProductDetails.css";
import Carousel from "../../Carousel";
const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetchProductById(id); // Fetch product details by ID
      setProduct(productData[0]);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <main className="product-detail bg-bg5 max-h-screen overflow-hidden box-border w-screen py-8 pt-[100px] relative">
      <Container classes="h-full relative">
        <div className="grid grid-cols-2 relative">
          {/* <div className="product-image w-full h-full object-contain">
            <img
            src={product.images[0]}
            alt={product.name}
            className="p"
          />
          </div> */}
          <Carousel slides={product.images}/>
          <div className="flex flex-col gap-2 text-start pl-3">
            <h1 className="text-3xl text-text5 font-display pb-2">
              {product.name}
            </h1>
            <h1 className="text-text3 font-serif font-extrabold text-6xl pb-4">
              ${product.price}{" "}
              <span className="underline">
                {Math.round(product.price * 1.4)}
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
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductDetails;
