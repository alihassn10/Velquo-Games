import type { Metadata } from "next";

import { Perks } from "@/components/sections/about/perks";
import { Story } from "@/components/sections/about/story";
import { TeamGrid } from "@/components/sections/about/team-grid";
import { Timeline } from "@/components/sections/about/timeline";
import { Values } from "@/components/sections/about/values";
import { CareersCta } from "@/components/sections/home/careers-cta";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Velquo Games went from four people and one prototype to three studios — our story, our values, and the people who make the games.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={"We make games,\nand we run them for years."}
        description="Velquo is an independent studio and publisher. We are small teams with real ownership, a stubborn no-crunch rule, and a habit of shipping before we feel ready."
      />
      <Story />
      <Timeline />
      <Values />
      {/* <TeamGrid /> */}
      <Perks />
      <CareersCta />
    </>
  );
}
