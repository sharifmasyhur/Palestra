import { featuredWorkout } from "@/data/featured-workout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function FeaturedWorkout() {
  return (
    <section className="py-24 sm:py-16 bg-sand/40">
      <div className="max-w-wrap mx-auto px-8 sm:px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <PlaceholderImage tone="light" className="h-80 md:h-[420px] rounded-md order-1 md:order-none" />

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
            {featuredWorkout.eyebrow}
          </span>
          <h2 className="font-serif italic text-4xl sm:text-3xl mt-3 mb-5">
            {featuredWorkout.title}
          </h2>
          <p className="text-charcoal/70 text-[15px] mb-6 max-w-md">
            {featuredWorkout.description}
          </p>
          <Badge className="mb-8">{featuredWorkout.tag}</Badge>
          <div>
            <Button href={featuredWorkout.cta.href}>{featuredWorkout.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
