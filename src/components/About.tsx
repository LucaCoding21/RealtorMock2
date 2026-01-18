"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import MagneticButton from "./MagneticButton";

// Animated counter hook
function useCounter(end: number, duration: number = 2, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

// Stats data
const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 2, suffix: "B+", prefix: "$", label: "Sales Volume" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

// Stat item component with counter
function StatItem({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) {
  const count = useCounter(stat.value, 2.5, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="text-center md:text-left"
    >
      <div className="flex items-baseline justify-center md:justify-start gap-1">
        {stat.prefix && (
          <span className="text-gold text-xl md:text-2xl font-light">{stat.prefix}</span>
        )}
        <span className="heading-display text-4xl md:text-5xl lg:text-6xl text-charcoal">
          {count}
        </span>
        <span className="text-gold text-xl md:text-2xl font-light">{stat.suffix}</span>
      </div>
      <p className="text-charcoal/50 text-sm tracking-[0.2em] uppercase mt-2">{stat.label}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-10%" });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Spring for smooth image scale on hover
  const imageScale = useSpring(1, { stiffness: 300, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 lg:py-40 bg-cream overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large background number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.03 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -top-20 -right-10 md:right-10 text-[20rem] md:text-[30rem] lg:text-[40rem] font-display text-charcoal leading-none select-none"
          style={{ fontFamily: "Playfair Display" }}
        >
          01
        </motion.span>

        {/* Floating gold accent line */}
        <motion.div
          style={{ y: decorY }}
          className="absolute top-40 left-[10%] w-px h-40 bg-gradient-to-b from-transparent via-gold to-transparent opacity-40"
        />

        {/* Dot pattern accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-20 right-[5%] w-32 h-32 dot-pattern opacity-30"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase">01</span>
            <div className="w-12 h-px bg-gold/40" />
            <span className="text-charcoal/50 text-sm tracking-[0.2em] uppercase">About</span>
          </motion.div>
        </div>

        {/* Main content grid - Balanced layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Image column - 5 columns for balance */}
          <div className="lg:col-span-5 relative">
            <motion.div
              ref={imageContainerRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[400px] mx-auto lg:mx-0"
              onMouseEnter={() => imageScale.set(1.02)}
              onMouseLeave={() => imageScale.set(1)}
            >
              {/* Decorative frame offset */}
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border border-gold/20 z-0" />

              {/* Main image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5">
                {/* Image reveal mask */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={isInView ? { scaleX: 0 } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="absolute inset-0 bg-cream z-20 origin-right"
                />

                <motion.div style={{ y: imageY, scale: imageScale }} className="relative w-full h-full">
                  <Image
                    src="/about-photo.png"
                    alt="Sophia Chen - Luxury Real Estate Specialist"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </motion.div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent z-10" />
              </div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: floatY }}
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-5 md:p-6 shadow-xl shadow-charcoal/8 z-30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-charcoal/50">Recognition</span>
                </div>
                <p className="text-charcoal text-sm leading-relaxed">
                  Top 1% Vancouver
                </p>
                <p className="text-gold text-[10px] mt-1">2015 - 2024</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Content column - Takes 7 columns */}
          <div ref={contentRef} className="lg:col-span-7 pt-4 lg:pt-0">

            {/* Main heading with reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="heading-display text-3xl md:text-4xl lg:text-5xl text-charcoal"
              >
                Meet
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="heading-display text-3xl md:text-4xl lg:text-5xl text-charcoal"
              >
                Sophia<span className="text-gold">.</span>
              </motion.h2>
            </div>

            {/* Personal philosophy quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 pl-5 border-l border-gold/40"
            >
              <p className="text-charcoal/70 text-base md:text-lg leading-relaxed italic">
                "I don't just sell homes - I help people find where their next chapter begins."
              </p>
            </motion.div>

            {/* Bio text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-charcoal/60 text-base md:text-lg leading-relaxed mb-8"
            >
              With over 15 years navigating Vancouver's luxury market, I've built my reputation
              on understanding that a home is never just a property - it's where life unfolds.
              My background in architecture gives me an eye for the details that transform
              spaces into sanctuaries.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-charcoal/60 text-base md:text-lg leading-relaxed mb-12"
            >
              Every client becomes family. Every transaction, a relationship that lasts
              long after the keys change hands.
            </motion.p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <Image
                src="/meow.png"
                alt="Sophia Chen Signature"
                width={192}
                height={80}
                className="w-40 md:w-48 h-auto"
              />
              <p className="text-charcoal/40 text-xs tracking-[0.2em] uppercase mt-2">Sophia Chen</p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton className="group">
                <span className="flex items-center gap-3">
                  Let's Connect
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Stats section */}
        <div ref={statsRef} className="mt-24 md:mt-32 lg:mt-40">
          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isStatsInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-charcoal/20 to-transparent mb-16 md:mb-20 origin-left"
          />

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <StatItem key={index} stat={stat} index={index} isInView={isStatsInView} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
