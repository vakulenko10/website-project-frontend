import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "../../Container";

const WelcomeSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({
      x: (clientX / window.innerWidth - 0.5) * 100, // Normalize and scale
      y: (clientY / window.innerHeight - 0.5) * 100,
    });
  };

  return (
    <header
      className="welcomeSection relative box-border bg-text3 h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove} // Track mouse movement
    >
      <Container classes="relative h-full p-0 px-5">
        <div className="welcomeSection_inner relative flex flex-col justify-center items-center h-full">
          {/* First H1 */}
          <h1 className="font-serif font-extraBold text-4xl md:text-[5rem] w-full text-text1 my-10 p-0 flex justify-between">
            <span className="text-start p-0 m-0">Welcome</span>
            <span className="text-end p-0 m-0">to</span>
          </h1>

          {/* Background image div with parallax effect */}
          <div className="relative h-[30%] md:h-[70%] w-full box-border bg-cover bg-center rounded-xl overflow-hidden group">
            <motion.div
              className="h-full w-full bg-cover bg-center transition-transform ease-linear group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dujdz2jbl/image/upload/v1732568986/frontend/t281hnn7fslr1cxlt3wp.jpg')",
              }}
              initial={{ scale: 1.2 }} // Start slightly scaled
              animate={{
                x: mousePosition.x * -0.5, // Move dynamically based on cursor
                y: mousePosition.y * -0.5,
              }}
              transition={{ duration: 0.1 }} // Minimal delay for smoother real-time effect
            ></motion.div>
          </div>

          {/* Second H1 */}
          <h1 className="font-serif font-extraBold text-4xl md:text-[5rem] w-full text-text1 uppercase my-10 p-0 flex justify-between">
            <span className="text-start p-0 m-0">anfi</span>
            <span className="text-end p-0 m-0">handmade</span>
          </h1>
        </div>
      </Container>
    </header>
  );
};

export default WelcomeSection;
