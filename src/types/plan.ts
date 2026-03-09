// Definitions for plan-related types.  Importing directly from
// `@prisma/client` was triggering type-checker errors in this file,
// so we keep the shape simple here instead of re-exporting the generated
// interface.

export interface Plan {
  id: string;
  userId: string;
  subject: string;
  syllabus: any;
  schedule: any;
  progress: any;
  createdAt: string;
}

// Plan object combined with user data.
export interface PlanWithUser extends Plan {
  user: { id: string; email: string };
}
