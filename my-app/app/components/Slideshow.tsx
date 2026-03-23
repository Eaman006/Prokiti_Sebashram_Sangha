"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Define what the component expects to receive
interface SlideshowProps {
  images: string[];
  height?: string; // Optional: allow different pages to have different heights
}

export default function Slideshow({ images, height = "h-[500px]" }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-xl bg-gray-900`}>
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
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}