import React from "react";
import { testimonialsData } from "../../../services/staticVars";


const TestimonialsSection = () => {
  return (
    <div className="bg-bg6 py-16 px-4">
      <h2 className="text-3xl md:text-6xl font-bold text-center text-text3 font-serif mb-10">
        What people are saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonialsData.map(({ name, text }, index) => (
          <div
            key={index}
            className="p-6 text-center"
          >
            {/* Star Ratings */}
            <div className="flex justify-center mb-4">
              {Array(5)
                .fill("")
                .map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5 text-text3 mx-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.423l-6 6.083 1.396 8.587L12 18.89l-7.396 5.203L6 15.506 0 9.423l8.332-1.268z" />
                  </svg>
                ))}
            </div>
            {/* Testimonial Text */}
            <p className="text-text3 italic text-sm mb-2">"{text}"</p>
            {/* User Name */}
            <p className="text-text3 font-bold">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
