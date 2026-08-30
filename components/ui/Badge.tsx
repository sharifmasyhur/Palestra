import { cx } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        "inline-block text-[11px] font-semibold uppercase tracking-widest2",
        "px-[11px] py-[5px] rounded-full border border-stone text-olive bg-stone/10",
        className
      )}
      {...props}
    />
  );
}
