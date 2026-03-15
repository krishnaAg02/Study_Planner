"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold">S</div>
          <div>
            <Link href="/" className="text-lg font-bold text-slate-100">
              StudyPlanner
            </Link>
            <p className="text-xs text-slate-300">AI study schedules & smart plan builder</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-100">
          <Link href="/planner" className="rounded-md px-3 py-1.5 font-medium text-slate-100 hover:bg-slate-800">
            Planner
          </Link>
          <Link href="/dashboard" className="rounded-md px-3 py-1.5 font-medium text-slate-100 hover:bg-slate-800">
            Analytics
          </Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/planner" className="rounded-md bg-indigo-500 px-3 py-1.5 text-white transition hover:bg-indigo-400">
              Sign in
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
