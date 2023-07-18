import { realTimeDB } from "@/lib/firebase";
import { realTimeDBRouter } from "@/lib/router";
import useCompetitionStore from "@/stores/competitionStore";
import { JudgesConnected } from "@/validators/judgesSchema";
import {
  DataSnapshot,
  get,
  off,
  onDisconnect,
  onValue,
  ref,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";

interface SetExecutionScoreProps {
  inputCount: number;
}

export function useSetScore({ inputCount }: SetExecutionScoreProps) {
  const { competitionId, judgeId, activeAthleteId } = useCompetitionStore();

  const [scores, setScores] = useState<string[]>(Array(inputCount).fill(""));

  useEffect(() => {
    if (!competitionId || !activeAthleteId || !judgeId) return;

    const scoreRef = ref(
      realTimeDB,
      realTimeDBRouter.getScoreForAthlete(
        competitionId,
        activeAthleteId,
        judgeId
      )
    );

    get(scoreRef).then((snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setScores(Array(inputCount).fill(""));
        return;
      }

      console.log("Setting scores to " + data);

      setScores(data);
    });

    const handleSnapshot = (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      if (!data) {
        setScores(Array(inputCount).fill(""));
        return;
      }

      console.log("Setting scores to " + data);

      setScores(data);
    };

    onValue(scoreRef, handleSnapshot);

    return () => {
      console.log("Unmounting getting scores from " + competitionId + "....");
      onDisconnect(scoreRef).cancel();
      off(scoreRef, "value", handleSnapshot);
    };
  }, [competitionId, activeAthleteId]);

  useEffect(() => {
    if (!competitionId || !activeAthleteId || !judgeId) return;

    const scoreRef = ref(
      realTimeDB,
      realTimeDBRouter.setScoreForAthlete(
        competitionId,
        activeAthleteId,
        judgeId
      )
    );

    // Don't update if there are no scores or the scores are empty
    if (!scores || scores === null || scores.filter((n) => n).length === 0)
      return;

    set(scoreRef, scores);

    return () => {
      console.log("Unmounting scores from " + judgeId + "....");
      onDisconnect(scoreRef).cancel();
    };
    // Todo update, such that the component doesn't constantly rerender
  }, [scores]);

  return [scores, setScores] as const;
}

interface GetScoresProps {
  judgeId: string;
}

export function useGetScore({ judgeId }: GetScoresProps) {
  const { competitionId, activeAthleteId } = useCompetitionStore();
  const [scores, setScores] = useState<string[]>([]);

  useEffect(() => {
    if (!competitionId || !activeAthleteId || !judgeId) return;

    const scoreRef = ref(
      realTimeDB,
      realTimeDBRouter.getScoreForAthlete(
        competitionId,
        activeAthleteId,
        judgeId
      )
    );

    get(scoreRef).then((snapshot) => {
      const data = snapshot.val();

      setScores(data);
    });

    const handleSnapshot = (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      setScores(data);
    };

    onValue(scoreRef, handleSnapshot);

    return () => {
      console.log("Unmounting getting scores from " + competitionId + "....");
      onDisconnect(scoreRef).cancel();
      off(scoreRef, "value", handleSnapshot);
    };
  }, [competitionId, activeAthleteId]);

  return scores;
}

export function useGetScores() {
  const { competitionId, activeAthleteId } = useCompetitionStore();
  const [scores, setScores] = useState<Record<
    keyof JudgesConnected,
    string[]
  > | null>(null);

  useEffect(() => {
    if (!competitionId || !activeAthleteId) return;

    const scoreRef = ref(
      realTimeDB,
      realTimeDBRouter.getScoresForAthlete(competitionId, activeAthleteId)
    );

    get(scoreRef).then((snapshot) => {
      const data = snapshot.val();

      setScores(data);
    });

    const handleSnapshot = (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      setScores(data);
    };

    onValue(scoreRef, handleSnapshot);

    return () => {
      console.log("Unmounting getting scores from " + competitionId + "....");
      onDisconnect(scoreRef).cancel();
      off(scoreRef, "value", handleSnapshot);
    };
  }, [competitionId, activeAthleteId]);

  return scores;
}
