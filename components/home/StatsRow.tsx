import { homeStats } from "@/data/stats";

export function StatsRow() {
  return (
    <section className="py-20 sm:py-14 border-t border-b border-sand">
      <div className="max-w-wrap mx-auto px-8 sm:px-5 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
        {homeStats.map((stat, i) => (
          <div key={stat.id} className={i === 0 ? "sm:pr-10 sm:border-r sm:border-sand" : "sm:pl-2"}>
            <div className="font-serif italic text-5xl sm:text-4xl text-terracotta">
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-widest2 text-charcoal/60 mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
