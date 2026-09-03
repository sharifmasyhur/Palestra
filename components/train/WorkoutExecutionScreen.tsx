"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";
import {
  totalSetsInWorkout,
  isLastSetOfExercise,
  isLastExercise,
  completeCurrentSet as completeCurrentSetTransition,
  advanceAfterRest as advanceAfterRestTransition,
  goToPreviousExercise as goToPreviousExerciseTransition,
  skipToNextExercise,
  type ActiveWorkoutSession,
} from "@/lib/workout-session";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CategoryBadge, DifficultyLabel } from "@/components/train/CategoryBadge";
import { cx } from "@/lib/utils";

// ---------------------------------------------------------------------------
// State machine summary (see lib/workout-session.ts for the data shape):
//
//   phase "work"  (reps)  -> user taps "Complete Set"        -> see below
//   phase "work"  (hold)  -> real countdown reaches 0        -> see below
//                             (auto-completes the set; a manual
//                              "Complete Set" button is also available
//                              in case someone wants to end a hold early)
//   completing a set:
//     - last set of last exercise  -> phase "complete" (workout done)
//     - otherwise                  -> phase "rest", real countdown starts
//   phase "rest" -> countdown reaches 0 (or "Skip Rest" tapped) ->
//     - last set of current exercise -> next exercise, set 0, phase "work"
//     - otherwise                    -> next set, same exercise, phase "work"
//
// Only `session` (phase/index/completedSets) is persisted to localStorage,
// not the live per-second countdown — so a refresh recovers your exact
// position (exercise, set, phase) but the current countdown restarts from
// the top rather than resuming mid-second. That's a deliberate simplicity
// tradeoff, not an oversight: persisting every tick would mean a write to
// localStorage every second for no real benefit.
// ---------------------------------------------------------------------------

export function WorkoutExecutionScreen() {
  // undefined = "haven't checked storage yet" (avoids an SSR/CSR flash);
  // null = "checked, nothing there".
  const [session, setSession] = useState<ActiveWorkoutSession | null | undefined>(undefined);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hydrate once on mount — this is the refresh-recovery path.
  useEffect(() => {
    setSession(readStorage<ActiveWorkoutSession>(STORAGE_KEYS.activeWorkout));
  }, []);

  // Persist on every meaningful state change (not on every timer tick —
  // `secondsRemaining` is separate local state, so ticking doesn't write).
  useEffect(() => {
    if (session) writeStorage(STORAGE_KEYS.activeWorkout, session);
  }, [session]);

  function clearTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  // --- Transition functions. All use the functional setState form so they
  // never close over a stale `session` — safe to call from inside a
  // setInterval callback. ---

  function completeCurrentSet() {
    setSession((prev) => (prev ? completeCurrentSetTransition(prev) : prev));
  }

  function advanceAfterRest() {
    setSession((prev) => (prev ? advanceAfterRestTransition(prev) : prev));
  }

  function goToPreviousExercise() {
    clearTimer();
    setSession((prev) => (prev ? goToPreviousExerciseTransition(prev) : prev));
  }

  function skipExercise() {
    clearTimer();
    setSession((prev) => (prev ? skipToNextExercise(prev) : prev));
  }

  function skipRest() {
    clearTimer();
    advanceAfterRest();
  }

  // --- The timer effect: one real countdown, correctly torn down and
  // rebuilt whenever phase/exercise/set changes. ---
  useEffect(() => {
    if (!session || session.phase === "complete") return;
    const entry = session.workout.entries[session.currentExerciseIndex];
    if (!entry) return;

    clearTimer();

    if (session.phase === "rest") {
      setSecondsRemaining(entry.restSeconds);
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((s) => {
          if (s <= 1) {
            clearTimer();
            advanceAfterRest();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else if (session.phase === "work" && entry.durationSeconds !== undefined) {
      // Hold-based exercise: real countdown, auto-completes the set at 0.
      setSecondsRemaining(entry.durationSeconds);
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((s) => {
          if (s <= 1) {
            clearTimer();
            completeCurrentSet();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    // Rep-based "work" phase: no timer — completeCurrentSet() only fires
    // from the explicit "Complete Set" tap below.

    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.phase, session?.currentExerciseIndex, session?.currentSetIndex]);

  // Stop any timer on unmount, belt-and-suspenders on top of the effect
  // cleanup above.
  useEffect(() => () => clearTimer(), []);

  // ------------------------------------------------------------- Render --

  if (session === undefined) {
    return (
      <div className="py-24 text-center text-charcoal/50 text-sm">Loading your workout…</div>
    );
  }

  if (session === null) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <p className="font-serif italic text-2xl mb-3">No active workout.</p>
        <p className="text-sm text-charcoal/60 mb-8">
          Generate a workout first, then start it from there.
        </p>
        <Button href="/train/generator">Go to Generator</Button>
      </div>
    );
  }

  const totalExercises = session.workout.entries.length;
  const totalSets = totalSetsInWorkout(session);
  const overallPercent = totalSets === 0 ? 0 : Math.round((session.completedSets.length / totalSets) * 100);

  if (session.phase === "complete") {
    const elapsedMinutes = session.completedAt
      ? Math.max(1, Math.round((session.completedAt - session.startedAt) / 60000))
      : 0;
    return (
      <div className="py-20 max-w-xl mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
          Workout Complete
        </span>
        <h1 className="font-serif italic text-4xl mt-3 mb-8">Well Trained.</h1>
        <div className="grid grid-cols-3 gap-6 border-y border-sand py-8 mb-10">
          <div>
            <div className="font-serif italic text-3xl text-terracotta">{totalExercises}</div>
            <div className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-1">Exercises</div>
          </div>
          <div>
            <div className="font-serif italic text-3xl text-terracotta">
              {session.completedSets.length}
            </div>
            <div className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-1">Sets Done</div>
          </div>
          <div>
            <div className="font-serif italic text-3xl text-terracotta">~{elapsedMinutes}m</div>
            <div className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-1">Elapsed</div>
          </div>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href="/train">Return to Train</Button>
          <Button href="/train/generator" variant="secondary">
            Generate Another
          </Button>
        </div>
      </div>
    );
  }

  const entry = session.workout.entries[session.currentExerciseIndex];
  const exercise = entry.exercise;
  const isHold = entry.durationSeconds !== undefined;
  const canGoPrevious = session.currentExerciseIndex > 0;
  const canSkip = session.currentExerciseIndex < totalExercises - 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Overall progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest2 text-charcoal/50 mb-2">
          <span>
            Exercise {session.currentExerciseIndex + 1} of {totalExercises}
          </span>
          <span>{overallPercent}% complete</span>
        </div>
        <ProgressBar percent={overallPercent} />
      </div>

      {session.phase === "rest" ? (
        <div className="border border-sand rounded-md p-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">Rest</span>
          <div className="font-serif italic text-6xl my-6 text-terracotta" aria-live="polite">
            {secondsRemaining}s
          </div>
          <p className="text-sm text-charcoal/60 mb-8">
            Up next: {isLastSetOfExercise(session) && !isLastExercise(session)
              ? session.workout.entries[session.currentExerciseIndex + 1]?.exercise.name
              : `${exercise.name} — Set ${session.currentSetIndex + 2} of ${entry.sets}`}
          </p>
          <Button onClick={skipRest} variant="secondary">
            Skip Rest
          </Button>
        </div>
      ) : (
        <div className="border border-sand rounded-md p-8 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <CategoryBadge category={exercise.category} />
            <DifficultyLabel difficulty={exercise.difficulty} />
          </div>

          <h1 className="font-serif italic text-3xl sm:text-2xl mb-1">{exercise.name}</h1>
          <p className="text-xs uppercase tracking-widest2 text-charcoal/45 mb-6">
            Set {session.currentSetIndex + 1} of {entry.sets}
          </p>

          {isHold ? (
            <div className="text-center py-6 mb-6 bg-sand/30 rounded-md">
              <div className="font-serif italic text-7xl text-terracotta" aria-live="polite">
                {secondsRemaining}s
              </div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-2">
                Hold — target {entry.durationSeconds}s
              </p>
            </div>
          ) : (
            <div className="text-center py-6 mb-6 bg-sand/30 rounded-md">
              <div className="font-serif italic text-7xl text-terracotta">{entry.reps}</div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-2">
                reps — tap Complete Set when done
              </p>
            </div>
          )}

          {exercise.cues.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {exercise.cues.map((cue) => (
                <span
                  key={cue}
                  className="text-[13px] text-olive border border-sand rounded-full px-3.5 py-1.5 bg-ivory"
                >
                  {cue}
                </span>
              ))}
            </div>
          )}

          <Button onClick={completeCurrentSet} className="w-full justify-center mb-4">
            Complete Set
          </Button>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goToPreviousExercise}
              disabled={!canGoPrevious}
              className={cx(
                "text-xs font-semibold uppercase tracking-widest2",
                canGoPrevious
                  ? "text-charcoal/70 hover:text-terracotta"
                  : "text-charcoal/25 cursor-not-allowed"
              )}
            >
              ← Previous Exercise
            </button>
            <Link
              href={`/train/vault/${exercise.slug}`}
              className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/50 hover:text-terracotta"
            >
              View Full Exercise
            </Link>
            <button
              onClick={skipExercise}
              disabled={!canSkip}
              className={cx(
                "text-xs font-semibold uppercase tracking-widest2",
                canSkip
                  ? "text-charcoal/70 hover:text-terracotta"
                  : "text-charcoal/25 cursor-not-allowed"
              )}
            >
              Skip Exercise →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
