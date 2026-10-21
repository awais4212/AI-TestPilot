// ```javascript
// app/dashboard/page.js

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StatsCards from "../../components/StatsCards";
import TestCaseTable from "../../components/TestCaseTable";
import TestCaseDetails from "../../components/TestCaseDetails";
import {
  getProjects,
  saveProject,
  deleteProject,
  clearProjects,
} from "../../lib/storage";
import {
  generateCSV,
  generateMarkdown,
  downloadReport,
} from "../../lib/reports";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [ready, setReady] = useState(false);

  const refreshProjects = useCallback(() => {
    const saved = getProjects();
    setProjects(saved);

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("project");

    const nextId = saved.some((p) => p.id === requestedId)
      ? requestedId
      : saved[0]?.id || "";

    setProjectId(nextId);
    setReady(true);
  }, []);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  const activeProject =
    projects.find((project) => project.id === projectId) || null;

  function updateTest(testId, changes) {
    if (!activeProject) return;

    const updatedProject = {
      ...activeProject,
      testCases: activeProject.testCases.map((test) =>
        test.id === testId ? { ...test, ...changes } : test
      ),
      updatedAt: new Date().toISOString(),
    };

    if (!saveProject(updatedProject)) {
      window.alert("Could not save changes to browser storage.");
      return;
    }

    setProjects(getProjects());

    if (selectedTest?.id === testId) {
      setSelectedTest({
        ...selectedTest,
        ...changes,
      });
    }
  }

  function removeTest(testId) {
    if (!activeProject) return;

    const updatedProject = {
      ...activeProject,
      testCases: activeProject.testCases.filter(
        (test) => test.id !== testId
      ),
    };

    saveProject(updatedProject);
    setProjects(getProjects());

    if (selectedTest?.id === testId) {
      setSelectedTest(null);
    }
  }

  function removeActiveProject() {
    if (!activeProject) return;

    if (
      !window.confirm(
        `Delete the project "${activeProject.name}" and all its test cases?`
      )
    ) {
      return;
    }

    deleteProject(activeProject.id);
    setSelectedTest(null);
    refreshProjects();
  }

  function exportReport(format) {
    if (!activeProject) return;

    const safeName = activeProject.name
      .replace(/[^a-z0-9-_]/gi, "-")
      .slice(0, 60) || "test-project";

    if (format === "csv") {
      downloadReport(
        generateCSV(activeProject),
        `${safeName}-report.csv`,
        "text/csv;charset=utf-8;"
      );
    } else {
      downloadReport(
        generateMarkdown(activeProject),
        `${safeName}-report.md`,
        "text/markdown;charset=utf-8;"
      );
    }
  }

  function clearHistory() {
    if (!window.confirm("Delete all saved testing projects?")) return;

    clearProjects();
    setProjects([]);
    setProjectId("");
    setSelectedTest(null);
  }

  return (
    <div className="min-h-screen bg-[#07111F]">
      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-sky-300">Quality assurance</p>
              <h1 className="mt-1 text-3xl font-bold text-white">
                Testing Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Review test scenarios and record verified outcomes.
              </p>
            </div>

            <button
              onClick={() => router.push("/workspace")}
              className="rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-300"
            >
              + New Project
            </button>
          </div>

          {!ready ? (
            <p className="text-slate-400">Loading saved projects...</p>
          ) : projects.length === 0 ? (
            <section className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              <h2 className="text-xl font-semibold text-white">
                No testing projects yet
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Create a project to generate your first test cases.
              </p>
              <button
                onClick={() => router.push("/workspace")}
                className="mt-5 rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950"
              >
                Create Project
              </button>
            </section>
          ) : (
            <>
              <section className="flex flex-wrap items-center gap-3">
                <label className="text-sm text-slate-300">
                  Active project
                  <select
                    className="ml-3 max-w-full rounded-lg border border-slate-700 bg-[#0F1B2D] px-3 py-2 text-white"
                    value={projectId}
                    onChange={(event) => {
                      setProjectId(event.target.value);
                      setSelectedTest(null);
                    }}
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  onClick={() => exportReport("md")}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                >
                  Export Markdown
                </button>

                <button
                  onClick={() => exportReport("csv")}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                >
                  Export CSV
                </button>

                <button
                  onClick={removeActiveProject}
                  className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                >
                  Delete Project
                </button>
              </section>

              {activeProject && (
                <>
                  <section>
                    <h2 className="text-xl font-semibold text-white">
                      {activeProject.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {activeProject.featureName}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {activeProject.requirements}
                    </p>
                  </section>

                  <StatsCards testCases={activeProject.testCases || []} />

                  <section>
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-white">
                        Test Cases
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        Update outcomes only after performing the tests.
                      </p>
                    </div>

                    <TestCaseTable
                      testCases={activeProject.testCases || []}
                      onOpen={setSelectedTest}
                      onUpdate={updateTest}
                      onDelete={removeTest}
                    />
                  </section>
                </>
              )}

              <button
                onClick={clearHistory}
                className="text-sm text-slate-500 hover:text-red-300"
              >
                Clear all saved project history
              </button>
            </>
          )}
        </main>
      </div>

      {selectedTest && (
        <TestCaseDetails
          key={selectedTest.id}
          testCase={selectedTest}
          onClose={() => setSelectedTest(null)}
          onUpdate={updateTest}
        />
      )}
    </div>
  );
}
// ```
