import { JoinCompetitionDialog } from "./JoinCompetitionDialog";

interface JoinRoomProps {}

export function JoinCompetition({}: JoinRoomProps) {
  return (
    <div className="flex flex-col">
      <p className="mb-4 dark:text-white">
        Join a competition, with a competition code
      </p>
      <JoinCompetitionDialog />
    </div>
  );
}
