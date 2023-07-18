"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { JoinCompetitionDialog } from "./JoinCompetitionDialog";

interface JoinRoomProps {}

export function JoinCompetition({}: JoinRoomProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <p className="mb-4 dark:text-white">
        Join a competition, with a competition code
      </p>
      <Button onClick={() => setOpenDialog((prev) => !prev)}>
        Join competition
      </Button>
      <JoinCompetitionDialog open={openDialog} />
    </div>
  );
}
