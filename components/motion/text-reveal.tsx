"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType } from "react";

import { EASE_OUT } from "./reveal";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

export type TextRevealProps = {
  /** Plain text. Use "\n" to force a line break. */
  text: string;
  className?: string;
  as?: ElementType;
  stagger?: number;
  delay?: number;
  /** Fire on mount rather than waiting to scroll into view — for heroes. */
  immediate?: boolean;
};

/**
 * Headline entrance: each word slides up from behind a clipping mask.
 *
 * The full string is exposed once via an sr-only span and the animated words
 * are aria-hidden, so assistive tech reads a normal sentence instead of a
 * stream of disconnected words.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  stagger = 0.05,
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {text.split("\n").map((line, i, all) => (
          <span key={i}>
            {line}
            {i < all.length - 1 && <br />}
          </span>
        ))}
      </Tag>
    );
  }

  const lines = text.split("\n");
  const animation = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        variants={container(stagger, delay)}
        initial="hidden"
        {...animation}
      >
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.split(" ").map((w, i) => (
              // Each word gets its own overflow-hidden box to clip the slide.
              // JSX strips whitespace between inline-blocks, so the gap between
              // words comes from the margin here, not a literal space.
              <span
                key={`${lineIndex}-${i}`}
                className="mr-[0.26em] inline-block overflow-hidden py-[0.12em] align-bottom"
              >
                <motion.span className="inline-block" variants={word}>
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
