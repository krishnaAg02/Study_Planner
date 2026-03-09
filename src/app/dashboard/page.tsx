import { prisma } from "@/lib/db";
import { requireUserId } from "@/lib/auth";

// server component that fetches basic statistics for the current user
export default async function DashboardPage() {
  const userId = requireUserId();
  const count = await prisma.plan.count({ where: { userId } });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>You have created {count} plan{count === 1 ? "" : "s"}.</p>
    </div>
  );
}
