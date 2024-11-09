import React from 'react';
import Container from '../../Container';

const IntroSection = () => {
  return (
    <div className="intro_section__wrapper  bg-bg1 min-h-screen flex items-center justify-center relative w-full">
        <img
            src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731175914/frontend/bs5umtsyebdfryclkry7.png"
            alt="Background"
            className="absolute inset-0 bg-bottom w-full h-full object-contain lg:object-cover bg-no-repeat"
            draggable="false"
        />
      <Container>
        {/* CSS Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-8 items-center relative">
          {/* Left Image */}
          <div className="flex justify-center md:justify-end">
            <div className="rounded-lg overflow-hidden border-4 border-color5 p-1 transform translate-x-4 translate-y-8 md:translate-x-8 md:translate-y-16">
              <img
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731174349/frontend/h8aaqo6mbzzwo0rnpqez.png"
                alt="Left Visual"
                className="w-40 h-40 md:w-56 md:h-56 object-cover"
              />
            </div>
          </div>

          {/* Text Block (Center) */}
          <div
            className="text-container text-center md:text-left space-y-2 text-4xl md:text-5xl font-bold font-sans text-text1 col-span-1 relative"
          >
            {/* Treating the entire text block as a single entity for future animations */}
            <div className="leading-tight">
              adipiscing <br />
              <span className="text-text2 opacity-80">elit, sed do</span> <br />
              <span className="text-text2 opacity-80">lorem ipsum dolor sit sdsa</span> <br />
              <span className="text-text2 opacity-80">adipiscing elit, sdd</span> <br />
              <span className="text-text2 opacity-80">sdasdfgsedssdfss</span> <br />
              <span className="text-text2 opacity-80">dfsds dssadfsado</span> <br />
              <span className="text-text2 opacity-80">lorem ipsum dolor sit sdsa</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-start">
            <div className="rounded-lg overflow-hidden border-4 border-color5 p-1 transform -translate-x-4 -translate-y-8 md:-translate-x-8 md:-translate-y-16">
              <img
                src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165684/frontend/ppdely8eybqia7ho5ubf.png"
                alt="Right Visual"
                className="w-40 h-40 md:w-56 md:h-56 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Zigzag Lines */}
        
      </Container>
    </div>
  );
};

export default IntroSection;
