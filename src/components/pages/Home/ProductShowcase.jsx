import React from "react";
import Container from "../../Container";
import { AuthData } from "../../../auth/AuthWrapper";
import { useNavigate } from "react-router-dom";

const ProductShowcase = () => {
  const { products } = AuthData();
  const navigate = useNavigate();
  return (
    <div className="bg-bg6 py-12">
      <Container>
        <h2 className="text-3xl md:text-6xl font-bold font-serif text-center text-text3 mb-8">
          Find your fit. Shop our <br />
          <span className="text-text3">cozy&cute products</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products?.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="text-center overflow-hidden"
              onClick={()=> navigate(`/product/${product.id}`)}
            >
              <div className="h-[350px] rounded-xl overflow-hidden group">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg text-text6 font-serif font-semibold text-primary mt-1">
                  Bestseller
                </h3>
                <h3 className="text-xl font-serif font-semibold text-text3 mt-1">
                  {product.name}
                </h3>
                <p className="text-lg font-serif text-text5 font-normal mt-2">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductShowcase;
