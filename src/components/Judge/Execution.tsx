"use client";

import useCompetitionStore from "@/stores/competitionStore";
import { ScoreInput } from "./ScoreInput";

interface ExecutionProps {}

export function Execution({}: ExecutionProps) {
  const { activeAthleteId } = useCompetitionStore();

  return (
    <div>
      <p>Athlete {activeAthleteId}</p>
      <ScoreInput inputCount={11} />
    </div>
  );
}
