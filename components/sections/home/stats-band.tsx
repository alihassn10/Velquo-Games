import { Counter, Stagger, StaggerItem } from "@/components/motion";
import { heroStats } from "@/content/stats";

/**
 * The numbers band.
 *
 * Carries `dark` so it inverts to the navy palette — a deliberate break in an
 * otherwise light page, and the point where the brand green does the most
 * work. Same tokens as everywhere else, no bespoke colours.
 */
export function StatsBand() {
  return (
    <section className="dark bg-background text-foreground relative overflow-hidden py-16 md:py-20">
      <div
        aria-hidden="true"
        className="brand-glow pointer-events-none absolute -bottom-52 left-1/3 size-[34rem] opacity-50 blur-3xl"
      />

      <div className="container-page relative z-10">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {heroStats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center lg:text-left">
              <p className="font-display text-brand text-[clamp(2.2rem,5vw,3.4rem)] leading-none font-bold">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="font-display mt-3 text-sm font-semibold tracking-wide">
                {stat.label}
              </p>
              {stat.caption && (
                <p className="text-muted-foreground mt-1 text-xs">{stat.caption}</p>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
