import React, { useEffect, useState } from "react";
import { useCursor } from "./CursorWrapper";
import { motion } from "framer-motion"; // Import framer-motion
import './CustomCursor.css';

const CustomCursor = () => {
  const { cursorData } = useCursor(); // Get the cursor data from context
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [waves, setWaves] = useState([]); // State for wave animations

  // Update cursor position
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle click event to trigger wave animations
  const handleMouseClick = () => {
    const id = Date.now(); // Unique ID for each wave
    setWaves((prev) => [...prev, id]);

    // Remove wave after animation (e.g., 1s)
    setTimeout(() => {
      setWaves((prev) => prev.filter((waveId) => waveId !== id));
    }, 1000);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleMouseClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <div
      className="custom-cursor hidden md:w-[25px] bg-text6 md:h-[25px] md:block md:fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform:  "translate(-50%, -50%)",
      }}
    >
      {/* Render the cursor waves */}
      {waves.map((waveId) => (
        <motion.div
          key={waveId}
          className="cursor-wave bg-text6 opacity-10 rounded-full absolute inset-0"
          style={{
            top: '-3px',
            left: '-5px',
            right:'0px',
            bottom:'0px',
            width: "25px",
            height: "25px",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Main cursor content */}
      {cursorData && (
        <motion.div
          className="cursor-content bg-text6 p-3 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {cursorData}
        </motion.div>
      )}
    </div>
  );
};

export default CustomCursor;
