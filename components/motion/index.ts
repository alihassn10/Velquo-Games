/**
 * The shared motion vocabulary.
 *
 * Sections should compose these rather than hand-rolling variants — it is what
 * keeps the animation across the site feeling like one system, and it means
 * the prefers-reduced-motion guard lives in exactly seven places instead of
 * being re-implemented (and forgotten) per section.
 */

export { Reveal, Stagger, StaggerItem, EASE_OUT } from "./reveal";
export type { RevealProps, RevealDirection, StaggerProps } from "./reveal";

export { Counter } from "./counter";
export type { CounterProps } from "./counter";

export { Marquee } from "./marquee";
export type { MarqueeProps } from "./marquee";

export { Parallax } from "./parallax";
export type { ParallaxProps } from "./parallax";

export { TextReveal } from "./text-reveal";
export type { TextRevealProps } from "./text-reveal";

export { Magnetic } from "./magnetic";
export type { MagneticProps } from "./magnetic";

export { SmoothScroll } from "./smooth-scroll";
