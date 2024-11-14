// Links.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { links } from '../../../services/staticVars';



const Links = () => {
  const position = "right";
  const positionStyles = position === 'left' ? 'left-0' : 'right-0';

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY + window.innerHeight < document.body.offsetHeight) {
        // Scrolling down and not at the bottom
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY + window.innerHeight >= document.body.offsetHeight) {
        // Scrolling up or reaching the bottom
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${isVisible?'fixed':'hidden'}  top-0 ${positionStyles} p-4 rounded-lg z-50`}
    >
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index} className="flex items-center space-x-2">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-color8 hover:text-text6 transition duration-300"
            >
              <span className="mr-2">{link.icon}</span>
              {/* {link.label} */}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Links;
