import type { DirectoryViewMode } from "@/lib/directory";

type ViewToggleProps = {
  viewMode: DirectoryViewMode;
  onViewModeChange: (mode: DirectoryViewMode) => void;
};

export default function ViewToggle({
  viewMode,
  onViewModeChange,
}: ViewToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700"
      role="group"
      aria-label="Directory view"
    >
      <ToggleButton
        active={viewMode === "table"}
        label="Table"
        onClick={() => onViewModeChange("table")}
      />
      <ToggleButton
        active={viewMode === "cards"}
        label="Cards"
        onClick={() => onViewModeChange("cards")}
      />
    </div>
  );
}

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
