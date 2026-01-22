"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="properties"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isHeaderInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-section-bg text-foreground whitespace-nowrap select-none pointer-events-none"
      >
        PROPERTIES
      </motion.span>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 px-6 md:px-12 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4"
        >
          On The Market Now
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
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
            className="btn-outline self-start md:self-auto"
          >
            <span>View All Listings</span>
          </motion.a>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-10 px-6 md:px-12 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {properties.map((property, index) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative flex-shrink-0 w-[280px] md:w-[380px] cursor-pointer"
              data-cursor="View"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-500">
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
                    sizes="400px"
                  />
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-accent text-white text-xs font-semibold tracking-wider uppercase">
                    {property.status}
                  </span>
                </div>

                {/* Quick Info on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 text-white text-sm">
                    <span>{property.beds} Beds</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    <span>{property.baths} Baths</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                    <span>{property.sqft} Sqft</span>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {property.title}
                  </h3>
                  <p className="text-accent font-bold text-lg whitespace-nowrap">
                    {property.price}
                  </p>
                </div>
                <p className="text-muted text-sm">{property.address}</p>
              </div>
            </motion.article>
          ))}

          {/* Final CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/5] flex items-center justify-center bg-background-dark"
          >
            <div className="text-center px-8">
              <h3 className="heading-md text-white mb-6">
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
        <div className="mt-8 mx-6 md:mx-12 h-0.5 bg-foreground/10">
          <motion.div
            className="h-full bg-accent origin-left"
            style={{ scaleX: scrollProgress }}
          />
        </div>
      </div>
    </section>
  );
}
