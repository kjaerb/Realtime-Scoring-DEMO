"use client";

import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";

interface JudgeButtonProps {
  judgeId: string;
  children?: React.ReactNode;
}

export function JudgeButton({ judgeId, children }: JudgeButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleGoToJudgePage() {
    router.push(`${pathname}/${judgeId}`);
  }

  return <Button onClick={handleGoToJudgePage}>{children}</Button>;
}
