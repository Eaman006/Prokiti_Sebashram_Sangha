"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function FadeIn({ children, delay = 0, direction = "none" }: FadeInProps) {
  // Define directional offsets
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
}