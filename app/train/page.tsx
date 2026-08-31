import Link from "next/link";
import type { Metadata } from "next";
import { categories, exercises } from "@/data/exercises";
import { programs } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CategoryBadge } from "@/components/train/CategoryBadge";

export const metadata: Metadata = {
  title: "Train — PALESTRA",
  description: "The Movement Vault, Training Programs, and Workout Generator.",
};

const areas = [
  {
    name: "Movement Vault",
    description:
      "Search and filter every foundational movement in the system, each with a full progression tree from first rep to mastery.",
    href: "/train/vault",
    linkLabel: "Enter the Vault",
  },
  {
    name: "Programs",
    description:
      "Structured, multi-week training plans — pick one built for your level and let the weekly schedule do the thinking.",
    href: "/train/programs",
    linkLabel: "Browse Programs",
  },
  {
    name: "Workout Generator",
    description:
      "Set your goal, experience, duration, and equipment, and get a single structured workout built on the spot.",
    href: "/train/generator",
    linkLabel: "Generate a Workout",
  },
];

export default function TrainPage() {
  return (
    <>
      <section>
        <div className="relative h-[52vh] min-h-[360px] max-h-[520px]">
          <PlaceholderImage tone="dark" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
          <div className="relative h-full max-w-wrap mx-auto px-8 sm:px-5 flex flex-col justify-end pb-14">
            <span className="text-xs font-semibold uppercase tracking-widest2 text-sand mb-4">
              Academy One
            </span>
            <h1 className="font-serif italic text-ivory text-5xl sm:text-6xl leading-[1.05] max-w-xl">
              Train
            </h1>
            <p className="text-ivory/80 text-base max-w-md mt-5">
              Every movement, every progression, every workout you&rsquo;ll need — organized the
              way a coach would organize it, not a spreadsheet.
            </p>
          </div>
        </div>
      </section>

      {/* Three entry points */}
      <section className="py-20 sm:py-14">
        <div className="max-w-wrap mx-auto px-8 sm:px-5 grid grid-cols-1 md:grid-cols-3 gap-7">
          {areas.map((area) => (
            <div key={area.href} className="border border-sand rounded-md p-7 flex flex-col">
              <h2 className="font-serif italic text-2xl mb-3">{area.name}</h2>
              <p className="text-sm text-charcoal/70 mb-6 flex-1">{area.description}</p>
              <Button href={area.href} variant="secondary" className="self-start">
                {area.linkLabel}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Category quick links */}
      <section className="py-20 sm:py-14 bg-sand/40">
        <div className="max-w-wrap mx-auto px-8 sm:px-5">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
                Browse by Category
              </span>
              <h2 className="font-serif italic text-3xl mt-2">Five Movement Patterns</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {categories.map((category) => {
              const count = exercises.filter((e) => e.category === category).length;
              return (
                <Link
                  key={category}
                  href={`/train/vault?category=${category}`}
                  className="group block border border-sand rounded-md p-5 bg-ivory hover:border-bronze transition-colors"
                >
                  <CategoryBadge category={category} />
                  <div className="font-serif italic text-xl mt-3 group-hover:text-terracotta transition-colors">
                    {category}
                  </div>
                  <div className="text-xs text-charcoal/50 mt-1">{count} movements</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs teaser */}
      <section className="py-20 sm:py-14">
        <div className="max-w-wrap mx-auto px-8 sm:px-5 flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
              {programs.length} Programs Available
            </span>
            <h2 className="font-serif italic text-3xl mt-2">Structured, Not Improvised</h2>
          </div>
          <Link
            href="/train/programs"
            className="text-xs font-semibold uppercase tracking-widest2 text-terracotta"
          >
            View All Programs →
          </Link>
        </div>
      </section>
    </>
  );
}
