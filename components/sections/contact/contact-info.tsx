import { Building2, Clock, Mail, Rocket } from "lucide-react";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/social";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { site, socialLinks } from "@/content/site";
import type { ComponentType, SVGProps } from "react";

const socialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedinIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
};

const channels = [
  {
    icon: Mail,
    label: "General enquiries",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  // {
  //   icon: Rocket,
  //   label: "Pitch a game",
  //   value: site.pitchEmail,
  //   href: `mailto:${site.pitchEmail}`,
  // },
  {
    icon: Building2,
    label: "Careers",
    value: site.careersEmail,
    href: `mailto:${site.careersEmail}`,
  },
];

export function ContactInfo() {
  return (
    <div className="lg:sticky lg:top-28">
      <Stagger className="space-y-3">
        {channels.map((channel) => (
          <StaggerItem key={channel.label}>
            <a
              href={channel.href}
              className="group border-border bg-card hover:border-brand flex items-center gap-4 rounded-2xl border p-4 transition-colors duration-300"
            >
              <span className="bg-accent text-brand-deep group-hover:bg-brand group-hover:text-brand-ink inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300">
                <channel.icon className="size-4.5" />
              </span>
              <span className="min-w-0">
                <span className="text-muted-foreground block text-xs tracking-wide uppercase">
                  {channel.label}
                </span>
                <span className="font-display block truncate font-semibold">
                  {channel.value}
                </span>
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <div className="dark bg-background text-foreground relative mt-4 overflow-hidden rounded-2xl p-6">
          <div
            aria-hidden="true"
            className="brand-glow pointer-events-none absolute -right-16 -bottom-24 size-64 opacity-60 blur-2xl"
          />
          <div className="relative z-10">
            <h2 className="font-display text-sm font-semibold tracking-widest uppercase">
              Studio
            </h2>
            <address className="text-muted-foreground mt-4 text-sm leading-relaxed not-italic">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}, {site.address.country}
            </address>

            <p className="text-muted-foreground mt-5 inline-flex items-center gap-2 text-sm">
              <Clock className="text-brand size-4" />
              Mon–Fri, 10:00–19:00 PKT
            </p>

            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                if (!Icon) return null;
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
          </div>
        </div>
      </Reveal>
    </div>
  );
}
