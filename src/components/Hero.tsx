"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue, useReducedMotion } from "framer-motion";

// Check if device is touch-based
const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
};

// Separate component for each letter to properly use hooks
function AnimatedLetter({
  letter,
  index,
  totalLetters,
  letterSpread,
  isLoaded,
  isMobile,
}: {
  letter: string;
  index: number;
  totalLetters: number;
  letterSpread: MotionValue<number>;
  isLoaded: boolean;
  isMobile: boolean;
}) {
  // Reduce spread effect on mobile
  const x = useTransform(
    letterSpread,
    (v) => (index - (totalLetters - 1) / 2) * (isMobile ? v * 0.5 : v)
  );

  return (
    <motion.span
      initial={{ y: isMobile ? 80 : 200, opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : {}}
      transition={{
        duration: isMobile ? 0.8 : 1.2,
        delay: 0.3 + index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ x: isMobile ? 0 : x }}
      className="heading-hero text-white inline-block"
    >
      {letter}
    </motion.span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(isTouchDevice());

    const handleResize = () => {
      setIsMobile(isTouchDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax and scale transforms for scroll - reduced on mobile
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "20%" : "40%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Letter spread animation on scroll - disabled on mobile
  const letterSpread = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, isMobile ? 50 : 200]
  );
  const letterOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  // Spring for smooth animations - snappier on mobile
  const springConfig = isMobile
    ? { stiffness: 200, damping: 40, restDelta: 0.001 }
    : { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    // Trigger loaded state - faster on mobile
    const timer = setTimeout(() => setIsLoaded(true), isMobile ? 50 : 100);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const nameLetters = "RIVERA".split("");

  // Disable parallax completely if reduced motion is preferred
  const parallaxY = prefersReducedMotion ? "0%" : ySpring;

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] md:h-[200vh]"
    >
      <div className="md:sticky md:top-0 h-[100svh] md:h-screen w-full overflow-hidden">
        {/* Video Background */}
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-105 md:scale-110"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 md:from-black/30 md:via-transparent md:to-black/60" />

        {/* Main Content */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 1 : opacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center px-4"
        >
          {/* The massive name */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex justify-center items-center"
              style={{ opacity: prefersReducedMotion ? 1 : letterOpacity }}
            >
              {nameLetters.map((letter, index) => (
                <AnimatedLetter
                  key={index}
                  letter={letter}
                  index={index}
                  totalLetters={nameLetters.length}
                  letterSpread={letterSpread}
                  isLoaded={isLoaded}
                  isMobile={isMobile}
                />
              ))}
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: isMobile ? 0.8 : 1.4,
              duration: isMobile ? 0.6 : 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-white/90 text-sm sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-4 sm:mt-6 md:mt-8 font-medium text-center"
          >
            Real Estate Vancouver
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="#properties"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: isMobile ? 1.0 : 1.6,
              duration: isMobile ? 0.6 : 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="mt-8 sm:mt-10 md:mt-12 btn-primary"
            data-cursor="View"
          >
            <span>View Properties</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator - Hidden on small mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: isMobile ? 1.2 : 2, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-4 hidden sm:flex"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center pt-1.5 sm:pt-2"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { opacity: [1, 0.4, 1], y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Corner Elements - Responsive positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: isMobile ? 1.2 : 1.8, duration: 0.8 }}
          className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 md:left-12 hidden sm:block"
        >
          <p className="text-white/40 text-xs sm:text-sm tracking-widest">SCROLL TO EXPLORE</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: isMobile ? 1.2 : 1.8, duration: 0.8 }}
          className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 md:right-12 hidden sm:block"
        >
          <p className="text-white/40 text-xs sm:text-sm tracking-widest">VANCOUVER, BC</p>
        </motion.div>

        {/* Mobile-only bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center sm:hidden"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-white/50 text-xs tracking-wider">Scroll</p>
            <svg
              className="w-4 h-4 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
