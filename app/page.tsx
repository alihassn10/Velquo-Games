import { Capabilities } from "@/components/sections/home/capabilities";
import { CareersCta } from "@/components/sections/home/careers-cta";
import { GamesPreview } from "@/components/sections/home/games-preview";
import { Hero } from "@/components/sections/home/hero";
import { ServicesPinned } from "@/components/sections/home/services-pinned";
import { StatsBand } from "@/components/sections/home/stats-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <GamesPreview />
      <ServicesPinned />
      <Capabilities />
      <CareersCta />
    </>
  );
}
