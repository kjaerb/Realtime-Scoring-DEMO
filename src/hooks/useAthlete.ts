import { realTimeDB } from "@/lib/firebase";
import { realTimeDBRouter } from "@/lib/router";
import useCompetitionStore from "@/stores/competitionStore";
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

export function useGetActiveAthlete() {
  const { competitionId, setActiveAthleteId, activeAthleteId } =
    useCompetitionStore();

  useEffect(() => {
    if (!competitionId) return;

    const athleteRef = ref(
      realTimeDB,
      realTimeDBRouter.activeAthlete(competitionId)
    );

    const handleSnapshot = (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      setActiveAthleteId(data);
    };

    onValue(athleteRef, handleSnapshot);

    return () => {
      off(athleteRef, "value", handleSnapshot);
      onDisconnect(athleteRef).cancel();
    };
  }, [competitionId]);

  return activeAthleteId;
}

export function useSetActiveAthlete() {
  const { setActiveAthleteId, activeAthleteId, competitionId } =
    useCompetitionStore();

  useEffect(() => {
    if (!competitionId) return;

    const athleteRef = ref(
      realTimeDB,
      realTimeDBRouter.activeAthlete(competitionId)
    );

    set(athleteRef, activeAthleteId);

    return () => {
      onDisconnect(athleteRef).cancel();
    };
  }, [activeAthleteId]);

  return setActiveAthleteId;
}

export function useActiveAthlete() {
  const activeAthlete = useGetActiveAthlete();

  return {
    activeAthlete,
  };
}
