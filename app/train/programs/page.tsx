import type { Metadata } from "next";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/train/ProgramCard";

export const metadata: Metadata = {
  title: "Training Programs — PALESTRA",
  description: "Structured, multi-week training programs for every level.",
};

export default function ProgramsPage() {
  return (
    <section className="py-16 sm:py-10">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">Train</span>
          <h1 className="font-serif italic text-4xl sm:text-3xl mt-2 mb-4">Training Programs</h1>
          <p className="text-charcoal/70 text-[15px]">
            Structured, multi-week plans that string movements from the Vault into a coherent
            progression — pick one built for where you are, not where you wish you were.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
