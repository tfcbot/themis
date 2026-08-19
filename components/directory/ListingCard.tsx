import type { LiveListing } from "@/lib/directory";

type ListingCardProps = {
  listing: LiveListing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-950">
      <div className="flex items-start gap-4">
        <ListingLogo name={listing.name} logoUrl={listing.logoUrl} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
            {listing.name}
          </h3>
          <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {listing.category}
          </span>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        {listing.oneLiner}
      </p>
    </article>
  );
}

function ListingLogo({ name, logoUrl }: { name: string; logoUrl: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="h-full w-full object-contain p-1"
        loading="lazy"
      />
    </div>
  );
}
