export type Stat = {
  id: string;
  value: string;
  label: string;
};

// Rendered as a light three-up stat row beneath the featured workout
// section (see Figma reference) — the first stat is the headline figure.
export const homeStats: Stat[] = [
  { id: "reps", value: "14,000+", label: "Reps Logged by Early Athletes" },
  { id: "movements", value: "10", label: "Foundational Movements" },
  { id: "ranks", value: "5", label: "Progression Ranks" },
];
