import { cx } from "@/lib/utils";

// Wraps the .meander CSS utility (see app/globals.css) so it's used as a
// component rather than a raw class string scattered through pages.
export function Meander({ tone = "stone" }: { tone?: "stone" | "bronze" }) {
  return (
    <div
      className={cx("meander", tone === "stone" ? "meander-stone" : "meander-bronze")}
      aria-hidden="true"
    />
  );
}
