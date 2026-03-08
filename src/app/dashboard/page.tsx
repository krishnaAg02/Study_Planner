import { prisma } from "@/lib/db";

// server component that fetches basic statistics for the current user
export default async function DashboardPage() {
  // in a real app you would probably use the session to filter by user,
  // but for brevity we show total plan count.
  const count = await prisma.plan.count();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>You have created {count} plan{count === 1 ? "" : "s"}.</p>
    </div>
  );
}
