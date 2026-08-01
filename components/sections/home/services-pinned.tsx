"use client";

import * as Icons from "lucide-react";
import { Check, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { services } from "@/content/services";

/**
 * The scroll-pinned card stack — the signature interaction of the home page.
 *
 * Each card is `position: sticky` with a top offset that grows per index, so
 * as you scroll, card one parks, card two rides up and parks just below it,
 * and so on. The cards need opaque backgrounds for the overlap to read.
 *
 * Deliberately CSS-only: no scroll listener, no measurement, nothing to get
 * out of sync, and it degrades to a plain stacked list wherever `sticky` is
 * unsupported or when the viewport is too short for pinning to make sense.
 */
export function ServicesPinned() {
  return (
    <section className="section-y bg-surface-muted relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Work with us"
          title={"Bring us an idea.\nWe'll bring the rest."}
          description="Whether you hold an IP, a prototype, or a live game that has stopped growing, these are the three things we do — usually in this order."
        />

        <div className="mt-14 flex flex-col gap-6 lg:mt-20">
          {services.map((service, i) => {
            // Icon names come from content, so resolve them dynamically.
            const Icon = (Icons[service.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;

            return (
              <div
                key={service.id}
                className="lg:sticky"
                style={{ top: `calc(6rem + ${i * 2.25}rem)` }}
              >
                <article className="border-border bg-card grid gap-8 overflow-hidden rounded-3xl border p-7 shadow-[0_24px_60px_-40px_rgba(12,36,48,0.45)] md:grid-cols-[1fr_1fr] md:p-10 lg:p-12">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="bg-brand text-brand-ink inline-flex size-12 shrink-0 items-center justify-center rounded-2xl">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-display text-muted-foreground text-sm font-bold tracking-[0.24em]">
                        {service.step}
                      </span>
                    </div>

                    <h3 className="font-display mt-6 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-bold">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="grid content-center gap-3">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="border-border bg-background flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium"
                      >
                        <Check className="text-brand size-4 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
