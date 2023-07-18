import { z } from "zod";

const executionScoreSchema = z.object({
  score: z.number().min(0).max(10),
});

const executionScoresSchema = z.array(executionScoreSchema).length(11);

type ExecutionScore = z.infer<typeof executionScoreSchema>;
type ExecutionScores = z.infer<typeof executionScoresSchema>;
