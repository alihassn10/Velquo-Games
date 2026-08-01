import type { Metadata } from "next";

import { FeaturedSpotlight } from "@/components/sections/games/featured-spotlight";
import { GamesExplorer } from "@/components/sections/games/games-explorer";
import { PageHero } from "@/components/sections/page-hero";
import { PitchCta } from "@/components/sections/pitch-cta";
import { games } from "@/content/games";

const live = games.filter((g) => g.status === "Live").length;

export const metadata: Metadata = {
  title: "Games",
  description:
    "The Velquo Games portfolio — racing, puzzle, strategy, adventure and more, across iOS, Android and Steam.",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={"Every game we've made,\nand a few we're still making."}
        description={`${live} live titles, plus the ones still in the workshop. Filter by genre to see what we build best — or scroll for the one we would put in front of you first.`}
      />
      <GamesExplorer />
      <FeaturedSpotlight />
      <PitchCta />
    </>
  );
}
