# PALESTRA — v0.1

Bodyweight/resistance training platform. Next.js (App Router) + TypeScript + Tailwind CSS.

## Status

**Stage 1 (Foundation) and Stage 2 (Homepage) are built.** Stages 3–6
(Train, Progress, Toolkit, Learn) are not yet started — see the master
build doc for the full plan.

## Run it

This was authored without network access, so it hasn't been installed or
run yet. From the project root:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

```
app/
  layout.tsx        Root layout — font loading, Navbar/Footer shell
  page.tsx           Homepage (assembles components/home/*)
  globals.css         Tailwind entry + signature meander motif
components/
  ui/                 Stage 1 primitives: Button, Card, Badge, ProgressBar,
                       Tabs, Medallion, Meander, PlaceholderImage
  layout/             Navbar, MobileMenu, Footer
  home/               Homepage sections: Hero, ThreeAcademies,
                       FeaturedWorkout, StatsRow, JournalPreview, ClosingCTA
data/                  Mock/static data — navigation, academies, ranks,
                       stats, journal, hero copy, featured workout, quotes
lib/
  utils.ts             cx() classname helper
tailwind.config.ts      Design tokens: colors, fonts, radii — the single
                        source of truth for the visual system
```

## Design tokens

| Token        | Value      | Use                                   |
|--------------|------------|----------------------------------------|
| `ivory`      | `#F4F1E9`  | Base background                        |
| `sand`       | `#E4D9C0`  | Borders, section backgrounds           |
| `stone`      | `#B2A488`  | Secondary borders, muted text          |
| `charcoal`   | `#17150F`  | Dark sections, primary text            |
| `olive`      | `#3B4430`  | Secondary accent                       |
| `bronze`     | `#9C7A47`  | Eyebrows, medallions, badges           |
| `terracotta` | `#B5563A`  | Primary CTA, links, highlight numbers  |

Display face: **Cormorant Garamond** (italic for headlines/pull-quotes).
Body/UI face: **Work Sans**.

## Known deviations from the Figma reference

- **Imagery is placeholder** (gradient tiles via `PlaceholderImage`), not
  the real photography shown in the reference screenshots. Swap the
  `PlaceholderImage` usages for `next/image` once real assets exist — no
  layout changes needed, every image slot already goes through one
  component.
- **Nothing has been run.** This sandbox has no network access, so
  `npm install`/`next dev` haven't been executed here. Everything is
  written by hand against Next.js 14 / React 18 conventions and should
  run as-is, but hasn't been visually verified against the Figma pixel-
  for-pixel yet — do that first pass locally before we continue to Stage 3.

## Navigation architecture

`data/navigation.ts` encodes the explicit structure:

```
TRAIN     → Movement Vault, Programs, Workout Generator
PROGRESS  → Athlete Dashboard, Mastery, XP/Levels, Achievements
LEARN     → Training, Nutrition, Recovery, Ancient Athletics
TOOLKIT   → BMR, TDEE, Body Fat, BMI, Body Composition (sibling to the
            three academies, not a fourth one)
```

Stage 1's navbar only renders top-level links; `children` is already
there so Stage 3+ can add dropdowns without touching the data shape.

## Next

Stage 3 — Train (mock exercise data, Movement Vault grid + filters,
exercise detail with progression tree).
