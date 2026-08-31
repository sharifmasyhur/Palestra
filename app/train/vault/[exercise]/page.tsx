import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { exercises, getExerciseBySlug } from "@/data/exercises";
import { CategoryBadge, DifficultyLabel } from "@/components/train/CategoryBadge";
import { ProgressionTree } from "@/components/train/ProgressionTree";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return exercises.map((exercise) => ({ exercise: exercise.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { exercise: string };
}): Metadata {
  const exercise = getExerciseBySlug(params.exercise);
  if (!exercise) return {};
  return {
    title: `${exercise.name} — PALESTRA`,
    description: exercise.shortDescription,
  };
}

export default function ExerciseDetailPage({ params }: { params: { exercise: string } }) {
  const exercise = getExerciseBySlug(params.exercise);
  if (!exercise) notFound();

  return (
    <article className="py-16 sm:py-10">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <PlaceholderImage tone="dark" className="h-72 md:h-full rounded-md min-h-[280px]" />
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge category={exercise.category} />
              <DifficultyLabel difficulty={exercise.difficulty} />
            </div>
            <h1 className="font-serif italic text-4xl sm:text-3xl mb-5">{exercise.name}</h1>
            <p className="text-charcoal/70 text-[15px] mb-8 max-w-md">{exercise.shortDescription}</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/50 mb-2">
                  Equipment
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.equipment.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest2 text-charcoal/50 mb-2">
                  Primary Muscles
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.primaryMuscles.map((muscle) => (
                    <Badge key={muscle}>{muscle}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body: instructions + mistakes + recommendation | progression tree */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
          <div>
            <section className="mb-12">
              <h2 className="font-serif italic text-2xl mb-5">How to Perform It</h2>
              <ol className="flex flex-col gap-4">
                {exercise.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-serif italic text-lg text-stone shrink-0 w-6">
                      {i + 1}
                    </span>
                    <span className="text-[15px] text-charcoal/80 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="font-serif italic text-2xl mb-5">Common Mistakes</h2>
              <ul className="flex flex-col gap-3">
                {exercise.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-charcoal/80 leading-relaxed">
                    <span className="text-terracotta shrink-0" aria-hidden="true">
                      ×
                    </span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

            {exercise.secondaryMuscles.length > 0 && (
              <section className="mb-12">
                <h2 className="font-serif italic text-2xl mb-5">Secondary Muscles</h2>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.secondaryMuscles.map((muscle) => (
                    <Badge key={muscle}>{muscle}</Badge>
                  ))}
                </div>
              </section>
            )}

            <section className="border-t border-sand pt-8">
              <h2 className="font-serif italic text-2xl mb-4">Training Recommendation</h2>
              <p className="text-[15px] text-charcoal/80 leading-relaxed max-w-xl">
                {exercise.trainingRecommendation}
              </p>
            </section>
          </div>

          {/* Progression tree */}
          <aside>
            <div className="border border-sand rounded-md p-7 lg:sticky lg:top-28">
              <h2 className="font-serif italic text-xl mb-6">Progression Tree</h2>
              <ProgressionTree exercise={exercise} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
