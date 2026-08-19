import type { LiveListing } from "@/lib/directory";
import { formatListingLink } from "@/lib/directory";

type ListingTableProps = {
  listings: LiveListing[];
};

export default function ListingTable({ listings }: ListingTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              One-liner
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Link
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
          {listings.map((listing) => (
            <tr
              key={listing._id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/60"
            >
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                {listing.name}
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <CategoryPill category={listing.category} />
              </td>
              <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                {listing.oneLiner}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm">
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 transition-colors hover:decoration-slate-500 dark:text-slate-100 dark:decoration-slate-600 dark:hover:decoration-slate-400"
                >
                  {formatListingLink(listing.url)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {category}
    </span>
  );
}
