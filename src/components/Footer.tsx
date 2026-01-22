"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Stories", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = ["Instagram", "LinkedIn", "Twitter"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });

  return (
    <footer
      ref={footerRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-background-dark safe-area-bottom"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          {/* Brand - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              RIVERA<span className="text-accent">.</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-md mb-5 sm:mb-6">
              Vancouver real estate made simple. Whether you&apos;re buying, selling, or just exploring — let&apos;s talk.
            </p>
            <a
              href="#contact"
              className="btn-primary inline-block"
            >
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-accent active:text-accent transition-colors duration-300 text-sm sm:text-base py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm tracking-wider uppercase">
              Contact
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="mailto:hello@rivera.ca"
                  className="text-white/50 hover:text-accent active:text-accent transition-colors duration-300 text-sm sm:text-base py-1 inline-block break-all"
                >
                  hello@rivera.ca
                </a>
              </li>
              <li>
                <a
                  href="tel:+16045550123"
                  className="text-white/50 hover:text-accent active:text-accent transition-colors duration-300 text-sm sm:text-base py-1 inline-block"
                >
                  +1 (604) 555-0123
                </a>
              </li>
              <li className="text-white/50 text-sm sm:text-base">Vancouver, BC</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-white/10 mb-6 sm:mb-8"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm text-white/40">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center sm:text-left"
          >
            © {currentYear} Alex Rivera Real Estate. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center gap-4 sm:gap-6"
          >
            {socialLinks.map((social) => (
              <a
                key={social}
                href="#"
                className="hover:text-accent active:text-accent transition-colors duration-300 py-1"
              >
                {social}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Decoration - Hidden on mobile for performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none hidden sm:block"
      >
        <p className="heading-section-bg text-white/[0.02] whitespace-nowrap translate-y-1/3">
          RIVERA
        </p>
      </motion.div>
    </footer>
  );
}
