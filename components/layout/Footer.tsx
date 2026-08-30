import Link from "next/link";
import { academyNav, toolkitNav } from "@/data/navigation";
import { Meander } from "@/components/ui/Meander";

const footerColumns = [...academyNav, toolkitNav].map((item) => ({
  title: item.label,
  links: item.children ?? [{ label: item.label, href: item.href }],
}));

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/70">
      <Meander tone="bronze" />

      <div className="max-w-wrap mx-auto px-8 sm:px-5 py-16 grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-serif text-2xl text-ivory mb-3">
            PALESTRA<span className="text-terracotta">.</span>
          </div>
          <p className="text-sm text-stone max-w-[240px]">
            A modern palaestra for bodyweight strength, honest progression,
            and the education behind it.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-widest2 text-stone mb-4">
              {col.title}
            </h4>
            {col.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm mb-3 text-ivory/70 hover:text-ivory transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="max-w-wrap mx-auto px-8 sm:px-5 border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-stone">
        <span>© {new Date().getFullYear()} PALESTRA. Build Your Aretē.</span>
        <span>Strength was never meant to require a machine.</span>
      </div>
    </footer>
  );
}
