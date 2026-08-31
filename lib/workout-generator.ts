import {
  exercises,
  type Exercise,
  type ExerciseCategory,
  type Difficulty,
  type Equipment,
} from "@/data/exercises";

// ---------------------------------------------------------------------------
// Rule-based workout generator.
//
// This is deliberately NOT random-first: candidates are scored against the
// user's inputs (difficulty fit, category fit) and the highest scorers are
// selected, round-robining across categories so a "Full Body" workout
// doesn't come back as five push exercises. A seeded shuffle only breaks
// ties, so results are explainable rather than arbitrary — press
// "Regenerate" and you'll get a different but equally valid workout, not a
// random one.
// ---------------------------------------------------------------------------

export type Goal = "Strength" | "Muscle" | "Endurance" | "Skill";
export type Experience = "Beginner" | "Intermediate" | "Advanced";
export type DurationMinutes = 15 | 30 | 45 | 60;
export type Focus =
  | "Full Body"
  | "Upper Body"
  | "Lower Body"
  | "Push"
  | "Pull"
  | "Legs"
  | "Core"
  | "Skills";

export type GeneratorInput = {
  goal: Goal;
  experience: Experience;
  durationMinutes: DurationMinutes;
  equipment: Equipment[];
  focus: Focus;
};

export type GeneratedEntry = {
  exercise: Exercise;
  sets: number;
  reps?: number;
  holdSeconds?: number;
  restSeconds: number;
};

export type GeneratedWorkout = {
  input: GeneratorInput;
  entries: GeneratedEntry[];
  estimatedMinutes: number;
};

// Difficulty-fit scoring per experience level. Higher score = better fit;
// 0 means "excluded", not merely "unlikely".
const DIFFICULTY_FIT: Record<Experience, Partial<Record<Difficulty, number>>> = {
  Beginner: { Beginner: 3, Intermediate: 1 },
  Intermediate: { Beginner: 1, Intermediate: 3, Advanced: 1 },
  Advanced: { Intermediate: 2, Advanced: 3, Elite: 2 },
};

// Which exercise categories a given focus should draw from.
const FOCUS_CATEGORIES: Record<Focus, ExerciseCategory[]> = {
  "Full Body": ["Push", "Pull", "Legs", "Core", "Skills"],
  "Upper Body": ["Push", "Pull"],
  "Lower Body": ["Legs"],
  Push: ["Push"],
  Pull: ["Pull"],
  Legs: ["Legs"],
  Core: ["Core"],
  Skills: ["Skills"],
};

// Sets/reps/rest prescription by goal. `holdSeconds` used instead of
// `reps` for repType: "hold" exercises.
const GOAL_PRESCRIPTION: Record<
  Goal,
  { sets: number; reps: number; holdSeconds: number; restSeconds: number }
> = {
  Strength: { sets: 5, reps: 5, holdSeconds: 25, restSeconds: 120 },
  Muscle: { sets: 4, reps: 10, holdSeconds: 30, restSeconds: 70 },
  Endurance: { sets: 3, reps: 18, holdSeconds: 40, restSeconds: 40 },
  Skill: { sets: 5, reps: 5, holdSeconds: 15, restSeconds: 90 },
};

// Roughly how many exercises fit in a session of a given length, accounting
// for warmup/transition overhead eating into shorter sessions proportionally
// more than longer ones.
const EXERCISE_COUNT_BY_DURATION: Record<DurationMinutes, number> = {
  15: 3,
  30: 5,
  45: 6,
  60: 8,
};

function seededRandom(seed: number) {
  // mulberry32 — small, dependency-free, deterministic PRNG.
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function equipmentSatisfied(exercise: Exercise, available: Equipment[]): boolean {
  // An exercise needs at least one of its listed equipment options to be
  // available. "None" is always available.
  const availableSet = new Set<Equipment>(["None", ...available]);
  return exercise.equipment.some((req) => availableSet.has(req));
}

function scoreExercise(exercise: Exercise, input: GeneratorInput): number {
  const difficultyScore = DIFFICULTY_FIT[input.experience][exercise.difficulty] ?? 0;
  if (difficultyScore === 0) return 0;

  const relevantCategories = FOCUS_CATEGORIES[input.focus];
  if (!relevantCategories.includes(exercise.category)) return 0;

  // Slight bonus for goal/repType alignment: Skill goal favors hold-based
  // and Elite/Advanced movements; Endurance favors higher-rep-friendly,
  // lower-difficulty movements.
  let goalBonus = 0;
  if (input.goal === "Skill" && exercise.repType === "hold") goalBonus += 1;
  if (input.goal === "Endurance" && (exercise.difficulty === "Beginner" || exercise.difficulty === "Intermediate")) {
    goalBonus += 1;
  }

  return difficultyScore + goalBonus;
}

function buildEntry(exercise: Exercise, input: GeneratorInput): GeneratedEntry {
  const prescription = GOAL_PRESCRIPTION[input.goal];
  if (exercise.repType === "hold") {
    return {
      exercise,
      sets: prescription.sets,
      holdSeconds: prescription.holdSeconds,
      restSeconds: prescription.restSeconds,
    };
  }
  return {
    exercise,
    sets: prescription.sets,
    reps: prescription.reps,
    restSeconds: prescription.restSeconds,
  };
}

function estimateMinutes(entries: GeneratedEntry[]): number {
  const SECONDS_PER_REP = 3;
  const TRANSITION_SECONDS = 30; // time to move between exercises / setup

  let totalSeconds = 0;
  for (const entry of entries) {
    const workSecondsPerSet = entry.holdSeconds ?? (entry.reps ?? 0) * SECONDS_PER_REP;
    const restSeconds = entry.restSeconds * (entry.sets - 1); // no rest after last set
    totalSeconds += entry.sets * workSecondsPerSet + restSeconds + TRANSITION_SECONDS;
  }
  return Math.round(totalSeconds / 60);
}

export function generateWorkout(input: GeneratorInput, seed = 1): GeneratedWorkout {
  const random = seededRandom(seed);
  const targetCount = EXERCISE_COUNT_BY_DURATION[input.durationMinutes];
  const relevantCategories = FOCUS_CATEGORIES[input.focus];

  // Score and filter candidates.
  const candidates = exercises
    .filter((exercise) => equipmentSatisfied(exercise, input.equipment))
    .map((exercise) => ({ exercise, score: scoreExercise(exercise, input) }))
    .filter((c) => c.score > 0);

  // Group by category, sort each group by score desc with a seeded
  // shuffle to break ties, then round-robin across categories so the
  // workout doesn't lean entirely on one movement pattern.
  const byCategory = new Map<ExerciseCategory, { exercise: Exercise; score: number }[]>();
  for (const category of relevantCategories) byCategory.set(category, []);
  for (const candidate of candidates) {
    byCategory.get(candidate.exercise.category)?.push(candidate);
  }
  for (const group of byCategory.values()) {
    group.sort((a, b) => b.score - a.score || random() - 0.5);
  }

  const selected: Exercise[] = [];
  const categoryOrder = relevantCategories.filter((c) => (byCategory.get(c) ?? []).length > 0);
  let round = 0;
  while (selected.length < targetCount && categoryOrder.length > 0) {
    const category = categoryOrder[round % categoryOrder.length];
    const group = byCategory.get(category)!;
    const next = group.shift();
    if (next) selected.push(next.exercise);

    // Drop exhausted categories from rotation.
    if (group.length === 0) {
      const idx = categoryOrder.indexOf(category);
      categoryOrder.splice(idx, 1);
      if (categoryOrder.length === 0) break;
      continue;
    }
    round++;
  }

  const entries = selected.map((exercise) => buildEntry(exercise, input));

  return {
    input,
    entries,
    estimatedMinutes: estimateMinutes(entries),
  };
}
