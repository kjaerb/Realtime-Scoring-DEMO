import { z } from "zod";

const judgeMap: Record<keyof JudgesConnected, string> = {
  tof: "Time of Flight",
  hd: "Horizontal Displacement",
  diff: "Difficulty",
  execution1: "Execution 1",
  execution2: "Execution 2",
  execution3: "Execution 3",
  execution4: "Execution 4",
  admin: "Admin",
} as const;

const judgesConnectedSchema = z.object({
  tof: z.boolean().default(false),
  hd: z.boolean().default(false),
  diff: z.boolean().default(false),
  execution1: z.boolean().default(false),
  execution2: z.boolean().default(false),
  execution3: z.boolean().default(false),
  execution4: z.boolean().default(false),
  admin: z.boolean().default(false).optional(),
});

type JudgesConnected = z.infer<typeof judgesConnectedSchema>;

export { judgesConnectedSchema, judgeMap };

export type { JudgesConnected };
