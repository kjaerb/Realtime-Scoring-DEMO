const router = {
  home: "/",
  competition: {
    home: `/competition`,
    judge: (id: string) => `/competition/judge/${id}`,
  },
} as const;

const realTimeDBRouter = {
  competition: (competitionId: string) => `${competitionId}`,
  judgesConnected: (competitionId: string) =>
    `${competitionId}/judgesConnected`,
  scores: (competitionId: string) => `${competitionId}/scores`,
  getScoresForAthlete: (competitionId: string, athleteId: string) =>
    `${competitionId}/scores/${athleteId}`,
  getScoreForAthlete: (
    competitionId: string,
    athleteId: string,
    judgeId: string
  ) => `${competitionId}/scores/${athleteId}/${judgeId}`,
  setScoreForAthlete: (
    competitionId: string,
    athleteId: string,
    judgeId: string
  ) => `${competitionId}/scores/${athleteId}/${judgeId}`,
  athletes: (competitionId: string) => `${competitionId}/athletes`,
  activeAthlete: (competitionId: string) => `${competitionId}/activeAthlete`,
  athlete: (competitionId: string, athleteId: string) =>
    `${competitionId}/athletes/${athleteId}`,
  judge: (competitionId: string, judgeId: string) =>
    `${competitionId}/judgesConnected/${judgeId}`,
  judgeScore: (competitionId: string, judgeId: string) =>
    `${competitionId}/scores/${judgeId}`,
};

export { router, realTimeDBRouter };
