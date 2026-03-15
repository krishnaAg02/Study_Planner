"use client";

import { useMemo, useState } from "react";
import ImageUpload from "@/components/planner/ImageUpload";
import usePlans from "@/hooks/usePlans";
import PlanTable from "@/components/planner/PlanTable";

export default function PlannerPage() {
  const { plans, loading, refresh } = usePlans();
  const [subject, setSubject] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const completedCount = useMemo(() => completedIds.length, [completedIds]);

  const handleGenerate = async () => {
    if (!subject.trim() || !syllabus.trim()) {
      setError("Please provide subject and syllabus text.");
      return;
    }
    setError(null);
    setWorking(true);
    const res = await fetch("/api/planner/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: subject.trim(), syllabusText: syllabus.trim() }),
    });
    if (res.ok) {
      await refresh();
      setSubject("");
      setSyllabus("");
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Failed to generate your schedule.");
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Study Planner</p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Generate your weekly study routine</h1>
            <p className="mt-2 max-w-2xl text-slate-300">Upload syllabus, search topics, and create structured blocks with AI. Manage plans and track progress from one dashboard.</p>
          </div>
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-200">
            Quick steps: 1) Add subject 2) Upload/enter syllabus 3) Generate plan
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold uppercase tracking-wide">Planner Input</span>
              <span className="rounded-full bg-indigo-600/25 px-2 py-1">AI Assist</span>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-slate-200">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Organic Chemistry"
                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-slate-200">Syllabus text (or upload image)</label>
              <textarea
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                placeholder="Paste syllabus excerpts or use image upload below"
                rows={4}
                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
              />
            </div>
            <div className="mb-3">
              <ImageUpload onTextExtracted={setSyllabus} />
            </div>
            {error && <p className="mb-3 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={working || !subject.trim() || !syllabus.trim()}
              className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {working ? "Creating plan..." : "Generate study plan"}
            </button>
          </section>

          <section className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-300">Plan status</div>
            <div className="space-y-2 text-sm text-slate-200">
              <div className="flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-900/50 p-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-semibold text-white">AI generated timetable</div>
                  <div className="text-slate-300">Organize sessions into 1h blocks and strong-focus days.</div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-900/50 p-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Progress tracking</div>
                  <div className="text-slate-300">Mark completed plan items and watch your momentum.</div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-900/50 p-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-300" />
                <div>
                  <div className="font-semibold text-white">Review & refine</div>
                  <div className="text-slate-300">Edit your plan or regenerate after each study week.</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Your Plans</h2>
            <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs text-indigo-200">{plans?.length ?? 0} plans</span>
          </div>
          {loading ? (
            <p className="text-slate-300">Loading plans...</p>
          ) : plans?.length ? (
            <div className="space-y-3">
              {plans.map((p) => (
                <PlanTable
                  key={p.id}
                  plan={p}
                  completed={completedIds.includes(p.id)}
                  onToggleComplete={(id) => {
                    setCompletedIds((prev) =>
                      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                    );
                  }}
                  onExport={(plan) => {
                    const content = `Study Planner\nSubject: ${plan.subject}\nCreated: ${new Date(plan.createdAt).toLocaleString()}\n\nSchedule:\n${plan.schedule || "No schedule"}`;
                    const blob = new Blob([content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${plan.subject.replace(/\s+/g, "-").toLowerCase() || "plan"}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-600 bg-slate-900/50 p-3 text-slate-300">No plans yet. Generate your first study schedule above.</div>
          )}
        </section>
      </div>
    </div>
  );
}
