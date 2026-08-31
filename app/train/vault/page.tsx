import type { Metadata } from "next";
import { categories, type ExerciseCategory } from "@/data/exercises";
import { VaultBrowser } from "@/components/train/VaultBrowser";

export const metadata: Metadata = {
  title: "Movement Vault — PALESTRA",
  description: "Search and filter every foundational movement in the PALESTRA system.",
};

function parseCategory(value: string | undefined): ExerciseCategory | undefined {
  return categories.find((c) => c === value);
}

export default function VaultPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const initialCategory = parseCategory(searchParams.category);

  return (
    <section className="py-16 sm:py-10">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
            Train
          </span>
          <h1 className="font-serif italic text-4xl sm:text-3xl mt-2 mb-4">Palestra Movement Vault</h1>
          <p className="text-charcoal/70 text-[15px]">
            Every foundational movement in the system — searchable, filterable, and organized by
            category, difficulty, equipment, and the muscles it trains.
          </p>
        </div>

        <VaultBrowser initialCategory={initialCategory} />
      </div>
    </section>
  );
}
