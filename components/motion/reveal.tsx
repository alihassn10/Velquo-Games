"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The workhorse entrance animation: fade + travel, fired once when the
 * element scrolls into view.
 *
 * Every motion primitive in this folder carries its own useReducedMotion()
 * guard, so no section can accidentally forget it. When motion is reduced the
 * component renders a plain element with no transform and no opacity change.
 */

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

/** Shared easing — a soft deceleration used by every primitive. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const TRAVEL = 28;

const offsetFor = (direction: RevealDirection) => {
  switch (direction) {
    case "up":
      return { y: TRAVEL, x: 0 };
    case "down":
      return { y: -TRAVEL, x: 0 };
    case "left":
      return { x: TRAVEL, y: 0 };
    case "right":
      return { x: -TRAVEL, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

type MotionTag = "div" | "section" | "article" | "header" | "footer" | "li" | "span" | "p";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting. */
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  /** Fraction of the element that must be visible before firing. */
  amount?: number;
  once?: boolean;
  as?: MotionTag;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  amount = 0.2,
  once = true,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const { x, y } = offsetFor(direction);

  return (
    <Tag
      data-motion
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stagger — a parent that orchestrates its children in sequence.            */
/* -------------------------------------------------------------------------- */

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: TRAVEL },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

export type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Gap between each child, in seconds. */
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
  as?: MotionTag;
};

/**
 * Wrap a grid or list in <Stagger> and each direct child in <StaggerItem>.
 * Use this instead of giving every child its own <Reveal delay={i * 0.08}> —
 * the parent owns the timing, so the rhythm stays consistent.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  once = true,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={cn(className)}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag data-motion className={cn(className)} variants={itemVariants}>
      {children}
    </Tag>
  );
}
