export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full h-1 bg-sand rounded-full overflow-hidden" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full bg-bronze rounded-full" style={{ width: `${clamped}%` }} />
    </div>
  );
}
