"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdvertiseTile from "@/components/AdvertiseTile";
import RailCard, { type RailCardData } from "@/components/RailCard";

function RailColumn({ cards }: { cards: RailCardData[] }) {
  return (
    <div className="flex flex-col gap-3">
      {cards.map((card) => (
        <RailCard key={card.listingId} card={card} />
      ))}
    </div>
  );
}

function RailStrip({ cards }: { cards: RailCardData[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {cards.map((card) => (
        <div key={card.listingId} className="w-64 shrink-0">
          <RailCard card={card} />
        </div>
      ))}
      <div className="w-52 shrink-0">
        <AdvertiseTile />
      </div>
    </div>
  );
}

function RailHeader({ occupancyCopy }: { occupancyCopy: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
        Sponsors
      </h2>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {occupancyCopy}
      </p>
    </div>
  );
}

function splitCards(cards: RailCardData[]) {
  const midpoint = Math.ceil(cards.length / 2);
  return {
    left: cards.slice(0, midpoint),
    right: cards.slice(midpoint),
  };
}

export default function DirectoryContent() {
  const cards = useQuery(api.rail.listRailCards);
  const occupancy = useQuery(api.rail.getRailOccupancy);

  if (cards === undefined || occupancy === undefined) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Loading directory…
        </div>
      </div>
    );
  }

  const { left, right } = splitCards(cards);
  const occupancyCopy = `${occupancy.taken} of ${occupancy.cap} taken`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <section
        aria-label="Sponsor rail"
        className="mb-8 lg:hidden"
      >
        <RailHeader occupancyCopy={occupancyCopy} />
        <RailStrip cards={cards} />
      </section>

      <div className="lg:grid lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,16rem)] lg:items-start lg:gap-8">
        <aside
          aria-label="Left sponsor rail"
          className="hidden lg:block"
        >
          <RailHeader occupancyCopy={occupancyCopy} />
          <RailColumn cards={left} />
        </aside>

        <main className="min-w-0">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Directory
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Browse live sponsor listings. Side rails highlight capped sponsor
            slots — book via enquire only.
          </p>
        </main>

        <aside
          aria-label="Right sponsor rail"
          className="hidden space-y-3 lg:block"
        >
          <RailColumn cards={right} />
          <AdvertiseTile />
        </aside>
      </div>
    </div>
  );
}
