import React from "react";
import { links } from "../../../services/staticVars"; // Import the links array
import Container from "../../Container";
const FollowUsSection = () => {
  return (
    <div className="bg-bg6 py-16 px-4 min-h-screen w-full relative">
      {/* Section Header */}
      <h2 className="text-3xl md:text-5xl font-bold text-center text-[#5a2424] mb-10">
        Follow us
      </h2>

      {/* Links */}<Container>
      <div className=" h-full flex flex-col sm:grid sm:grid-cols-3 gap-6 w-full mx-auto">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group h-full"
          >
            {/* Image */}
            <div className="h-full rounded-xl shadow-md overflow-hidden">
              <img
                src={link.img}
                alt={link.label}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center ">
              <div className="text-white">{link.icon}</div>
            </div>
          </a>
        ))}
      </div>
      </Container>
    </div>
  );
};

export default FollowUsSection;
