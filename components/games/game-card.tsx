"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Download, Star } from "lucide-react";

import { GeneratedCover } from "@/components/games/generated-cover";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/content/games";
import { cn } from "@/lib/utils";

const statusStyles: Record<Game["status"], string> = {
  Live: "bg-brand text-brand-ink",
  "Soft launch": "bg-brand-lime text-brand-ink",
  "In development": "bg-white/15 text-white backdrop-blur-sm",
};

/**
 * A single portfolio tile.
 *
 * Hover lifts the card and pushes the artwork slightly past its frame, which
 * reads as depth without any layout shift — the scale happens inside an
 * overflow-hidden box, so neighbouring cards never move.
 */
export function GameCard({ game, className }: { game: Game; className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "group border-border bg-card relative overflow-hidden rounded-2xl border",
        className,
      )}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{ ["--game-accent" as string]: game.accent }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div
          className={cn(
            "size-full transition-transform duration-700 ease-out",
            !reduced && "group-hover:scale-[1.06]",
          )}
        >
          {game.cover ? (
            <Image
              src={game.cover}
              alt={`${game.title} key art`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <GeneratedCover art={game.art} accent={game.accent} title={game.title} />
          )}
        </div>

        <Badge
          className={cn(
            "absolute top-3 left-3 rounded-full border-none px-2.5 py-0.5 text-[0.7rem] font-semibold",
            statusStyles[game.status],
          )}
        >
          {game.status}
        </Badge>

        {/* Card copy sits over the cover's built-in scrim. */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-white/70 uppercase">
            {game.genre}
          </p>
          <h3 className="font-display mt-1 text-xl leading-tight font-bold text-white">
            {game.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">{game.tagline}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="text-muted-foreground flex items-center gap-3 text-xs">
          {game.rating !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Star className="fill-brand text-brand size-3.5" />
              {game.rating.toFixed(1)}
            </span>
          )}
          {game.downloads && (
            <span className="inline-flex items-center gap-1">
              <Download className="size-3.5" />
              {game.downloads}
            </span>
          )}
          {!game.downloads && game.rating === undefined && (
            <span>Coming {game.year}</span>
          )}
        </div>
        <span className="text-muted-foreground text-[0.7rem] tracking-wide">
          {game.platforms.join(" · ")}
        </span>
      </div>

      {/* Accent hairline that fills in on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--game-accent)] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </motion.article>
  );
}
