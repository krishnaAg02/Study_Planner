"use client";

import { useState } from "react";
import ImageUpload from "@/components/planner/ImageUpload";
import usePlans from "@/hooks/usePlans";
import PlanTable from "@/components/planner/PlanTable";

export default function PlannerPage() {
  const { plans, loading, refresh } = usePlans();
  const [subject, setSubject] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !syllabus) {
      setError("subject and syllabus are required");
      return;
    }
    setError(null);
    setWorking(true);
    const res = await fetch("/api/planner/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, syllabusText: syllabus }),
    });
    if (res.ok) {
      await refresh();
      setSubject("");
      setSyllabus("");
    } else {
      const body = await res.json();
      setError(body.error || "failed to generate");
    }
    setWorking(false);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/planner", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a new plan</h1>
      <div className="mb-4">
        <label className="block mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Syllabus image</label>
        <ImageUpload onTextExtracted={setSyllabus} />
      </div>
      {syllabus && (
        <div className="mb-4">
          <label className="block mb-1">Recognized text</label>
          <textarea
            value={syllabus}
            readOnly
            className="w-full border rounded px-2 py-1 h-32"
          />
        </div>
      )}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleGenerate}
        disabled={working || !syllabus || !subject}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {working ? "Generating…" : "Generate schedule"}
      </button>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Your plans</h2>
      {loading && <p>Loading…</p>}
      {plans && plans.length === 0 && <p>No plans yet.</p>}
      {plans?.map((p) => (
        <PlanTable key={p.id} plan={p} onDelete={handleDelete} />
      ))}
    </div>
  );
}
