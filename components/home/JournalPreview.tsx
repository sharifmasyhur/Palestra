import Link from "next/link";
import { journalPreview } from "@/data/journal";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function JournalPreview() {
  return (
    <section className="py-24 sm:py-16">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest2 text-bronze">
              The Journal
            </span>
            <h2 className="font-serif italic text-4xl sm:text-3xl mt-3">Areté Journal</h2>
          </div>
          <Link
            href="/learn"
            className="text-xs font-semibold uppercase tracking-widest2 text-terracotta"
          >
            View All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {journalPreview.map((post) => (
            <Link key={post.id} href={post.href} className="group block">
              <PlaceholderImage tone="light" className="h-44 rounded-md mb-5" />
              <Badge className="mb-4">{post.category}</Badge>
              <h3 className="font-serif text-xl leading-snug mb-2 group-hover:text-terracotta transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-charcoal/70 mb-3">{post.excerpt}</p>
              <span className="text-xs font-semibold uppercase tracking-widest2 text-olive">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
