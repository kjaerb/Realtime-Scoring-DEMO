import { create } from "zustand";

interface CompetitionStore {
  competitionId: string;
  setCompetitionId: (competitionId: string) => void;
}

const useCompetitionStore = create<CompetitionStore>((set) => ({
  competitionId: "",
  setCompetitionId: (competitionId: string) => set({ competitionId }),
}));

export default useCompetitionStore;
