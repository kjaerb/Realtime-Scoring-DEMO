"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import useCompetitionStore from "@/stores/competitionStore";
import { Loading } from "@/components/ui/Loading";
import { get, ref } from "firebase/database";
import { realTimeDB } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface JoinCompetitionDialogProps {}

export function JoinCompetitionDialog({}: JoinCompetitionDialogProps) {
  const { push } = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputCompetitionId, setInputCompetitionId] = useState<string>("");
  const { setCompetitionId } = useCompetitionStore();

  async function handleSubmitCompetitionId(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const val = (await get(ref(realTimeDB, inputCompetitionId))).val();

    if (val) {
      setCompetitionId(inputCompetitionId);

      push(`/competition/${inputCompetitionId}`);
    } else {
      toast({
        title: "Competition not found",
        description: "Please check the competition code",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join competition</Button>
      </DialogTrigger>
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
              <Button disabled={isLoading} type="submit">
                {isLoading ? <Loading /> : "Join competition"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
