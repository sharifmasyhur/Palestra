import Link from "next/link";
import type { Program } from "@/data/programs";
import { DifficultyLabel } from "@/components/train/CategoryBadge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/train/programs/${program.slug}`}
      className="group block border border-sand rounded-md overflow-hidden transition-colors hover:border-bronze bg-ivory"
    >
      <PlaceholderImage tone="dark" className="h-40" />
      <div className="p-6">
        <DifficultyLabel difficulty={program.level} />
        <h3 className="font-serif italic text-2xl mt-2 mb-3 group-hover:text-terracotta transition-colors">
          {program.name}
        </h3>
        <p className="text-sm text-charcoal/70 mb-5 leading-relaxed">{program.description}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-widest2 text-charcoal/50">
          <span>{program.durationWeeks} Weeks</span>
          <span>{program.daysPerWeek}x / Week</span>
          <span>{program.focus}</span>
        </div>
      </div>
    </Link>
  );
}
