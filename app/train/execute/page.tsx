import type { Metadata } from "next";
import { WorkoutExecutionScreen } from "@/components/train/WorkoutExecutionScreen";

export const metadata: Metadata = {
  title: "Workout In Progress — PALESTRA",
  description: "Execute your generated workout, one set at a time.",
};

export default function ExecuteWorkoutPage() {
  return (
    <section className="py-16 sm:py-10">
      <div className="max-w-wrap mx-auto px-8 sm:px-5">
        <WorkoutExecutionScreen />
      </div>
    </section>
  );
}
