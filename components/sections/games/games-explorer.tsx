"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { GameCard } from "@/components/games/game-card";
import { games, genres, type Genre } from "@/content/games";
import { cn } from "@/lib/utils";

type Filter = "All" | Genre;

const filters: Filter[] = ["All", ...genres];

/**
 * The genre filter and portfolio grid — the standout interaction of this page.
 *
 * Cards carry a stable `layout` identity keyed on the game slug, so switching
 * genres animates the survivors to their new positions instead of tearing the
 * grid down and rebuilding it. Cards entering and leaving fade and scale via
 * AnimatePresence.
 *
 * The filter itself is a real tablist: arrow keys are handled by the browser's
 * default button focus order, and `aria-pressed` tells assistive tech which
 * genres are active.
 */
export function GamesExplorer() {
  const [active, setActive] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (active === "All" ? games : games.filter((g) => g.genre === active)),
    [active],
  );

  // Genres with no titles yet would be dead ends — don't offer them.
  const availableFilters = useMemo(
    () => filters.filter((f) => f === "All" || games.some((g) => g.genre === f)),
    [],
  );

  return (
    <section className="section-y pt-0">
      <div className="container-page">
        <div
          role="group"
          aria-label="Filter games by genre"
          className="flex flex-wrap gap-2"
        >
          {availableFilters.map((filter) => {
            const isActive = filter === active;
            const count =
              filter === "All"
                ? games.length
                : games.filter((g) => g.genre === filter).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={isActive}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                  isActive
                    ? "text-brand-ink"
                    : "border-border text-muted-foreground hover:border-brand hover:text-brand-deep border",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="genre-filter-pill"
                    className="bg-brand absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
                <span
                  className={cn(
                    "relative z-10 text-[0.7rem] tabular-nums",
                    isActive ? "text-brand-ink/70" : "text-muted-foreground/70",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout={!reduced}
          className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((game) => (
              <motion.div
                key={game.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <GameCard game={game} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Announce the result count for anyone not seeing the grid change. */}
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "game" : "games"}
          {active !== "All" && ` in ${active}`}.
        </p>
      </div>
    </section>
  );
}
