import { prisma } from "./db";
import { requireUserId } from "./auth";
import { createPlanSchema, idSchema } from "./validators";
import { generateSchedule } from "./openai";

/*
 * helper functions used by route handlers and server actions.
 */

export async function createPlan(input: unknown) {
  const userId = requireUserId();
  const { subject, syllabusText } = createPlanSchema.parse(input);

  const raw = await generateSchedule(syllabusText);
  let schedule: any;
  try {
    schedule = JSON.parse(raw);
  } catch {
    schedule = { raw };
  }

  const plan = await prisma.plan.create({
    data: {
      userId,
      subject,
      syllabus: { text: syllabusText },
      schedule,
    },
  });

  return plan;
}

export async function deletePlan(id: string) {
  const userId = requireUserId();
  idSchema.parse({ id });
  await prisma.plan.deleteMany({ where: { id, userId } });
}

export async function getPlans() {
  const userId = requireUserId();
  return prisma.plan.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
