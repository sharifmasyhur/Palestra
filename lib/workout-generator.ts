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
// Data model separation: `Exercise` (data/exercises.ts) describes a movement
// in the abstract — it never carries sets/reps/rest. `WorkoutExercise` below
// is the *prescription* — the same Exercise assigned different sets, reps,
// duration, and rest depending on which workout it landed in. Nothing here
// mutates or extends the Exercise type; a prescription is always built fresh
// at generation time from the exercise + the requested goal.
//
// Selection is fully deterministic — no Math.random, no PRNG. Candidates are
// filtered (equipment, difficulty-appropriateness, focus) and scored, then
// selected round-robin across categories/movement patterns so a session
// stays balanced instead of stacking one pattern. Sibling exercises on the
// same progression chain are never selected together (Push-Up + Diamond
// Push-Up in one session is redundant, not "more work"). A `variationIndex`
// (incremented by the Regenerate button) deterministically rotates which
// equally-scored candidates come out on top, so pressing Regenerate explores
// *other valid sessions* rather than randomizing the same one.
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

// The generated prescription for one exercise within one specific workout.
// Deliberately separate from `Exercise`: the same exercise gets a different
// WorkoutExercise every time it's selected, depending on goal/experience.
export type WorkoutExercise = {
  exercise: Exercise;
  sets: number;
  reps?: number;
  durationSeconds?: number; // used instead of `reps` when exercise.repType === "hold"
  restSeconds: number;
};

export type GeneratedWorkout = {
  input: GeneratorInput;
  entries: WorkoutExercise[];
  estimatedMinutes: number;
};

// Difficulty-fit scoring per experience level. Higher score = better fit;
// undefined/0 means "excluded" — an Elite movement is never shown to a
// Beginner regardless of how well it scores elsewhere.
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

// Sets/reps/rest prescription by goal. `durationSeconds` used instead of
// `reps` for repType: "hold" exercises.
const GOAL_PRESCRIPTION: Record<
  Goal,
  { sets: number; reps: number; durationSeconds: number; restSeconds: number }
> = {
  Strength: { sets: 5, reps: 5, durationSeconds: 25, restSeconds: 120 },
  Muscle: { sets: 4, reps: 10, durationSeconds: 30, restSeconds: 70 },
  Endurance: { sets: 3, reps: 18, durationSeconds: 40, restSeconds: 40 },
  Skill: { sets: 5, reps: 5, durationSeconds: 15, restSeconds: 90 },
};

// Roughly how many exercises fit in a session of a given length, accounting
// for warmup/transition overhead eating into shorter sessions proportionally
// more than longer ones.
const EXERCISE_COUNT_BY_DURATION: Record<DurationMinutes, number> = {
  15: 3,
  30: 5,
  45: 7,
  60: 9,
};

function equipmentSatisfied(exercise: Exercise, available: Equipment[]): boolean {
  // An exercise needs at least one of its listed equipment options to be
  // available. "None" is always available.
  const availableSet = new Set<Equipment>(["None", ...available]);
  return exercise.equipment.some((req) => availableSet.has(req));
}

type ScoredExercise = { exercise: Exercise; score: number };

function scoreExercise(exercise: Exercise, input: GeneratorInput): number {
  const difficultyScore = DIFFICULTY_FIT[input.experience][exercise.difficulty] ?? 0;
  if (difficultyScore === 0) return 0;

  const relevantCategories = FOCUS_CATEGORIES[input.focus];
  if (!relevantCategories.includes(exercise.category)) return 0;

  // Small, explainable bonuses for goal/repType alignment — never enough to
  // override a difficulty mismatch, since difficultyScore dominates the sum.
  let goalBonus = 0;
  if (input.goal === "Skill" && exercise.repType === "hold") goalBonus += 1;
  if (
    input.goal === "Endurance" &&
    (exercise.difficulty === "Beginner" || exercise.difficulty === "Intermediate")
  ) {
    goalBonus += 1;
  }

  return difficultyScore + goalBonus;
}

// Candidates that share a direct progression edge with something already
// selected are considered redundant for one session (e.g. Push-Up and
// Diamond Push-Up together doubles up on nearly the same stimulus).
function isChainAdjacent(candidate: Exercise, selected: Exercise[]): boolean {
  return selected.some((s) => {
    if (candidate.progression.easier?.slug === s.slug) return true;
    if (candidate.progression.harder?.slug === s.slug) return true;
    if (s.progression.easier?.slug === candidate.slug) return true;
    if (s.progression.harder?.slug === candidate.slug) return true;
    return false;
  });
}

/**
 * Deterministically rank a group of candidates, then rotate the ranking by
 * `variationIndex` positions. Same inputs + same variationIndex always
 * produce the same order — this is a rotation, not a shuffle.
 */
function rankAndRotate(group: ScoredExercise[], variationIndex: number): ScoredExercise[] {
  const ranked = [...group].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.exercise.name.localeCompare(b.exercise.name); // stable, deterministic tiebreak
  });
  if (ranked.length === 0) return ranked;
  const offset = variationIndex % ranked.length;
  return [...ranked.slice(offset), ...ranked.slice(0, offset)];
}

function buildPrescription(exercise: Exercise, input: GeneratorInput): WorkoutExercise {
  const prescription = GOAL_PRESCRIPTION[input.goal];
  if (exercise.repType === "hold") {
    return {
      exercise,
      sets: prescription.sets,
      durationSeconds: prescription.durationSeconds,
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

function estimateMinutes(entries: WorkoutExercise[]): number {
  const SECONDS_PER_REP = 3;
  const TRANSITION_SECONDS = 30; // time to move between exercises / setup

  let totalSeconds = 0;
  for (const entry of entries) {
    const workSecondsPerSet = entry.durationSeconds ?? (entry.reps ?? 0) * SECONDS_PER_REP;
    const restSeconds = entry.restSeconds * (entry.sets - 1); // no rest after the last set
    totalSeconds += entry.sets * workSecondsPerSet + restSeconds + TRANSITION_SECONDS;
  }
  return Math.round(totalSeconds / 60);
}

/**
 * Generate a workout. Deterministic for a given (input, variationIndex) —
 * call again with a different variationIndex (e.g. incremented by a
 * "Regenerate" button) to deterministically explore a different, still
 * valid, session.
 */
export function generateWorkout(input: GeneratorInput, variationIndex = 0): GeneratedWorkout {
  const targetCount = EXERCISE_COUNT_BY_DURATION[input.durationMinutes];
  const relevantCategories = FOCUS_CATEGORIES[input.focus];

  // Filter to equipment-satisfied, difficulty-appropriate, focus-relevant
  // candidates and score them.
  const candidates: ScoredExercise[] = exercises
    .filter((exercise) => equipmentSatisfied(exercise, input.equipment))
    .map((exercise) => ({ exercise, score: scoreExercise(exercise, input) }))
    .filter((c) => c.score > 0);

  // Group by category, rank + rotate each group deterministically.
  const byCategory = new Map<ExerciseCategory, ScoredExercise[]>();
  for (const category of relevantCategories) byCategory.set(category, []);
  for (const candidate of candidates) {
    byCategory.get(candidate.exercise.category)?.push(candidate);
  }
  for (const [category, group] of byCategory) {
    byCategory.set(category, rankAndRotate(group, variationIndex));
  }

  const selected: Exercise[] = [];
  const patternCounts = new Map<string, number>();
  // Single-category focuses (e.g. "Push") legitimately need >1 exercise per
  // pattern since they only have 1-3 patterns total; multi-category focuses
  // (Full Body, Upper Body) cap each pattern at 1 to force real diversity.
  const maxPerPattern = relevantCategories.length > 1 ? 1 : 2;

  const categoryOrder = relevantCategories.filter((c) => (byCategory.get(c) ?? []).length > 0);
  let cursor = 0;
  let guard = 0; // safety bound so a pathological input can't loop forever
  const guardLimit = exercises.length * 4;

  while (selected.length < targetCount && categoryOrder.length > 0 && guard < guardLimit) {
    guard++;
    const category = categoryOrder[cursor % categoryOrder.length];
    const group = byCategory.get(category)!;

    // Find the first candidate in this category's ranked queue that doesn't
    // violate the pattern cap or chain-adjacency rule.
    const pickIndex = group.findIndex(({ exercise }) => {
      const patternCount = patternCounts.get(exercise.movementPattern) ?? 0;
      if (patternCount >= maxPerPattern) return false;
      if (isChainAdjacent(exercise, selected)) return false;
      return true;
    });

    if (pickIndex === -1) {
      // Nothing usable left in this category — drop it from rotation.
      const idx = categoryOrder.indexOf(category);
      categoryOrder.splice(idx, 1);
      continue;
    }

    const [picked] = group.splice(pickIndex, 1);
    selected.push(picked.exercise);
    patternCounts.set(
      picked.exercise.movementPattern,
      (patternCounts.get(picked.exercise.movementPattern) ?? 0) + 1
    );

    if (group.length === 0) {
      const idx = categoryOrder.indexOf(category);
      categoryOrder.splice(idx, 1);
    }
    cursor++;
  }

  const entries = selected.map((exercise) => buildPrescription(exercise, input));

  return {
    input,
    entries,
    estimatedMinutes: estimateMinutes(entries),
  };
}