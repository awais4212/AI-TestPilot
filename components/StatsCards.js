// ```javascript
// components/StatsCards.js

import { calculateStats } from "../lib/reports";

export default function StatsCards({ testCases = [] }) {
  const stats = calculateStats(testCases);

  const cards = [
    { label: "Total Tests", value: stats.total, color: "text-white" },
    { label: "Passed", value: stats.passed, color: "text-emerald-300" },
    { label: "Failed", value: stats.failed, color: "text-red-300" },
    { label: "Blocked", value: stats.blocked, color: "text-amber-300" },
    { label: "Not Run", value: stats.notRun, color: "text-slate-300" },
    {
      label: "Pass Rate",
      value: stats.passRate === null ? "N/A" : `${stats.passRate}%`,
      color: "text-sky-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-800 bg-[#0F1B2D] p-4"
        >
          <p className="text-xs text-slate-400">{card.label}</p>
          <p className={`mt-3 text-2xl font-bold ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
// ```
