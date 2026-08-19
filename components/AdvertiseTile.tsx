import Link from "next/link";

export default function AdvertiseTile() {
  return (
    <Link
      href="/sponsor"
      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-amber-400/70 bg-amber-50 p-4 text-center transition hover:border-amber-500 hover:bg-amber-100 dark:border-amber-500/60 dark:bg-amber-950/40 dark:hover:border-amber-400 dark:hover:bg-amber-950/60"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
        Advertise
      </span>
      <span className="text-sm font-medium text-amber-950 dark:text-amber-100">
        Book a sponsor slot
      </span>
      <span className="text-xs text-amber-700 dark:text-amber-300">
        Enquire only — no checkout
      </span>
    </Link>
  );
}
