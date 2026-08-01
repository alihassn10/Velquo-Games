import { Counter, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { site } from "@/content/site";
import { aboutStats } from "@/content/stats";

export function Story() {
  return (
    <section className="section-y pt-4">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title={"Four people, one prototype,\nand not much runway"}
            />

            <div className="text-muted-foreground mt-7 space-y-5 leading-relaxed">
              <Reveal delay={0.05}>
                <p>
                  Velquo started in {site.foundedYear} in a rented room in{" "}
                  {site.address.city}, with a
                  puzzle prototype and about eight months of money in the bank.
                  The plan was simple and slightly reckless: ship something small,
                  learn what players actually did with it, and use whatever came
                  back to fund the next one.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  That loop never really changed. Six years later there are three
                  studios and a hundred and eighty people, but titles are still
                  run by teams of six to ten who own the whole thing — design
                  through live operations. No hand-offs, no committee, no game
                  designed by spreadsheet.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  These days we publish for other studios too. It turns out the
                  unglamorous half of the job — soft launch, retention tuning,
                  creative testing, store relationships — is exactly the part most
                  small teams would rather hand to someone else.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Numbers panel, drifting slightly against the copy as you scroll. */}
          <Parallax distance={56}>
            <Reveal direction="left">
              <div className="dark bg-background text-foreground relative overflow-hidden rounded-3xl p-8 md:p-10">
                <div
                  aria-hidden="true"
                  className="brand-glow pointer-events-none absolute -top-24 -right-16 size-72 opacity-60 blur-2xl"
                />
                <Stagger className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-9">
                  {aboutStats.map((stat) => (
                    <StaggerItem key={stat.label}>
                      <p className="font-display text-brand text-[clamp(1.9rem,4vw,2.75rem)] leading-none font-bold">
                        <Counter
                          value={stat.value}
                          decimals={stat.decimals}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </p>
                      <p className="font-display mt-2.5 text-sm font-semibold">
                        {stat.label}
                      </p>
                      {stat.caption && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {stat.caption}
                        </p>
                      )}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
