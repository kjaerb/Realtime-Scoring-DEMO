import { realTimeDB } from "@/lib/firebase";
import { objToArr } from "@/lib/utils";
import useCompetitionStore from "@/stores/competitionStore";
import {
  JudgesConnected,
  judgesConnectedSchema,
} from "@/validators/judgesSchema";
import {
  DataSnapshot,
  off,
  onValue,
  ref,
  orderByKey,
  query,
  onDisconnect,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";

/**
 * Gets an object of the judges that currently are connected to the competition. Initially all are false
 * @param id Competition ID
 * @returns JudgesConnected object
 */
export function useGetJudgesConnected(competitionId: string) {
  const [judges, setJudges] = useState<JudgesConnected>({
    tof: false,
    hd: false,
    diff: false,
    execution1: false,
    execution2: false,
    execution3: false,
    execution4: false,
    admin: false,
  });

  useEffect(() => {
    const competitionRef = query(
      ref(realTimeDB, `${competitionId}/judgesConnected`),
      orderByKey()
    );

    const handleSnapshot = (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      setJudges(data);
    };

    onValue(competitionRef, handleSnapshot);

    return () => {
      console.log("Unmounting judges connected...");
      off(competitionRef, "value", handleSnapshot);
    };
  }, [competitionId]);

  return {
    judges,
    judgeKeys: objToArr(judges),
  };
}

interface UnmountJudgeProps {
  id: string;
  judge: keyof JudgesConnected;
}
/**
 * Detects when a judge is unmounted (Disconnects from the page) or when a judge connects to a page
 * @param id Competition ID
 * @param judge Judge type
 */
export function useMountJudge({ id, judge }: UnmountJudgeProps) {
  const { setCompetitionId } = useCompetitionStore();
  const competitionRef = ref(realTimeDB, `${id}/judgesConnected/${judge}`);

  onDisconnect(competitionRef).set(false);

  useEffect(() => {
    setCompetitionId(id);

    // On connect, set the judge to true
    set(competitionRef, true);

    // Callback to disconnect from the component
    const disconnectFromComponent = () => {
      set(competitionRef, false);
    };

    // Catch to also disconnect, if the user goes to another page, but still is connected to the ref
    window.addEventListener("popstate", disconnectFromComponent);

    return () => {
      console.log("unmounting...");
      off(competitionRef, "value", disconnectFromComponent);
    };
  }, []);
}
