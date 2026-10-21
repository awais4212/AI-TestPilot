// ```javascript
// components/FailureAnalysis.js

"use client";

import { useState } from "react";

export default function FailureAnalysis({ testCase }) {
  const [actualResult, setActualResult] = useState(
    testCase.actualResult || ""
  );
  const [analysis, setAnalysis] = useState(
    testCase.failureAnalysis || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    if (!actualResult.trim()) {
      setError("Enter the actual test result first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze-failure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testCase,
          actualResult,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failure analysis failed.");
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-6 space-y-4 border-t border-slate-800 pt-5">
      <div>
        <h3 className="font-semibold text-white">AI Failure Analysis</h3>
        <p className="mt-1 text-sm text-slate-400">
          Provide the observed result to investigate the discrepancy.
        </p>
      </div>

      <label className="block text-sm text-slate-300">
        Actual result
        <textarea
          className="mt-2 min-h-24 w-full rounded-xl border border-slate-700 bg-[#07111F] p-3 text-sm text-white outline-none focus:border-sky-400"
          value={actualResult}
          onChange={(event) => setActualResult(event.target.value)}
          maxLength={5000}
          placeholder="Describe what happened when you ran the test..."
        />
      </label>

      <button
        type="button"
        onClick={analyze}
        disabled={loading}
        className="rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze Failure"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}

      {analysis && (
        <div className="space-y-4 rounded-xl border border-slate-700 bg-[#07111F] p-4">
          <div>
            <h4 className="font-semibold text-white">Summary</h4>
            <p className="mt-1 text-sm text-slate-300">
              {analysis.failureSummary}
            </p>
          </div>

          {[
            ["Possible Causes", analysis.possibleCauses],
            ["Recommended Checks", analysis.recommendedChecks],
            ["Suggested Fixes", analysis.suggestedFixes],
          ].map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-white">{title}</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {(items || []).map((item, index) => (
                  <li key={`${title}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <p className="text-xs leading-5 text-amber-300">
            {analysis.confidenceNote}
          </p>
        </div>
      )}
    </section>
  );
}
// ```
