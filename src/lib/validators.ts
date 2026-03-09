import { z } from "zod";

export const createPlanSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  syllabusText: z.string().min(1, "Syllabus text is required"),
});

export const idSchema = z.object({
  id: z.string().cuid(),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
