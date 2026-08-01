import type { ReactNode } from "react";

import { Reveal, TextReveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * The standard section header: small brand eyebrow, animated title, optional
 * lead paragraph. Used by every section so the typographic rhythm and the
 * entrance timing stay identical across the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleAs = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered && "mx-auto max-w-3xl items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="text-brand-deep inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] uppercase">
            <span className="bg-brand inline-block size-1.5 rounded-full" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <TextReveal
        as={titleAs}
        text={title}
        className={cn(
          "mt-4 text-balance",
          titleAs === "h1"
            ? "text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[1.02]"
            : "text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.06]",
        )}
      />

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg",
              centered ? "max-w-2xl" : "max-w-2xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children && <Reveal delay={0.18}>{children}</Reveal>}
    </div>
  );
}
