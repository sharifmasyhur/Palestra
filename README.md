# PALESTRA — v0.1

Bodyweight/resistance training platform. Next.js (App Router) + TypeScript + Tailwind CSS.

## Status

**Stages 1–3 are built**: Foundation, Homepage, and Train (Movement
Vault, exercise detail, Programs, and the Workout Generator). Stages 4–6
(Progress, Toolkit, Learn) are not yet started.

### Stage 3 — Train

| Route | What it does |
|---|---|
| `/train` | Landing page — links into Vault/Programs/Generator, category quick-links |
| `/train/vault` | Movement Vault — client-side search + category tabs + difficulty/equipment/muscle filters over 21 exercises |
| `/train/vault/[exercise]` | Exercise detail — instructions, mistakes, muscles, equipment, and a progression tree walked in both directions from the data |
| `/train/programs` | Program cards (data-driven) |
| `/train/programs/[program]` | Program detail — weekly schedule linking back into the Vault |
| `/train/generator` | Client-side rule-based Workout Generator (goal/experience/duration/focus/equipment → a scored, generated workout) |

**How the generator works** (`lib/workout-generator.ts`): fully
deterministic, zero randomness (no `Math.random`, no PRNG). Every
exercise is scored against experience level (difficulty fit) and focus
(category fit), filtered by equipment, then selected round-robin across
categories with two extra guards: a movement-pattern cap (multi-category
focuses like "Full Body" allow at most one exercise per pattern, so a
session can't stack five Horizontal Push movements) and a chain-adjacency
check (an exercise is never selected alongside its direct progression
neighbor — Push-Up and Diamond Push-Up won't appear in the same session,
since that's redundant stimulus, not more work). "Regenerate" increments
a `variationIndex` that deterministically *rotates* which equally-scored
candidates surface first — same inputs + same index always produce the
same workout, so it's reproducible, not arbitrary, while still surfacing
a genuinely different valid session each click.

**Data model separation**: `Exercise` (in `data/exercises.ts`) describes
a movement in the abstract and never carries sets/reps/rest.
`WorkoutExercise` (in `lib/workout-generator.ts`) is the prescription —
built fresh at generation time, so the same `Exercise` gets different
sets/reps/duration/rest depending on which workout it lands in and what
goal was selected.

**Exercise dataset** (`data/exercises.ts`): 71 exercises — Push 14,
Pull 12, Legs 13, Core 16, Skills 16 — each carrying `movementPattern`
(the functional pattern it trains — Horizontal Push, Hinge, Anti-Rotation,
Lever, etc., 21 patterns total) and `cues` (short coaching phrases,
separate from the numbered `instructions`), on top of difficulty,
equipment, primary/secondary muscles, common mistakes, training
recommendation, and progression links. Real chains, e.g. `Incline
Push-Up → Push-Up → Diamond Push-Up → Archer Push-Up → One-Arm
Push-Up`, occasionally crossing categories where that's how the skill
actually develops (Elevated Pike Push-Up → Wall Handstand Push-Up).
`ProgressionTree` walks the chain in both directions from whichever
exercise you're viewing. Core alone spans six distinct movement
families (anti-extension, flexion/compression, rotation, anti-rotation,
static hold, dynamic core) rather than being a handful of plank
variants. Skills is genuine advanced-calisthenics territory —
handstand/handstand-push-up lines, front lever, back lever, planche,
muscle-up, human flag — not a miscellaneous bucket.

Verified after the expansion: all 71 slugs unique, all 94 progression
references resolve to real exercises, every exercise has both
`movementPattern` and `cues` populated, and the file type-checks clean
(see `WORKOUT-GENERATOR.md`-style verification commands below if you
want to re-run these yourself).

```bash
node --input-type=module -e "
import fs from 'fs';
const src = fs.readFileSync('data/exercises.ts','utf8');
const slugs = [...src.matchAll(/^\s*slug: \"([a-z0-9-]+)\",\$/gm)].map(m=>m[1]);
console.log('Total exercises:', slugs.length);
"
```

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
  train/               Train components: VaultBrowser (client, search/filter),
                       ExerciseCard, ProgressionTree, CategoryBadge/
                       DifficultyLabel, ProgramCard, GeneratorForm (client),
                       WorkoutResult
data/                  Mock/static data — navigation, academies, ranks,
                       stats, journal, hero copy, featured workout, quotes,
                       exercises (21-exercise Vault dataset), programs
lib/
  utils.ts             cx() classname helper
  workout-generator.ts  Pure, seeded, rule-based workout generation engine
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

Stage 4 — Progress (athlete profile, XP/levels, achievements, streak,
movement mastery — the `ranks.ts` data staged in Stage 2 is ready to be
consumed here).
