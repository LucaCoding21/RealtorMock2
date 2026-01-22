"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: "200+", label: "Homes Sold" },
  { value: "12", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Disable parallax on mobile for better performance
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile || prefersReducedMotion ? ["0%", "0%"] : ["10%", "-10%"]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 md:py-28 lg:py-40 bg-background overflow-hidden"
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 heading-section-bg text-foreground whitespace-nowrap select-none pointer-events-none hidden sm:block"
      >
        ABOUT
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="mb-10 sm:mb-14 md:mb-20 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
          >
            Who You&apos;re Working With
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-xl text-foreground max-w-4xl"
          >
            Real estate doesn&apos;t have to be
            <span className="text-accent"> complicated.</span>
          </motion.h2>
        </div>

        {/* Main Content Grid - 2 columns at md */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-start md:items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm">
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 scale-105 sm:scale-110"
              >
                <Image
                  src="/about-photo.png"
                  alt="Alex Rivera - Real Estate Agent"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Floating Accent - Responsive positioning */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-4 right-4 sm:bottom-4 sm:right-0 md:-bottom-6 md:-right-6 lg:-bottom-8 lg:-right-8 bg-accent text-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-xl"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">12</p>
              <p className="text-[10px] sm:text-xs md:text-sm tracking-wider uppercase">Years</p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="order-2 md:py-4 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="heading-lg text-foreground mb-4 sm:mb-6">
                Alex Rivera
              </h3>

              <p className="body-large text-muted mb-4 sm:mb-6">
                I started in real estate because I was tired of seeing people get lost in the process.
                Buying or selling a home is already stressful enough — you don&apos;t need an agent who speaks in jargon.
              </p>

              <p className="body-regular text-muted mb-4 sm:mb-6 md:mb-8">
                My approach is simple: I listen first, explain everything in plain English, and fight for your best outcome.
                Whether you&apos;re a first-time buyer or you&apos;ve done this before, I&apos;m here to make it easier.
              </p>

              <p className="body-regular text-muted mb-8 sm:mb-10 md:mb-12">
                Vancouver&apos;s market moves fast. Let&apos;s make sure you don&apos;t miss your shot.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a href="#contact" className="btn-primary text-center">
                <span>Let&apos;s Talk</span>
              </a>
              <a href="#properties" className="btn-outline text-center">
                <span>View Listings</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 md:mt-28 lg:mt-32 pt-10 sm:pt-12 md:pt-16 border-t border-foreground/10"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-muted text-[10px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
