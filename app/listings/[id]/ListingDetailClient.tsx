"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { api } from "@/convex/_generated/api";
import { isListingId } from "@/lib/listingIds";

type ListingDetailClientProps = {
  listingId: string;
};

function listingLinkLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ListingDetailClient({
  listingId,
}: ListingDetailClientProps) {
  const listing = useQuery(
    api.listings.getLiveListing,
    isListingId(listingId) ? { listingId } : "skip",
  );

  if (!isListingId(listingId)) {
    notFound();
  }

  if (listing === undefined) {
    return (
      <>
        <Nav />
        <main className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-slate-600 dark:text-slate-300">Loading…</p>
        </main>
      </>
    );
  }

  if (listing === null) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/directory"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          ← Directory
        </Link>

        <article className="mt-8 rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-950">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
              <Image
                alt={`${listing.name} logo`}
                className="object-contain p-2"
                fill
                sizes="80px"
                src={listing.logoUrl}
                unoptimized
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  {listing.name}
                </h1>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {listing.category}
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {listing.oneLiner}
              </p>

              <a
                className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                href={listing.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit {listingLinkLabel(listing.url)}
              </a>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
