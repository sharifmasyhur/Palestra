"use client";

import { cx } from "@/lib/utils";
import { useState } from "react";

export type TabItem = {
  id: string;
  label: string;
};

// Not used on the homepage yet — built now because Stage 1 calls for it
// as a core reusable component, and Train (exercise filters) and Learn
// (article categories) will both need it in later stages.
export function Tabs({
  items,
  defaultId,
  onChange,
}: {
  items: TabItem[];
  defaultId?: string;
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);

  function select(id: string) {
    setActive(id);
    onChange?.(id);
  }

  return (
    <div role="tablist" className="inline-flex gap-1 bg-sand/50 rounded-sm p-1">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={active === item.id}
          onClick={() => select(item.id)}
          className={cx(
            "px-4 py-2 text-xs font-semibold uppercase tracking-widest2 rounded-sm transition-colors",
            active === item.id
              ? "bg-charcoal text-ivory"
              : "text-charcoal/70 hover:text-charcoal"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
