# Velquo Games — company website

Marketing site for Velquo Games: **Home, About, Games, Contact Us**.

Built with Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4,
shadcn/ui (Radix), Motion, and Lenis. All four routes are prerendered static.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

> Node is installed at `C:\Program Files\nodejs` but is **not on the default
> PATH** in every shell on this machine. If `node` is "not recognized", open a
> new terminal or call it by full path.

---

## What is real and what is placeholder

| | Status |
|---|---|
| Logo, favicon, brand colours | **Real** — colours sampled from `public/brand/logo.png` |
| All copy (About, services, FAQ) | Placeholder |
| Games, team, stats | Placeholder |
| Game cover art | Generated from code — no image files |
| Contact form submission | **Stub — nothing is sent** |

### Swapping in real content

Everything editorial lives in `content/` as typed modules. Changing content is
a data edit; no component needs to be touched.

- `content/site.ts` — name, nav, email addresses, address, socials
- `content/games.ts` — the portfolio and the genre list
- `content/team.ts` — story, values, milestones, people, perks
- `content/services.ts` — the three services, capabilities, FAQ
- `content/stats.ts` — the animated headline numbers

**Real game art:** add `cover: "/games/<slug>.jpg"` to a game in
`content/games.ts` and drop the file in `public/games/`. `GameCard` renders the
image instead of the generated cover automatically.

**Real team photos:** add `photo: "/team/<name>.jpg"` to a team entry. Same
deal — the monogram is only the fallback.

### Wiring up the contact form

`components/sections/contact/contact-form.tsx` — replace the body of
`submitEnquiry()` with a Server Action or an API route. Validation, loading
state, success/error toasts and reset are already built; only the transport is
missing. Re-validate with `contactSchema` (`lib/validations/contact.ts`) on the
server — client validation is a convenience, not a guarantee.

---

## Brand

Colours were sampled from the opaque pixels of the supplied logo and live in
**one** place: the `Brand ramp` block at the top of `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `--brand` | `#00a86c` | The Velquo green — fills, CTAs, accents |
| `--brand-bright` | `#30cc6c` | Hover states, gradient midpoint |
| `--brand-lime` | `#84d848` | Highlight, gradient end |
| `--brand-deep` | `#00734a` | Green **text** on light (5.7:1, AA) |
| `--brand-ink` | `#0c2430` | The wordmark navy — headings, dark sections |

Components only ever reference semantic tokens (`bg-brand`, `text-brand-deep`,
`bg-gradient-brand`), never raw hex — so editing that one block rebrands the
whole site.

Green CTAs deliberately pair `--brand` with `--brand-ink` text (5.2:1). White
on `--brand` is only 3:1 and would fail AA for body-sized text.

`.dark` is **not** a user-facing theme toggle. It exists so individual sections
(the stats band, the footer, CTA panels) can opt into the inverted palette by
adding the class.

### Brand assets

`public/brand/logo.png` and `favicon.png` are the originals, untouched. Three
derivatives were generated from them:

- `public/brand/logo-lockup.png` — trimmed horizontal lockup
- `public/brand/logo-mark.png` — the VG mark alone (used in the navbar)
- `app/icon.png` / `app/apple-icon.png` — favicons, picked up by Next

The navbar wordmark is **live text**, not part of an image, so it stays sharp
at any size and inherits colour in dark sections.

---

## Animation

Seven primitives in `components/motion/` — sections compose these rather than
hand-rolling variants, which is what keeps the motion feeling like one system:

`Reveal` / `Stagger` · `Counter` · `Marquee` · `Parallax` · `TextReveal` ·
`Magnetic` · `SmoothScroll` (Lenis)

Ground rules:

- Every primitive carries its own `useReducedMotion()` guard, so a section
  cannot forget it. `app/globals.css` adds a global CSS backstop on top.
- Transform and opacity only — nothing animates layout.
- Pages stay Server Components; only the motion pieces are `"use client"`.
- A `<noscript>` rule in `app/layout.tsx` forces every `[data-motion]` element
  visible, so nothing is stranded at `opacity: 0` if JavaScript fails.

Two gotchas worth remembering:

- **Generated cover art rounds its trig output.** `Math.sin`/`Math.cos` are not
  bit-identical between Node and the browser, and the raw values caused a
  hydration mismatch.
- **The Select is bound with `Controller`, not `useWatch`.** `useWatch` returns
  `undefined` on the first render, which leaves Radix Select uncontrolled long
  enough to emit a spurious empty change and trip validation before the user
  has touched anything.

---

## Not built (natural follow-ups)

CMS, blog, i18n/RTL, analytics, real form backend, deployment.
