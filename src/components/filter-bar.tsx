"use client";

import { Engineer, Repository } from "@/data/performance";
import { uniqueWeeks } from "@/lib/metrics";
import { useState } from "react";

type FilterBarProps = {
  engineers: Engineer[];
  repositories: Repository[];
  selectedEngineers: string[];
  selectedRepositories: string[];
  selectedWeeks: string[];
  onChange: (filters: { engineerIds: string[]; repositoryIds: string[]; weeks: string[] }) => void;
};

export function FilterBar({
  engineers,
  repositories,
  selectedEngineers,
  selectedRepositories,
  selectedWeeks,
  onChange,
}: FilterBarProps) {
  const [openSection, setOpenSection] = useState<"engineers" | "repos" | "weeks" | null>(null);

  const toggleSelection = (current: string[], id: string) => {
    if (current.includes(id)) {
      return current.filter((value) => value !== id);
    }
    return [...current, id];
  };

  const handleEngineerToggle = (id: string) => {
    const updated = toggleSelection(selectedEngineers, id);
    onChange({
      engineerIds: updated,
      repositoryIds: selectedRepositories,
      weeks: selectedWeeks,
    });
  };

  const handleRepoToggle = (id: string) => {
    const updated = toggleSelection(selectedRepositories, id);
    onChange({
      engineerIds: selectedEngineers,
      repositoryIds: updated,
      weeks: selectedWeeks,
    });
  };

  const handleWeekToggle = (id: string) => {
    const updated = toggleSelection(selectedWeeks, id);
    onChange({
      engineerIds: selectedEngineers,
      repositoryIds: selectedRepositories,
      weeks: updated,
    });
  };

  const resetFilters = () => {
    onChange({ engineerIds: [], repositoryIds: [], weeks: [] });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400">
            Filters
          </div>
          <div className="text-sm text-zinc-400 dark:text-zinc-500">
            Narrow down by engineer, repo, or week
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <FilterSection
          title="Engineers"
          isOpen={openSection === "engineers"}
          onToggle={() => setOpenSection(openSection === "engineers" ? null : "engineers")}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            {engineers.map((engineer) => (
              <label
                key={engineer.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 transition ${
                  selectedEngineers.includes(engineer.id)
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500/60 dark:bg-blue-500/10 dark:text-blue-200"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedEngineers.includes(engineer.id)}
                  onChange={() => handleEngineerToggle(engineer.id)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800"
                />
                <span>
                  <div className="font-semibold">{engineer.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{engineer.role}</div>
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Repositories"
          isOpen={openSection === "repos"}
          onToggle={() => setOpenSection(openSection === "repos" ? null : "repos")}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            {repositories.map((repo) => (
              <label
                key={repo.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 transition ${
                  selectedRepositories.includes(repo.id)
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500/60 dark:bg-blue-500/10 dark:text-blue-200"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRepositories.includes(repo.id)}
                  onChange={() => handleRepoToggle(repo.id)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800"
                />
                <span>
                  <div className="font-semibold">{repo.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{repo.productArea}</div>
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Week of"
          isOpen={openSection === "weeks"}
          onToggle={() => setOpenSection(openSection === "weeks" ? null : "weeks")}
        >
          <div className="grid grid-cols-4 gap-2 text-xs">
            {uniqueWeeks.map((week) => (
              <button
                key={week}
                type="button"
                onClick={() => handleWeekToggle(week)}
                className={`rounded-xl border px-3 py-2 font-semibold transition ${
                  selectedWeeks.includes(week)
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500/60 dark:bg-blue-500/10 dark:text-blue-200"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                }`}
              >
                {new Date(week).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

type FilterSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
      >
        {title}
        <span className="text-xs text-zinc-400">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen ? <div className="border-t border-zinc-100 p-3 dark:border-zinc-800">{children}</div> : null}
    </div>
  );
}

