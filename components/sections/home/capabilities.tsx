import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { capabilities } from "@/content/services";

export function Capabilities() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Under one roof"
          title={"Every discipline a game needs,\nin the same building"}
          description="No outsourcing chain, no hand-offs between agencies. The people who design the game sit next to the people who ship and run it."
          align="center"
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = (Icons[capability.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;

            return (
              <StaggerItem key={capability.title}>
                <article className="group border-border bg-card hover:border-brand/50 h-full rounded-2xl border p-6 transition-colors duration-300">
                  <span className="bg-accent text-brand-deep group-hover:bg-brand group-hover:text-brand-ink inline-flex size-11 items-center justify-center rounded-xl transition-colors duration-300">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {capability.description}
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
