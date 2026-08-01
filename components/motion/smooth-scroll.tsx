"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";

/**
 * Site-wide inertial scrolling.
 *
 * This is what gives the site the weighted, gliding feel of the reference —
 * Lenis intercepts wheel events and eases the scroll position instead of
 * jumping. Every scroll-linked effect (Parallax, the pinned services section,
 * the scroll-aware navbar) reads the same scroll position, so they all stay
 * in sync with it.
 *
 * Skipped entirely for users who prefer reduced motion: hijacking scroll is
 * exactly the kind of motion that setting is meant to switch off.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        // Touch devices already have native inertia; overriding it feels wrong.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
