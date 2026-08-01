/**
 * Game portfolio. PLACEHOLDER CONTENT.
 *
 * No cover images exist yet, so each entry carries an `accent` colour and a
 * `art` key that the GameCard turns into a generated CSS cover. When real
 * artwork arrives, add `cover: "/games/<slug>.jpg"` to an entry and the card
 * renders the image instead — no component changes needed.
 */

export const genres = [
  "Action",
  "Adventure",
  "Puzzle",
  "Strategy",
  "Racing",
  "Simulation",
  "Casual",
  "RPG",
] as const;

export type Genre = (typeof genres)[number];

/** Generated-cover styles, so the grid doesn't look repetitive. */
export type CoverArt = "orbit" | "grid" | "burst" | "waves" | "shards" | "bloom";

export type Game = {
  slug: string;
  title: string;
  genre: Genre;
  tagline: string;
  description: string;
  status: "Live" | "In development" | "Soft launch";
  year: number;
  platforms: ("iOS" | "Android" | "Steam")[];
  /** Hex accent used for the generated cover and card hover glow. */
  accent: string;
  art: CoverArt;
  downloads?: string;
  rating?: number;
  featured?: boolean;
  /** Set once real artwork exists, e.g. "/games/neon-drift.jpg" */
  cover?: string;
};

export const games: Game[] = [
  {
    slug: "neon-drift",
    title: "Neon Drift",
    genre: "Racing",
    tagline: "Outrun the skyline.",
    description:
      "A one-thumb arcade racer set across neon-drenched rooftops. Chain perfect drifts to build heat, then burn it for a shot at the leaderboard.",
    status: "Live",
    year: 2024,
    platforms: ["iOS", "Android"],
    accent: "#30cc6c",
    art: "waves",
    downloads: "42M",
    rating: 4.7,
    featured: true,
  },
  {
    slug: "tiny-kingdoms",
    title: "Tiny Kingdoms",
    genre: "Strategy",
    tagline: "Small realm. Big decisions.",
    description:
      "Build a kingdom one tile at a time. Every road, farm and watchtower reshapes the map — and your neighbours are building too.",
    status: "Live",
    year: 2023,
    platforms: ["iOS", "Android", "Steam"],
    accent: "#84d848",
    art: "grid",
    downloads: "28M",
    rating: 4.6,
    featured: true,
  },
  {
    slug: "echo-hollow",
    title: "Echo Hollow",
    genre: "Adventure",
    tagline: "Listen your way out.",
    description:
      "A cave-diving adventure where sound is your only map. Ping the dark, read the echoes, and find a way back to the surface.",
    status: "Live",
    year: 2024,
    platforms: ["iOS", "Android"],
    accent: "#00a86c",
    art: "orbit",
    downloads: "16M",
    rating: 4.8,
    featured: true,
  },
  {
    slug: "block-cascade",
    title: "Block Cascade",
    genre: "Puzzle",
    tagline: "One move from perfect.",
    description:
      "A falling-block puzzler with a twist: clear a line and the board rotates. Easy to learn, genuinely hard to master.",
    status: "Live",
    year: 2022,
    platforms: ["iOS", "Android"],
    accent: "#00734a",
    art: "shards",
    downloads: "61M",
    rating: 4.5,
  },
  {
    slug: "rift-runners",
    title: "Rift Runners",
    genre: "Action",
    tagline: "Sprint between worlds.",
    description:
      "An endless runner across collapsing dimensions. Swap realities mid-jump to dodge what's chasing you.",
    status: "Live",
    year: 2023,
    platforms: ["iOS", "Android"],
    accent: "#30cc6c",
    art: "burst",
    downloads: "35M",
    rating: 4.4,
  },
  {
    slug: "harbor-lights",
    title: "Harbor Lights",
    genre: "Simulation",
    tagline: "Build the port. Keep it running.",
    description:
      "A calm logistics sim about a small fishing harbour. Schedule the boats, stock the market, and watch the town grow around you.",
    status: "Live",
    year: 2024,
    platforms: ["iOS", "Android", "Steam"],
    accent: "#84d848",
    art: "bloom",
    downloads: "9M",
    rating: 4.7,
  },
  {
    slug: "pocket-legion",
    title: "Pocket Legion",
    genre: "RPG",
    tagline: "Assemble. Upgrade. Conquer.",
    description:
      "A squad-building RPG with hand-drawn heroes and a campaign you can finish in five-minute sittings.",
    status: "Soft launch",
    year: 2025,
    platforms: ["Android"],
    accent: "#00a86c",
    art: "orbit",
    rating: 4.3,
  },
  {
    slug: "sunday-diner",
    title: "Sunday Diner",
    genre: "Casual",
    tagline: "Everyone's hungry at once.",
    description:
      "Run a roadside diner through the lunchtime rush. Serve fast, keep the regulars happy, and slowly renovate the place.",
    status: "Live",
    year: 2022,
    platforms: ["iOS", "Android"],
    accent: "#30cc6c",
    art: "bloom",
    downloads: "24M",
    rating: 4.6,
  },
  {
    slug: "starfall-tactics",
    title: "Starfall Tactics",
    genre: "Strategy",
    tagline: "Every turn counts.",
    description:
      "Turn-based skirmishes on procedurally generated asteroid fields. No two battles share a map.",
    status: "In development",
    year: 2026,
    platforms: ["iOS", "Android", "Steam"],
    accent: "#84d848",
    art: "shards",
  },
  {
    slug: "glass-garden",
    title: "Glass Garden",
    genre: "Puzzle",
    tagline: "Grow it, don't break it.",
    description:
      "A physics puzzler about cultivating fragile crystal plants. Light bends, glass shatters, patience wins.",
    status: "In development",
    year: 2026,
    platforms: ["iOS", "Android"],
    accent: "#00734a",
    art: "waves",
  },
  {
    slug: "downtown-heist",
    title: "Downtown Heist",
    genre: "Action",
    tagline: "Ninety seconds. One exit.",
    description:
      "Plan the route, memorise the patrols, and pull off the run before the timer hits zero.",
    status: "Live",
    year: 2023,
    platforms: ["iOS", "Android"],
    accent: "#00a86c",
    art: "burst",
    downloads: "18M",
    rating: 4.4,
  },
  {
    slug: "lantern-trail",
    title: "Lantern Trail",
    genre: "Adventure",
    tagline: "Follow the light home.",
    description:
      "A gentle exploration game about a lamplighter walking a mountain pass at dusk, lighting the way for travellers behind them.",
    status: "Soft launch",
    year: 2025,
    platforms: ["iOS"],
    accent: "#30cc6c",
    art: "grid",
    rating: 4.9,
  },
];

export const featuredGames = games.filter((g) => g.featured);
