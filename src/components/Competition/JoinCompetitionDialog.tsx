"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useCompetitionStore from "@/stores/competitionStore";

interface JoinCompetitionDialogProps {
  open: boolean;
}

export function JoinCompetitionDialog({
  open = false,
}: JoinCompetitionDialogProps) {
  const [inputCompetitionId, setInputCompetitionId] = useState<string>("");
  const router = useRouter();
  const { setCompetitionId } = useCompetitionStore();

  function handleSubmitCompetitionId(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setCompetitionId(inputCompetitionId);

    router.push(`/competition/${inputCompetitionId}`);
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Please enter the competition code you want to join
          </DialogTitle>
        </DialogHeader>

        <div>
          <form onSubmit={(e) => handleSubmitCompetitionId(e)}>
            <Input
              type="number"
              value={inputCompetitionId}
              onChange={(e) => setInputCompetitionId(e.target.value)}
              placeholder="Competition code"
              className="mb-4"
            />
            <DialogFooter>
              <Button type="submit">Join competition</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
