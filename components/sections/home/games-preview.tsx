import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GameCard } from "@/components/games/game-card";
import { Marquee, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { games, genres } from "@/content/games";

/** Four titles is enough to show range without duplicating the Games page. */
const preview = games.filter((g) => g.status === "Live").slice(0, 4);

export function GamesPreview() {
  return (
    <section className="section-y relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our portfolio"
          title={"From five-minute puzzlers\nto worlds you live in"}
          description="Twelve live titles across eight genres, played in thirty-two countries. Every one of them built, launched, and still run by us."
        />

        <div className="mt-10">
          <Marquee speed={38}>
            {genres.map((genre) => (
              <span
                key={genre}
                className="border-border bg-card text-muted-foreground hover:border-brand hover:text-brand-deep inline-flex items-center rounded-full border px-5 py-2 text-sm font-semibold tracking-wide whitespace-nowrap uppercase transition-colors duration-300"
              >
                {genre}
              </span>
            ))}
          </Marquee>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((game) => (
            <StaggerItem key={game.slug}>
              <GameCard game={game} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:border-brand group rounded-full px-7 font-semibold"
            >
              <Link href="/games">
                See the full portfolio
                <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
