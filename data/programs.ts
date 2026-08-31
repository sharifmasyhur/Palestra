import type { Difficulty } from "@/data/exercises";

export type ProgramDay = {
  day: string;
  focus: string;
  exerciseSlugs: string[];
};

export type Program = {
  slug: string;
  name: string;
  level: Difficulty;
  durationWeeks: number;
  daysPerWeek: number;
  focus: string;
  description: string;
  schedule: ProgramDay[];
};

export const programs: Program[] = [
  {
    slug: "foundation-protocol",
    name: "The Foundation Protocol",
    level: "Beginner",
    durationWeeks: 4,
    daysPerWeek: 3,
    focus: "Full Body",
    description:
      "A four-week on-ramp for athletes new to bodyweight training. Builds the push, pull, squat, and brace patterns everything else is built on, without any equipment beyond a bench.",
    schedule: [
      {
        day: "Day 1",
        focus: "Push & Core",
        exerciseSlugs: ["incline-push-up", "bench-dip", "plank"],
      },
      {
        day: "Day 2",
        focus: "Pull & Legs",
        exerciseSlugs: ["ring-row", "bodyweight-squat", "lunge"],
      },
      {
        day: "Day 3",
        focus: "Full Body",
        exerciseSlugs: ["push-up", "ring-row", "bodyweight-squat", "plank"],
      },
    ],
  },
  {
    slug: "push-pull-mastery",
    name: "Push-Pull Mastery",
    level: "Intermediate",
    durationWeeks: 6,
    daysPerWeek: 4,
    focus: "Upper Body",
    description:
      "A six-week split for athletes past the basics, built around the two horizontal patterns — pressing and pulling — with dedicated days for each.",
    schedule: [
      {
        day: "Day 1",
        focus: "Push",
        exerciseSlugs: ["push-up", "diamond-push-up", "parallel-bar-dip"],
      },
      {
        day: "Day 2",
        focus: "Pull",
        exerciseSlugs: ["pull-up", "chin-up", "ring-row"],
      },
      {
        day: "Day 3",
        focus: "Legs & Core",
        exerciseSlugs: ["bulgarian-split-squat", "lunge", "hollow-hold"],
      },
      {
        day: "Day 4",
        focus: "Push & Pull",
        exerciseSlugs: ["diamond-push-up", "pull-up", "parallel-bar-dip"],
      },
    ],
  },
  {
    slug: "core-and-control",
    name: "Core & Control",
    level: "Intermediate",
    durationWeeks: 5,
    daysPerWeek: 3,
    focus: "Core",
    description:
      "Five weeks focused on the midline strength that underlies every advanced skill — from planks to a genuine L-sit.",
    schedule: [
      {
        day: "Day 1",
        focus: "Core Foundations",
        exerciseSlugs: ["plank", "hollow-hold"],
      },
      {
        day: "Day 2",
        focus: "Push & Core",
        exerciseSlugs: ["push-up", "hollow-hold", "plank"],
      },
      {
        day: "Day 3",
        focus: "Compression Work",
        exerciseSlugs: ["hollow-hold", "l-sit"],
      },
    ],
  },
  {
    slug: "hoplite-program",
    name: "The Hoplite Program",
    level: "Advanced",
    durationWeeks: 8,
    daysPerWeek: 4,
    focus: "Full Body",
    description:
      "An eight-week strength-and-skill block for advanced athletes chasing archer variations, pistol squats, and a controlled L-sit. Demanding, and not a starting point.",
    schedule: [
      {
        day: "Day 1",
        focus: "Push Strength",
        exerciseSlugs: ["diamond-push-up", "archer-push-up", "ring-dip"],
      },
      {
        day: "Day 2",
        focus: "Pull Strength",
        exerciseSlugs: ["pull-up", "archer-pull-up"],
      },
      {
        day: "Day 3",
        focus: "Legs",
        exerciseSlugs: ["bulgarian-split-squat", "pistol-squat"],
      },
      {
        day: "Day 4",
        focus: "Skills",
        exerciseSlugs: ["l-sit", "archer-push-up", "archer-pull-up"],
      },
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
