"use client";

import { useQuery } from "convex/react";
import Nav from "@/components/Nav";
import EnquireButton from "@/components/sponsor/EnquireButton";
import PlacementCard from "@/components/sponsor/PlacementCard";
import { api } from "@/convex/_generated/api";
import { PLACEMENTS, SITE } from "@/lib/site";

const FALLBACK_CAP = 15;
const FALLBACK_VISIBLE = 9;

export default function SponsorPageClient() {
  const slotConfig = useQuery(api.slotConfig.getDefaultSlotConfig);

  const cap = slotConfig?.cap ?? FALLBACK_CAP;
  const visiblePerLoad = slotConfig?.visiblePerLoad ?? FALLBACK_VISIBLE;
  const slotsTaken = slotConfig?.slotsTaken ?? 0;
  const slotsOpen = Math.max(cap - slotsTaken, 0);
  const enquireOnly = slotConfig ? slotConfig.paymentsEnabled !== true : true;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="flex flex-col gap-6 border-b border-slate-200 pb-12 dark:border-slate-800">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Sponsor
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                Reach people choosing AI tools in the {SITE.parentBrand}{" "}
                directory
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {SITE.tagline} Sponsor slots are capped and rotated so every
                partner gets a fair share of impressions — enquire to check
                availability and fit.
              </p>
            </div>
            {enquireOnly ? (
              <EnquireButton label="Book / Advertise" variant="primary" />
            ) : null}
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Total sponsor slots
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {cap}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Shown per page load
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {visiblePerLoad} of {cap}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Spots taken
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {slotsTaken} of {cap}
              </dd>
            </div>
          </dl>
        </section>

        <section className="py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Placements
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Three places a slot can live
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {cap} slots exist, {visiblePerLoad} render on any given page load,
              and no two go to companies in the same category.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {PLACEMENTS.map((placement) => (
              <PlacementCard
                key={placement.kind}
                title={placement.title}
                description={placement.description}
                bullets={placement.bullets}
                slotsOpen={slotsOpen}
              />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Before you ask
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Limited inventory, human review
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
            Book through an enquiry while checkout is offline. Send your logo,
            one line of copy, and a link — we review fit before anything goes
            live.
          </p>

          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">
                Why {cap} but {visiblePerLoad} shown?
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {visiblePerLoad} slots render per page load, rotated evenly
                across all {cap}. Every sponsor gets the same share of
                impressions.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">
                What do you not accept?
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                No competing directories, no crypto, nothing you would not want
                sitting next to your own product.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">
                Who writes the copy?
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                You send a line, we edit it to match the page voice and send it
                back before it goes live.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">
                How do I book?
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Use Book / Advertise to email an enquiry. We reply with
                availability — no self-serve checkout yet.
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <EnquireButton label="Book / Advertise" variant="primary" />
          </div>
        </section>
      </main>
    </>
  );
}
