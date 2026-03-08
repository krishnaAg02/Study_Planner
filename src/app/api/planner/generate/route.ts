import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateSchedule } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const userId = requireUserId();
    const { subject, syllabusText } = await req.json();
    if (!subject || !syllabusText) {
      return NextResponse.json({ error: "subject and syllabusText required" }, { status: 400 });
    }

    const raw = await generateSchedule(syllabusText);
    // try to parse output
    let schedule: any;
    try {
      schedule = JSON.parse(raw);
    } catch {
      // fallback, wrap the raw text
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

    return NextResponse.json(plan);
  } catch (err: any) {
    console.error(err);
    const status = err.status || 500;
    return NextResponse.json({ error: err.message || "unknown" }, { status });
  }
}
