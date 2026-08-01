"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

import { GeneratedCover } from "@/components/games/generated-cover";
import { Magnetic, Parallax, Reveal, TextReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { featuredGames } from "@/content/games";

/** Rotation and depth for the floating cover cluster. */
const cluster = [
  { rotate: -8, translate: "lg:-translate-y-6", z: "z-10", parallax: 60 },
  { rotate: 4, translate: "lg:translate-y-8", z: "z-20", parallax: -40 },
  { rotate: 12, translate: "lg:translate-y-0", z: "z-0", parallax: 90 },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 lg:pt-48 lg:pb-28">
      {/* Backdrop: technical grid, faded out toward the edges. */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute -top-40 -left-32 size-[42rem] opacity-70 blur-2xl"
      />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <Reveal direction="none">
              <span className="border-border bg-card/70 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="bg-brand absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                  <span className="bg-brand relative inline-flex size-2 rounded-full" />
                </span>
                Independent studio &amp; publisher
              </span>
            </Reveal>

            <TextReveal
              as="h1"
              immediate
              delay={0.15}
              text={"Building the games\npeople can't put down."}
              className="mt-6 text-[clamp(2.5rem,6.6vw,4.75rem)] leading-[1.02] font-bold"
            />

            <Reveal delay={0.5}>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
                We design, build, and scale original mobile titles — and publish
                for studios who would rather spend their time making the game
                than running the launch.
              </p>
            </Reveal>

            <Reveal delay={0.62}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand text-brand-ink hover:bg-brand-bright group rounded-full px-7 text-base font-semibold shadow-[0_10px_40px_-14px_var(--brand)]"
                  >
                    <Link href="/games">
                      Explore our games
                      <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Magnetic>

                <Magnetic strength={10}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hover:border-brand rounded-full px-7 text-base font-semibold"
                  >
                    <Link href="/contact">
                      <Play className="mr-1 size-4" />
                      Pitch us your game
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Floating cover cluster — three featured titles at varying depths. */}
          <div className="relative mx-auto flex w-full max-w-md justify-center gap-3 sm:gap-5 lg:max-w-none">
            {featuredGames.slice(0, 3).map((game, i) => {
              const style = cluster[i];
              return (
                <Parallax
                  key={game.slug}
                  distance={reduced ? 0 : style.parallax}
                  className={`${style.z} ${style.translate} flex-1`}
                >
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 40, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: style.rotate }}
                    transition={{
                      duration: 0.9,
                      delay: 0.35 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={reduced ? undefined : { rotate: 0, y: -10 }}
                    className="border-border/60 relative aspect-[4/5] overflow-hidden rounded-2xl border shadow-[0_30px_60px_-30px_rgba(12,36,48,0.5)]"
                  >
                    <GeneratedCover
                      art={game.art}
                      accent={game.accent}
                      title={game.title}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="font-display truncate text-sm font-bold text-white">
                        {game.title}
                      </p>
                      <p className="truncate text-[0.68rem] text-white/60">
                        {game.genre}
                      </p>
                    </div>
                  </motion.div>
                </Parallax>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
