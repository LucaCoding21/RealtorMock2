"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";

const properties = [
  {
    id: 1,
    title: "Coal Harbour Penthouse",
    address: "1600 Coal Harbour Quay, Vancouver",
    price: "$12,800,000",
    beds: 4,
    baths: 5,
    sqft: "4,200",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "West Van Modern Estate",
    address: "2850 Bellevue Avenue, West Vancouver",
    price: "$18,500,000",
    beds: 6,
    baths: 8,
    sqft: "8,500",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "Yaletown Luxury Loft",
    address: "1155 Mainland Street, Vancouver",
    price: "$3,950,000",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Shaughnessy Heritage Manor",
    address: "1489 McRae Avenue, Vancouver",
    price: "$24,900,000",
    beds: 7,
    baths: 9,
    sqft: "12,000",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    featured: true,
  },
];

export default function Properties() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="properties"
      className="relative py-16 md:py-24 lg:py-32 bg-charcoal overflow-hidden"
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-6">
          <div>
            <TextReveal delay={0.2}>
              <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-6">
                Featured Listings
              </p>
            </TextReveal>

            <div>
              <AnimatedText
                text="Exceptional Properties"
                className="heading-display heading-md text-white"
                delay={0.3}
              />
              <AnimatedText
                text="For Exceptional Living"
                className="heading-display heading-md text-gradient"
                delay={0.5}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <MagneticButton variant="secondary">View All Properties</MagneticButton>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {properties.map((property, index) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.4 + index * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative cursor-pointer ${
                property.featured ? "md:col-span-1" : ""
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <motion.div
                  animate={{
                    scale: hoveredId === property.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === property.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />

                {/* Featured Badge */}
                {property.featured && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-gold text-background text-xs font-medium tracking-wider uppercase">
                    Featured
                  </div>
                )}

                {/* Quick Info on Hover */}
                <AnimatePresence>
                  {hoveredId === property.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white"
                    >
                      <div className="flex items-center gap-6 text-sm">
                        <span>{property.beds} Beds</span>
                        <span>{property.baths} Baths</span>
                        <span>{property.sqft} Sqft</span>
                      </div>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Reveal Overlay */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={isInView ? { scaleX: 0 } : {}}
                  transition={{
                    delay: 0.4 + index * 0.15,
                    duration: 1.2,
                    ease: [0.85, 0, 0.15, 1],
                  }}
                  className="absolute inset-0 bg-charcoal origin-right z-10"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="heading-display text-lg md:text-xl text-white mb-1 group-hover:text-gold transition-colors duration-300">
                    {property.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50">{property.address}</p>
                </div>
                <p className="text-gold font-medium text-base md:text-lg">
                  {property.price}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 border border-gold/10 rounded-full" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 border border-gold/10 rounded-full" />
    </section>
  );
}
