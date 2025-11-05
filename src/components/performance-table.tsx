"use client";

import { EngineerImpact } from "@/lib/metrics";

type PerformanceTableProps = {
  rows: EngineerImpact[];
};

export function PerformanceTable({ rows }: PerformanceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-100 px-5 py-4 text-sm font-semibold uppercase text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        Engineer Leaderboard
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <th className="px-5 py-3 font-normal">Engineer</th>
              <th className="px-5 py-3 font-normal">Impact</th>
              <th className="px-5 py-3 font-normal">Merged PRs</th>
              <th className="px-5 py-3 font-normal">Reviews</th>
              <th className="px-5 py-3 font-normal">Cycle Time</th>
              <th className="px-5 py-3 font-normal">Incidents</th>
              <th className="px-5 py-3 font-normal">Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map((row) => (
              <tr key={row.engineer.id} className="text-zinc-700 dark:text-zinc-200">
                <td className="px-5 py-4">
                  <div className="font-semibold">{row.engineer.name}</div>
                  <div className="text-xs text-zinc-500">
                    {row.engineer.role} · {row.engineer.team}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-blue-600 dark:text-blue-300">
                    {row.cumulativeImpact}
                  </div>
                  <div className="text-xs text-zinc-500">{row.linesChanged.toLocaleString()} lines</div>
                </td>
                <td className="px-5 py-4">{row.mergedPrs}</td>
                <td className="px-5 py-4">{row.reviewsCompleted}</td>
                <td className="px-5 py-4">{row.avgCycleTime} h</td>
                <td className="px-5 py-4">{row.incidentsResolved}</td>
                <td className="px-5 py-4">
                  <QualityBadge impact={row.cumulativeImpact} bugs={row.bugsIntroduced} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QualityBadge({ impact, bugs }: { impact: number; bugs: number }) {
  const ratio = impact === 0 ? 1 : (impact - bugs * 8) / impact;
  if (ratio >= 0.9) {
    return (
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
        Elite
      </span>
    );
  }
  if (ratio >= 0.75) {
    return (
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
        Reliable
      </span>
    );
  }
  if (ratio >= 0.6) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
        Stable
      </span>
    );
  }
  return (
    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">
      Watch
    </span>
  );
}

