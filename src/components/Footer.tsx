"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });

  return (
    <footer
      ref={footerRef}
      className="relative py-12 md:py-16 lg:py-24 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 mb-10 md:mb-16">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="heading-display text-3xl md:text-4xl text-gradient mb-3">
              Sophia Chen
            </h2>
            <p className="text-white/50 text-sm uppercase tracking-widest">
              Luxury Real Estate • Vancouver
            </p>
          </motion.div>

          {/* Large CTA Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <p className="heading-display text-xl md:text-2xl text-white/20 mb-2">
              Ready to find your
            </p>
            <a
              href="#contact"
              className="heading-display text-xl md:text-2xl text-gold hover:text-gold-light transition-colors duration-300"
            >
              dream home? →
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-white/10 mb-8"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/40">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            © {currentYear} Sophia Chen Realty. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center gap-4 md:gap-8 flex-wrap justify-center"
          >
            <a href="#" className="hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gold transition-colors duration-300">
              Sitemap
            </a>
          </motion.div>
        </div>

        {/* Decorative Background Text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 0.02, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="heading-display text-[15vw] leading-none text-white whitespace-nowrap"
          >
            VANCOUVER
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
