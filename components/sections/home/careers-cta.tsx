import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

import { Magnetic, Reveal, TextReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CareersCta() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-page">
        <Reveal>
          <div className="dark bg-background text-foreground relative overflow-hidden rounded-3xl px-7 py-16 md:px-14 md:py-20">
            <div
              aria-hidden="true"
              className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_70%_50%,#000,transparent)]"
            />
            <div
              aria-hidden="true"
              className="brand-glow pointer-events-none absolute -right-20 -bottom-40 size-[30rem] opacity-60 blur-3xl"
            />

            <div className="relative z-10 max-w-2xl">
              <span className="border-border text-brand inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide">
                <Briefcase className="size-3.5" />
                We&rsquo;re hiring
              </span>

              <TextReveal
                text={"Ready to level up\nyour career?"}
                className="mt-6 text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-bold"
              />

              <p className="text-muted-foreground mt-5 max-w-lg leading-relaxed">
                Designers, artists, engineers and marketers — we hire slowly,
                onboard properly, and protect the no-crunch rule. Send us your
                work even when nothing is posted.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand text-brand-ink hover:bg-brand-bright group rounded-full px-7 font-semibold"
                  >
                    {/* <Link href="/contact?topic=careers">
                      See open roles
                      <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link> */}
                  </Button>
                </Magnetic>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="hover:border-brand rounded-full px-7 font-semibold"
                >
                  <a href={`mailto:${site.careersEmail}`}>{site.careersEmail}</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
