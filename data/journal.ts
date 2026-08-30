export type JournalPost = {
  id: string;
  category: "Training" | "Nutrition" | "Recovery" | "Ancient Athletics";
  title: string;
  excerpt: string;
  href: string;
};

export const journalPreview: JournalPost[] = [
  {
    id: "progression-beats-programming",
    category: "Training",
    title: "Why Progression Beats Programming",
    excerpt:
      "The case for mastering movement patterns before chasing volume.",
    href: "/learn/training/progression-beats-programming",
  },
  {
    id: "what-the-palaestra-taught",
    category: "Ancient Athletics",
    title: "What the Palaestra Actually Taught",
    excerpt: "A look at how Greek athletes trained before equipment existed.",
    href: "/learn/ancient-athletics/what-the-palaestra-taught",
  },
  {
    id: "the-discipline-of-rest",
    category: "Recovery",
    title: "The Discipline of Rest",
    excerpt: "Recovery as a trained skill, not an afterthought.",
    href: "/learn/recovery/the-discipline-of-rest",
  },
];
