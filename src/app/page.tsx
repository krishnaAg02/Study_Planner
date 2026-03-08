import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold mb-6 text-center">
          AI‑powered Study Planner
        </h1>
        <p className="mb-8 text-center">
          Upload your syllabus image and let our assistant generate a weekly
          study schedule for you.
        </p>
        <Link
          href="/planner"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to planner →
        </Link>
      </main>
    </div>
  );
}
