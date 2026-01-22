"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useReducedMotion, PanInfo } from "framer-motion";

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
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeTestimonial = testimonials[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      }
      return (prev - 1 + testimonials.length) % testimonials.length;
    });
  }, []);

  const nextTestimonial = useCallback(() => paginate(1), [paginate]);
  const prevTestimonial = useCallback(() => paginate(-1), [paginate]);

  // Swipe handlers for mobile
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevTestimonial();
    } else if (info.offset.x < -swipeThreshold) {
      nextTestimonial();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 sm:py-20 md:py-28 lg:py-40 bg-background-dark overflow-hidden"
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-section-bg text-white whitespace-nowrap select-none pointer-events-none hidden sm:block"
      >
        STORIES
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
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
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTestimonial.id}
              custom={direction}
              variants={prefersReducedMotion ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="text-center cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {/* Quote */}
              <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-white leading-relaxed mb-8 sm:mb-10 md:mb-12 px-2">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-accent ring-offset-2 sm:ring-offset-4 ring-offset-background-dark">
                  <Image
                    src={activeTestimonial.image}
                    alt={activeTestimonial.author}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    {activeTestimonial.author}
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16">
            {/* Prev Button */}
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent active:border-accent active:text-accent active:scale-95 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 transition-all duration-300 text-white touch-target"
              aria-label="Previous testimonial"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-5 sm:h-5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots - Larger touch targets */}
            <div className="flex items-center gap-2 sm:gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-10 sm:h-11 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-full px-1`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span
                    className={`block h-2 sm:h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-accent w-6 sm:w-8"
                        : "bg-white/20 hover:bg-white/40 w-2 sm:w-3"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent active:border-accent active:text-accent active:scale-95 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 transition-all duration-300 text-white touch-target"
              aria-label="Next testimonial"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-5 sm:h-5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Swipe hint - Mobile only */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-white/30 text-xs text-center mt-6 sm:hidden"
          >
            Swipe to see more
          </motion.p>
        </div>
      </div>
    </section>
  );
}
