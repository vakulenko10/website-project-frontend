import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section className="relative h-[200vh] top-[-2rem] md:top-[-3rem] overflow-hidden flex flex-col items-center justify-center bg-transparent ">
      {/* Background Pattern */}
      {/* <div className="overflow-hidden h-[40rem] absolute"> */}
      <div className="absolute inset-0 w-full h-full top-[8rem] md:top-[15.5rem] z-0 bg-none ">
        {/* front block */}
        <div
          className={`absolute inset-0 bg-bg4 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem] rounded-[3rem] left-1/2   -translate-x-1/2 border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-10`}
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png)",
            backgroundSize: "cover", // Ensure image covers the div
            backgroundPosition: "center", // Center the image
          }}
        ></div>

        {/* left blocks */}
        <div
          className={`absolute inset-0 bg-bg4 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem] rounded-[3rem] left-[-7%]  -translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-3`}
        ></div>
        <div
          className={`absolute inset-0 bg-bg2 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem] rounded-[3rem] left-[1%]   -translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-4`}
        ></div>
        <div
          className={`absolute inset-0 bg-bg1 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem]  rounded-[3rem] left-[9%]   -translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-5`}
        ></div>
        <div
          className={`absolute inset-0 bg-color4 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem]  rounded-[3rem] left-[17%]   -translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-6`}
        ></div>
        <div
          className={`absolute inset-0 bg-bg3 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem]  rounded-[3rem] left-1/4   -translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-7`}
        ></div>
        <div
          className={`absolute inset-0 bg-text5 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem]  rounded-[3rem] left-[33%]   -translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-8`}
        ></div>

        {/* right blocks */}
        <div
          className={`absolute bg-bg4 md:w-[80rem] w-[40rem] h-[40rem]  md:h-[80rem]  rounded-[3rem] right-[-7%]  translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-3`}
        ></div>
        <div
          className={`absolute bg-bg2 md:w-[80rem] w-[40rem] h-[40rem] md:h-[80rem]  rounded-[3rem] right-[1%]  translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-4`}
        ></div>
        <div
          className={`absolute bg-bg1 md:w-[80rem] w-[40rem] h-[40rem] md:h-[80rem]  rounded-[3rem] right-[9%]  translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-5`}
        ></div>
        <div
          className={`absolute bg-color4 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem]  rounded-[3rem] right-[17%]  translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-6`}
        ></div>
        <div
          className={`absolute bg-bg3 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem] rounded-[3rem] right-1/4   translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-7`}
        ></div>
        <div
          className={`absolute bg-text5 w-[40rem] h-[40rem] md:w-[80rem] md:h-[80rem]  rounded-[3rem] right-[33%]   translate-x-[40%] border-black border-l-[.2rem] border-t-[.2rem] transform rotate-45 z-8`}
        ></div>

        
        {/* </div> */}
      </div>
      <div
          className={`absolute h-[140vh]  bottom-0 md:h-[90vh] 2xl:h-[100vh] 2xl:top-1/2 bg-bg4 w-screen md:top-3/4 z-100`}
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png)",
            backgroundSize: "cover", // Ensure image covers the div
            backgroundPosition: "center", // Center the image
          }}
        ></div>
      {/* Main Text */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          adipiscing elit, sed do elit, sed doelit,
        </h1>
        <p className="text-lg md:text-xl font-light text-white opacity-70">
          sed doelit, sed doelit, sed doelit, sed doelit, sed doelit, sed
          doelit, sed doelit, sed doelit, sed doelit, sed doelit, sed doelit,
          sed doedoe
        </p>
      </div>

      {/* House Image */}
      <div className="relative z-10 mt-8 mb-12">
        <img
          src="/path/to/house-image.png"
          alt="House"
          className="w-32 md:w-40 lg:w-48 mx-auto"
        />
      </div>

      {/* Testimonial Section */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-8">
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <p className="text-sm">
            click on that sticker to see more reviews from our handmade
            customers
          </p>
          <span className="text-red-600 text-xl">❤️</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <p className="italic">Testimonials...</p>
          <span className="text-red-600 text-xl">❤️</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <p className="font-bold">Lisa</p>
          <p className="text-sm">
            This is even more adorable than pictured. And you sent me two! Thank
            you so much!
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <p className="font-bold">Lisa</p>
          <p className="text-sm">
            This is even more adorable than pictured. And you sent me two! Thank
            you so much!
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <p className="font-bold">Lisa</p>
          <p className="text-sm">
            This is even more adorable than pictured. And you sent me two! Thank
            you so much!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
