"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

const contactInfo = [
  {
    label: "Email",
    value: "hello@rivera.ca",
    href: "mailto:hello@rivera.ca",
  },
  {
    label: "Phone",
    value: "+1 (604) 555-0123",
    href: "tel:+16045550123",
  },
  {
    label: "Office",
    value: "Vancouver, BC",
    href: "https://maps.google.com",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based color inversion - simplified on mobile
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    isMobile || prefersReducedMotion
      ? [0, 0.2, 0.3]
      : [0, 0.15, 0.25, 0.35],
    isMobile || prefersReducedMotion
      ? ["#FFFFFF", "#FF6B4A", "#0A0A0A"]
      : ["#FFFFFF", "#FFFFFF", "#FF6B4A", "#0A0A0A"]
  );

  const textColor = useTransform(
    scrollYProgress,
    isMobile || prefersReducedMotion
      ? [0, 0.2, 0.3]
      : [0, 0.15, 0.25, 0.35],
    isMobile || prefersReducedMotion
      ? ["#0A0A0A", "#FFFFFF", "#FFFFFF"]
      : ["#0A0A0A", "#0A0A0A", "#FFFFFF", "#FFFFFF"]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  // Responsive label offset
  const labelOffset = typeof window !== "undefined" && window.innerWidth < 640 ? -24 : -28;

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="relative py-16 sm:py-20 md:py-28 lg:py-40 overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 heading-section-bg whitespace-nowrap select-none pointer-events-none hidden sm:block"
        style={{ color: textColor }}
      >
        CONTACT
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
            style={{ color: useTransform(scrollYProgress, [0, 0.35], ["#FF6B4A", "#FFFFFF"]) }}
          >
            Let&apos;s Talk
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-xl max-w-3xl mx-auto"
            style={{ color: textColor }}
          >
            Ready to make a<br className="sm:hidden" />
            <span className="sm:hidden"> </span>
            <motion.span style={{ color: useTransform(scrollYProgress, [0, 0.35], ["#FF6B4A", "#FF6B4A"]) }}>
              move?
            </motion.span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.p
              className="body-large mb-8 sm:mb-10 md:mb-12"
              style={{ color: useTransform(scrollYProgress, [0, 0.35], ["#737373", "rgba(255,255,255,0.7)"]) }}
            >
              Whether you&apos;re buying, selling, or just have questions — I&apos;m here.
              No pressure, no jargon. Just real answers.
            </motion.p>

            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10 md:mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="block group py-2 -my-2 touch-target"
                >
                  <motion.p
                    className="text-xs sm:text-sm uppercase tracking-wider mb-1"
                    style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
                  >
                    {info.label}
                  </motion.p>
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl font-medium group-hover:text-accent group-active:text-accent transition-colors duration-300"
                    style={{ color: textColor }}
                  >
                    {info.value}
                  </motion.p>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-xs sm:text-sm uppercase tracking-wider hover:text-accent active:text-accent transition-colors duration-300 py-2"
                  style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.5)", "rgba(255,255,255,0.5)"]) }}
                >
                  {social}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Name */}
            <div className="relative pt-6">
              <motion.label
                animate={{
                  y: focusedField === "name" || formState.name ? labelOffset : 0,
                  scale: focusedField === "name" || formState.name ? 0.85 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-10 origin-left pointer-events-none text-sm sm:text-base"
                style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
              >
                Your Name
              </motion.label>
              <motion.input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b-2 py-3 sm:py-4 outline-none transition-all duration-300 text-base min-h-[48px]"
                style={{
                  color: textColor,
                  borderColor: focusedField === "name" ? "#FF6B4A" : "rgba(128, 128, 128, 0.3)",
                }}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="relative pt-6">
              <motion.label
                animate={{
                  y: focusedField === "email" || formState.email ? labelOffset : 0,
                  scale: focusedField === "email" || formState.email ? 0.85 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-10 origin-left pointer-events-none text-sm sm:text-base"
                style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
              >
                Email Address
              </motion.label>
              <motion.input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b-2 py-3 sm:py-4 outline-none transition-all duration-300 text-base min-h-[48px]"
                style={{
                  color: textColor,
                  borderColor: focusedField === "email" ? "#FF6B4A" : "rgba(128, 128, 128, 0.3)",
                }}
                autoComplete="email"
              />
            </div>

            {/* Phone */}
            <div className="relative pt-6">
              <motion.label
                animate={{
                  y: focusedField === "phone" || formState.phone ? labelOffset : 0,
                  scale: focusedField === "phone" || formState.phone ? 0.85 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-10 origin-left pointer-events-none text-sm sm:text-base"
                style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
              >
                Phone Number
              </motion.label>
              <motion.input
                type="tel"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b-2 py-3 sm:py-4 outline-none transition-all duration-300 text-base min-h-[48px]"
                style={{
                  color: textColor,
                  borderColor: focusedField === "phone" ? "#FF6B4A" : "rgba(128, 128, 128, 0.3)",
                }}
                autoComplete="tel"
              />
            </div>

            {/* Message */}
            <div className="relative pt-6">
              <motion.label
                animate={{
                  y: focusedField === "message" || formState.message ? labelOffset : 0,
                  scale: focusedField === "message" || formState.message ? 0.85 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-10 origin-left pointer-events-none text-sm sm:text-base"
                style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
              >
                Your Message
              </motion.label>
              <motion.textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={3}
                className="w-full bg-transparent border-b-2 py-3 sm:py-4 outline-none resize-none transition-all duration-300 text-base min-h-[96px]"
                style={{
                  color: textColor,
                  borderColor: focusedField === "message" ? "#FF6B4A" : "rgba(128, 128, 128, 0.3)",
                }}
              />
            </div>

            {/* Submit */}
            <div className="pt-4 sm:pt-6">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <span>Send Message</span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
