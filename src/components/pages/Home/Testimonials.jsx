import React from "react";
import { motion } from "framer-motion";
import {getRandomRotation, getRandomStickerPosition, testimonialsData} from '../../../services/staticVars'
import Container from "../../Container";
import { Link } from "react-router-dom";

const Testimonials = () => {

 
  return (
    <section className="relative min-h-screen h-fit  flex flex-col items-center justify-center bg-transparent  bg-color4">

      <div className="relative  flex flex-col items-center justify-center bg-transparent">
        
          <div className="min-h-screen  mt-[-2rem] md:mt-[-3rem] flex  w-full relative justify-center items-center " >
            <img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731428132/frontend/o0wp7lbmd1isb7otgzpz.png" alt="bakground" className="object-cover md:object-fill md:w-full absolute h-full inset-0" />
            <Container classes="relative flex justify-center items-center box-border ">
              
                <div className="w-full m-auto px-8 py-[2rem] md:pt-[5rem] flex flex-col h-full md:justify-center xl:justify-start items-center md:block " >
                  <img
                    src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731342084/frontend/wugxa1uwhrhl4ss8mlia.png"
                    alt="house"
                    className="float-right w-[10rem]  h-[10rem] md:w-[15rem] md:h-[15rem] xl:w-[18rem] xl:h-[18rem]  pt-[2%]"
                  />
                  <h1 className="text-start font-serif font-extrabold text-3xl sm:text-5xl  xl:text-6xl  text-text1 text-wrap break-words py-3">
                  Discover our exquisite collection of handcrafted wool brooches, meticulously designed to add a unique, artistic touch to any outfit. Quality, creativity, and elegance.
                  </h1>
                </div>
            </Container>
          </div>

          <div className=" relative z-15 py-[4rem] pb-[10rem] min-h-screen h-fit mt-[-1rem] w-screen bg-bg4" style={{backgroundImage: 'url("https://res.cloudinary.com/dujdz2jbl/image/upload/v1731270495/frontend/a9k9ru2nqpftkgg38uww.png")'}}>
             <h1 className="z-15 font-serif font-extrabold text-3xl sm:text-5xl m-0 p-0 xl:text-[5rem]  text-text1">
                    Testimonials
                </h1>
            <Container classes="w-screen min-h-screen flex flex-col sm:grid grid-cols-1 justify-center items-center text-center sm:grid-cols-2 md:grid-cols-3 gap-8 py-[2rem] md:px-12">
            <Link to="https://www.etsy.com/shop/anfihandmade/?etsrc=sdt#reviews" target="_blank"><motion.div
                  key='sadgs'
                  className=" testimonial p-3 md:p-6 bg-white h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem]  md:h-[13rem] md:w-[13rem]  xl:h-[15rem] xl:w-[15rem] shadow-lg flex flex-col justify-center items-center text-center transform relative justify-self-center"
                  style={{ rotate: `${getRandomRotation()}deg` }}
                >
                  <p className=" mt-4 md:mt-10 font-display font-normal text-text5">Click to see more </p>
                  <p className="text-sm mt-2 font-display text-text3">by clicking on that sticker, you will be redirected to the etsy testimonials page</p>
                </motion.div></Link>
            {testimonialsData.map((testimonial, index) => {
              const stickerPosition = getRandomStickerPosition();
              return (
                <motion.div
                  key={index}
                  className=" testimonial p-3 md:p-6 bg-white h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem]  md:h-[13rem] md:w-[13rem]  xl:h-[15rem] xl:w-[15rem] shadow-lg flex flex-col justify-center items-center text-center transform relative justify-self-center"
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
