"use client";

import { Admin } from "@/components/Judge/Admin";
import { Execution } from "@/components/Judge/Execution";
import { useGetActiveAthlete } from "@/hooks/useAthlete";
import { useMountJudge } from "@/hooks/useJudges";
import { JudgesConnected } from "@/validators/judgesSchema";

interface JudgePageProps {}

interface JudgePageParams {
  params: {
    id: string;
    judge: keyof JudgesConnected;
  };
}

export default function JudgePage({
  params: { id, judge },
}: JudgePageProps & JudgePageParams) {
  useMountJudge({ id, judge });
  useGetActiveAthlete();

  const JudgeComponentMap: Record<typeof judge, React.ReactNode> = {
    admin: <Admin />,
    tof: <></>,
    hd: <></>,
    diff: <></>,
    execution1: <Execution />,
    execution2: <Execution />,
    execution3: <Execution />,
    execution4: <Execution />,
  };

  return <div className="dark:text-white">{JudgeComponentMap[judge]}</div>;
}
