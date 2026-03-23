"use client";
import { motion } from "framer-motion";

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number; // Optional speed control
  once?: boolean; // Choose if it types every time you scroll, or just the first time
}

export default function TypingEffect({ 
  text, 
  className = "", 
  speed = 0.05,
  once = true 
}: TypingEffectProps) {
  // Split the text into an array of individual characters
  const characters = Array.from(text);

  // Parent container controls the staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed, // Time between each letter appearing
      },
    },
  };

  // Individual character animation
  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      // whileInView triggers the "visible" variant when scrolled into the viewport
      whileInView="visible" 
      // viewport options: 
      // 'once: true' means it only types once. 
      // 'amount: 0.5' means it waits until 50% of the element is visible before starting.
      viewport={{ once: once, amount: 0.5 }}
      className={`inline-block ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span 
          key={index} 
          variants={charVariants}
          // We preserve spaces so the text doesn't mash together
          className={char === " " ? "whitespace-pre" : ""}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}