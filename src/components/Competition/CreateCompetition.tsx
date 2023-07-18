"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createCompetitionId } from "@/lib/utils";
import { realTimeDB } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { Loading } from "@/components/ui/Loading";
import useCompetitionStore from "@/stores/competitionStore";

interface CreateCompetitionProps {}

export function CreateCompetition({}: CreateCompetitionProps) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setCompetitionId } = useCompetitionStore();

  async function createAndGoToCompetition() {
    try {
      setIsLoading(true);
      const competitionId = createCompetitionId();

      setCompetitionId(competitionId);

      const competitionRef = ref(realTimeDB, `${competitionId}`);

      await set(competitionRef, {
        judgesConnected: {
          tof: false,
          hd: false,
          diff: false,
          execution1: false,
          execution2: false,
          execution3: false,
          execution4: false,
        },
      });

      push(`/competition/${competitionId}/admin`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 dark:text-white">Create a competition</h1>
      <Button disabled={isLoading} onClick={createAndGoToCompetition}>
        {isLoading ? <Loading /> : "Create competition"}
      </Button>
    </div>
  );
}
