"use client";

import { RepoImpact } from "@/lib/metrics";
import { clsx } from "clsx";

type RepoImpactProps = {
  rows: RepoImpact[];
};

const impactBands = [
  { threshold: 200, label: "Critical", className: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-200" },
  { threshold: 150, label: "High", className: "bg-blue-500/20 text-blue-600 dark:text-blue-200" },
  { threshold: 100, label: "Moderate", className: "bg-amber-500/20 text-amber-600 dark:text-amber-200" },
];

export function RepoImpactGrid({ rows }: RepoImpactProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4">
        <div className="text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400">
          Repository Impact Mix
        </div>
        <div className="text-sm text-zinc-400 dark:text-zinc-500">
          Highlights where contributions are compounding impact
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.repository.id}
            className="rounded-2xl border border-zinc-200 p-4 transition hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:hover:border-blue-500/60"
          >
            {(() => {
              const badge = classify(row.cumulativeImpact);
              return (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-200">
                        {row.repository.name}
                      </div>
                      <div className="text-xs text-zinc-400">{row.repository.productArea}</div>
                    </div>
                    <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold", badge.className)}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-500 dark:text-zinc-300">
                    <Metric label="Impact" value={row.cumulativeImpact.toString()} />
                    <Metric label="Merged PRs" value={row.mergedPrs.toString()} />
                    <Metric label="Avg Cycle" value={`${row.avgCycleTime} h`} />
                    <Metric label="Reviews" value={row.reviewsCompleted.toString()} />
                    <Metric label="Incidents" value={row.incidentsResolved.toString()} />
                    <Metric label="Lines Changed" value={row.linesChanged.toLocaleString()} />
                  </div>
                </>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}

function classify(impact: number) {
  for (const band of impactBands) {
    if (impact >= band.threshold) {
      return band;
    }
  }
  return { label: "Emerging", className: "bg-zinc-500/20 text-zinc-600 dark:text-zinc-300" };
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-100 px-3 py-2 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      <div className="text-[10px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
        {label}
      </div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
