import Link from "next/link";

export type RailCardData = {
  listingId: string;
  name: string;
  oneLiner: string;
  logoUrl: string;
  url: string;
};

export default function RailCard({ card }: { card: RailCardData }) {
  return (
    <Link
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.logoUrl}
          alt={`${card.name} logo`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-slate-700 dark:text-slate-100 dark:group-hover:text-white">
          {card.name}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {card.oneLiner}
        </p>
      </div>
    </Link>
  );
}
