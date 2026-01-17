"use client";

import { ReactNode, useEffect } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useSmoothScroll();

  useEffect(() => {
    document.documentElement.classList.add("lenis");
  }, []);

  return <>{children}</>;
}
