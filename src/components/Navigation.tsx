"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About", preview: "Who you're working with" },
  { href: "#properties", label: "Properties", preview: "On the market now" },
  { href: "#testimonials", label: "Stories", preview: "What clients say" },
  { href: "#contact", label: "Contact", preview: "Let's talk" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hero is 200vh with sticky content - only change nav after scrolling past hero
      // The sticky effect ends when scrollY > (200vh - 100vh) = 100vh
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled && !isMenuOpen
            ? "bg-white/90 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
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
                  "text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group",
                    isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA + Menu Toggle */}
            <div className="flex items-center gap-6">
              {/* Desktop CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="hidden md:block btn-primary text-sm py-3 px-6"
              >
                <span>Let&apos;s Talk</span>
              </a>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[60] w-12 h-12 flex items-center justify-center lg:hidden"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-4">
                  <span
                    className={cn(
                      "absolute left-0 w-full h-0.5 transition-all duration-300 origin-center",
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45 bg-white"
                        : "top-0",
                      !isMenuOpen && (isScrolled ? "bg-foreground" : "bg-white")
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 transition-all duration-300",
                      isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
                      isScrolled ? "bg-foreground" : "bg-white"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 w-full h-0.5 transition-all duration-300 origin-center",
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45 bg-white"
                        : "bottom-0",
                      !isMenuOpen && (isScrolled ? "bg-foreground" : "bg-white")
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full-Screen Menu Takeover */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-background-dark"
          >
            {/* Menu Content */}
            <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <nav className="space-y-2 md:space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="menu-link block py-2"
                    >
                      {link.label}
                    </a>
                    {/* Preview text */}
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredLink === link.href ? 1 : 0,
                        height: hoveredLink === link.href ? "auto" : 0,
                      }}
                      className="text-white/40 text-lg tracking-wide ml-1"
                    >
                      {link.preview}
                    </motion.p>
                  </motion.div>
                ))}
              </nav>

              {/* Contact Info in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-16 md:mt-24"
              >
                <p className="text-white/30 text-sm tracking-widest uppercase mb-4">
                  Get in touch
                </p>
                <a
                  href="mailto:hello@rivera.ca"
                  className="text-white/70 hover:text-accent text-lg md:text-xl transition-colors duration-300 block mb-2"
                >
                  hello@rivera.ca
                </a>
                <a
                  href="tel:+16045550123"
                  className="text-white/70 hover:text-accent text-lg md:text-xl transition-colors duration-300 block"
                >
                  +1 (604) 555-0123
                </a>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[60vw] h-[60vw] rounded-full border border-white/5"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
