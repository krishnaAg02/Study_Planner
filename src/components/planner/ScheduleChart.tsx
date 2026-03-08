import { Plan } from "@prisma/client";

interface Props {
  schedule: any;
}

export default function ScheduleChart({ schedule }: Props) {
  if (!Array.isArray(schedule)) {
    return <pre>{JSON.stringify(schedule, null, 2)}</pre>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {schedule.map((day: any, idx: number) => (
        <div key={idx} className="border rounded p-2">
          <h3 className="font-semibold mb-1">{day.day || `Day ${idx + 1}`}</h3>
          <ul>
            {(day.tasks || []).map((task: any, j: number) => (
              <li key={j} className="text-sm">
                {task.subject || task.topic} – {task.duration} min
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
