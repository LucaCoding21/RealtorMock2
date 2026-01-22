"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data-cursor attribute
      const cursorAttr = target.closest("[data-cursor]");
      if (cursorAttr) {
        const text = cursorAttr.getAttribute("data-cursor");
        setCursorText(text || "");
        setIsExpanded(true);
        return;
      }

      // Check for interactive elements
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea");

      if (isInteractive) {
        setIsExpanded(true);
      } else {
        setCursorText("");
        setIsExpanded(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 80 : 12,
          height: isExpanded ? 80 : 12,
          backgroundColor: isExpanded ? "rgba(255, 107, 74, 0.9)" : "#FF6B4A",
          mixBlendMode: isExpanded ? "normal" : "difference",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Cursor text */}
      {cursorText && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center hidden md:flex"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            width: 80,
            height: 80,
          }}
          animate={{
            opacity: cursorText ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-xs font-semibold tracking-wider uppercase">
            {cursorText}
          </span>
        </motion.div>
      )}
    </>
  );
}
