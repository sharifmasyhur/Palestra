import { hero } from "@/data/hero";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Hero() {
  return (
    <section>
      <div className="relative h-[78vh] min-h-[480px] max-h-[720px]">
        <PlaceholderImage tone="dark" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

        <div className="relative h-full max-w-wrap mx-auto px-8 sm:px-5 flex flex-col justify-end pb-16">
          <span className="eyebrow text-[12px] font-semibold uppercase tracking-widest2 text-sand mb-5">
            {hero.eyebrow}
          </span>
          <h1 className="font-serif italic text-ivory text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-2xl">
            {hero.title}
          </h1>
          <p className="font-serif italic text-xl text-sand mt-4">{hero.subcopy}</p>
          <p className="text-ivory/80 text-base max-w-md mt-5">{hero.description}</p>

          <div className="flex flex-wrap gap-4 mt-9">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost-light">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-wrap mx-auto px-8 sm:px-5 -mt-px">
        <div className="border-t border-b border-sand py-9 text-center">
          <p className="font-serif italic text-2xl sm:text-3xl max-w-2xl mx-auto">
            &ldquo;{hero.pullQuote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
