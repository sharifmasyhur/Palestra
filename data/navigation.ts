// Site-wide navigation structure.
//
// Encodes the architecture explicitly so later stages (dropdown nav,
// sitemap, breadcrumbs) can consume the same source instead of
// re-deriving it. TRAIN / PROGRESS / LEARN are the three "Academies";
// TOOLKIT is a sibling utility area, not a fourth academy.

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const academyNav: NavItem[] = [
  {
    label: "Train",
    href: "/train",
    children: [
      { label: "Movement Vault", href: "/train/vault" },
      { label: "Programs", href: "/train/programs" },
      { label: "Workout Generator", href: "/train/generator" },
    ],
  },
  {
    label: "Progress",
    href: "/progress",
    children: [
      { label: "Athlete Dashboard", href: "/progress" },
      { label: "Mastery", href: "/progress/mastery" },
      { label: "XP / Levels", href: "/progress/levels" },
      { label: "Achievements", href: "/progress/achievements" },
    ],
  },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "Training", href: "/learn/training" },
      { label: "Nutrition", href: "/learn/nutrition" },
      { label: "Recovery", href: "/learn/recovery" },
      { label: "Ancient Athletics", href: "/learn/ancient-athletics" },
    ],
  },
];

export const toolkitNav: NavItem = {
  label: "Toolkit",
  href: "/toolkit",
  children: [
    { label: "BMR", href: "/toolkit/bmr" },
    { label: "TDEE", href: "/toolkit/tdee" },
    { label: "Body Fat", href: "/toolkit/body-fat" },
    { label: "BMI", href: "/toolkit/bmi" },
    { label: "Body Composition", href: "/toolkit/body-composition" },
  ],
};

// Flat list for the primary navbar (Stage 1 only renders top-level links;
// `children` is available now so Stage 3+ can add dropdowns without
// touching the data shape).
export const primaryNav: NavItem[] = [...academyNav, toolkitNav];
