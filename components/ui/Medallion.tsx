// Signature emblem: a thin double-ring medallion with a serif initial.
// Reused for the three Academy cards on the homepage, and intended to be
// reused again for rank badges in the Progress stage — a visual echo of
// the "ranked, earned" theme running through the brief.
export function Medallion({ letter }: { letter: string }) {
  return (
    <div className="relative w-[58px] h-[58px] rounded-full border border-bronze flex items-center justify-center font-serif text-[22px] text-bronze">
      <span className="absolute inset-[5px] rounded-full border border-stone/50" aria-hidden="true" />
      <span className="relative">{letter}</span>
    </div>
  );
}
