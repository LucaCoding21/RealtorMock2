"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const achievements = [
  "Ranked in the Top 1% of Vancouver Realtors from 2015 - 2024",
  "$2B+ in all time sales volume",
  "Top 1% of Agents Nationwide by Real Estate Board of Greater Vancouver",
  "Featured in Vancouver Magazine's Top Realtors 2020 - 2024",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop"
                alt="Sophia Chen - Luxury Real Estate Specialist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-8"
          >
            {/* Heading */}
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-[0.1em] uppercase mb-6 md:mb-8">
              Meet Sophia
            </h2>

            {/* Bio */}
            <p className="text-charcoal/70 text-base md:text-lg leading-relaxed mb-10">
              With over 15 years of experience in Vancouver&apos;s luxury real
              estate market, I&apos;ve built my reputation on an unwavering
              commitment to excellence and a deep understanding of what makes
              a house truly exceptional. My background in architecture gives me
              a unique perspective on property value, design integrity, and the
              subtle details that transform living spaces into sanctuaries.
            </p>

            {/* Achievements List */}
            <div className="space-y-0 mb-10">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="py-4 border-b border-charcoal/20"
                >
                  <p className="text-charcoal text-sm md:text-base">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="px-8 py-4 border border-charcoal text-charcoal text-sm tracking-[0.15em] uppercase hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
