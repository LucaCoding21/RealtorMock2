"use client";

import { motion } from "framer-motion";

const services = [
  "Luxury Estates",
  "Waterfront Properties",
  "Penthouses",
  "Investment Properties",
  "New Developments",
  "Heritage Homes",
  "Modern Architecture",
  "Private Sales",
];

export default function Marquee() {
  return (
    <section className="py-8 md:py-12 bg-background border-y border-white/5 overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8 md:gap-16 whitespace-nowrap"
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              className="flex items-center gap-6 md:gap-12 text-xl md:text-3xl"
            >
              <span className="heading-display text-white/20 hover:text-gold transition-colors duration-500 cursor-default">
                {service}
              </span>
              <span className="text-gold/30">+</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
