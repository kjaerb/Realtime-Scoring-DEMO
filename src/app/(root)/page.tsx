import { CreateCompetition } from "@/components/Competition/CreateCompetition";
import { JoinCompetition } from "@/components/Competition/JoinCompetition";

export default function HomePage() {
  return (
    <main className="flex justify-center items-center min-h-screen space-x-4">
      <CreateCompetition />
      <JoinCompetition />
    </main>
  );
}
