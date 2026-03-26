"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ 
  target, 
  duration = 2000, 
  suffix = "+" 
}: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasReached, setHasReached] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When it enters the screen, set visible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // When it leaves the screen, set visible to false so it can reset
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Only disconnect when the component completely unmounts (page change)
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // If it's not visible, reset the numbers and stop the animation
    if (!isVisible) {
      setCount(0);
      setHasReached(false);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setHasReached(true); 
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    // Cleanup function to cancel the animation frame if the user scrolls away mid-animation
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {hasReached && suffix}
    </span>
  );
}