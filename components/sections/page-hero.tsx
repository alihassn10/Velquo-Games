import type { ReactNode } from "react";

import { Reveal, TextReveal } from "@/components/motion";

/**
 * Shared hero for the interior pages.
 *
 * Keeping About, Games and Contact on one hero component means their spacing,
 * type scale and entrance timing cannot drift apart. Unlike the home hero it
 * fires `immediate`, since it is always above the fold.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_40%_20%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute -top-52 right-0 size-[36rem] opacity-60 blur-2xl"
      />

      <div className="container-page relative z-10">
        <Reveal direction="none">
          <span className="text-brand-deep inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] uppercase">
            <span className="bg-brand inline-block size-1.5 rounded-full" />
            {eyebrow}
          </span>
        </Reveal>

        <TextReveal
          as="h1"
          immediate
          delay={0.1}
          text={title}
          className="mt-5 max-w-4xl text-[clamp(2.3rem,6vw,4.25rem)] leading-[1.03] font-bold"
        />

        <Reveal delay={0.4}>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            {description}
          </p>
        </Reveal>

        {children && <Reveal delay={0.5}>{children}</Reveal>}
      </div>
    </section>
  );
}
