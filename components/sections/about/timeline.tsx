"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { milestones } from "@/content/team";

/**
 * Milestones, with a spine that draws itself as the section scrolls past.
 *
 * The line is a scaleY transform driven by scroll progress rather than an
 * animated height, so it never triggers layout. With reduced motion the spine
 * simply renders full-length from the start.
 */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });

  return (
    <section className="section-y bg-surface-muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="Milestones"
          title={"How we got here"}
          description="Six years, condensed. The gaps between these are mostly made up of very ordinary weeks."
        />

        <div ref={ref} className="relative mt-14 pl-8 md:pl-0">
          {/* Spine: static track plus the progress fill on top. */}
          <div
            aria-hidden="true"
            className="bg-border absolute top-2 bottom-2 left-[7px] w-0.5 md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              className="bg-gradient-brand h-full w-full origin-top"
              style={reduced ? undefined : { scaleY }}
            />
          </div>

          <ol className="space-y-10 md:space-y-0">
            {milestones.map((milestone, i) => {
              const rightSide = i % 2 === 1;

              return (
                <li
                  key={milestone.year}
                  className="relative md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Node sits on the spine at every breakpoint. */}
                  <span
                    aria-hidden="true"
                    className="border-background bg-brand absolute top-2 -left-8 z-10 size-4 rounded-full border-4 md:top-8 md:left-1/2 md:-translate-x-1/2"
                  />

                  <div
                    className={
                      rightSide
                        ? "md:col-start-2 md:py-6 md:pl-4"
                        : "md:col-start-1 md:py-6 md:pr-4 md:text-right"
                    }
                  >
                    <Reveal direction={rightSide ? "left" : "right"}>
                      <div className="border-border bg-card rounded-2xl border p-6">
                        <span className="font-display text-brand-deep text-sm font-bold tracking-[0.2em]">
                          {milestone.year}
                        </span>
                        <h3 className="font-display mt-2 text-xl font-bold">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
