import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * send a syllabus text to the model and receive a JSON‑formatted schedule
 */
export async function generateSchedule(syllabus: string) {
  const prompt = `You are an academic planner.  Given the following syllabus text, create a weekly study schedule as a JSON array of days.  Each day should include an array of subjects/topics with an estimated duration (in minutes).  Do not include any explanation outside of JSON.  \n\nSyllabus:\n${syllabus}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = res.choices?.[0]?.message?.content;
  return text || "[]";
}

/**
 * ask the vision model to transform the uploaded image into plain text
 */
export async function extractTextFromImage(base64: string) {
  // use `any` to work around typing mismatches in the auto-generated
  // `openai` definitions; the transport is still valid at runtime.
  const res: any = await (openai as any).responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "Extract all readable text from the image." },
          // image payload is passed as base64 string
          { type: "input_image", image_base64: base64 },
        ],
      },
    ],
  });
  return res.output_text as string;
}
