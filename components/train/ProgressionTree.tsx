import Link from "next/link";
import { getExerciseBySlug, type Exercise } from "@/data/exercises";
import { cx } from "@/lib/utils";

// Walks the progression chain both directions from the current exercise so
// the tree shows the *whole* line (e.g. Incline Push-Up -> Push-Up ->
// Diamond -> Archer -> One-Arm), not just the immediate neighbors.
function walkChain(exercise: Exercise): Exercise[] {
  const chain: Exercise[] = [exercise];

  let cursor = exercise;
  while (cursor.progression.easier) {
    const prev = getExerciseBySlug(cursor.progression.easier.slug);
    if (!prev) break;
    chain.unshift(prev);
    cursor = prev;
  }

  cursor = exercise;
  while (cursor.progression.harder) {
    const next = getExerciseBySlug(cursor.progression.harder.slug);
    if (!next) break;
    chain.push(next);
    cursor = next;
  }

  return chain;
}

export function ProgressionTree({ exercise }: { exercise: Exercise }) {
  const chain = walkChain(exercise);

  if (chain.length === 1) {
    return (
      <p className="text-sm text-charcoal/60">
        This movement doesn&rsquo;t sit on a progression chain in the Vault yet.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-0">
      {chain.map((step, i) => {
        const isCurrent = step.slug === exercise.slug;
        const isLast = i === chain.length - 1;
        return (
          <li key={step.slug} className="relative pl-8">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[9px] top-6 bottom-0 w-px bg-sand"
              />
            )}
            <span
              aria-hidden="true"
              className={cx(
                "absolute left-0 top-1.5 w-[19px] h-[19px] rounded-full border flex items-center justify-center",
                isCurrent
                  ? "bg-terracotta border-terracotta"
                  : "bg-ivory border-stone"
              )}
            >
              {isCurrent && <span className="w-2 h-2 rounded-full bg-ivory" />}
            </span>

            <div className={cx("pb-7", isLast && "pb-0")}>
              {isCurrent ? (
                <span className="font-serif italic text-lg text-terracotta">{step.name}</span>
              ) : (
                <Link
                  href={`/train/vault/${step.slug}`}
                  className="font-serif text-lg hover:text-terracotta transition-colors"
                >
                  {step.name}
                </Link>
              )}
              <div className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-0.5">
                {step.difficulty}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
