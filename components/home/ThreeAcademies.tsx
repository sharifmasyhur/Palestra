import Link from "next/link";
import { academies } from "@/data/academies";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function ThreeAcademies() {
  return (
    <section className="py-24 sm:py-16">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
            Three Academies
          </span>
          <h2 className="font-serif italic text-4xl sm:text-3xl mt-3">
            One Discipline, Three Paths
          </h2>
          <p className="text-charcoal/70 text-[15px] mt-4">
            Every athlete&rsquo;s practice rests on three pillars — how you
            move, how you measure, and how you understand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {academies.map((academy) => (
            <Link
              key={academy.id}
              href={academy.href}
              className="group block border border-sand rounded-md overflow-hidden transition-colors hover:border-bronze"
            >
              <div className="relative h-56">
                <PlaceholderImage tone="dark" className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
                <span className="absolute bottom-5 left-6 font-serif italic text-3xl text-ivory">
                  {academy.name}
                </span>
              </div>
              <div className="p-6">
                <p className="text-charcoal/70 text-sm mb-4">{academy.description}</p>
                <span className="text-xs font-semibold uppercase tracking-widest2 text-terracotta inline-flex items-center gap-2">
                  {academy.linkLabel}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
