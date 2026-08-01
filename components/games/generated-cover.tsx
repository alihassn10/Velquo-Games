import type { CoverArt } from "@/content/games";
import { cn } from "@/lib/utils";

/**
 * Stand-in cover art, drawn from the game's own accent colour.
 *
 * No real key art exists yet. Rather than ship grey boxes, each game gets a
 * deterministic geometric composition built from the brand palette, so the
 * grid reads as designed instead of unfinished. Six `art` variants keep it
 * from looking repetitive.
 *
 * Once real artwork lands, set `cover` on the game entry — GameCard renders
 * the image and this component is simply not called.
 */
export function GeneratedCover({
  art,
  accent,
  title,
  className,
}: {
  art: CoverArt;
  accent: string;
  title: string;
  className?: string;
}) {
  // A stable per-title offset so two games sharing an `art` variant still
  // differ. Deterministic, so server and client render identically.
  const seed = [...title].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradientId = `cover-grad-${art}-${seed}`;
  const glowId = `cover-glow-${art}-${seed}`;

  // Math.sin/cos are not required to be bit-identical across JS engines, and
  // Node and the browser do disagree in the last decimal place. Left raw, the
  // "burst" coordinates hydrate with a mismatch, so round to a precision well
  // inside what an SVG path can resolve.
  const r2 = (n: number) => Math.round(n * 100) / 100;

  return (
    <div
      className={cn(
        "relative isolate size-full overflow-hidden bg-[#0c2430]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0c2430" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shared bloom behind every variant. */}
        <circle
          cx={200 + (seed % 60) - 30}
          cy={180}
          r={220}
          fill={`url(#${glowId})`}
        />

        {art === "orbit" && (
          <g fill="none" stroke={accent} strokeOpacity="0.5">
            {[60, 110, 160, 210].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="250"
                r={r}
                strokeWidth={i === 1 ? 2.5 : 1}
                strokeDasharray={i % 2 ? "6 10" : undefined}
              />
            ))}
            <circle cx="200" cy="90" r="14" fill={accent} stroke="none" />
            <circle cx="310" cy="300" r="8" fill={accent} stroke="none" opacity="0.8" />
          </g>
        )}

        {art === "grid" && (
          <g>
            {Array.from({ length: 7 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => {
                const on = (row * 6 + col + seed) % 5 === 0;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={20 + col * 62}
                    y={40 + row * 62}
                    width="48"
                    height="48"
                    rx="8"
                    fill={on ? accent : "none"}
                    fillOpacity={on ? 0.85 : 0}
                    stroke={accent}
                    strokeOpacity="0.28"
                  />
                );
              }),
            )}
          </g>
        )}

        {art === "burst" && (
          <g stroke={accent} strokeLinecap="round">
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * Math.PI * 2 + seed * 0.01;
              return (
                <line
                  key={i}
                  x1={r2(200 + Math.cos(angle) * 55)}
                  y1={r2(250 + Math.sin(angle) * 55)}
                  x2={r2(200 + Math.cos(angle) * (150 + (i % 4) * 34))}
                  y2={r2(250 + Math.sin(angle) * (150 + (i % 4) * 34))}
                  strokeWidth={i % 3 === 0 ? 4 : 1.5}
                  strokeOpacity={i % 3 === 0 ? 0.75 : 0.35}
                />
              );
            })}
            <circle cx="200" cy="250" r="42" fill={accent} fillOpacity="0.9" />
          </g>
        )}

        {art === "waves" && (
          <g fill="none" stroke={accent}>
            {Array.from({ length: 9 }).map((_, i) => {
              const y = 120 + i * 34;
              const amp = 26 + (i % 3) * 12;
              return (
                <path
                  key={i}
                  d={`M -20 ${y} Q 90 ${y - amp} 200 ${y} T 420 ${y}`}
                  strokeWidth={i === 4 ? 3.5 : 1.4}
                  strokeOpacity={i === 4 ? 0.9 : 0.32}
                />
              );
            })}
          </g>
        )}

        {art === "shards" && (
          <g>
            <polygon points="200,60 330,250 200,300 70,250" fill={`url(#${gradientId})`} />
            <polygon
              points="200,300 330,250 300,430 200,470"
              fill={accent}
              fillOpacity="0.42"
            />
            <polygon
              points="200,300 70,250 100,430 200,470"
              fill={accent}
              fillOpacity="0.22"
            />
            <polyline
              points="200,60 200,470"
              stroke="#0c2430"
              strokeOpacity="0.45"
              strokeWidth="2"
              fill="none"
            />
          </g>
        )}

        {art === "bloom" && (
          <g>
            {[
              { cx: 130, cy: 180, r: 95 },
              { cx: 270, cy: 250, r: 120 },
              { cx: 180, cy: 380, r: 85 },
            ].map((c, i) => (
              <circle
                key={i}
                cx={c.cx}
                cy={c.cy}
                r={c.r}
                fill={accent}
                fillOpacity={0.18 + i * 0.12}
              />
            ))}
            <circle
              cx="270"
              cy="250"
              r="120"
              fill="none"
              stroke={accent}
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          </g>
        )}
      </svg>

      {/* Ghost initial, anchoring the composition. */}
      <span className="font-display pointer-events-none absolute right-4 bottom-2 text-[7rem] leading-none font-bold text-white/[0.07] select-none">
        {title.charAt(0)}
      </span>

      {/* Bottom scrim so overlaid text always has contrast. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c2430] via-[#0c2430]/70 to-transparent" />
    </div>
  );
}
