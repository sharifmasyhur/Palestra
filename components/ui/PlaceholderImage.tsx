import { cx } from "@/lib/utils";

// Stand-in for real photography (statuary, ruins, athletes) referenced in
// the Figma. Per the build brief, placeholder imagery is intentional here
// — swap for real assets (next/image + a CMS or /public paths) without
// touching any layout code, since every consumer just renders this tile.
const tones = {
  light: "bg-gradient-to-br from-sand via-stone/70 to-bronze/60",
  dark: "bg-gradient-to-br from-charcoal-soft via-charcoal to-olive/80",
};

export function PlaceholderImage({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="Placeholder — photography pending"
      className={cx(tones[tone], className)}
    />
  );
}
