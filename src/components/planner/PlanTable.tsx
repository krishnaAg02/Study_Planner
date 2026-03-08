import { Plan } from "@prisma/client";

interface Props {
  plan: Plan;
  onDelete?: (id: string) => void;
}

export default function PlanTable({ plan, onDelete }: Props) {
  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{plan.subject}</h2>
        {onDelete && (
          <button
            className="text-red-500 hover:underline"
            onClick={() => onDelete(plan.id)}
          >
            Delete
          </button>
        )}
      </div>
      <pre className="mt-2 text-sm bg-gray-100 p-2 overflow-auto">
        {JSON.stringify(plan.schedule, null, 2)}
      </pre>
    </div>
  );
}
