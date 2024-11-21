import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthData } from "../../../auth/AuthWrapper";
import Container from "../../Container";

const IntroSection = () => {
  const { products: authProducts } = AuthData(); // Data from AuthWrapper
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(400); // Default width for larger screens
  const [visibleItems, setVisibleItems] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [customPointer, setCustomPointer] = useState({ x: 0, y: 0, visible: false });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check for products in LocalStorage or AuthData
  useEffect(() => {
    const fetchProducts = () => {
      const localStorageProducts = JSON.parse(localStorage.getItem("products")) || [];
      if (localStorageProducts.length) {
        setProducts(localStorageProducts);
      } else {
        setProducts(authProducts || []);
      }
    };

    fetchProducts();

    // Update products if localStorage changes
    const handleStorageChange = () => {
      const localStorageProducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(localStorageProducts.length ? localStorageProducts : authProducts || []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [authProducts]);

  // Determine item width, visible items, and small screen status dynamically
  useEffect(() => {
    const updateItemWidth = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      if (isSmall) {
        setItemWidth(250);
        setVisibleItems(1);
      } else {
        setItemWidth(400);
        setVisibleItems(4);
      }
    };

    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);
    return () => {
      window.removeEventListener("resize", updateItemWidth);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (!isSmallScreen) {
      setIsDragging(true);
      setStartX(e.clientX);
      setScrollStart(currentIndex * itemWidth);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isSmallScreen) {
      const deltaX = e.clientX - startX;
      const newScroll = Math.max(
        0,
        Math.min(scrollStart - deltaX, (products?.length - visibleItems) * itemWidth)
      );
      setCurrentIndex(Math.round(newScroll / itemWidth));
    }
    setCustomPointer({ x: e.clientX, y: e.clientY, visible: !isSmallScreen });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseEnter = () => setCustomPointer((prev) => ({ ...prev, visible: true }));
  const handleMouseLeave = () => {
    setIsDragging(false);
    setCustomPointer((prev) => ({ ...prev, visible: false }));
  };

  const handleItemClick = (product) => {
    if (!isDragging) {
      window.open(`/product/${product.id}`, "_blank");
    }
  };

  return (
    <div className="intro_section__wrapper bg-bg1 min-h-screen flex items-center justify-center relative w-full overflow-hidden">
      {customPointer.visible && (
        <div
          className="custom-pointer fixed z-50 w-20 h-20 p-5 rounded-full hidden md:flex justify-center items-center text-text1 md:bg-text3"
          style={{
            left: `${customPointer.x}px`,
            top: `${customPointer.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          drag
        </div>
      )}
      <div className="w-11/12 max-w-7xl relative ">
        <h1 className="text-text1 text-6xl text-left font-serif font-bold mt-4 capitalize">our products</h1>
        <Container classes="my-0">
          <div className="flex flex-row gap-2 justify-end items-center relative">
            <h4 className="text-text2 font-serif">click to scroll</h4>
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              className="z-10 p-3 bg-text3 text-white rounded-full shadow-lg hover:bg-text6 transition"
              disabled={currentIndex === 0}
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, products?.length - visibleItems)
                )
              }
              className="z-10 p-3 bg-text3 text-white rounded-full shadow-lg hover:bg-text6 transition"
              disabled={currentIndex + visibleItems >= products?.length}
            >
              →
            </button>
          </div>
        </Container>

        <div
          className={`relative ${
            isSmallScreen ? "overflow-x-auto scrollbar-hide custom-scrollbar" : "cursor-none"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="flex flex-row h-full relative gap-4 mb-[3rem] mx-auto left-0"
            initial={{ x: 0 }}
            animate={isSmallScreen ? {} : { x: -currentIndex * itemWidth }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              width: `${products?.length * itemWidth}px`,
            }}
          >
            {!products?.length ? (
              <div>Loading...</div>
            ) : (
              products.map((product, index) => (
                <motion.div
                  key={index}
                  onClick={() => handleItemClick(product)}
                  className="product w-[250px] md:w-[400px] h-[400px] md:h-[80vh] relative flex flex-col justify-end"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-[90%] w-full">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      draggable="false"
                      loading="lazy"
                      className="w-full z-0 h-full absolute object-cover object-center"
                    />
                  </div>
                  <div className="z-10">
                    <h3 className="text-text1 font-display text-left text-sm md:text-lg">{product.name}</h3>
                    <h3 className="text-text1 text-xl font-bold font-serif text-left md:text-2xl">${product.price}</h3>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
