// ```javascript
// lib/validation.js

const SEVERITIES = ["Low", "Medium", "High", "Critical"];

const STATUSES = ["Not Run", "Passed", "Failed", "Blocked"];

const CATEGORIES = [
  "Functional",
  "Boundary",
  "Negative",
  "Edge Case",
  "Security",
];

export function validateTestRequest(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "Invalid request body." };
  }

  const {
    projectName,
    featureName,
    requirements,
    codeSnippet = "",
    programmingLanguage = "",
    testingFocus = "Comprehensive testing",
  } = body;

  const fields = [
    ["projectName", projectName, 100],
    ["featureName", featureName, 150],
    ["requirements", requirements, 10000],
  ];

  for (const [name, value, maxLength] of fields) {
    if (typeof value !== "string" || !value.trim()) {
      return {
        valid: false,
        error: `${name} is required.`,
      };
    }

    if (value.length > maxLength) {
      return {
        valid: false,
        error: `${name} exceeds the maximum length.`,
      };
    }
  }

  if (
    typeof codeSnippet !== "string" ||
    codeSnippet.length > 12000
  ) {
    return {
      valid: false,
      error: "Code snippet must be text under 12000 characters.",
    };
  }

  if (
    typeof programmingLanguage !== "string" ||
    programmingLanguage.length > 80
  ) {
    return {
      valid: false,
      error: "Invalid programming language.",
    };
  }

  const allowedFocuses = [
    "Functional testing",
    "Boundary-value testing",
    "Negative testing",
    "Edge-case testing",
    "Security-oriented input validation",
    "Comprehensive testing",
  ];

  if (!allowedFocuses.includes(testingFocus)) {
    return {
      valid: false,
      error: "Invalid testing focus.",
    };
  }

  return {
    valid: true,
    data: {
      projectName: projectName.trim(),
      featureName: featureName.trim(),
      requirements: requirements.trim(),
      codeSnippet,
      programmingLanguage,
      testingFocus,
    },
  };
}

export function validateGeneratedTestCases(data) {
  if (
    !data ||
    typeof data !== "object" ||
    !Array.isArray(data.testCases)
  ) {
    throw new Error("Invalid test case response.");
  }

  if (
    data.testCases.length < 1 ||
    data.testCases.length > 10
  ) {
    throw new Error("Unexpected number of test cases.");
  }

  const seenIds = new Set();

  const testCases = data.testCases.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid test case at position ${index + 1}.`);
    }

    const requiredStrings = [
      "id",
      "title",
      "description",
      "expectedResult",
      "reasoning",
    ];

    for (const field of requiredStrings) {
      if (
        typeof item[field] !== "string" ||
        !item[field].trim()
      ) {
        throw new Error(
          `Test case ${index + 1} has an invalid ${field}.`
        );
      }
    }

    if (seenIds.has(item.id)) {
      throw new Error("Duplicate test case IDs were returned.");
    }

    seenIds.add(item.id);

    if (
      !Array.isArray(item.testSteps) ||
      item.testSteps.length === 0 ||
      !item.testSteps.every(
        (step) => typeof step === "string"
      )
    ) {
      throw new Error(`Test case ${item.id} has invalid steps.`);
    }

    if (
      !Array.isArray(item.preconditions) ||
      !item.preconditions.every(
        (condition) => typeof condition === "string"
      )
    ) {
      throw new Error(
        `Test case ${item.id} has invalid preconditions.`
      );
    }

    if (!SEVERITIES.includes(item.severity)) {
      throw new Error(`Test case ${item.id} has invalid severity.`);
    }

    if (!CATEGORIES.includes(item.category)) {
      throw new Error(`Test case ${item.id} has invalid category.`);
    }

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      preconditions: item.preconditions,
      testSteps: item.testSteps,
      testData:
        typeof item.testData === "string" ? item.testData : "",
      expectedResult: item.expectedResult,
      actualResult: "",
      status: "Not Run",
      severity: item.severity,
      reasoning: item.reasoning,
    };
  });

  return { testCases };
}

export function validateFailureRequest(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "Invalid request body." };
  }

  const { testCase, actualResult } = body;

  if (!testCase || typeof testCase !== "object") {
    return { valid: false, error: "Test case is required." };
  }

  if (
    typeof testCase.title !== "string" ||
    typeof testCase.expectedResult !== "string"
  ) {
    return { valid: false, error: "Invalid test case details." };
  }

  if (
    typeof actualResult !== "string" ||
    !actualResult.trim()
  ) {
    return {
      valid: false,
      error: "Actual result is required.",
    };
  }

  if (actualResult.length > 5000) {
    return {
      valid: false,
      error: "Actual result exceeds the maximum length.",
    };
  }

  return {
    valid: true,
    data: {
      testCase,
      actualResult: actualResult.trim(),
    },
  };
}

export { SEVERITIES, STATUSES, CATEGORIES };
// ```
