import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPlan } from "@/lib/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = await createPlan(body);
    return NextResponse.json(plan);
  } catch (err: any) {
    console.error(err);
    const status = err.status || 500;
    return NextResponse.json({ error: err.message || "unknown" }, { status });
  }
}
