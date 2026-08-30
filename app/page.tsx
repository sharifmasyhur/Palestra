import { Hero } from "@/components/home/Hero";
import { ThreeAcademies } from "@/components/home/ThreeAcademies";
import { FeaturedWorkout } from "@/components/home/FeaturedWorkout";
import { StatsRow } from "@/components/home/StatsRow";
import { JournalPreview } from "@/components/home/JournalPreview";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreeAcademies />
      <FeaturedWorkout />
      <StatsRow />
      <JournalPreview />
      <ClosingCTA />
    </>
  );
}
