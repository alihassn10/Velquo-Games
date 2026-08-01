/**
 * Company story, values, milestones and people.
 * ALL PLACEHOLDER — names, quotes and dates are invented.
 *
 * Team members have no photos yet, so the card renders generated initials on
 * a brand-tinted panel. Add `photo: "/team/<slug>.jpg"` to switch an entry to
 * a real image; the component handles both.
 */

export type Value = {
  title: string;
  description: string;
  icon: string;
};

export const values: Value[] = [
  {
    title: "The game comes first",
    description:
      "Every roadmap argument ends the same way: whichever option makes the game better wins. Revenue follows a good game, not the other way round.",
    icon: "Target",
  },
  {
    title: "Ship, then learn",
    description:
      "We would rather put a rough build in front of real players this month than a perfect one next year. Players tell us things playtests never will.",
    icon: "Rocket",
  },
  {
    title: "Small teams, real ownership",
    description:
      "Titles are run by teams of six to ten who own the whole thing — design through live ops. No hand-offs, no committee.",
    icon: "Users",
  },
  {
    title: "Respect the player",
    description:
      "No dark patterns, no manipulative pacing, no monetisation we would be embarrassed to explain. We build things we would let our own kids play.",
    icon: "Heart",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "2019",
    title: "Four people and one prototype",
    description:
      "Velquo starts in a rented room in Lahore with a puzzle prototype and enough runway for eight months.",
  },
  {
    year: "2020",
    title: "First million downloads",
    description:
      "Our second title crosses a million installs without a marketing budget, funded entirely by the first.",
  },
  {
    year: "2022",
    title: "Publishing opens up",
    description:
      "We start publishing for outside studios, bringing three partner titles to global launch in the first year.",
  },
  {
    year: "2023",
    title: "Second studio",
    description:
      "A dedicated art and animation studio opens, bringing character and cinematic work fully in-house.",
  },
  {
    year: "2024",
    title: "A billion downloads",
    description:
      "The portfolio passes one billion lifetime installs across iOS and Android.",
  },
  {
    year: "2026",
    title: "Into premium",
    description:
      "Two Steam titles enter production as we extend past free-to-play mobile for the first time.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Set to a path under /public to use a real photo instead of initials. */
  photo?: string;
  accent: string;
};

export const team: TeamMember[] = [
  {
    name: "Ayaan Malik",
    role: "Co-founder & CEO",
    bio: "Shipped his first game at nineteen. Still reviews every build before it goes out.",
    accent: "#00a86c",
  },
  {
    name: "Sara Iqbal",
    role: "Co-founder & Studio Head",
    bio: "Runs production across all three studios. Believes deadlines are a design constraint.",
    accent: "#30cc6c",
  },
  {
    name: "Daniyal Rehman",
    role: "Creative Director",
    bio: "Draws faster than most people talk. Owns the look of every Velquo title.",
    accent: "#84d848",
  },
  {
    name: "Hina Farooq",
    role: "Head of Engineering",
    bio: "Optimises for the cheapest phone in the room. Everything else is easy after that.",
    accent: "#00734a",
  },
  {
    name: "Bilal Ahmed",
    role: "Head of Publishing",
    bio: "Reads every submission that lands in the inbox, and replies to all of them.",
    accent: "#00a86c",
  },
  {
    name: "Zoya Nasir",
    role: "Head of Player Analytics",
    bio: "Turns a billion sessions into the three numbers the team actually needs.",
    accent: "#30cc6c",
  },
  {
    name: "Omar Sheikh",
    role: "Live Operations Lead",
    bio: "Plans the seasons, events and content drops that keep older titles alive.",
    accent: "#84d848",
  },
  {
    name: "Mariam Javed",
    role: "People & Culture",
    bio: "Hires slowly, onboards properly, and defends the four-day crunch-free rule.",
    accent: "#00734a",
  },
];

export type Perk = { title: string; description: string; icon: string };

export const perks: Perk[] = [
  {
    title: "No crunch, structurally",
    description:
      "Scope is cut before hours are added. If a date slips, it slips — nobody sleeps at the studio.",
    icon: "Moon",
  },
  {
    title: "Hardware you choose",
    description:
      "Pick your machine, your chair, your devices. Test hardware for every tier is on the shelf.",
    icon: "Laptop",
  },
  {
    title: "Ship-it bonuses",
    description:
      "When a title performs, the team that built it shares in it. Not just the leads.",
    icon: "Gift",
  },
  {
    title: "Time to make things",
    description:
      "One week per quarter belongs to you. Several of our live titles started there.",
    icon: "Lightbulb",
  },
  {
    title: "Health cover for family",
    description:
      "Full medical for you, your partner, your children, and your parents.",
    icon: "HeartPulse",
  },
  {
    title: "Learning budget",
    description:
      "An annual allowance for courses, conferences and books, with no approval chain.",
    icon: "GraduationCap",
  },
];
