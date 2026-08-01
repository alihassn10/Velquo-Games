import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import mark from "@/public/brand/logo-mark.png";

/**
 * The Velquo lockup: the supplied VG mark plus a typeset wordmark.
 *
 * The wordmark is live text rather than part of the image so it stays crisp at
 * every size, inherits the current colour (which is how the footer's dark
 * variant works), and remains selectable and readable to crawlers.
 */
export function Logo({
  className,
  showWordmark = true,
  markSize = 34,
}: {
  className?: string;
  showWordmark?: boolean;
  markSize?: number;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      <Image
        src={mark}
        alt=""
        width={markSize}
        height={markSize}
        priority
        className="h-auto w-auto transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ height: markSize, width: "auto" }}
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-bold tracking-[0.18em] uppercase">
            Velquo
          </span>
          <span className="text-brand text-[0.55rem] font-semibold tracking-[0.42em] uppercase">
            Games
          </span>
        </span>
      )}
    </Link>
  );
}
