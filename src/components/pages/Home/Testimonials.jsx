import React from "react";
import { motion } from "framer-motion";
import {testimonialsData} from '../../../services/staticVars'
import Container from "../../Container";

const Testimonials = () => {

  const getRandomRotation = () => {
    const rotations = [-10, -5, -3, 0, 3, 5, 10];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };
  const getRandomStickerPosition = () => {
    const positions = [
      { top: "5%", left: "5%" }, // Top-Left Corner
      { top: "5%", right: "5%" }, // Top-Right Corner
      { bottom: "5%", left: "5%" }, // Bottom-Left Corner
      { bottom: "5%", right: "5%" }, // Bottom-Right Corner
    ];

    // Randomly select one of the corner positions
    return positions[Math.floor(Math.random() * positions.length/2)];
  };
  return (
    <section className="relative min-h-fit top-[-2rem] md:top-[-3rem] overflow-hidden flex flex-col items-center justify-center bg-transparent ">
      {/* Background Pattern */}
      {/* <div className="overflow-hidden h-[40rem] absolute"> */}
      <div className="backgroundBlocks absolute inset-0 w-full h-full top-[8rem] p-0 md:top-[15.5rem] z-0 bg-none ">
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
        className={`absolute  h-[90vh] sm:h-[70vh] border-b-4 border-black  bottom-1/3  md:h-[90vh] 2xl:h-[100vh] 2xl:top-1/2 bg-bg4 w-screen md:top-3/4 z-3`}
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png)",
          backgroundSize: "cover", // Ensure image covers the div
          backgroundPosition: "center", // Center the image
        }}
      ></div>
      {/* <div
        className={`absolute h-[70vh] border-b-4 border-black  bottom-0 bg-bg4 w-screen z-3`}
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png)",
          backgroundSize: "cover", // Ensure image covers the div
          backgroundPosition: "center", // Center the image
        }}
      ></div> */}
      {/* Main Text */}

      <div className="relative  overflow-hidden flex flex-col items-center justify-center bg-transparent">
        <div>
          <div className="h-screen flex  w-full relative  justify-center items-center">
            <Container classes="relative h-full box-border">
              <div className=" flex  h-full w-full relative  justify-center py-[5%] items-center md:items-start verflow-hidden">
                <div className="w-full mx-auto pt-8 flex flex-col h-full justify-start items-center md:block ">
                  <img
                    src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731342084/frontend/wugxa1uwhrhl4ss8mlia.png"
                    alt="house"
                    className="float-right w-[10rem]  h-[10rem] md:w-[18rem] md:h-[18rem] pt-[2%]"
                  />
                  <h1 className="text-start font-serif font-extrabold text-3xl sm:text-4xl md:text-6xl leading-normal text-text1 text-wrap break-words">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elite
                    lite lit elit. Eligendi laborum volup laboriosam quae
                    tenetur isicing elite lite lit elit. Eligendi laborum volup
                    laboriosam quae tenetur
                  </h1>
                </div>
              </div>
            </Container>
          </div>

          <div className="relative z-15 py-[4rem] min-h-screen h-fit mt-10 w-screen">
            <div
              className={`absolute h-full bottom-0 bg-bg4 w-screen  z-9`}
              style={{
                backgroundImage:
                  "url(https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png)",
                backgroundSize: "repeat", // Ensure image covers the div
                backgroundPosition: "center", // Center the image
                backgroundRepeat:'repeat'
              }}
            ></div>
            
            <Container classes="w-screen min-h-screen flex flex-col sm:grid grid-cols-1 justify-center items-center text-center sm:grid-cols-2 md:grid-cols-3 gap-8 py-[10rem] md:px-12">
            {testimonialsData.map((testimonial, index) => {
              const stickerPosition = getRandomStickerPosition();
              return (
                <motion.div
                  key={index}
                  className=" p-3 md:p-6 bg-white h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem]  md:h-[13rem] md:w-[13rem]  xl:h-[15rem] xl:w-[15rem] shadow-lg flex flex-col justify-center items-center text-center transform relative justify-self-center"
                  style={{ rotate: `${getRandomRotation()}deg` }}
                >
                  {/* Sticker with random chaotic positioning */}
                  <div
                    className="absolute"
                    style={{
                      ...stickerPosition,
                      transform: "translate(-50%, -50%)",
                      rotate: `${getRandomRotation()}deg`,
                    }}
                  >
                    <img
                      src={testimonial.sticker}
                      alt="sticker"
                      className="w-8 h-8 md:w-[4rem] md:h-[4rem]"
                    />
                  </div>
                  <p className=" mt-4 md:mt-10 font-display font-normal text-text5">{testimonial.name}</p>
                  <p className="text-sm mt-2 font-display text-text3">{testimonial.text}</p>
                </motion.div>
              );
            })}
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
