export type Repository = {
  id: string;
  name: string;
  productArea: string;
};

export type Engineer = {
  id: string;
  name: string;
  role: string;
  team: string;
  location: string;
};

export type WeeklyPerformance = {
  engineerId: string;
  repoId: string;
  week: string; // YYYY-MM-DD (monday)
  mergedPrs: number;
  reviewsCompleted: number;
  incidentsResolved: number;
  cycleTimeHours: number;
  impactScore: number;
  linesChanged: number;
  bugsIntroduced: number;
};

export const repositories: Repository[] = [
  { id: "repo-web", name: "web-frontend", productArea: "Growth" },
  { id: "repo-api", name: "cloud-api", productArea: "Core Platform" },
  { id: "repo-data", name: "data-pipeline", productArea: "Data & ML" },
  { id: "repo-mobile", name: "mobile-app", productArea: "Mobile" },
];

export const engineers: Engineer[] = [
  {
    id: "eng-01",
    name: "Riya Patel",
    role: "Senior SWE",
    team: "Core Platform",
    location: "SF",
  },
  {
    id: "eng-02",
    name: "Mateo Garcia",
    role: "Staff SWE",
    team: "Growth",
    location: "Remote - MX",
  },
  {
    id: "eng-03",
    name: "Lena Hoffmann",
    role: "SWE II",
    team: "Data & ML",
    location: "Berlin",
  },
  {
    id: "eng-04",
    name: "Jordan Smith",
    role: "Senior SWE",
    team: "Mobile",
    location: "NYC",
  },
];

/**
 * Weekly performance snapshots for the last 8 weeks.
 * Larger impactScore means broader business impact (weighted by repo criticality).
 */
export const weeklyPerformance: WeeklyPerformance[] = [
  {
    engineerId: "eng-01",
    repoId: "repo-api",
    week: "2024-05-06",
    mergedPrs: 6,
    reviewsCompleted: 9,
    incidentsResolved: 1,
    cycleTimeHours: 19,
    impactScore: 72,
    linesChanged: 2100,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-01",
    repoId: "repo-api",
    week: "2024-05-13",
    mergedPrs: 7,
    reviewsCompleted: 6,
    incidentsResolved: 0,
    cycleTimeHours: 22,
    impactScore: 68,
    linesChanged: 1850,
    bugsIntroduced: 1,
  },
  {
    engineerId: "eng-01",
    repoId: "repo-api",
    week: "2024-05-20",
    mergedPrs: 5,
    reviewsCompleted: 8,
    incidentsResolved: 1,
    cycleTimeHours: 18,
    impactScore: 75,
    linesChanged: 1620,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-01",
    repoId: "repo-data",
    week: "2024-05-27",
    mergedPrs: 3,
    reviewsCompleted: 4,
    incidentsResolved: 0,
    cycleTimeHours: 27,
    impactScore: 58,
    linesChanged: 940,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-02",
    repoId: "repo-web",
    week: "2024-05-06",
    mergedPrs: 9,
    reviewsCompleted: 5,
    incidentsResolved: 0,
    cycleTimeHours: 15,
    impactScore: 81,
    linesChanged: 2400,
    bugsIntroduced: 1,
  },
  {
    engineerId: "eng-02",
    repoId: "repo-web",
    week: "2024-05-13",
    mergedPrs: 11,
    reviewsCompleted: 7,
    incidentsResolved: 0,
    cycleTimeHours: 12,
    impactScore: 95,
    linesChanged: 2980,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-02",
    repoId: "repo-web",
    week: "2024-05-20",
    mergedPrs: 8,
    reviewsCompleted: 9,
    incidentsResolved: 1,
    cycleTimeHours: 14,
    impactScore: 92,
    linesChanged: 2105,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-02",
    repoId: "repo-mobile",
    week: "2024-05-27",
    mergedPrs: 5,
    reviewsCompleted: 3,
    incidentsResolved: 0,
    cycleTimeHours: 21,
    impactScore: 63,
    linesChanged: 1675,
    bugsIntroduced: 1,
  },
  {
    engineerId: "eng-03",
    repoId: "repo-data",
    week: "2024-05-06",
    mergedPrs: 4,
    reviewsCompleted: 6,
    incidentsResolved: 1,
    cycleTimeHours: 26,
    impactScore: 69,
    linesChanged: 1320,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-03",
    repoId: "repo-data",
    week: "2024-05-13",
    mergedPrs: 6,
    reviewsCompleted: 8,
    incidentsResolved: 0,
    cycleTimeHours: 23,
    impactScore: 74,
    linesChanged: 1610,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-03",
    repoId: "repo-data",
    week: "2024-05-20",
    mergedPrs: 5,
    reviewsCompleted: 7,
    incidentsResolved: 2,
    cycleTimeHours: 28,
    impactScore: 88,
    linesChanged: 1900,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-03",
    repoId: "repo-api",
    week: "2024-05-27",
    mergedPrs: 3,
    reviewsCompleted: 5,
    incidentsResolved: 0,
    cycleTimeHours: 32,
    impactScore: 61,
    linesChanged: 980,
    bugsIntroduced: 1,
  },
  {
    engineerId: "eng-04",
    repoId: "repo-mobile",
    week: "2024-05-06",
    mergedPrs: 7,
    reviewsCompleted: 4,
    incidentsResolved: 0,
    cycleTimeHours: 19,
    impactScore: 77,
    linesChanged: 1850,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-04",
    repoId: "repo-mobile",
    week: "2024-05-13",
    mergedPrs: 6,
    reviewsCompleted: 6,
    incidentsResolved: 1,
    cycleTimeHours: 17,
    impactScore: 82,
    linesChanged: 1705,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-04",
    repoId: "repo-mobile",
    week: "2024-05-20",
    mergedPrs: 8,
    reviewsCompleted: 5,
    incidentsResolved: 0,
    cycleTimeHours: 16,
    impactScore: 90,
    linesChanged: 2020,
    bugsIntroduced: 0,
  },
  {
    engineerId: "eng-04",
    repoId: "repo-web",
    week: "2024-05-27",
    mergedPrs: 4,
    reviewsCompleted: 4,
    incidentsResolved: 0,
    cycleTimeHours: 23,
    impactScore: 66,
    linesChanged: 1540,
    bugsIntroduced: 1,
  },
];

