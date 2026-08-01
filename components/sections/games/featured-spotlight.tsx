import Link from "next/link";
import { ArrowRight, Download, Star } from "lucide-react";

import { GeneratedCover } from "@/components/games/generated-cover";
import { Parallax, Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { featuredGames } from "@/content/games";

/** Lead title gets the full-width treatment. */
const spotlight = featuredGames[0];

export function FeaturedSpotlight() {
  if (!spotlight) return null;

  return (
    <section className="dark bg-background text-foreground relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute top-1/2 -left-40 size-[38rem] -translate-y-1/2 opacity-50 blur-3xl"
      />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Parallax distance={50}>
            <div className="border-border/60 relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
              <GeneratedCover
                art={spotlight.art}
                accent={spotlight.accent}
                title={spotlight.title}
              />
            </div>
          </Parallax>

          <div>
            <Reveal>
              <span className="text-brand text-xs font-semibold tracking-[0.24em] uppercase">
                Featured title
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1.04] font-bold">
                {spotlight.title}
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-brand mt-3 text-lg font-medium">
                {spotlight.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-muted-foreground mt-5 max-w-xl leading-relaxed">
                {spotlight.description}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                {spotlight.downloads && (
                  <div>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">
                      Downloads
                    </dt>
                    <dd className="font-display mt-1 inline-flex items-center gap-1.5 text-2xl font-bold">
                      <Download className="text-brand size-4" />
                      {spotlight.downloads}
                    </dd>
                  </div>
                )}
                {spotlight.rating !== undefined && (
                  <div>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">
                      Rating
                    </dt>
                    <dd className="font-display mt-1 inline-flex items-center gap-1.5 text-2xl font-bold">
                      <Star className="fill-brand text-brand size-4" />
                      {spotlight.rating.toFixed(1)}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground text-xs tracking-wide uppercase">
                    Platforms
                  </dt>
                  <dd className="font-display mt-1 text-2xl font-bold">
                    {spotlight.platforms.join(" · ")}
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* <Reveal delay={0.32}>
              <Button
                asChild
                size="lg"
                className="bg-brand text-brand-ink hover:bg-brand-bright group mt-9 rounded-full px-7 font-semibold"
              >
                <Link href="/contact?topic=publishing">
                  Partner with us
                  <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Reveal> */}
          </div>
        </div>
      </div>
    </section>
  );
}
