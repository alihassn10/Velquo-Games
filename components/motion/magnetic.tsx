"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

export type MagneticProps = {
  children: ReactNode;
  /** How far the element may be pulled from centre, in pixels. */
  strength?: number;
  className?: string;
};

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 *
 * Only bound on devices that actually have a fine pointer — on touch there is
 * no hover, and the listeners would just be dead weight. Wraps the child in a
 * plain span when motion is reduced.
 */
export function Magnetic({ children, strength = 14, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      // Offset from the element's centre, normalised to -1..1.
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      x.set(dx * strength);
      y.set(dy * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      // Focus travels by keyboard, where there is no cursor to follow —
      // make sure any lingering offset is cleared.
      onBlur={reset}
    >
      {children}
    </motion.span>
  );
}
