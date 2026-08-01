import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/social";
import { Logo } from "@/components/layout/logo";
import { Reveal } from "@/components/motion";
import { navItems, site, socialLinks } from "@/content/site";

const socialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedinIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
};

// Kept alongside the commented-out "Company" column below — restore both
// together. (Left uncommented it would trip the unused-vars lint rule.)
// const companyLinks = [
//   { label: "Publishing", href: "/contact?topic=publishing" },
//   { label: "Careers", href: "/contact?topic=careers" },
//   { label: "Press", href: "/contact?topic=press" },
// ];

/**
 * Site footer.
 *
 * Carries the `dark` class so it opts into the inverted token set defined in
 * globals.css — no bespoke colours are declared here, which is why it tracks
 * any future rebrand automatically.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark bg-background text-foreground relative overflow-hidden">
      <div className="bg-gradient-brand h-px w-full opacity-70" />

      {/* Brand bloom, echoing the glow in the supplied logo artwork. */}
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 opacity-40 blur-3xl"
      />

      <div className="container-page relative z-10 pt-20 pb-10">
        {/*
          Three equal columns, centred as a group and centred within each
          track. `justify-items-center` handles the block-level centring (the
          logo, the social row, the max-w-xs paragraph) while `text-center`
          handles the inline text.
        */}
        <div className="grid justify-items-center gap-12 text-center md:grid-cols-3 md:gap-10">
          <Reveal>
            <Logo markSize={40} />
            <p className="text-muted-foreground mt-5 max-w-xs text-sm leading-relaxed">
              {site.description}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon] ?? Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.shortName} on ${social.label}`}
                    className="border-border text-muted-foreground hover:border-brand hover:text-brand inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-sm font-semibold tracking-widest uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-brand transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* <Reveal delay={0.1}>
            <h2 className="font-display text-sm font-semibold tracking-widest uppercase">
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-brand transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal> */}

          <Reveal delay={0.1}>
            <h2 className="font-display text-sm font-semibold tracking-widest uppercase">
              Get in touch
            </h2>
            <ul className="text-muted-foreground mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-brand inline-flex items-start gap-2.5 transition-colors duration-200"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start justify-center gap-2.5 text-left">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  {site.address.line2}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Oversized wordmark as a graphic element, clipped by the container. */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 -mb-6 hidden select-none md:block"
        >
          <span className="font-display block text-center text-[clamp(4rem,15vw,13rem)] leading-[0.8] font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--brand)_28%,transparent)]">
            VELQUO
          </span>
        </div>

        <div className="border-border text-muted-foreground mt-12 flex flex-col gap-3 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Built in {site.address.city} — playing since {site.foundedYear}.
          </p>
        </div>
      </div>
    </footer>
  );
}
