import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { auth as clerkAuth, clerkClient } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId } = clerkAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // make sure the user exists in our database; copy over the primary email
  let email = "";
  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    email = clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
  } catch (e) {
    console.warn("could not fetch clerk user", e);
  }

  const user = await prisma.user.upsert({
    where: { id: userId },
    update: { email },
    create: { id: userId, email },
  });

  return NextResponse.json(user);
}
