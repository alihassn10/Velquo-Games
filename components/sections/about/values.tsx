import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { values } from "@/content/team";

export function Values() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we believe"
          title={"Four things we argue about,\nand always land the same way"}
          description="Not posters on a wall. These are the tie-breakers we actually use when a decision is genuinely close."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {values.map((value, i) => {
            const Icon = (Icons[value.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;

            return (
              <StaggerItem key={value.title}>
                <article className="group border-border bg-card hover:border-brand/50 relative h-full overflow-hidden rounded-2xl border p-7 transition-colors duration-300">
                  {/* Index sits behind the copy as a quiet graphic. */}
                  <span
                    aria-hidden="true"
                    className="font-display text-muted/60 absolute -top-3 right-4 text-7xl leading-none font-bold select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="bg-accent text-brand-deep group-hover:bg-brand group-hover:text-brand-ink relative inline-flex size-12 items-center justify-center rounded-xl transition-colors duration-300">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="font-display relative mt-5 text-xl font-bold">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground relative mt-3 leading-relaxed">
                    {value.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
