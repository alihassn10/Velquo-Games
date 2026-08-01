import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { team } from "@/content/team";

/** "Ayaan Malik" -> "AM". Falls back gracefully for single-word names. */
const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

/**
 * The people grid.
 *
 * No photographs exist yet, so each card renders a monogram on a panel tinted
 * with that person's accent colour. Adding `photo` to a team entry swaps in a
 * real image without touching this component.
 */
export function TeamGrid() {
  return (
    <section className="section-y bg-surface-muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="The team"
          title={"The people who actually\nmake the thing"}
          description="A slice of the leadership group. The other hundred and seventy are the ones doing the real work."
        />

        <Stagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <article className="group border-border bg-card h-full overflow-hidden rounded-2xl border">
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{
                    background: `linear-gradient(150deg, ${member.accent}2e, #0c243008)`,
                  }}
                >
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="font-display absolute inset-0 flex items-center justify-center text-5xl font-bold transition-transform duration-500 ease-out group-hover:scale-110"
                      style={{ color: member.accent }}
                    >
                      {initials(member.name)}
                    </span>
                  )}

                  {/* Bio slides up on hover; always readable on touch via the
                      card body below, so nothing is hover-only. */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#0c2430]/92 p-4 transition-transform duration-400 ease-out group-hover:translate-y-0 max-lg:hidden">
                    <p className="text-sm leading-relaxed text-white/85">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-display text-base font-bold">{member.name}</h3>
                  <p className="text-brand-deep mt-0.5 text-sm font-medium">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed lg:hidden">
                    {member.bio}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
