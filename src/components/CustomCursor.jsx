import React, { useEffect, useState } from "react"; // Import the context
import { useCursor } from "./CursorWrapper";
import { motion } from "framer-motion"; // Import framer-motion
import './CustomCursor.css';

const CustomCursor = () => {
  const { cursorData } = useCursor(); // Get the cursor data from context
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update cursor position
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="custom-cursor cursor-none hidden md:w-[25px] bg-text6 md:h-[25px] md:block md:fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {cursorData && (
        <motion.div
          className="cursor-content bg-text6 p-3 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs"
          initial={{ opacity: 0, scale: 0.5 }} // Initial state
          animate={{ opacity: 1, scale: 1 }}   // Animate to full opacity and scale
          exit={{ opacity: 0, scale: 0.5 }}     // Exit animation
          transition={{ duration: 0.3 }}        // Set the duration for the transition
        >
          {cursorData}
        </motion.div>
      )}
    </div>
  );
};

export default CustomCursor;
