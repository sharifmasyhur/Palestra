import type { GeneratedWorkout } from "@/lib/workout-generator";

// ---------------------------------------------------------------------------
// Workout session — the execution-time wrapper around a Stage 3
// GeneratedWorkout. Nothing here touches workout-generator.ts: a session is
// created *from* an already-generated workout and only ever reads it
// (`session.workout.entries[i].sets/reps/durationSeconds/restSeconds`),
// never mutates it. Execution progress (current exercise/set, phase, which
// sets are actually done) lives entirely in this wrapper.
//
// This is deliberately a plain data type + pure functions, not a class or
// a state-management library — `components/train/WorkoutExecutionScreen.tsx`
// owns the actual React state and calls these to compute transitions.
// ---------------------------------------------------------------------------

export type ExecutionPhase = "work" | "rest" | "complete";

export type CompletedSetRecord = {
  exerciseIndex: number;
  setIndex: number; // 0-based, within that exercise
};

export type ActiveWorkoutSession = {
  id: string;
  workout: GeneratedWorkout;
  startedAt: number; // epoch ms
  completedAt?: number; // epoch ms — set once, when phase transitions to "complete"
  currentExerciseIndex: number;
  currentSetIndex: number; // 0-based, the set currently being worked on
  phase: ExecutionPhase;
  completedSets: CompletedSetRecord[]; // append-only log of sets a user actually completed
};

export function createSession(workout: GeneratedWorkout): ActiveWorkoutSession {
  return {
    id: `session-${Date.now()}`,
    workout,
    startedAt: Date.now(),
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    phase: "work",
    completedSets: [],
  };
}

export function totalSetsInWorkout(session: ActiveWorkoutSession): number {
  return session.workout.entries.reduce((sum, entry) => sum + entry.sets, 0);
}

export function isLastSetOfExercise(session: ActiveWorkoutSession): boolean {
  const entry = session.workout.entries[session.currentExerciseIndex];
  return !entry || session.currentSetIndex + 1 >= entry.sets;
}

export function isLastExercise(session: ActiveWorkoutSession): boolean {
  return session.currentExerciseIndex + 1 >= session.workout.entries.length;
}

// ---------------------------------------------------------------------------
// Pure state transitions.
//
// Each takes a session and returns a new session — no side effects, no
// timers, no storage. This is what actually makes the state machine
// testable outside of React: a plain script can call these directly and
// assert on the result. `WorkoutExecutionScreen` only wires these to
// button clicks and a setInterval countdown; it contains no transition
// logic of its own.
// ---------------------------------------------------------------------------

/** Log the current set as done, then move to rest — or to "complete" if
 * this was the last set of the last exercise. */
export function completeCurrentSet(session: ActiveWorkoutSession): ActiveWorkoutSession {
  const completedSets = [
    ...session.completedSets,
    { exerciseIndex: session.currentExerciseIndex, setIndex: session.currentSetIndex },
  ];

  if (isLastSetOfExercise(session) && isLastExercise(session)) {
    return { ...session, completedSets, phase: "complete", completedAt: Date.now() };
  }
  return { ...session, completedSets, phase: "rest" };
}

/** Called when a rest countdown reaches 0, or "Skip Rest" is tapped. Moves
 * to the next set of the current exercise, or the next exercise's first
 * set if the current exercise is done. */
export function advanceAfterRest(session: ActiveWorkoutSession): ActiveWorkoutSession {
  if (isLastSetOfExercise(session)) {
    return {
      ...session,
      currentExerciseIndex: session.currentExerciseIndex + 1,
      currentSetIndex: 0,
      phase: "work",
    };
  }
  return { ...session, currentSetIndex: session.currentSetIndex + 1, phase: "work" };
}

/** Jump back to the previous exercise's first set. Discards any logged
 * sets at or after the target exercise, so completedSets can never claim
 * progress "ahead of" where the session currently sits. No-op (returns the
 * same session) if already on the first exercise. */
export function goToPreviousExercise(session: ActiveWorkoutSession): ActiveWorkoutSession {
  const targetIndex = session.currentExerciseIndex - 1;
  if (targetIndex < 0) return session;
  return {
    ...session,
    currentExerciseIndex: targetIndex,
    currentSetIndex: 0,
    phase: "work",
    completedSets: session.completedSets.filter((c) => c.exerciseIndex < targetIndex),
  };
}

/** Jump forward to the next exercise's first set, abandoning any
 * remaining sets of the current one (sets already logged as completed
 * stay logged — skipping isn't the same as un-completing). No-op if
 * already on the last exercise. */
export function skipToNextExercise(session: ActiveWorkoutSession): ActiveWorkoutSession {
  const targetIndex = session.currentExerciseIndex + 1;
  if (targetIndex >= session.workout.entries.length) return session;
  return { ...session, currentExerciseIndex: targetIndex, currentSetIndex: 0, phase: "work" };
}
