"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const format = (value: number, decimals: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * A number that counts up the first time it scrolls into view.
 *
 * The final value is rendered on the server so the real figure is in the HTML
 * for crawlers and screen readers. On the client we reset to zero in a layout
 * effect — before the browser paints — so there is no flash of the end value.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    setDisplay(0);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  const finalLabel = `${prefix}${format(value, decimals)}${suffix}`;

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={finalLabel}>
      <span aria-hidden="true">
        {prefix}
        {format(display, decimals)}
        {suffix}
      </span>
    </span>
  );
}
