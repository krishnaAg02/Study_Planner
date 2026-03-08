import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractTextFromImage } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "no file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const text = await extractTextFromImage(base64);
    return NextResponse.json({ text });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "unknown" }, { status: 500 });
  }
}
