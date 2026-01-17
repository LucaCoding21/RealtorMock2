"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "./TextReveal";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";

const contactInfo = [
  {
    label: "Email",
    value: "sophia@chenrealty.com",
    href: "mailto:sophia@chenrealty.com",
  },
  {
    label: "Phone",
    value: "+1 (604) 555-0123",
    href: "tel:+16045550123",
  },
  {
    label: "Office",
    value: "1055 West Georgia St, Vancouver",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 md:py-24 lg:py-32 bg-charcoal overflow-hidden"
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <TextReveal delay={0.2}>
            <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Get in Touch
            </p>
          </TextReveal>

          <div>
            <AnimatedText
              text="Let's Find Your"
              className="heading-display heading-md text-white"
              delay={0.3}
            />
            <AnimatedText
              text="Perfect Home"
              className="heading-display heading-md text-gradient"
              delay={0.5}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="body-regular text-white/70 mb-12 max-w-lg">
              Whether you&apos;re looking to buy, sell, or simply explore your
              options, I&apos;m here to provide personalized guidance for your
              real estate journey. Let&apos;s start a conversation.
            </p>

            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="block group"
                >
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">
                    {info.label}
                  </p>
                  <p className="text-white text-lg md:text-xl group-hover:text-gold transition-colors duration-300 break-words">
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center gap-6"
            >
              {["Instagram", "LinkedIn", "WeChat"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/40 hover:text-gold text-sm uppercase tracking-wider transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Name */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "name" || formState.name ? -24 : 0,
                  scale: focusedField === "name" || formState.name ? 0.85 : 1,
                  color:
                    focusedField === "name"
                      ? "#c9a962"
                      : "rgba(255,255,255,0.4)",
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none text-white/40 transition-all duration-300"
              >
                Your Name
              </motion.label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "email" || formState.email ? -24 : 0,
                  scale: focusedField === "email" || formState.email ? 0.85 : 1,
                  color:
                    focusedField === "email"
                      ? "#c9a962"
                      : "rgba(255,255,255,0.4)",
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none text-white/40 transition-all duration-300"
              >
                Email Address
              </motion.label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "phone" || formState.phone ? -24 : 0,
                  scale: focusedField === "phone" || formState.phone ? 0.85 : 1,
                  color:
                    focusedField === "phone"
                      ? "#c9a962"
                      : "rgba(255,255,255,0.4)",
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none text-white/40 transition-all duration-300"
              >
                Phone Number
              </motion.label>
              <input
                type="tel"
                value={formState.phone}
                onChange={(e) =>
                  setFormState({ ...formState, phone: e.target.value })
                }
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className="form-input"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <motion.label
                animate={{
                  y: focusedField === "message" || formState.message ? -24 : 0,
                  scale:
                    focusedField === "message" || formState.message ? 0.85 : 1,
                  color:
                    focusedField === "message"
                      ? "#c9a962"
                      : "rgba(255,255,255,0.4)",
                }}
                className="absolute left-0 top-4 origin-left pointer-events-none text-white/40 transition-all duration-300"
              >
                Your Message
              </motion.label>
              <textarea
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="form-input resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <MagneticButton>Send Message</MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
      />
    </section>
  );
}
