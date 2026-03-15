import { StudyPlan } from "@prisma/client";

interface Props {
  plan: StudyPlan;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onExport: (plan: StudyPlan) => void;
  onDelete?: (id: string) => void;
}

export default function PlanTable({ plan, completed, onToggleComplete, onExport, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{plan.subject}</h2>
            <span className={`rounded-full px-2 py-0.5 text-xs ${completed ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-200"}`}>
              {completed ? "Completed" : "In progress"}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-300">Created {new Date(plan.createdAt).toLocaleDateString()}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggleComplete(plan.id)}
            className="rounded-md border border-indigo-400 bg-indigo-500/20 px-2 py-1 text-xs text-indigo-200 hover:bg-indigo-500/30"
          >
            {completed ? "Mark Active" : "Mark Complete"}
          </button>
          <button
            onClick={() => onExport(plan)}
            className="rounded-md border border-emerald-400 bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200 hover:bg-emerald-500/30"
          >
            Export PDF
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(plan.id)}
              className="rounded-md border border-red-400 bg-red-500/20 px-2 py-1 text-xs text-red-200 hover:bg-red-500/30"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <pre className="mt-3 max-h-32 overflow-auto rounded-md bg-slate-950 p-2 text-xs text-slate-200">{plan.schedule || "No schedule yet"}</pre>
    </div>
  );
}
