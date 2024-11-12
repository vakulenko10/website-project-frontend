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

      <div className="relative overflow-hidden flex flex-col items-center justify-center bg-transparent">
        
          <div className="min-h-screen flex  w-full relative justify-center items-center " >
            <img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731428132/frontend/o0wp7lbmd1isb7otgzpz.png" alt="bakground" className="object-cover md:object-fill md:w-full absolute h-full inset-0" />
            <Container classes="relative flex justify-center items-center box-border ">
              
                <div className="w-full m-auto px-8 py-[2rem] md:py-[5rem] flex flex-col h-full justify-center xl:justify-start items-center md:block " >
                  <img
                    src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731342084/frontend/wugxa1uwhrhl4ss8mlia.png"
                    alt="house"
                    className="float-right w-[10rem]  h-[10rem] md:w-[15rem] md:h-[15rem] xl:w-[18rem] xl:h-[18rem]  pt-[2%]"
                  />
                  <h1 className="text-start font-serif font-extrabold text-3xl sm:text-5xl  xl:text-[5rem]  text-text1 text-wrap break-words py-3">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elite
                    lite lit elit. Eligendi laborum volup l laborum volup l laborum volup l Eligendi laborum volup l laborum volup l laborum volup l Eligendi laborum volup l laborum volup l laborum volup l
                  </h1>
                </div>
            </Container>
          </div>

          <div className="relative z-15 py-[4rem] min-h-screen h-fit mt-[-1rem] w-screen bg-bg4" style={{backgroundImage: 'url("https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png")'}}>
             <h1 className="z-15 font-serif font-extrabold text-3xl sm:text-5xl  mb-10 xl:text-[5rem]  text-text1">
                    Testimonials
                </h1>
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
    </section>
  );
};

export default Testimonials;
