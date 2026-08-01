"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Route transition.
 *
 * template.tsx (unlike layout.tsx) remounts on every navigation, which is
 * exactly what makes a per-route entrance animation possible. Kept short and
 * subtle — a page transition that outlasts the navigation itself just feels
 * like lag.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
