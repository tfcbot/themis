import { SITE } from "@/lib/site";

type EnquireButtonProps = {
  label?: string;
  placement?: string;
  variant?: "primary" | "secondary";
};

function buildEnquireHref(placement?: string): string {
  const subject = placement
    ? `Themis sponsor enquiry — ${placement}`
    : "Themis sponsor enquiry";
  const separator = SITE.sponsorContactUrl.includes("?") ? "&" : "?";
  return `${SITE.sponsorContactUrl}${separator}subject=${encodeURIComponent(subject)}`;
}

export default function EnquireButton({
  label = "Enquire",
  placement,
  variant = "primary",
}: EnquireButtonProps) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      : "inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-900";

  return (
    <a href={buildEnquireHref(placement)} className={className}>
      {label}
    </a>
  );
}
