"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Nav from "@/components/Nav";

export default function Home() {
  const hello = useQuery(api.hello.getMessage);

  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
        <section className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Max Explains AI
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Sponsor directory
          </h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">
            Themis is the sponsor directory for Max Explains AI. Directory
            listings, sponsor pages, and checkout arrive in later milestones.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Convex wiring
          </h2>
          {hello === undefined ? (
            <p className="mt-2 text-slate-600 dark:text-slate-300">Loading…</p>
          ) : (
            <p className="mt-2 font-mono text-slate-900 dark:text-slate-100">
              {hello.message}
            </p>
          )}
        </section>
      </main>
    </>
  );
}
