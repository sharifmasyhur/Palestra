import Link from "next/link";
import type { Exercise } from "@/data/exercises";
import { CategoryBadge, DifficultyLabel } from "@/components/train/CategoryBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/train/vault/${exercise.slug}`}
      className="group block border border-sand rounded-md overflow-hidden transition-colors hover:border-bronze bg-ivory"
    >
      <div className="relative h-40">
        <PlaceholderImage tone="light" className="absolute inset-0" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={exercise.category} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-serif text-lg group-hover:text-terracotta transition-colors">
            {exercise.name}
          </h3>
        </div>
        <DifficultyLabel difficulty={exercise.difficulty} />
        <p className="text-sm text-charcoal/70 mt-3 leading-snug">{exercise.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {exercise.primaryMuscles.map((muscle) => (
            <span
              key={muscle}
              className="text-[11px] uppercase tracking-wide text-charcoal/50 border border-sand rounded-full px-2 py-0.5"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
