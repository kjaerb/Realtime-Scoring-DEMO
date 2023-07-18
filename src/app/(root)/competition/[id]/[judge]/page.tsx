"use client";

import { Admin } from "@/components/Judge/Admin";
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

  const JudgeComponentMap: Record<typeof judge, React.ReactNode> = {
    admin: <Admin />,
    tof: <></>,
    hd: <></>,
    diff: <></>,
    execution1: <></>,
    execution2: <></>,
    execution3: <></>,
    execution4: <></>,
  };

  return <div className="dark:text-white">{JudgeComponentMap[judge]}</div>;
}
