"use client";

import { useState } from "react";
import {
  generateWorkout,
  type Goal,
  type Experience,
  type DurationMinutes,
  type Focus,
  type GeneratedWorkout,
} from "@/lib/workout-generator";
import { equipmentOptions, type Equipment } from "@/data/exercises";
import { Button } from "@/components/ui/Button";
import { WorkoutResult } from "@/components/train/WorkoutResult";
import { cx } from "@/lib/utils";

const goals: Goal[] = ["Strength", "Muscle", "Endurance", "Skill"];
const experiences: Experience[] = ["Beginner", "Intermediate", "Advanced"];
const durations: DurationMinutes[] = [15, 30, 45, 60];
const focuses: Focus[] = ["Full Body", "Upper Body", "Lower Body", "Push", "Pull", "Legs", "Core", "Skills"];

export function GeneratorForm() {
  const [goal, setGoal] = useState<Goal>("Muscle");
  const [experience, setExperience] = useState<Experience>("Beginner");
  const [duration, setDuration] = useState<DurationMinutes>(30);
  const [focus, setFocus] = useState<Focus>("Full Body");
  const [equipment, setEquipment] = useState<Equipment[]>(["None"]);

  const [workout, setWorkout] = useState<GeneratedWorkout | null>(null);
  // Deterministic rotation index — NOT a random seed. Incrementing it walks
  // the generator to the next ranked-and-rotated candidate set, so
  // "Regenerate" always produces a different, still-valid workout rather
  // than a random one. Same variationIndex + same inputs => same result.
  const [variationIndex, setVariationIndex] = useState(0);

  function toggleEquipment(item: Equipment) {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  }

  function handleGenerate() {
    const nextIndex = variationIndex + 1;
    setVariationIndex(nextIndex);
    setWorkout(
      generateWorkout(
        { goal, experience, durationMinutes: duration, focus, equipment },
        nextIndex
      )
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10">
      {/* ------------------------------------------------------------ Form */}
      <div className="border border-sand rounded-md p-7 h-fit lg:sticky lg:top-28">
        <h2 className="font-serif italic text-2xl mb-6">Custom Regimen Synthesizer</h2>

        <fieldset className="mb-6">
          <legend className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/60 mb-3">
            Goal
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {goals.map((g) => (
              <ChipButton key={g} active={goal === g} onClick={() => setGoal(g)}>
                {g}
              </ChipButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/60 mb-3">
            Experience Level
          </legend>
          <div className="grid grid-cols-3 gap-3">
            {experiences.map((e) => (
              <ChipButton key={e} active={experience === e} onClick={() => setExperience(e)}>
                {e}
              </ChipButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/60 mb-3">
            Duration
          </legend>
          <div className="grid grid-cols-4 gap-2">
            {durations.map((d) => (
              <ChipButton key={d} active={duration === d} onClick={() => setDuration(d)}>
                {d}m
              </ChipButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/60 mb-3">
            Training Focus
          </legend>
          <label htmlFor="focus-select" className="sr-only">
            Training focus
          </label>
          <select
            id="focus-select"
            value={focus}
            onChange={(e) => setFocus(e.target.value as Focus)}
            className="w-full border border-sand rounded-sm bg-ivory px-4 py-2.5 text-sm focus:outline-none focus:border-bronze transition-colors"
          >
            {focuses.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/60 mb-3">
            Available Equipment
          </legend>
          <div className="flex flex-wrap gap-2">
            {equipmentOptions.map((item) => (
              <ChipButton key={item} active={equipment.includes(item)} onClick={() => toggleEquipment(item)}>
                {item}
              </ChipButton>
            ))}
          </div>
        </fieldset>

        <Button onClick={handleGenerate} className="w-full justify-center">
          {workout ? "Regenerate Workout" : "Generate Workout"}
        </Button>
      </div>

      {/* --------------------------------------------------------- Result */}
      <div>
        {workout ? (
          <WorkoutResult workout={workout} />
        ) : (
          <div className="border border-dashed border-sand rounded-md h-full flex items-center justify-center text-center p-14 min-h-[320px]">
            <div>
              <p className="font-serif italic text-2xl mb-2">Your regimen awaits synthesis.</p>
              <p className="text-sm text-charcoal/60 max-w-sm">
                Set your goal, experience, duration, focus, and equipment on the left, then
                generate a structured workout built from the Movement Vault.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "px-3 py-2 text-xs font-semibold uppercase tracking-widest2 rounded-sm border transition-colors text-center",
        active
          ? "bg-charcoal text-ivory border-charcoal"
          : "bg-transparent text-charcoal/70 border-sand hover:border-bronze"
      )}
    >
      {children}
    </button>
  );
}
