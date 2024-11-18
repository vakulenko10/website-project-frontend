import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highLightProducts } from "../../../services/staticVars";

const ProductHighlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwapped, setIsSwapped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(false);
  const sectionRef = useRef(null);

  // Memoize the current product to prevent unnecessary recalculations
  const currentProduct = useMemo(() => highLightProducts[currentIndex], [currentIndex]);

  const handleSwap = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highLightProducts.length);
    setIsSwapped((prev) => !prev);
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getRotationAngle = () => {
    if (!sectionRef.current) return 0;
    
    // Get the section's width and the mouse's position
    const sectionWidth = sectionRef.current.getBoundingClientRect().width;
    const sectionCenter = sectionWidth / 2;
  
    // Calculate how far the mouse is from the center
    const distanceFromCenter = mousePos.x - sectionCenter;
  
    // Determine the maximum rotation angle (this can be adjusted as needed)
    const maxRotationAngle = 30; // Maximum rotation angle (in degrees)
  
    // Calculate the rotation angle based on mouse position
    const rotation = (distanceFromCenter / sectionWidth) * maxRotationAngle * 2; // Allow rotation from -maxRotationAngle to +maxRotationAngle
  
    return rotation;
  };
  const isVideo = (url) => {
    return url && (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg"));
  };
  useEffect(() => {
    // Cleanup function to reset showHint on component unmount
    return () => setShowHint(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`productHighlight relative h-[110vh] ${currentProduct.bgColor}`}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
      onMouseMove={handleMouseMove}
      onClick={handleSwap}
      style={{ cursor: "none" }} // Hide the default cursor
    >
      <img
        src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731468766/frontend/tjjzvhrcgejhthycptv2.png"
        alt="Background"
        className="absolute mt-[-2rem] h-20 object-cover md:h-auto w-full z-10 "
        loading="lazy"
      />

      <img
        src={`${currentProduct.overlayImage}`}
        alt="Background Overlay"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      <div  className="relative h-full w-full flex flex-col md:flex-row cursor-pointer md:cursor-none">
        <AnimatePresence mode="wait">
          {isSwapped ? (
            <motion.div
              key="text-left"
              initial={{ opacity: 0, x: -80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="md:w-1/2 w-full h-2/3 md:h-full flex flex-col items-center justify-center"
            >
              <img
                src={currentProduct.imageSilhouette}
                alt={`${currentProduct.name} silhouette`}
                className="brooch-silhouette h-1/3 w-auto object-contain mb-4 absolute"
                loading="lazy"
              />
              <div className={`z-10 text-center md:${isSwapped ? 'text-end' : 'text-start'}`}>{currentProduct.description}</div>
            </motion.div>
          ) : (
            <motion.div
              key="image-left"
              initial={{ opacity: 0, x: -80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="md:w-1/2 w-full relative h-2/3 md:h-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="h-full w-full object-cover transition-transform duration-500"
                loading="lazy"
              />
              <p className="absolute bottom-16 left-1/2 transform -translate-x-1/2 font-display text-xl text-text1">
                {currentProduct.name}
              </p>
            </motion.div>
          )}

          {isSwapped ? (
            <motion.div
              key="image-right"
              initial={{ opacity: 0, x: 80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="md:w-1/2 w-full relative h-2/3 md:h-full flex items-end md:items-center justify-center overflow-hidden"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <p className="absolute bottom-16 left-1/2 transform -translate-x-1/2 font-display text-xl text-text1">
                {currentProduct.name}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="text-right"
              initial={{ opacity: 0, x: 80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="md:w-1/2 w-full h-2/3 md:h-full relative flex flex-col items-center justify-center text-center md:text-right"
            >
              <img
                src={currentProduct.imageSilhouette}
                alt={`${currentProduct.name} silhouette`}
                className="brooch-silhouette h-1/3 w-auto object-contain mb-4 absolute"
                loading="lazy"
              />
              <div className={`z-10 text-center md:${isSwapped ? 'text-end' : 'text-start'}`}>{currentProduct.description}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showHint && (
        <motion.div
          className="fixed flex flex-col pointer-events-none px-4 py-2 text-white rounded-md"
          style={{
            top: mousePos.y,
            left: mousePos.x,
            transform: "translate(-50%, -50%)",
            zIndex: 50,
          }}
          initial={{ opacity: 0, rotate: 0, scale: 0.2 }}
          animate={{ opacity: 1, rotate: `${getRotationAngle()}deg`, scale: 1 }}
          exit={{ opacity: 0, rotate: '0deg', scale: 0.2}}
          transition={{ duration: 0.3 }}
        >
          <img
            src={`${currentProduct.imageSilhouette}`}
            className="hidden md:block brooch-silhouette transform w-[50px] absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
            alt="silhouette"
            loading="lazy"
          />
          <h1 className="hidden md:block text-text1 font-display absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">click </h1>
        </motion.div>
      )}
    </section>
  );
};

export default ProductHighlight;
