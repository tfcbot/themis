"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import CategoryFilter from "@/components/directory/CategoryFilter";
import EmptyState from "@/components/directory/EmptyState";
import ListingCards from "@/components/directory/ListingCards";
import ListingTable from "@/components/directory/ListingTable";
import ViewToggle from "@/components/directory/ViewToggle";
import { api } from "@/convex/_generated/api";
import {
  filterListingsByCategory,
  getUniqueCategories,
  type DirectoryViewMode,
} from "@/lib/directory";
import { SITE } from "@/lib/site";

export default function DirectoryListings() {
  const listings = useQuery(api.listings.listLiveListings);
  const [viewMode, setViewMode] = useState<DirectoryViewMode>("table");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => (listings ? getUniqueCategories(listings) : []),
    [listings],
  );

  const filteredListings = useMemo(
    () =>
      listings ? filterListingsByCategory(listings, selectedCategory) : [],
    [listings, selectedCategory],
  );

  const isLoading = listings === undefined;
  const hasListings = (listings?.length ?? 0) > 0;
  const hasMatches = filteredListings.length > 0;

  return (
    <>
      <section className="flex flex-col gap-6 border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {SITE.parentBrand}
        </p>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Sponsor directory
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
            {SITE.tagline} Side rails highlight capped sponsor slots — book via
            enquire only.
          </p>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {isLoading ? (
          <LoadingState />
        ) : !hasListings ? (
          <EmptyState variant="no-listings" />
        ) : !hasMatches ? (
          <EmptyState
            variant="no-matches"
            selectedCategory={selectedCategory}
          />
        ) : viewMode === "table" ? (
          <ListingTable listings={filteredListings} />
        ) : (
          <ListingCards listings={filteredListings} />
        )}

        {!isLoading && hasListings ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredListings.length} of {listings.length} live{" "}
            {listings.length === 1 ? "listing" : "listings"}
            {selectedCategory ? ` in ${selectedCategory}` : ""}
          </p>
        ) : null}
      </section>
    </>
  );
}

function LoadingState() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Loading listings…
      </p>
    </div>
  );
}
