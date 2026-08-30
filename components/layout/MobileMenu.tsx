"use client";

import Link from "next/link";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";
import { useEffect } from "react";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cx(
        "fixed inset-0 z-[100] bg-ivory flex-col p-6 md:hidden",
        open ? "flex" : "hidden"
      )}
    >
      <div className="flex items-center justify-between mb-14">
        <Link href="/" onClick={onClose} className="font-serif text-2xl tracking-widest2 font-semibold">
          PALESTRA<span className="text-terracotta">.</span>
        </Link>
        <button aria-label="Close menu" onClick={onClose} className="text-3xl leading-none">
          &times;
        </button>
      </div>

      <nav className="flex flex-col gap-7">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="font-serif text-3xl font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Button href="/train" onClick={onClose} className="mt-10 self-start">
        Begin Your Journey
      </Button>
    </div>
  );
}
