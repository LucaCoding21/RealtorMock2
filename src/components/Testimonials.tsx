"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";
import AnimatedText from "./AnimatedText";

const testimonials = [
  {
    id: 1,
    quote:
      "Sophia's understanding of the luxury market is unparalleled. She found us our dream home in Coal Harbour within weeks of our initial meeting. Her discretion and professionalism made the entire process seamless.",
    author: "Michael & Sarah Chen",
    role: "Tech Executives",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    property: "Purchased $8.5M Penthouse",
  },
  {
    id: 2,
    quote:
      "Working with Sophia was a revelation. Her architectural background meant she saw potential in properties that others overlooked. She helped us secure a heritage home that we've transformed into our family's sanctuary.",
    author: "The Richardson Family",
    role: "Private Investors",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
    property: "Purchased $15M Estate",
  },
  {
    id: 3,
    quote:
      "Sophia's network and reputation opened doors that would have been impossible otherwise. Her negotiation skills saved us over $2 million on our purchase. She's not just a realtor — she's a trusted advisor.",
    author: "Dr. Amanda Liu",
    role: "Surgeon & Art Collector",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
    property: "Purchased $6.2M Loft",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 md:py-24 lg:py-32 bg-background overflow-hidden"
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <TextReveal delay={0.2}>
            <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Client Stories
            </p>
          </TextReveal>

          <div>
            <AnimatedText
              text="Trusted by Vancouver's"
              className="heading-display heading-md text-white"
              delay={0.3}
            />
            <AnimatedText
              text="Most Discerning Clients"
              className="heading-display heading-md text-gradient"
              delay={0.5}
            />
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Quote Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="testimonial-quote"
              >
                <blockquote className="body-large text-white/80 mb-12 leading-relaxed">
                  {activeTestimonial.quote}
                </blockquote>

                <div className="flex items-center gap-4 md:gap-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={activeTestimonial.image}
                      alt={activeTestimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg">
                      {activeTestimonial.author}
                    </p>
                    <p className="text-white/50 text-sm">
                      {activeTestimonial.role}
                    </p>
                    <p className="text-gold text-sm mt-1">
                      {activeTestimonial.property}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex items-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="group relative w-12 h-12 flex items-center justify-center"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-gold scale-125"
                        : "bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      activeIndex === 0
                        ? "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                        : activeIndex === 1
                        ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                    }
                    alt="Property"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Decorative Frame */}
              <div className="absolute -inset-6 border border-gold/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
