import { Engineer, Repository, WeeklyPerformance, weeklyPerformance } from "@/data/performance";

export type MetricsFilters = {
  engineerIds: string[];
  repositoryIds: string[];
  weeks: string[];
};

export type AggregatedMetrics = {
  mergedPrs: number;
  reviewsCompleted: number;
  incidentsResolved: number;
  avgCycleTime: number;
  cumulativeImpact: number;
  linesChanged: number;
  bugsIntroduced: number;
};

export type EngineerImpact = AggregatedMetrics & {
  engineer: Engineer;
};

export type RepoImpact = AggregatedMetrics & {
  repository: Repository;
};

const emptyMetrics = (): AggregatedMetrics => ({
  mergedPrs: 0,
  reviewsCompleted: 0,
  incidentsResolved: 0,
  avgCycleTime: 0,
  cumulativeImpact: 0,
  linesChanged: 0,
  bugsIntroduced: 0,
});

export const uniqueWeeks = Array.from(
  new Set(weeklyPerformance.map((snapshot) => snapshot.week)),
).sort();

export function filterSnapshots(
  snapshots: WeeklyPerformance[],
  filters: MetricsFilters,
): WeeklyPerformance[] {
  return snapshots.filter((snapshot) => {
    const engineerMatch =
      filters.engineerIds.length === 0 || filters.engineerIds.includes(snapshot.engineerId);
    const repoMatch =
      filters.repositoryIds.length === 0 || filters.repositoryIds.includes(snapshot.repoId);
    const weekMatch = filters.weeks.length === 0 || filters.weeks.includes(snapshot.week);
    return engineerMatch && repoMatch && weekMatch;
  });
}

export function aggregateMetrics(snapshots: WeeklyPerformance[]): AggregatedMetrics {
  if (snapshots.length === 0) {
    return emptyMetrics();
  }

  const totals = snapshots.reduce(
    (acc, snapshot) => {
      acc.mergedPrs += snapshot.mergedPrs;
      acc.reviewsCompleted += snapshot.reviewsCompleted;
      acc.incidentsResolved += snapshot.incidentsResolved;
      acc.cycleTimeHours += snapshot.cycleTimeHours;
      acc.cumulativeImpact += snapshot.impactScore;
      acc.linesChanged += snapshot.linesChanged;
      acc.bugsIntroduced += snapshot.bugsIntroduced;
      return acc;
    },
    {
      mergedPrs: 0,
      reviewsCompleted: 0,
      incidentsResolved: 0,
      cycleTimeHours: 0,
      cumulativeImpact: 0,
      linesChanged: 0,
      bugsIntroduced: 0,
    },
  );

  return {
    mergedPrs: totals.mergedPrs,
    reviewsCompleted: totals.reviewsCompleted,
    incidentsResolved: totals.incidentsResolved,
    avgCycleTime: parseFloat((totals.cycleTimeHours / snapshots.length).toFixed(1)),
    cumulativeImpact: totals.cumulativeImpact,
    linesChanged: totals.linesChanged,
    bugsIntroduced: totals.bugsIntroduced,
  };
}

export function aggregateByEngineer(
  snapshots: WeeklyPerformance[],
  engineers: Engineer[],
): EngineerImpact[] {
  const grouped = new Map<string, WeeklyPerformance[]>();

  for (const snapshot of snapshots) {
    const current = grouped.get(snapshot.engineerId) ?? [];
    current.push(snapshot);
    grouped.set(snapshot.engineerId, current);
  }

  return Array.from(grouped.entries())
    .map(([engineerId, records]) => {
      const engineer = engineers.find((eng) => eng.id === engineerId);
      if (!engineer) return null;
      return {
        engineer,
        ...aggregateMetrics(records),
      };
    })
    .filter((entry): entry is EngineerImpact => Boolean(entry))
    .sort((a, b) => b.cumulativeImpact - a.cumulativeImpact);
}

export function aggregateByRepository(
  snapshots: WeeklyPerformance[],
  repositories: Repository[],
): RepoImpact[] {
  const grouped = new Map<string, WeeklyPerformance[]>();

  for (const snapshot of snapshots) {
    const current = grouped.get(snapshot.repoId) ?? [];
    current.push(snapshot);
    grouped.set(snapshot.repoId, current);
  }

  return Array.from(grouped.entries())
    .map(([repoId, records]) => {
      const repository = repositories.find((repo) => repo.id === repoId);
      if (!repository) return null;
      return {
        repository,
        ...aggregateMetrics(records),
      };
    })
    .filter((entry): entry is RepoImpact => Boolean(entry))
    .sort((a, b) => b.cumulativeImpact - a.cumulativeImpact);
}

export function engineerWeekTrend(
  snapshots: WeeklyPerformance[],
): { week: string; impact: number; cycleTime: number; mergedPrs: number }[] {
  const grouped = new Map<string, { impact: number; cycleTime: number; prTotal: number; count: number }>();
  for (const snapshot of snapshots) {
    const current = grouped.get(snapshot.week) ?? {
      impact: 0,
      cycleTime: 0,
      prTotal: 0,
      count: 0,
    };
    current.impact += snapshot.impactScore;
    current.cycleTime += snapshot.cycleTimeHours;
    current.prTotal += snapshot.mergedPrs;
    current.count += 1;
    grouped.set(snapshot.week, current);
  }

  return Array.from(grouped.entries())
    .map(([week, values]) => ({
      week,
      impact: parseFloat(values.impact.toFixed(1)),
      cycleTime: parseFloat((values.cycleTime / values.count).toFixed(1)),
      mergedPrs: values.prTotal,
    }))
    .sort((a, b) => (a.week < b.week ? -1 : 1));
}

export function impactRatio(impact: number, bugs: number): number {
  const guard = impact === 0 ? 1 : impact;
  return parseFloat(((guard - bugs * 8) / guard).toFixed(2));
}

