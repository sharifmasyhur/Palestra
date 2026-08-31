import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs, getProgramBySlug } from "@/data/programs";
import { getExerciseBySlug } from "@/data/exercises";
import { DifficultyLabel } from "@/components/train/CategoryBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function generateStaticParams() {
  return programs.map((program) => ({ program: program.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { program: string };
}): Metadata {
  const program = getProgramBySlug(params.program);
  if (!program) return {};
  return { title: `${program.name} — PALESTRA`, description: program.description };
}

export default function ProgramDetailPage({ params }: { params: { program: string } }) {
  const program = getProgramBySlug(params.program);
  if (!program) notFound();

  return (
    <article className="py-16 sm:py-10">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <PlaceholderImage tone="dark" className="h-64 md:h-full rounded-md min-h-[240px]" />
          <div>
            <DifficultyLabel difficulty={program.level} />
            <h1 className="font-serif italic text-4xl sm:text-3xl mt-3 mb-5">{program.name}</h1>
            <p className="text-charcoal/70 text-[15px] mb-8 max-w-md">{program.description}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-widest2 text-charcoal/60">
              <span>{program.durationWeeks} Weeks</span>
              <span>{program.daysPerWeek}x / Week</span>
              <span>Focus: {program.focus}</span>
            </div>
          </div>
        </div>

        <h2 className="font-serif italic text-2xl mb-7">Weekly Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {program.schedule.map((day) => (
            <div key={day.day} className="border border-sand rounded-md p-6">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif italic text-xl">{day.day}</h3>
                <span className="text-xs uppercase tracking-widest2 text-bronze">{day.focus}</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {day.exerciseSlugs.map((slug) => {
                  const exercise = getExerciseBySlug(slug);
                  if (!exercise) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/train/vault/${exercise.slug}`}
                        className="text-[15px] hover:text-terracotta transition-colors"
                      >
                        {exercise.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
