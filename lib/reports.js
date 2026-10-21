// ```javascript
// lib/reports.js

export function calculateStats(testCases = []) {
  const stats = {
    total: testCases.length,
    passed: 0,
    failed: 0,
    blocked: 0,
    notRun: 0,
  };

  for (const test of testCases) {
    if (test.status === "Passed") stats.passed++;
    else if (test.status === "Failed") stats.failed++;
    else if (test.status === "Blocked") stats.blocked++;
    else stats.notRun++;
  }

  const executed = stats.passed + stats.failed;

  stats.passRate =
    executed > 0
      ? Math.round((stats.passed / executed) * 100)
      : null;

  return stats;
}

function csvCell(value) {
  const text = Array.isArray(value)
    ? value.join("; ")
    : String(value ?? "");

  // Escape spreadsheet formula prefixes in untrusted text.
  const safe = /^[\s]*[=+\-@]/.test(text)
    ? `'${text}`
    : text;

  return `"${safe.replace(/"/g, '""')}"`;
}

export function generateCSV(project) {
  const rows = [
    [
      "Project",
      "Test ID",
      "Title",
      "Category",
      "Severity",
      "Status",
      "Description",
      "Preconditions",
      "Test Steps",
      "Test Data",
      "Expected Result",
      "Actual Result",
      "Reasoning",
    ],
  ];

  for (const test of project.testCases || []) {
    rows.push([
      project.name,
      test.id,
      test.title,
      test.category,
      test.severity,
      test.status,
      test.description,
      test.preconditions,
      test.testSteps,
      test.testData,
      test.expectedResult,
      test.actualResult,
      test.reasoning,
    ]);
  }

  return rows
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
}

export function generateMarkdown(project) {
  const tests = project.testCases || [];
  const stats = calculateStats(tests);

  const lines = [
    `# AI TestPilot Report: ${project.name}`,
    "",
    `- **Feature:** ${project.featureName || "N/A"}`,
    `- **Generated:** ${new Date().toLocaleString()}`,
    `- **Total tests:** ${stats.total}`,
    `- **Passed:** ${stats.passed}`,
    `- **Failed:** ${stats.failed}`,
    `- **Blocked:** ${stats.blocked}`,
    `- **Not Run:** ${stats.notRun}`,
    `- **Pass rate:** ${
      stats.passRate === null ? "N/A" : `${stats.passRate}%`
    }`,
    "",
    "> Results reflect recorded test outcomes. AI-generated test cases are not automatically executed.",
    "",
    "## Test Cases",
    "",
  ];

  for (const test of tests) {
    lines.push(
      `### ${test.id}: ${test.title}`,
      "",
      `- **Status:** ${test.status}`,
      `- **Severity:** ${test.severity}`,
      `- **Category:** ${test.category}`,
      `- **Description:** ${test.description}`,
      `- **Preconditions:** ${(test.preconditions || []).join("; ")}`,
      `- **Test steps:** ${(test.testSteps || []).join(" | ")}`,
      `- **Test data:** ${test.testData || "N/A"}`,
      `- **Expected result:** ${test.expectedResult}`,
      `- **Actual result:** ${test.actualResult || "Not recorded"}`,
      `- **Reasoning:** ${test.reasoning}`,
      ""
    );

    if (test.failureAnalysis) {
      lines.push(
        "#### AI Failure Analysis",
        "",
        test.failureAnalysis.failureSummary || "",
        "",
        "**Possible causes**",
        ...(test.failureAnalysis.possibleCauses || []).map(
          (item) => `- ${item}`
        ),
        "",
        "**Recommended checks**",
        ...(test.failureAnalysis.recommendedChecks || []).map(
          (item) => `- ${item}`
        ),
        "",
        "**Suggested fixes**",
        ...(test.failureAnalysis.suggestedFixes || []).map(
          (item) => `- ${item}`
        ),
        "",
        test.failureAnalysis.confidenceNote || "",
        ""
      );
    }
  }

  return lines.join("\n");
}

export function downloadReport(content, filename, mimeType) {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}
// ```
