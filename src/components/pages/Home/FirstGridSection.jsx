import React, { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import "./FirstGridSection.css"; // Add any additional styles if needed
import Container from "../../Container";

const FirstGridSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: (clientX / window.innerWidth - 0.5) * 100, // Normalize and scale
      y: (clientY / window.innerHeight - 0.5) * 100,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    window.open(`/shop`, "_blank");
  };
  return (
    <div className="h-fit bg-bg6 md:h-screen py-auto" onMouseMove={handleMouseMove}>
      <Container classes="relative my-auto md:h-full md:w-3/4">
        <div className="first-grid">
          {/* Item-0 with Parallax Effect on Image Only */}
          <motion.div
            id="item-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.3 }} // Slight delay for smoother appearance
            className="rounded-xl box-border relative overflow-hidden h-1/3 md:h-full" // Ensures parallax doesn't spill outside
          >
            {/* Parallax Effect on the Image */}
            <motion.img
              className="object-cover absolute inset-0 rounded-xl w-full h-full scale-110"
              src="https://i.etsystatic.com/27994452/r/il/42b691/5433752864/il_1588xN.5433752864_9p7g.jpg"
              alt="sheep with heart wool brooch"
              initial={{ scale: 1.2 }}
              animate={{
                x: mousePosition.x * -0.5, // Dynamic movement on x-axis
                y: mousePosition.y * -0.5, // Dynamic movement on y-axis
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Static animations for item-1 */}
          <motion.div
            id="item-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
            className="rounded-xl relative p-5 flex flex-col justify-between box-border bg-color2"
          >
            <div>
              <h4 className="text-text1 font-serif text-left">Brooches to fit your style</h4>
              <h2 className="text-text1 font-serif text-left font-bold text-3xl">Get inspired</h2>
            </div>
            <div className="relative flex-grow h-1/2 flex items-end">
              <button onClick={handleClick} className="bg-text1 rounded-2xl py-2 px-4 font-serif text-sm hover:bg-text7 hover:text-text1 transition font-bold mb-4">
                Learn more
              </button>
              <img
                className="object-contain rounded-xl w-1/2 h-full ml-auto"
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165063/frontend/r7v2esy7g4tkyvm7be6c.png"
                alt="anya with a brooch"
              />
            </div>
          </motion.div>

          {/* Static animations for item-2 */}
          <motion.div
            id="item-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
            className="rounded-xl relative p-5 flex flex-col justify-between box-border bg-color3"
          >
            <div>
              <h4 className="text-text1 font-serif text-left">Brooches to fit your style</h4>
              <h2 className="text-text1 font-serif text-left font-bold text-3xl">Get inspired</h2>
            </div>
            <div className="relative flex-grow h-1/2 flex items-end">
              <button onClick={handleClick} className="bg-text1 rounded-2xl py-2 px-4 font-serif text-sm hover:bg-text7 hover:text-text1 transition font-bold mb-4">
                Learn more
              </button>
              <img
                className="object-contain rounded-xl w-1/2 h-full ml-auto"
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731432057/frontend/siyjofankhgraggf4odw.png"
                alt="mountains painting"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default FirstGridSection;
