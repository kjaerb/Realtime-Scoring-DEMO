"use client";

import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { useGetJudgesConnected } from "@/hooks/useJudges";
import { realTimeDB } from "@/lib/firebase";
import { judgeMap } from "@/validators/judgesSchema";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CompetitionIdPageProps {}

interface CompetitionIdPageParams {
  params: {
    id: string;
  };
}

export default function CompetitionIdPage({
  params: { id },
}: CompetitionIdPageProps & CompetitionIdPageParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { judges, judgeKeys } = useGetJudgesConnected(id);

  async function joinCompetitionAsJudge(judge: keyof typeof judges) {
    setIsLoading(true);
    const competitionRef = ref(realTimeDB, `${id}/judgesConnected/${judge}`);

    await set(competitionRef, true);

    router.push(`/competition/${id}/${judge}`);
    setIsLoading(false);
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:text-white">
      <div className="flex flex-col items-center">
        <h1>Welcome to room {id}</h1>
        <span
          className="text-blue-500 cursor-pointer underline"
          onClick={() =>
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/competition/${id}`
            )
          }
        >
          Click to copy link to clipboard
        </span>
        <p>Please choose what judge you are</p>
      </div>
      <div className="mt-6">
        {judgeKeys.map((judge) => (
          <Button
            onClick={() => joinCompetitionAsJudge(judge)}
            disabled={judges[judge] === true}
            key={judge}
            className="mx-2"
          >
            {isLoading ? <Loading /> : judgeMap[judge]}
          </Button>
        ))}
      </div>
    </div>
  );
}
