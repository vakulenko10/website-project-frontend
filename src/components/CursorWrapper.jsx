import React, { createContext, useState, useContext } from "react";

// Create the context
const CursorContext = createContext();

// Provider component
export const CursorProvider = ({ children }) => {
  const [cursorData, setCursorData] = useState(null);

  const updateCursorData = (data) => {
    setCursorData(data);
  };

  return (
    <CursorContext.Provider value={{ cursorData, updateCursorData }}>
      {children}
    </CursorContext.Provider>
  );
};

// Custom hook to use the cursor context
export const useCursor = () => useContext(CursorContext);
