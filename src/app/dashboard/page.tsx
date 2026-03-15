import { prisma } from "@/lib/db";
import { requireUserId } from "@/lib/auth";

export default async function DashboardPage() {
  const userId = requireUserId();
  const totalPlans = await prisma.plan.count({ where: { userId } });
  const latestPlan = await prisma.plan.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Student Analytics</p>
            <h1 className="mt-2 text-3xl font-extrabold">Your performance dashboard</h1>
            <p className="mt-1 text-slate-300">Review your study plans, completion progress, and top subjects in one place.</p>
          </div>
          <div className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-200">Active plans: {totalPlans}</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-300">Plans</div>
            <div className="mt-1 text-2xl font-bold text-white">{totalPlans}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-300">Last plan</div>
            <div className="mt-1 text-base text-slate-200">{latestPlan?.subject ?? "None yet"}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-300">Status</div>
            <div className="mt-1 text-base text-slate-200">{latestPlan ? "Ready" : "Create your first plan"}</div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/60 p-4">
          <h2 className="text-lg font-semibold text-white">Recent Plan</h2>
          {latestPlan ? (
            <div className="mt-3 rounded-lg bg-slate-900 p-3">
              <p className="text-sm text-slate-300">Subject: <span className="font-semibold text-slate-100">{latestPlan.subject}</span></p>
              <p className="mt-1 text-sm text-slate-300">Created at: {new Date(latestPlan.createdAt).toLocaleString()}</p>
              <pre className="mt-2 overflow-auto rounded-md bg-slate-950 p-2 text-xs text-slate-200">{latestPlan.schedule ?? "No schedule data"}</pre>
            </div>
          ) : (
            <p className="mt-2 text-slate-300">No plans yet. Visit Planner to generate your first schedule.</p>
          )}
        </div>
      </div>
    </div>
  );
}
