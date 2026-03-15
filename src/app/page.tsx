import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-800 text-slate-100">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between px-6 py-12 sm:px-12 lg:px-16">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(168,85,247,0.2),transparent_35%)]" aria-hidden="true" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="inline-flex rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                  Launch your study streak
                </p>
                <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                  AI Study Planner with image upload and quick search
                </h1>
                <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
                  Upload your syllabus, find your topic, and generate a weekly learning plan instantly. Designed for students who want fast, practical schedules.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/planner" className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-700/30 transition hover:-translate-y-0.5 hover:bg-indigo-400">
                    Open Planner
                  </Link>
                  <Link href="/dashboard" className="rounded-xl border border-indigo-300/40 px-5 py-2.5 text-sm font-medium text-indigo-100 transition hover:border-indigo-200 hover:text-white">
                    View Analytics
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold">Live</span>
                  <span className="text-slate-400">AI planner running</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className="font-semibold text-slate-100">4.9/5</span> student rating
                </div>
              </div>
            </div>

            <section className="mt-10 rounded-2xl border border-indigo-300/20 bg-slate-900/70 p-4 md:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-indigo-200">
                    Search topic
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 focus-within:border-indigo-400">
                    <span className="text-indigo-300">🔍</span>
                    <input
                      type="text"
                      placeholder="Search for subjects, chapters, or exam goals"
                      className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>
                <div className="shrink-0">
                  <label htmlFor="file-upload" className="cursor-pointer rounded-xl border border-indigo-400/40 bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-100 transition hover:border-indigo-300 hover:bg-indigo-500/30">
                    Upload syllabus image
                  </label>
                  <input id="file-upload" type="file" accept="image/*" className="hidden" />
                </div>
                <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400">
                  Generate Plan
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">Tip: Use syllabus image for best schedule suggestions.</p>
            </section>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <div className="text-indigo-300 font-semibold">Fast Setup</div>
            <div>Create a plan in seconds from your syllabus image.</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <div className="text-indigo-300 font-semibold">Smart Goals</div>
            <div>Get prioritized study blocks and progress suggestions.</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <div className="text-indigo-300 font-semibold">Track Progress</div>
            <div>Use visual planner charts to stay on track daily.</div>
          </div>
        </div>
      </main>
    </div>
  );
}
