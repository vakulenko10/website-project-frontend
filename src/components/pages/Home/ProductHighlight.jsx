import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highLightProducts } from "../../../services/staticVars";

const ProductHighlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highLightProducts.length);
    setIsSwapped((prev) => !prev);
  };

  const currentProduct = highLightProducts[currentIndex];
 
  return (
    <section className={`productHighlight relative h-[110vh] ${currentProduct.bgColor} `}>
      <img
        src='https://res.cloudinary.com/dujdz2jbl/image/upload/v1731247273/frontend/nlefqmzwmqbzfi66rjab.png'
        alt="Background"
        className="absolute top-[-2rem] h-20 object-cover md:h-auto w-full z-10"
      />

      <img
        src={`${currentProduct.overlayImage}`}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        onClick={handleSwap}
        className="relative h-full w-full flex flex-col md:flex-row cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isSwapped ? (
            <motion.div
              key="text-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 w-full h-2/3 md:h-full flex flex-col items-center justify-center  "
            >
              <img
                src={currentProduct.imageSilhouette}
                alt={`${currentProduct.name} silhouette`}
                className="brooch-silhouette h-1/3 w-auto object-contain mb-4 absolute "
              />
               <div className={`z-10 text-center md:${isSwapped?'text-end':'text-start'}`}>{currentProduct.description}</div>
            </motion.div>
          ) : (
            <motion.div
              key="image-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 w-full relative h-2/3 md:h-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="h-full w-full object-cover transition-transform duration-500"
              />
              <p className="absolute bottom-16 left-1/2 transform -translate-x-1/2 font-display text-xl text-text1">
                {currentProduct.name}
              </p>
            </motion.div>
          )}

          {isSwapped ? (
            <motion.div
              key="image-right"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 w-full relative h-2/3 md:h-full  flex items-end md:items-center justify-center overflow-hidden"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="h-full w-full object-cover"
              />
              <p className="absolute bottom-16 left-1/2 transform -translate-x-1/2 font-display text-xl text-text1">
                {currentProduct.name}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="text-right"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 w-full  h-2/3 md:h-full relative flex flex-col items-center justify-center text-center md:text-right"
            >
              <img
                src={currentProduct.imageSilhouette}
                alt={`${currentProduct.name} silhouette`}
                className="brooch-silhouette h-1/3 w-auto object-contain mb-4 absolute"
              />
              <div className={`z-10 text-center md:${isSwapped?'text-end':'text-start'}`}>{currentProduct.description}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductHighlight;
