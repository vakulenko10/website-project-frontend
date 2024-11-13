"use client"

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

export function TypingEffect({ children, classes, component: Tag = 'div' }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Helper function to apply animation only to text nodes
  const animateText = (node) => {
    if (typeof node === 'string') {
      // Split the text into individual characters and animate each
      return node.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          {letter}
        </motion.span>
      ));
    }
    // If it's not a string (i.e., it's a React component or HTML tag), return it as is
    return node;
  };

  return (
    <Tag ref={ref} className={classes}>
      {React.Children.map(children, (child) => {
        // Check if the child is a React element or a text node
        if (typeof child === 'string') {
          return animateText(child);
        } else if (React.isValidElement(child)) {
          // Recursively handle the case where nested elements contain text nodes
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, animateText),
          });
        }
        return child;
      })}
    </Tag>
  );
}
