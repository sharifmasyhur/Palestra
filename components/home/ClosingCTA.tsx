import { closingQuote } from "@/data/quotes";
import { Button } from "@/components/ui/Button";

export function ClosingCTA() {
  return (
    <section className="py-24 sm:py-16 border-t border-sand text-center">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
          {closingQuote.eyebrow}
        </span>
        <p className="font-serif italic text-4xl sm:text-3xl max-w-2xl mx-auto mt-4 mb-10">
          &ldquo;{closingQuote.quote}&rdquo;
        </p>
        <Button href={closingQuote.cta.href}>{closingQuote.cta.label}</Button>
      </div>
    </section>
  );
}
