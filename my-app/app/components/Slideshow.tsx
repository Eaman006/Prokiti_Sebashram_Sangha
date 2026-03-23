"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SlideshowProps {
  images: string[];
  // Change 'height' to 'className' for better flexibility
  className?: string; 
}

export default function Slideshow({ 
  images, 
  // Default to responsive heights if no class is provided
  className = "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]" 
}: SlideshowProps) {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    // Apply the className here
    <div className={`relative w-full overflow-hidden rounded-xl bg-gray-900 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
  src={images[index]}
  alt="Slideshow"
  fill
  className="object-contain" // Changed from object-cover
/>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}