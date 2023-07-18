"use client";

import { useGetJudgesConnected } from "@/hooks/useJudges";
import { cn } from "@/lib/utils";
import useCompetitionStore from "@/stores/competitionStore";
import { judgeMap } from "@/validators/judgesSchema";
import { CheckIcon, BanIcon } from "lucide-react";

interface AdminProps {}

export function Admin({}: AdminProps) {
  const { competitionId } = useCompetitionStore();

  const { judges, judgeKeys } = useGetJudgesConnected(competitionId);

  return (
    <div>
      Admin {competitionId}
      <div className="my-4">
        {judgeKeys.map((judge) => (
          <div
            key={judge}
            className={cn(
              "mb-4 flex space-x-2 border rounded-md shadow-md px-2 py-2",
              judges[judge] === true ? "text-green-500" : "text-red-500"
            )}
          >
            <span>{judges[judge] ? <CheckIcon /> : <BanIcon />}</span>
            <p>{judgeMap[judge]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
