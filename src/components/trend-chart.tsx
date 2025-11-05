"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

type TrendChartProps = {
  data: { week: string; impact: number; cycleTime: number; mergedPrs: number }[];
};

const formatWeek = (week: string) =>
  new Date(week).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="h-72 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400">
            Weekly Trajectory
          </div>
          <div className="text-sm text-zinc-400 dark:text-zinc-500">
            Impact score vs cycle time and merged PR volume
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 35, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="week"
            tickFormatter={formatWeek}
            stroke="#a1a1aa"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="#a1a1aa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a1a1aa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={45}
          />
          <Tooltip
            labelFormatter={(label) => `Week of ${formatWeek(label as string)}`}
            formatter={(value, name) => {
              if (name === "cycleTime") {
                return [`${value as number}h`, "Avg Cycle Time"];
              }
              if (name === "impact") {
                return [value, "Impact Score"];
              }
              return [value, "Merged PRs"];
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="impact"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            name="Impact"
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="cycleTime"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 3"
            name="cycleTime"
            yAxisId="right"
          />
          <Line
            type="monotone"
            dataKey="mergedPrs"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Merged PRs"
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

