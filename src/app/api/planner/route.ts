import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPlans, deletePlan } from "@/lib/actions";

export async function GET(req: NextRequest) {
  try {
    const plans = await getPlans();
    return NextResponse.json(plans);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "unknown" }, { status: err.status || 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    await deletePlan(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "unknown" }, { status: err.status || 500 });
  }
}
