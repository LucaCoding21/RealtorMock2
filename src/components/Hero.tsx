"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// Separate component for each letter to properly use hooks
function AnimatedLetter({
  letter,
  index,
  totalLetters,
  letterSpread,
  isLoaded,
}: {
  letter: string;
  index: number;
  totalLetters: number;
  letterSpread: MotionValue<number>;
  isLoaded: boolean;
}) {
  const x = useTransform(
    letterSpread,
    (v) => (index - (totalLetters - 1) / 2) * v
  );

  return (
    <motion.span
      initial={{ y: 200, opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : {}}
      transition={{
        duration: 1.2,
        delay: 0.5 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ x }}
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and scale transforms for scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Letter spread animation on scroll
  const letterSpread = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const letterOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  // Spring for smooth animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    // Trigger loaded state after a short delay for entrance animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nameLetters = "RIVERA".split("");

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <motion.div
          style={{ y: ySpring }}
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
            className="absolute inset-0 w-full h-full object-cover scale-110"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient overlay - fixed, doesn't move with parallax */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Main Content - Text masked with video */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center"
        >
          {/* The massive name - VIDEO MASKED */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex justify-center items-center"
              style={{ opacity: letterOpacity }}
            >
              {nameLetters.map((letter, index) => (
                <AnimatedLetter
                  key={index}
                  letter={letter}
                  index={index}
                  totalLetters={nameLetters.length}
                  letterSpread={letterSpread}
                  isLoaded={isLoaded}
                />
              ))}
            </motion.div>
          </div>

          {/* Subtitle - appears after name */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/90 text-base md:text-lg tracking-[0.3em] uppercase mt-6 md:mt-8 font-medium"
          >
            Real Estate Vancouver
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="#properties"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 btn-primary"
            data-cursor="View"
          >
            <span>View Properties</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.4, 1], y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Corner Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-12 left-8 md:left-12"
        >
          <p className="text-white/40 text-sm tracking-widest">SCROLL TO EXPLORE</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-12 right-8 md:right-12"
        >
          <p className="text-white/40 text-sm tracking-widest">VANCOUVER, BC</p>
        </motion.div>
      </div>
    </section>
  );
}
