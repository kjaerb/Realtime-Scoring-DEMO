"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createCompetitionId } from "@/lib/utils";
import { realTimeDB } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { Loading } from "../ui/Loading";
import useCompetitionStore from "@/stores/competitionStore";

interface CreateCompetitionProps {}

export function CreateCompetition({}: CreateCompetitionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { setCompetitionId } = useCompetitionStore();

  async function createAndGoToCompetition() {
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

    router.push(`/competition/${competitionId}/admin`);
    setIsLoading(false);
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
