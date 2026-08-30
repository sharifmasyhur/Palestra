import { cx } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "bg-ivory border border-sand rounded-md p-9 transition-all duration-200",
        "hover:-translate-y-1 hover:border-bronze hover:shadow-[0_14px_30px_rgba(23,21,15,0.08)]",
        className
      )}
      {...props}
    />
  );
}
