"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide preloader after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="heading-display text-4xl md:text-5xl text-gradient">
              Sophia Chen
            </h1>
            <p className="text-center text-white/40 text-sm tracking-[0.3em] uppercase mt-2">
              Luxury Real Estate
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 md:w-64">
            <div className="h-px bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-gold"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white/30 text-xs mt-4 tracking-widest"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute w-[500px] h-[500px] border border-gold/20 rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute w-[700px] h-[700px] border border-gold/20 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
