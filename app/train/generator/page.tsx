import type { Metadata } from "next";
import { GeneratorForm } from "@/components/train/GeneratorForm";

export const metadata: Metadata = {
  title: "Workout Generator — PALESTRA",
  description: "Generate a structured workout from your goal, experience, and equipment.",
};

export default function GeneratorPage() {
  return (
    <section className="py-16 sm:py-10">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">Train</span>
          <h1 className="font-serif italic text-4xl sm:text-3xl mt-2 mb-4">Workout Generator</h1>
          <p className="text-charcoal/70 text-[15px]">
            A rule-based system, not a random one — every exercise is scored against your goal,
            experience level, focus, and available equipment before it makes the cut.
          </p>
        </div>

        <GeneratorForm />
      </div>
    </section>
  );
}
