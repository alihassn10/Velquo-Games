import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { perks } from "@/content/team";

export function Perks() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Working here"
          title={"What it's actually like"}
          description="The parts of the offer that people tell us made the difference."
          align="center"
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => {
            const Icon = (Icons[perk.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;

            return (
              <StaggerItem key={perk.title}>
                <article className="border-border bg-card hover:border-brand/50 flex h-full gap-4 rounded-2xl border p-6 transition-colors duration-300">
                  <span className="bg-accent text-brand-deep inline-flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold">{perk.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
