"use client";

import { useSetActiveAthlete } from "@/hooks/useAthlete";
import { useGetJudgesConnected } from "@/hooks/useJudges";
import { useGetScores } from "@/hooks/useScore";
import { cn, createCompetitionId } from "@/lib/utils";
import useCompetitionStore from "@/stores/competitionStore";
import { judgeMap } from "@/validators/judgesSchema";
import { CheckIcon, BanIcon } from "lucide-react";
import { Input } from "../ui/Input";

interface AdminProps {}

export function Admin({}: AdminProps) {
  const { competitionId, activeAthleteId } = useCompetitionStore();

  const setActiveAthlete = useSetActiveAthlete();

  const { judges, judgeKeys } = useGetJudgesConnected(competitionId);

  const scores = useGetScores();

  return (
    <div>
      <div>
        <p>Admin {competitionId}</p>
        <p>Active athlete {activeAthleteId}</p>
        <div className="flex flex-col">
          <p>Set active athlete</p>
          <Input onChange={(e) => setActiveAthlete(e.target.value)} />
        </div>
      </div>

      <div className="my-4">
        {judgeKeys.map((judge) => (
          <div
            key={judge}
            className={cn(
              "mb-4 flex items-center space-x-2 border rounded-md shadow-md px-2 py-2"
            )}
          >
            <div
              className={cn(
                "flex",
                judges[judge] === true ? "text-green-500" : "text-red-500"
              )}
            >
              <span>{judges[judge] ? <CheckIcon /> : <BanIcon />}</span>
              <p>{judgeMap[judge]}</p>
            </div>
            <div className="flex">
              {scores?.[judge]?.map((score, index) => (
                <div
                  key={createCompetitionId()}
                  className="p-2 border shadow-md mx-2 min-h-[2rem] min-w-[2rem]"
                >
                  {score}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
