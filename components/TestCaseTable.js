// ```javascript
// components/TestCaseTable.js

"use client";

import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";

const statuses = ["Not Run", "Passed", "Failed", "Blocked"];
const severities = ["Low", "Medium", "High", "Critical"];

export default function TestCaseTable({
  testCases = [],
  onOpen,
  onUpdate,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filtered = useMemo(() => {
    return testCases.filter((test) => {
      const matchesSearch =
        `${test.id} ${test.title}`.toLowerCase().includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "All" || test.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All" ||
        test.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [testCases, search, statusFilter, severityFilter]);

  const controlClass =
    "rounded-lg border border-slate-700 bg-[#07111F] px-3 py-2 text-sm text-white outline-none focus:border-sky-400";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0F1B2D]">
      <div className="flex flex-col gap-3 border-b border-slate-800 p-4 lg:flex-row">
        <input
          className={`${controlClass} flex-1`}
          placeholder="Search by test ID or title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search test cases"
        />

        <select
          className={controlClass}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <select
          className={controlClass}
          value={severityFilter}
          onChange={(event) => setSeverityFilter(event.target.value)}
          aria-label="Filter by severity"
        >
          <option value="All">All severities</option>
          {severities.map((severity) => (
            <option key={severity}>{severity}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400">
          No test cases match your filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-4">Test case</th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Update status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filtered.map((test) => (
                <tr key={test.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-4">
                    <p className="text-xs text-sky-300">{test.id}</p>
                    <p className="mt-1 font-medium text-white">
                      {test.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {test.category}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <SeverityBadge severity={test.severity} />
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={test.status} />
                  </td>

                  <td className="px-4 py-4">
                    <select
                      className="rounded-lg border border-slate-700 bg-[#07111F] px-2 py-2 text-xs text-white"
                      value={test.status}
                      onChange={(event) =>
                        onUpdate(test.id, {
                          status: event.target.value,
                          ...(event.target.value === "Not Run"
                            ? { actualResult: "" }
                            : {}),
                        })
                      }
                      aria-label={`Update status for ${test.id}`}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpen(test)}
                        className="text-sky-300 hover:text-sky-200"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete ${test.id}: ${test.title}?`
                            )
                          ) {
                            onDelete(test.id);
                          }
                        }}
                        className="text-red-300 hover:text-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
// ```