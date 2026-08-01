/**
 * Headline numbers. PLACEHOLDER — swap for real figures before launch.
 *
 * `value` is the number the <Counter> animates to; `prefix`/`suffix` wrap it
 * so "1.2B+" is still a real animatable number rather than a string.
 */

export type Stat = {
  value: number;
  /** Decimal places to render while counting (e.g. 1 for "1.2") */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption?: string;
};

export const heroStats: Stat[] = [
  { value: 1.2, decimals: 1, suffix: "B", label: "Downloads", caption: "Across all titles" },
  { value: 180, suffix: "+", label: "Team members", caption: "Across three studios" },
  { value: 4.7, decimals: 1, suffix: "M", label: "Daily players", caption: "Average DAU" },
  { value: 40, suffix: "+", label: "Games shipped", caption: "Since 2019" },
];

export const aboutStats: Stat[] = [
  { value: 6, label: "Years building", caption: "Founded in 2019" },
  { value: 32, label: "Countries", caption: "Where our players live" },
  { value: 4.6, decimals: 1, label: "Average rating", caption: "Across app stores" },
  { value: 12, label: "Live titles", caption: "Actively updated" },
];
