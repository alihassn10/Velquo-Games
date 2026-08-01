"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

export type ParallaxProps = {
  children: ReactNode;
  /**
   * Travel distance in pixels across the full scroll pass.
   * Positive drifts down (slower than scroll), negative drifts up (faster).
   */
  distance?: number;
  className?: string;
  /** Softens the motion. Turn off for backgrounds that must track exactly. */
  spring?: boolean;
};

/**
 * Scroll-linked vertical drift.
 *
 * Progress is measured from the moment the element's top enters the viewport
 * to the moment its bottom leaves, so the effect is symmetrical regardless of
 * where the element sits on the page.
 */
export function Parallax({
  children,
  distance = 80,
  className,
  spring = true,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  const smooth = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = spring ? smooth : raw;

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
