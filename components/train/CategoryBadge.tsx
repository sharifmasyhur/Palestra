import { cx } from "@/lib/utils";
import type { ExerciseCategory, Difficulty } from "@/data/exercises";

// One consistent color mapping for categories, used on cards, filters,
// and detail pages so a category reads the same everywhere in Train.
const categoryTone: Record<ExerciseCategory, string> = {
  Push: "border-terracotta/50 text-terracotta bg-terracotta/10",
  Pull: "border-olive/50 text-olive bg-olive/10",
  Legs: "border-bronze/50 text-bronze bg-bronze/10",
  Core: "border-charcoal/40 text-charcoal bg-charcoal/5",
  Skills: "border-stone text-charcoal bg-stone/15",
};

export function CategoryBadge({ category }: { category: ExerciseCategory }) {
  return (
    <span
      className={cx(
        "inline-block text-[11px] font-semibold uppercase tracking-widest2 px-[11px] py-[5px] rounded-full border",
        categoryTone[category]
      )}
    >
      {category}
    </span>
  );
}

const difficultyTone: Record<Difficulty, string> = {
  Beginner: "text-olive",
  Intermediate: "text-bronze",
  Advanced: "text-terracotta",
  Elite: "text-charcoal",
};

export function DifficultyLabel({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={cx("text-xs font-semibold uppercase tracking-widest2", difficultyTone[difficulty])}>
      {difficulty}
    </span>
  );
}
