import React from 'react';
import Container from "../../Container";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/shop'); // Redirects to the /shop page
  };

  return (
    <header className="relative h-[100svh] w-full flex items-center justify-center text-text7">
      <Container>
        <div>
          <img
            src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165684/frontend/ppdely8eybqia7ho5ubf.png"
            alt="Background"
            className="absolute inset-0 bg-bottom w-full h-full object-cover"
            draggable="false"
            loading="lazy"  // Lazy load added here
          />
          <img
            src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731167718/frontend/gqltlhse0qgtzlq0olo0.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
            loading="lazy"  // Lazy load added here
          />

          {/* Overlay text */}
          <div className="relative text-center space-y-4 z-10 font-extraBold w-full">
            <h2 className="text-2xl text-text1 font-serif tracking-normal">anfi handmade.</h2>
            <div className="text-6xl font-bold font-sans leading-tight">
              <h1 className="font-serif">
                <span className="text-text2 font-serif z-1 leading-tight lg:text-[5rem] mb-10 mr-5 md:mr-3">the</span>
                <span className="text-color5 font-serif leading-tight lg:text-[5rem] mb-10 md:ml-3">best</span>
                <span className="block text-text2 font-serif leading-ultraLoose pt-[-30px] lg:text-[5rem] mt-10 ">products</span>
              </h1>
            </div>
            <button
              className="mt-5 px-8 py-2 border-text1 border-4 text-text1 rounded-[10px] shadow-md font-thin text-base font-display transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-80 hover:bg-text1 hover:text-white"
              style={{
                backgroundImage: 'url("https://res.cloudinary.com/dujdz2jbl/image/upload/v1731173044/frontend/mzsxnierxcaoyodv01zk.png")',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              onClick={handleClick}
            >
              shop now
            </button>

            {/* Floating images */}
            <div className="absolute top-1/3 left-[1%] xsm:left-[10%] sm:left-1/4 transform -translate-y-1/2 rotate-[20deg] z-0">
              <img
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165063/frontend/fmw7wiitxwsxbs19e7cn.png"
                draggable="false"
                alt="Product 1"
                className="w-auto h-[8rem] lg:h-[10rem]"
                loading="lazy"  // Lazy load added here
              />
            </div>
            <div className="absolute top-1/3 right-[1%] xsm:right-[10%] sm:right-1/4 transform -translate-y-1/2 rotate-[-20deg] z-0">
              <img
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165063/frontend/q3ucarl3d7tdeulur45z.png"
                draggable="false"
                alt="Product 2"
                className="w-auto h-[8rem] lg:h-[10rem]"
                loading="lazy"  // Lazy load added here
              />
            </div>
            <div className="absolute top-1/2 right-1/2 transform -translate-y-2/3 translate-x-1/2 z-0">
              <img
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165063/frontend/r7v2esy7g4tkyvm7be6c.png"
                draggable="false"
                alt="Product 3"
                className="w-auto h-[12rem] lg:h-[13rem]"
                loading="lazy"  // Lazy load added here
              />
              <span className="text-text1 font-serif z-10 absolute top-1/2 right-1/2 -translate-y-2/3 lg:top-1/3 lg:-translate-y-[-0%] translate-x-1/2 text-6xl lg:text-[5rem]">
                handmade
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeroSection;
