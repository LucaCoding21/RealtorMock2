"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#properties", label: "Properties" },
  { href: "#testimonials", label: "Stories" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroScrollThreshold = window.innerHeight;
      setIsScrolled(window.scrollY > heroScrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-area-top",
          isScrolled && !isMenuOpen
            ? "bg-white/90 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
            {/* Logo */}
            <a
              href="#"
              className="relative z-[60]"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              <span
                className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
                  isMenuOpen
                    ? "text-white"
                    : isScrolled
                    ? "text-foreground"
                    : "text-white"
                )}
              >
                RIVERA
                <span className="text-accent">.</span>
              </span>
            </a>

            {/* Desktop Navigation - Shows at md (768px) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group py-2",
                    isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA + Menu Toggle */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Desktop CTA - Shows at lg only */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="hidden lg:block btn-primary text-sm py-3 px-6"
              >
                <span>Let&apos;s Talk</span>
              </a>

              {/* Menu Toggle - Shows below md (768px) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[60] w-12 h-12 flex items-center justify-center md:hidden touch-target"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <span
                    className={cn(
                      "block w-full h-0.5 rounded-full transition-all duration-300 origin-center",
                      isMenuOpen
                        ? "rotate-45 translate-y-[9px] bg-white"
                        : isScrolled ? "bg-foreground" : "bg-white"
                    )}
                  />
                  <span
                    className={cn(
                      "block w-full h-0.5 rounded-full transition-all duration-300",
                      isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
                      isScrolled ? "bg-foreground" : "bg-white"
                    )}
                  />
                  <span
                    className={cn(
                      "block w-full h-0.5 rounded-full transition-all duration-300 origin-center",
                      isMenuOpen
                        ? "-rotate-45 -translate-y-[9px] bg-white"
                        : isScrolled ? "bg-foreground" : "bg-white"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full-Screen Menu Takeover - Mobile Only */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background-dark md:hidden"
          >
            {/* Menu Content */}
            <div className="h-full flex flex-col justify-center px-6 sm:px-8 safe-area-bottom">
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="menu-link"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Contact Info in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-white/30 text-xs tracking-widest uppercase mb-4">
                  Get in touch
                </p>
                <a
                  href="mailto:hello@rivera.ca"
                  className="text-white/70 active:text-accent text-base transition-colors duration-300 block mb-3 py-1"
                >
                  hello@rivera.ca
                </a>
                <a
                  href="tel:+16045550123"
                  className="text-white/70 active:text-accent text-base transition-colors duration-300 block py-1"
                >
                  +1 (604) 555-0123
                </a>
              </motion.div>
            </div>

            {/* Background Decoration - Subtle on mobile */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[50vw] h-[50vw] rounded-full border border-white/5 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
