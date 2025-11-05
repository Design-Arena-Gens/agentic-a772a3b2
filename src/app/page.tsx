"use client";

import { FilterBar } from "@/components/filter-bar";
import { MetricCard } from "@/components/metric-card";
import { PerformanceTable } from "@/components/performance-table";
import { RepoImpactGrid } from "@/components/repo-impact";
import { TrendChart } from "@/components/trend-chart";
import { engineers, repositories, weeklyPerformance } from "@/data/performance";
import {
  MetricsFilters,
  aggregateByEngineer,
  aggregateByRepository,
  aggregateMetrics,
  engineerWeekTrend,
  filterSnapshots,
} from "@/lib/metrics";
import { useMemo, useState } from "react";

const initialFilters: MetricsFilters = {
  engineerIds: [],
  repositoryIds: [],
  weeks: [],
};

export default function Home() {
  const [filters, setFilters] = useState<MetricsFilters>(initialFilters);

  const filteredSnapshots = useMemo(
    () => filterSnapshots(weeklyPerformance, filters),
    [filters],
  );

  const summary = useMemo(() => aggregateMetrics(filteredSnapshots), [filteredSnapshots]);
  const engineerRows = useMemo(
    () => aggregateByEngineer(filteredSnapshots, engineers),
    [filteredSnapshots],
  );
  const repoRows = useMemo(
    () => aggregateByRepository(filteredSnapshots, repositories),
    [filteredSnapshots],
  );
  const trendData = useMemo(() => engineerWeekTrend(filteredSnapshots), [filteredSnapshots]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-20">
      <div className="mx-auto max-w-7xl px-6 py-12 text-white">
        <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400/70">
              Impact Intelligence
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">
              SWE Performance Radar
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Track contributions, review velocity, and operational impact across repositories.
              Slice by engineer, repo, and week to understand where engineering effort compounds.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-xs text-blue-200 shadow-lg backdrop-blur">
            Live scope · {filteredSnapshots.length} data points selected
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Merged Pull Requests"
            value={summary.mergedPrs.toString()}
            hint="Volume of contributions merged to main branches"
          />
          <MetricCard
            label="Avg Cycle Time"
            value={`${summary.avgCycleTime} h`}
            hint="Avg hours from PR open to merge"
            delta={{ trend: summary.avgCycleTime <= 20 ? "up" : "down", value: summary.avgCycleTime <= 20 ? 5.2 : -7.8 }}
          />
          <MetricCard
            label="Impact Score"
            value={summary.cumulativeImpact.toString()}
            hint="Composite signal weighting repo criticality and outcomes"
            delta={{ trend: "up", value: 12.6 }}
          />
          <MetricCard
            label="Quality Signal"
            value={`${Math.max(0, summary.cumulativeImpact - summary.bugsIntroduced * 8)}`}
            hint="Impact adjusted for regressions shipped"
          />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[380px,1fr]">
          <FilterBar
            engineers={engineers}
            repositories={repositories}
            selectedEngineers={filters.engineerIds}
            selectedRepositories={filters.repositoryIds}
            selectedWeeks={filters.weeks}
            onChange={setFilters}
          />
          <TrendChart data={trendData} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[2fr,1fr]">
          <PerformanceTable rows={engineerRows} />
          <RepoImpactGrid rows={repoRows} />
        </div>
      </div>
    </div>
  );
}
