"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory/70 backdrop-blur-md border-b border-sand">
      <div className="max-w-wrap mx-auto px-8 sm:px-5 flex items-center justify-between h-[82px]">
        <Link href="/" className="font-serif text-2xl tracking-widest2 font-semibold">
          PALESTRA<span className="text-terracotta">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-widest2 relative py-1 group"
            >
              {item.label}
              <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-terracotta scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-7">
          <Button href="/train" className="hidden md:inline-flex">
            Begin Your Journey
          </Button>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-[5px] p-1.5"
          >
            <span className="w-[22px] h-[1.5px] bg-charcoal block" />
            <span className="w-[22px] h-[1.5px] bg-charcoal block" />
            <span className="w-[22px] h-[1.5px] bg-charcoal block" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
