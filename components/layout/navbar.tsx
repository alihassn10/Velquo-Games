"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { navItems, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Fixed navigation that reacts to scroll position.
 *
 * Over the hero it is transparent and roomy; once past the fold it compresses
 * and gains a blurred, bordered background so links stay legible against
 * whatever section is behind them. The active-route pill is a shared layout
 * animation, so it slides between items rather than cutting.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 24);
  });

  // The mobile sheet is a full-screen overlay; stop the page behind it moving.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        condensed
          ? "border-b border-border/80 bg-background/80 shadow-[0_1px_24px_-12px_rgba(12,36,48,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "container-page flex items-center justify-between transition-[height] duration-300",
          condensed ? "h-16" : "h-20 md:h-24",
        )}
      >
        <Logo markSize={condensed ? 30 : 34} />

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="bg-accent absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-brand text-brand-ink hover:bg-brand-bright rounded-full font-semibold shadow-none transition-transform duration-300 hover:scale-[1.03]"
          >
            <Link href="/contact">Work with us</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground hover:bg-accent inline-flex size-10 items-center justify-center rounded-full transition-colors md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-border bg-background/95 overflow-hidden border-t backdrop-blur-xl md:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-5">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    // Closing here rather than in an effect on `pathname`
                    // avoids a setState-in-effect cascade, and also closes the
                    // menu when the target route is the current one.
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex flex-col rounded-xl px-4 py-3 transition-colors",
                      isActive(item.href)
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <span className="font-display text-base font-semibold">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-muted-foreground text-xs">
                        {item.description}
                      </span>
                    )}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-3">
                <Button
                  asChild
                  className="bg-brand text-brand-ink hover:bg-brand-bright w-full rounded-full font-semibold"
                >
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Work with us
                  </Link>
                </Button>
              </li>
              <li className="text-muted-foreground mt-3 px-4 text-xs">
                <a href={`mailto:${site.email}`} className="hover:text-brand-deep">
                  {site.email}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
