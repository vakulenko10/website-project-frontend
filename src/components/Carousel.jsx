import { useState } from "react";

const Carousel = ({ slides, classes }) => {
  let [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className={`relative w-full h-[400px] overflow-hidden ${classes}`}>
      {/* Image container */}
      <div
        className="flex h-full w-full  transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => (
          <div key={index} className="relative h-full w-full flex items-center justify-center flex-shrink-0 p-3">
            <img
              src={s}
              alt={`Slide ${index + 1}`}
              className=" h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className=" absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center ">
        <button
          onClick={previousSlide}
          className="text-white text-xl bg-text2 bg-opacity-50 px-4 rounded-full hover:bg-opacity-75"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="text-white text-xl bg-text2 bg-opacity-50 px-4 rounded-full hover:bg-opacity-75"
        >
          &#10095;
        </button>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
