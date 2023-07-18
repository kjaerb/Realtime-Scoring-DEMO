import { JudgesConnected } from "@/validators/judgesSchema";
import { create } from "zustand";

interface CompetitionStore {
  competitionId: string;
  setCompetitionId: (competitionId: string) => void;
  judgeId: keyof JudgesConnected;
  setJudgeId: (judge: keyof JudgesConnected) => void;
  activeAthleteId: string;
  setActiveAthleteId: (athleteId: string) => void;
}

const useCompetitionStore = create<CompetitionStore>((set) => ({
  competitionId: "",
  setCompetitionId: (competitionId: string) => set({ competitionId }),
  judgeId: "admin",
  setJudgeId: (judgeId: keyof JudgesConnected) => set({ judgeId }),
  activeAthleteId: "",
  setActiveAthleteId: (activeAthleteId: string) => set({ activeAthleteId }),
}));

export default useCompetitionStore;
