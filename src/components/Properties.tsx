"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

const properties = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    address: "1200 West Georgia St, Vancouver",
    price: "$899,000",
    beds: 2,
    baths: 2,
    sqft: "1,100",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    status: "Just Listed",
  },
  {
    id: 2,
    title: "Kitsilano Family Home",
    address: "2450 York Avenue, Vancouver",
    price: "$1,850,000",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    status: "Available",
  },
  {
    id: 3,
    title: "Mount Pleasant Townhouse",
    address: "155 East 12th Avenue, Vancouver",
    price: "$1,250,000",
    beds: 3,
    baths: 2,
    sqft: "1,650",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    status: "Available",
  },
  {
    id: 4,
    title: "North Van with Views",
    address: "890 Mountain Highway, North Vancouver",
    price: "$2,100,000",
    beds: 5,
    baths: 4,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    status: "Just Listed",
  },
  {
    id: 5,
    title: "Yaletown Loft",
    address: "1155 Mainland Street, Vancouver",
    price: "$750,000",
    beds: 1,
    baths: 1,
    sqft: "850",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    status: "Available",
  },
];

export default function Properties() {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);

      // Hide scroll hint after user starts scrolling
      if (scrollLeft > 20 && showScrollHint) {
        setShowScrollHint(false);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [showScrollHint]);

  return (
    <section
      id="properties"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background Section Label - Hidden on very small screens */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isHeaderInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-section-bg text-foreground whitespace-nowrap select-none pointer-events-none hidden sm:block"
      >
        PROPERTIES
      </motion.span>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 px-4 sm:px-6 md:px-12 mb-8 sm:mb-10 md:mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-accent text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
        >
          On The Market Now
        </motion.p>

        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-lg text-foreground"
          >
            Find Your <span className="text-accent">Next Home</span>
          </motion.h2>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="btn-outline self-start"
          >
            <span>View All Listings</span>
          </motion.a>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        {/* Scroll hint gradient - shows there's more content */}
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-4 w-16 sm:w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none flex items-center justify-end pr-2 sm:pr-4 md:hidden"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-muted"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-12 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {properties.map((property, index) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[320px] lg:w-[380px] cursor-pointer snap-start"
              data-cursor="View"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden mb-3 sm:mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-500 rounded-sm">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 320px, 380px"
                  />
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent text-white text-xs font-semibold tracking-wider uppercase">
                    {property.status}
                  </span>
                </div>

                {/* Quick Info - Always visible on mobile, hover on desktop */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
                    <span>{property.beds} Beds</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    <span>{property.baths} Baths</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    <span>{property.sqft} Sqft</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-accent font-bold text-base sm:text-lg whitespace-nowrap">
                    {property.price}
                  </p>
                </div>
                <p className="text-muted text-xs sm:text-sm line-clamp-1">{property.address}</p>
              </div>
            </motion.article>
          ))}

          {/* Final CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[320px] lg:w-[380px] aspect-[4/5] flex items-center justify-center bg-background-dark rounded-sm snap-start"
          >
            <div className="text-center px-6 sm:px-8">
              <h3 className="heading-md text-white mb-4 sm:mb-6">
                Don&apos;t see
                <br />
                what you&apos;re
                <br />
                looking for?
              </h3>
              <a href="#contact" className="btn-primary">
                <span>Let&apos;s Talk</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 md:mx-12 h-0.5 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent origin-left rounded-full"
            style={{ scaleX: scrollProgress }}
          />
        </div>

        {/* Mobile scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4 md:hidden">
          {properties.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                Math.round(scrollProgress * properties.length) === index
                  ? "w-4 bg-accent"
                  : "w-1.5 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
