type EmptyStateProps = {
  variant: "no-listings" | "no-matches";
  selectedCategory?: string | null;
};

export default function EmptyState({
  variant,
  selectedCategory,
}: EmptyStateProps) {
  if (variant === "no-listings") {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <p className="text-base font-medium text-slate-900 dark:text-slate-100">
          No tools listed yet
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Live sponsor and tool listings will appear here once they are
          published.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <p className="text-base font-medium text-slate-900 dark:text-slate-100">
        No listings in {selectedCategory ?? "this category"}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Try another category or view all listings.
      </p>
    </div>
  );
}
