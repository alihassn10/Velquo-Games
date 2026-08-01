/**
 * What Velquo offers partners, plus the studio capabilities grid.
 * PLACEHOLDER COPY — structure is final, wording is not.
 *
 * `icon` values are lucide-react names, resolved where they render.
 */

export type Service = {
  id: string;
  step: string;
  title: string;
  description: string;
  points: string[];
  icon: string;
};

/** Drives the sticky, scroll-pinned section on the home page. */
export const services: Service[] = [
  {
    id: "build",
    step: "01",
    title: "Build your game universe",
    description:
      "Bring us a concept, a character, or a half-finished prototype. Our design and engineering teams take it from first sketch to a shippable build — art direction, core loop, economy, and live-ops scaffolding included.",
    points: [
      "Concept and pre-production",
      "Art direction and world design",
      "Core loop and economy modelling",
      "Unity engineering and QA",
    ],
    icon: "Sparkles",
  },
  {
    id: "grow",
    step: "02",
    title: "Grow it past the first million",
    description:
      "Shipping is the easy part. We handle soft launch, retention tuning, creative testing, and paid acquisition — the unglamorous work that turns a good game into a durable one.",
    points: [
      "Soft launch and market testing",
      "Retention and funnel optimisation",
      "Creative production at volume",
      "User acquisition and ASO",
    ],
    icon: "TrendingUp",
  },
  {
    id: "monetise",
    step: "03",
    title: "Monetise without wrecking it",
    description:
      "We tune ads, IAP, and pacing against real cohort data, so revenue climbs without players feeling squeezed. You keep the creative call on everything that touches the player.",
    points: [
      "Ad and IAP strategy",
      "Cohort and LTV modelling",
      "Live-ops calendar and events",
      "Transparent revenue reporting",
    ],
    icon: "ChartLine",
  },
];

export type Capability = {
  title: string;
  description: string;
  icon: string;
};

/** Secondary grid — the disciplines under one roof. */
export const capabilities: Capability[] = [
  {
    title: "Game design",
    description:
      "Systems, economies, and progression built around a loop players actually want to repeat.",
    icon: "Gamepad2",
  },
  {
    title: "Art & animation",
    description:
      "2D, 3D, and motion produced in-house, from character sheets to store creatives.",
    icon: "Palette",
  },
  {
    title: "Engineering",
    description:
      "Unity and native builds engineered for low-end devices first, flagships second.",
    icon: "CodeXml",
  },
  {
    title: "Live operations",
    description:
      "Events, seasons, and content drops that keep a title healthy years after launch.",
    icon: "CalendarClock",
  },
  {
    title: "Player analytics",
    description:
      "An in-house data stack turning raw sessions into decisions the team can act on.",
    icon: "ChartColumn",
  },
  {
    title: "Publishing",
    description:
      "Store relationships, launch planning, and acquisition for our own titles and our partners'.",
    icon: "Rocket",
  },
];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "Do you publish games made by other studios?",
    answer:
      "Yes. Publishing is a large part of what we do. If you have a prototype with promising early retention, send it over — we look at every submission and reply either way, usually within two weeks.",
  },
  {
    question: "What stage should my game be at before I pitch?",
    answer:
      "A playable build beats a pitch deck. We would rather see a rough prototype with a working core loop than a polished document. If you have soft-launch metrics, include them.",
  },
  {
    question: "Do you work with IP holders outside of games?",
    answer:
      "Regularly. If you hold a character, story, or brand with an audience, we handle the adaptation end to end — design, build, launch, and live operations.",
  },
  {
    question: "Are you hiring?",
    answer:
      "Almost always, across design, art, engineering, and marketing. Even when nothing is posted, we keep good portfolios on file — send yours to our careers address.",
  },
  {
    question: "How quickly do you respond?",
    answer:
      "General enquiries get a reply within two working days. Publishing submissions take longer because we play the build first — expect around two weeks.",
  },
];
