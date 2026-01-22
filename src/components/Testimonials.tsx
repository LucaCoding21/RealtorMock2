"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Alex made buying our first home feel effortless. He explained every step without making us feel dumb, and found us a place we actually love within our budget.",
    author: "Sarah & Mike Chen",
    role: "First-time buyers",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "Sold our house in 2 weeks, $40K over asking. Alex's marketing strategy was next level. Other agents we talked to just wanted to list and wait.",
    author: "The Martinez Family",
    role: "Sellers",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "I was relocating from Toronto and Alex did everything remotely. Virtual tours, negotiations, inspections — he handled it all. Moved into a great place sight unseen.",
    author: "David Park",
    role: "Relocation buyer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 lg:py-40 bg-background-dark overflow-hidden"
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-section-bg text-white whitespace-nowrap select-none pointer-events-none"
      >
        STORIES
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Don&apos;t Take My Word For It
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-xl text-white"
          >
            Real clients,
            <br />
            <span className="text-accent">real results.</span>
          </motion.h2>
        </div>

        {/* Testimonial Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-12">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent ring-offset-4 ring-offset-background-dark">
                  <Image
                    src={activeTestimonial.image}
                    alt={activeTestimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {activeTestimonial.author}
                  </p>
                  <p className="text-white/50 text-sm">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-16">
            {/* Prev Button */}
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 transition-all duration-300 text-white"
              aria-label="Previous testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                    index === activeIndex
                      ? "bg-accent w-8"
                      : "bg-white/20 hover:bg-white/40 w-3"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 transition-all duration-300 text-white"
              aria-label="Next testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
