export type Rank = {
  id: string;
  order: number;
  name: string;
  status: "complete" | "active" | "locked";
};

// Five-rank progression path shown on the homepage "Foundation to Mastery"
// teaser and reused by the full Progress dashboard in a later stage.
export const ranks: Rank[] = [
  { id: "foundation", order: 1, name: "Foundation", status: "active" },
  { id: "initiate", order: 2, name: "Initiate", status: "locked" },
  { id: "athlete", order: 3, name: "Athlete", status: "locked" },
  { id: "hoplite", order: 4, name: "Hoplite", status: "locked" },
  { id: "olympian", order: 5, name: "Olympian", status: "locked" },
];

// Percent progress within the current (active) rank.
export const currentRankProgress = 22;
