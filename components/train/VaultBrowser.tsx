"use client";

import { useMemo, useState } from "react";
import {
  exercises,
  categories,
  difficulties,
  equipmentOptions,
  muscleOptions,
  type ExerciseCategory,
  type Difficulty,
  type Equipment,
  type Muscle,
} from "@/data/exercises";
import { ExerciseCard } from "@/components/train/ExerciseCard";
import { cx } from "@/lib/utils";

type CategoryFilter = ExerciseCategory | "All";
type DifficultyFilter = Difficulty | "Any";
type EquipmentFilter = Equipment | "Any";
type MuscleFilter = Muscle | "Any";

export function VaultBrowser({ initialCategory }: { initialCategory?: ExerciseCategory }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory ?? "All");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("Any");
  const [equipment, setEquipment] = useState<EquipmentFilter>("Any");
  const [muscle, setMuscle] = useState<MuscleFilter>("Any");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return exercises.filter((exercise) => {
      if (category !== "All" && exercise.category !== category) return false;
      if (difficulty !== "Any" && exercise.difficulty !== difficulty) return false;
      if (equipment !== "Any" && !exercise.equipment.includes(equipment)) return false;
      if (
        muscle !== "Any" &&
        !exercise.primaryMuscles.includes(muscle) &&
        !exercise.secondaryMuscles.includes(muscle)
      ) {
        return false;
      }
      if (q) {
        const haystack = `${exercise.name} ${exercise.shortDescription}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, category, difficulty, equipment, muscle]);

  const hasActiveFilters =
    search !== "" || category !== "All" || difficulty !== "Any" || equipment !== "Any" || muscle !== "Any";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setDifficulty("Any");
    setEquipment("Any");
    setMuscle("Any");
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <label htmlFor="vault-search" className="sr-only">
          Search exercises
        </label>
        <input
          id="vault-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the vault — e.g. &ldquo;push-up&rdquo; or &ldquo;core&rdquo;"
          className="w-full border border-sand rounded-sm bg-ivory px-5 py-3.5 text-[15px] placeholder:text-charcoal/40 focus:outline-none focus:border-bronze transition-colors"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter by category">
        {(["All", ...categories] as CategoryFilter[]).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={cx(
              "px-4 py-2 text-xs font-semibold uppercase tracking-widest2 rounded-sm border transition-colors",
              category === c
                ? "bg-charcoal text-ivory border-charcoal"
                : "bg-transparent text-charcoal/70 border-sand hover:border-bronze"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pb-8 border-b border-sand">
        <FilterSelect
          label="Difficulty"
          value={difficulty}
          onChange={(v) => setDifficulty(v as DifficultyFilter)}
          options={["Any", ...difficulties]}
        />
        <FilterSelect
          label="Equipment"
          value={equipment}
          onChange={(v) => setEquipment(v as EquipmentFilter)}
          options={["Any", ...equipmentOptions]}
        />
        <FilterSelect
          label="Primary Muscle"
          value={muscle}
          onChange={(v) => setMuscle(v as MuscleFilter)}
          options={["Any", ...muscleOptions]}
        />
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-charcoal/60">
          {filtered.length} {filtered.length === 1 ? "movement" : "movements"}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-semibold uppercase tracking-widest2 text-terracotta"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exercise) => (
            <ExerciseCard key={exercise.slug} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-sand rounded-md">
          <p className="font-serif italic text-xl mb-2">No movements match those filters.</p>
          <p className="text-sm text-charcoal/60 mb-6">Try loosening a filter or clearing search.</p>
          <button
            onClick={clearFilters}
            className="text-xs font-semibold uppercase tracking-widest2 text-terracotta"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest2 text-charcoal/60 mb-2">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-sand rounded-sm bg-ivory px-4 py-2.5 text-sm focus:outline-none focus:border-bronze transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
