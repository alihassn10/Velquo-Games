/**
 * Site-wide identity, navigation and contact details.
 *
 * PLACEHOLDER CONTENT — the logo and brand colours are real (sampled from
 * public/brand/logo.png); the copy, addresses and social handles are not.
 * Replace the values here and every page updates.
 */

export const site = {
  name: "Velquo Games",
  shortName: "Velquo",
  url: "https://velquogames.com",
  tagline: "Building the games people can't put down.",
  description:
    "Velquo Games is a mobile game studio and publisher. We design, build, and scale original titles played by millions worldwide.",
  email: "hello@velquogames.com",
  careersEmail: "careers@velquogames.com",
  pitchEmail: "publishing@velquogames.com",
  phone: "+92 300 0000000",
  address: {
    line1: "Velquo Games HQ",
    line2: "Gulberg III",
    city: "Lahore",
    country: "Pakistan",
  },
  foundedYear: 2019,
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", description: "Who we are and what we build" },
  { label: "About", href: "/about", description: "Our story, values and team" },
  { label: "Games", href: "/games", description: "The titles in our portfolio" },
  {
    label: "Contact Us",
    href: "/contact",
    description: "Partnerships, press and careers",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-react icon name, resolved in the footer */
  icon: "linkedin" | "twitter" | "youtube" | "instagram" | "github";
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "X", href: "https://x.com", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
];
