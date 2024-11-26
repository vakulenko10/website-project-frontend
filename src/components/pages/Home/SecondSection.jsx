import React from "react";
import Container from "../../Container";

const SecondSection = () => {
  return (
    <div className="SecondSection  bg-bg6 py-10">
      <Container classes="">
        <div className="grid grid-cols-1 gap-8">
          {/* First Image Block */}
          <div className="relative rounded-xl overflow-hidden bg-cover bg-center shadow-lg group">
            <div
              className="h-56 md:h-72 w-full  bg-center bg-cover group-hover:scale-110 transition"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dujdz2jbl/image/upload/v1732571487/frontend/o5xoqwnwqanutihimq7n.jpg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-start  py-6 md:py-10 px-6 md:px-10">
              <p className="text-white font-serif text-lg md:text-xl font-medium text-start leading-snug">
                Searching for a <span className="font-bold">good present</span>{" "}
                but don’t have any idea?
              </p>
            </div>
          </div>

          {/* Second Image Block */}
          <div className="relative rounded-xl overflow-hidden bg-cover bg-center shadow-lg group">
            <div
              className="h-56 md:h-72 w-full bg-center bg-cover group-hover:scale-110 transition"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dujdz2jbl/image/upload/v1732571487/frontend/bsogureba28q0rteqib5.jpg')", // Replace with the second image URL
              }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end  py-6 md:py-10 px-6 md:px-10">
              <p className="text-white text-lg md:text-xl font-serif font-medium leading-snug text-right ml-auto">
                Our <span className="font-bold">handmade brooches</span> are the
                best present for your loved ones.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SecondSection;
