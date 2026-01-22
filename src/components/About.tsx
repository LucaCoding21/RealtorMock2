"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
  { value: "200+", label: "Homes Sold" },
  { value: "12", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 heading-section-bg text-foreground whitespace-nowrap select-none pointer-events-none"
      >
        ABOUT
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4"
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 scale-110"
              >
                <Image
                  src="/about-photo.png"
                  alt="Alex Rivera - Real Estate Agent"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Floating Accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-4 right-0 md:-bottom-8 md:-right-8 bg-accent text-white p-5 md:p-8 shadow-xl"
            >
              <p className="text-2xl md:text-4xl font-bold">12</p>
              <p className="text-xs md:text-sm tracking-wider uppercase">Years</p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="heading-lg text-foreground mb-6">
                Alex Rivera
              </h3>

              <p className="body-large text-muted mb-6">
                I started in real estate because I was tired of seeing people get lost in the process.
                Buying or selling a home is already stressful enough — you don&apos;t need an agent who speaks in jargon.
              </p>

              <p className="body-regular text-muted mb-8">
                My approach is simple: I listen first, explain everything in plain English, and fight for your best outcome.
                Whether you&apos;re a first-time buyer or you&apos;ve done this before, I&apos;m here to make it easier.
              </p>

              <p className="body-regular text-muted mb-12">
                Vancouver&apos;s market moves fast. Let&apos;s make sure you don&apos;t miss your shot.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="btn-primary">
                <span>Let&apos;s Talk</span>
              </a>
              <a href="#properties" className="btn-outline">
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
          className="mt-24 md:mt-32 pt-16 border-t border-foreground/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center md:text-left"
              >
                <p className="heading-lg text-accent mb-2">{stat.value}</p>
                <p className="text-muted text-sm tracking-[0.15em] uppercase">
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
