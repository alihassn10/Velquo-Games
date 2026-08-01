import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Magnetic, Reveal, TextReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Closing call to action, shared by the Games and About pages so the two
 * never drift out of sync.
 */
export function PitchCta({
  title = "Got a game we should play?",
  description = "Send us a build. We play every submission that lands in the inbox and reply either way — usually within two weeks.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="border-border bg-surface-muted relative overflow-hidden rounded-3xl px-7 py-16 text-center md:px-14 md:py-20">
            <div
              aria-hidden="true"
              className="brand-glow pointer-events-none absolute -top-40 left-1/2 size-[32rem] -translate-x-1/2 opacity-60 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <TextReveal
                text={title}
                className="text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.06] font-bold"
              />
              <p className="text-muted-foreground mt-5 leading-relaxed">
                {description}
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand text-brand-ink hover:bg-brand-bright group rounded-full px-7 font-semibold shadow-[0_10px_40px_-14px_var(--brand)]"
                  >
                    {/* <Link href="/contact?topic=publishing">
                      Pitch your game
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
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
