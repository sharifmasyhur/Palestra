import Link from "next/link";
import type { GeneratedWorkout } from "@/lib/workout-generator";
import { CategoryBadge } from "@/components/train/CategoryBadge";

export function WorkoutResult({ workout }: { workout: GeneratedWorkout }) {
  const { input, entries, estimatedMinutes } = workout;

  return (
    <div className="border border-sand rounded-md overflow-hidden">
      <div className="bg-charcoal text-ivory px-7 py-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest2 text-stone">
            {input.goal} · {input.experience} · {input.focus}
          </span>
          <h3 className="font-serif italic text-2xl mt-1">Your Generated Workout</h3>
        </div>
        <div className="text-right">
          <div className="font-serif italic text-3xl text-sand">~{estimatedMinutes} min</div>
          <div className="text-xs uppercase tracking-widest2 text-stone">
            requested {input.durationMinutes} min
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="p-10 text-center">
          <p className="font-serif italic text-xl mb-2">No movements matched those settings.</p>
          <p className="text-sm text-charcoal/60">
            Try adding more available equipment, or widening the focus.
          </p>
        </div>
      ) : (
        <ol>
          {entries.map((entry, i) => (
            <li
              key={entry.exercise.slug}
              className="flex flex-wrap items-center gap-4 px-7 py-5 border-b border-sand last:border-b-0"
            >
              <span className="font-serif italic text-xl text-stone w-7 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-[180px]">
                <Link
                  href={`/train/vault/${entry.exercise.slug}`}
                  className="font-serif text-lg hover:text-terracotta transition-colors"
                >
                  {entry.exercise.name}
                </Link>
                <div className="mt-1">
                  <CategoryBadge category={entry.exercise.category} />
                </div>
              </div>

              <div className="text-sm text-charcoal/80 text-right sm:text-left">
                <div className="font-semibold">
                  {entry.sets} sets ×{" "}
                  {entry.holdSeconds ? `${entry.holdSeconds}s hold` : `${entry.reps} reps`}
                </div>
                <div className="text-charcoal/50 text-xs uppercase tracking-widest2 mt-0.5">
                  {entry.restSeconds}s rest
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
