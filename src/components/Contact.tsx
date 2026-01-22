"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Scroll-based color inversion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35],
    ["#FFFFFF", "#FFFFFF", "#FF6B4A", "#0A0A0A"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35],
    ["#0A0A0A", "#0A0A0A", "#FFFFFF", "#FFFFFF"]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 heading-section-bg whitespace-nowrap select-none pointer-events-none"
        style={{ color: textColor }}
      >
        CONTACT
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
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
            Ready to make a<br />
            <motion.span style={{ color: useTransform(scrollYProgress, [0, 0.35], ["#FF6B4A", "#FF6B4A"]) }}>
              move?
            </motion.span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.p
              className="body-large mb-12"
              style={{ color: useTransform(scrollYProgress, [0, 0.35], ["#737373", "rgba(255,255,255,0.7)"]) }}
            >
              Whether you&apos;re buying, selling, or just have questions — I&apos;m here.
              No pressure, no jargon. Just real answers.
            </motion.p>

            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="block group"
                >
                  <motion.p
                    className="text-sm uppercase tracking-wider mb-1"
                    style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
                  >
                    {info.label}
                  </motion.p>
                  <motion.p
                    className="text-xl md:text-2xl font-medium group-hover:text-accent transition-colors duration-300"
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
              className="flex items-center gap-6"
            >
              {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-sm uppercase tracking-wider hover:text-accent transition-colors duration-300"
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
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Name */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "name" || formState.name ? -28 : 0,
                  scale: focusedField === "name" || formState.name ? 0.85 : 1,
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none transition-all duration-300"
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
                className="w-full bg-transparent border-b-2 py-4 outline-none transition-colors duration-300"
                style={{
                  color: textColor,
                  borderColor: focusedField === "name" ? "#FF6B4A" : useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.2)", "rgba(255,255,255,0.2)"]),
                }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "email" || formState.email ? -28 : 0,
                  scale: focusedField === "email" || formState.email ? 0.85 : 1,
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none transition-all duration-300"
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
                className="w-full bg-transparent border-b-2 py-4 outline-none transition-colors duration-300"
                style={{
                  color: textColor,
                  borderColor: focusedField === "email" ? "#FF6B4A" : useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.2)", "rgba(255,255,255,0.2)"]),
                }}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "phone" || formState.phone ? -28 : 0,
                  scale: focusedField === "phone" || formState.phone ? 0.85 : 1,
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none transition-all duration-300"
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
                className="w-full bg-transparent border-b-2 py-4 outline-none transition-colors duration-300"
                style={{
                  color: textColor,
                  borderColor: focusedField === "phone" ? "#FF6B4A" : useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.2)", "rgba(255,255,255,0.2)"]),
                }}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "message" || formState.message ? -28 : 0,
                  scale: focusedField === "message" || formState.message ? 0.85 : 1,
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none transition-all duration-300"
                style={{ color: useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.4)", "rgba(255,255,255,0.4)"]) }}
              >
                Your Message
              </motion.label>
              <motion.textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full bg-transparent border-b-2 py-4 outline-none resize-none transition-colors duration-300"
                style={{
                  color: textColor,
                  borderColor: focusedField === "message" ? "#FF6B4A" : useTransform(scrollYProgress, [0, 0.35], ["rgba(10,10,10,0.2)", "rgba(255,255,255,0.2)"]),
                }}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button type="submit" className="btn-primary w-full md:w-auto">
                <span>Send Message</span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
