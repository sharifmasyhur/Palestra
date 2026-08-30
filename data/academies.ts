export type Academy = {
  id: string;
  letter: string; // used in the medallion emblem
  name: string;
  description: string;
  href: string;
  linkLabel: string;
};

export const academies: Academy[] = [
  {
    id: "train",
    letter: "T",
    name: "Train",
    description:
      "A living library of bodyweight movement — progression trees from first rep to full mastery, filterable by muscle, equipment, and difficulty.",
    href: "/train",
    linkLabel: "Enter the Vault",
  },
  {
    id: "progress",
    letter: "P",
    name: "Progress",
    description:
      "Rank from Foundation to Olympian. Track streaks, volume, and mastery the way a coach would — honestly, and over time.",
    href: "/progress",
    linkLabel: "View Dashboard",
  },
  {
    id: "learn",
    letter: "L",
    name: "Learn",
    description:
      "Editorial-grade writing on training, nutrition, recovery, and the ancient roots of physical culture. No gimmicks, no fads.",
    href: "/learn",
    linkLabel: "Read the Journal",
  },
];
