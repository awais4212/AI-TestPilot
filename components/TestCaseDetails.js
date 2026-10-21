// ```javascript
// components/TestCaseDetails.js

"use client";

import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import SeverityBadge from "./SeverityBadge";
import FailureAnalysis from "./FailureAnalysis";

export default function TestCaseDetails({
  testCase,
  onClose,
  onUpdate,
}) {
  const [actualResult, setActualResult] = useState(
    testCase?.actualResult || ""
  );
  const [status, setStatus] = useState(
    testCase?.status || "Not Run"
  );

  useEffect(() => {
    setActualResult(testCase?.actualResult || "");
    setStatus(testCase?.status || "Not Run");
  }, [testCase]);

  if (!testCase) return null;

  const panelClass =
    "rounded-xl border border-slate-800 bg-[#07111F] p-4";

  function saveResult() {
    if (status !== "Not Run" && !actualResult.trim()) {
      window.alert("Record the actual result before saving this status.");
      return;
    }

    onUpdate(testCase.id, {
      actualResult: actualResult.trim(),
      status,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="test-detail-title"
        className="mx-auto my-6 max-w-3xl rounded-2xl border border-slate-700 bg-[#0F1B2D] p-5 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-300">
              {testCase.id}
            </p>
            <h2
              id="test-detail-title"
              className="mt-1 text-xl font-bold text-white"
            >
              {testCase.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800"
            aria-label="Close test details"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status={status} />
          <SeverityBadge severity={testCase.severity} />
        </div>

        <div className="mt-6 space-y-4">
          <div className={panelClass}>
            <h3 className="font-semibold text-white">Description</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {testCase.description}
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-semibold text-white">Preconditions</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {(testCase.preconditions || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={panelClass}>
            <h3 className="font-semibold text-white">Test steps</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-300">
              {(testCase.testSteps || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <div className={panelClass}>
            <h3 className="font-semibold text-white">Test data</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
              {testCase.testData || "No test data specified."}
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-semibold text-white">Expected result</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {testCase.expectedResult}
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-semibold text-white">Why this test matters</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {testCase.reasoning}
            </p>
          </div>

          <div className={panelClass}>
            <h3 className="font-semibold text-white">Record test outcome</h3>

            <label className="mt-4 block text-sm text-slate-300">
              Actual result
              <textarea
                className="mt-2 min-h-24 w-full rounded-xl border border-slate-700 bg-[#0F1B2D] p-3 text-white outline-none focus:border-sky-400"
                value={actualResult}
                onChange={(event) => setActualResult(event.target.value)}
                maxLength={5000}
                placeholder="Describe what happened when you ran this test..."
              />
            </label>

            <label className="mt-4 block text-sm text-slate-300">
              Status
              <select
                className="mt-2 w-full rounded-xl border border-slate-700 bg-[#0F1B2D] p-3 text-white"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option>Not Run</option>
                <option>Passed</option>
                <option>Failed</option>
                <option>Blocked</option>
              </select>
            </label>

            <button
              type="button"
              onClick={saveResult}
              className="mt-4 rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300"
            >
              Save Outcome
            </button>
          </div>

          {status === "Failed" && (
            <FailureAnalysis
              key={testCase.id}
              testCase={{ ...testCase, actualResult }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
// ```
