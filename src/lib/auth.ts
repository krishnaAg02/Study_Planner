import { auth as clerkAuth } from "@clerk/nextjs/server";

export function requireUserId() {
  const { userId } = clerkAuth();
  if (!userId) {
    const err = new Error("User not authenticated");
    // attach status so route handler can translate it into 401
    // this mirrors the behavior of NextAuth's requireUser
    // helper from the tutorial.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err as any).status = 401;
    throw err;
  }
  return userId;
}
