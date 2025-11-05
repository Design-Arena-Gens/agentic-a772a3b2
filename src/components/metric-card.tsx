type MetricCardProps = {
  label: string;
  value: string;
  delta?: {
    value: number;
    trend: "up" | "down";
  };
  hint?: string;
};

const trendSymbols = {
  up: "▲",
  down: "▼",
} as const;

export function MetricCard({ label, value, delta, hint }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-2 flex items-baseline gap-x-3">
        <span className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</span>
        {delta ? (
          <span
            className={`text-xs font-semibold ${delta.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
          >
            {trendSymbols[delta.trend]} {Math.abs(delta.value).toFixed(1)}%
          </span>
        ) : null}
      </div>
      {hint ? <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{hint}</div> : null}
    </div>
  );
}

