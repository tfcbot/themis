import EnquireButton from "@/components/sponsor/EnquireButton";

type PlacementCardProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  slotsOpen: number;
};

export default function PlacementCard({
  title,
  description,
  bullets,
  slotsOpen,
}: PlacementCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {slotsOpen} open
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span aria-hidden="true" className="text-slate-400">
              •
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <EnquireButton label="Enquire" placement={title} variant="secondary" />
      </div>
    </article>
  );
}
