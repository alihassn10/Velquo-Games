"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Children } from "react";

import { cn } from "@/lib/utils";

export type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. Larger = slower. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  /** Fade the left and right edges out. */
  fadeEdges?: boolean;
};

/**
 * A seamless infinite ticker.
 *
 * The track holds two structurally identical groups and translates by exactly
 * -50%, so the loop point lands precisely where group two begins — no visible
 * seam and no JS measuring. Both groups must carry the same classes for that
 * to hold: each is `flex gap-4 pr-4`, and the track itself has no gap, so the
 * spacing across the seam matches the spacing inside a group.
 *
 * The animation is CSS (`marquee-x` in globals.css) so it runs off the main
 * thread. With reduced motion the track stops and becomes a normal horizontal
 * scroller, so the content is still reachable.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
  fadeEdges = true,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  if (reduced) {
    return (
      <div className={cn("flex w-full gap-4 overflow-x-auto pb-2", className)}>
        {items.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    );
  }

  const group = (keyPrefix: string) => (
    <div className="flex shrink-0 gap-4 pr-4">
      {items.map((item, i) => (
        <div key={`${keyPrefix}-${i}`} className="shrink-0">
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        fadeEdges && "mask-edges",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee-x ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {group("a")}
        {/* Second pass is purely visual — screen readers read group one only. */}
        <div aria-hidden="true" className="flex shrink-0">
          {group("b")}
        </div>
      </div>
    </div>
  );
}
