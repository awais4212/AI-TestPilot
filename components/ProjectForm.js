// ```javascript
// components/ProjectForm.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  projectName: "",
  featureName: "",
  requirements: "",
  codeSnippet: "",
  programmingLanguage: "",
  testingFocus: "Comprehensive testing",
};

const focusOptions = [
  "Functional testing",
  "Boundary-value testing",
  "Negative testing",
  "Edge-case testing",
  "Security-oriented input validation",
  "Comprehensive testing",
];

export default function ProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function useExample() {
    setForm({
      ...initialForm,
      projectName: "Login System",
      featureName: "User Login",
      requirements:
        "Users can log in with an email and password. Email is required and must be valid. Password is required and must contain at least 8 characters. Invalid credentials should display an error message.",
      testingFocus: "Comprehensive testing",
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !form.projectName.trim() ||
      !form.featureName.trim() ||
      !form.requirements.trim()
    ) {
      setError("Complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/test-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate test cases.");
      }

      const project = {
        id: crypto.randomUUID(),
        name: form.projectName.trim(),
        featureName: form.featureName.trim(),
        requirements: form.requirements.trim(),
        testingFocus: form.testingFocus,
        testCases: data.testCases,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // The dashboard reads saved projects from localStorage.
      const { saveProject } = await import("../lib/storage");
      const saved = saveProject(project);

      if (!saved) {
        throw new Error(
          "The project could not be saved in browser storage."
        );
      }

      router.push(`/dashboard?project=${project.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-700 bg-[#07111F] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-800 bg-[#0F1B2D] p-5 sm:p-8"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">
            Create testing project
          </h2>

          <button
            type="button"
            onClick={useExample}
            className="text-sm text-sky-300 hover:text-sky-200"
          >
            Fill example
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Describe your software feature and let AI propose test cases.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-200">
          Project name *
          <input
            className={inputClass}
            name="projectName"
            value={form.projectName}
            onChange={updateField}
            maxLength={100}
            placeholder="e.g. E-commerce website"
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-200">
          Feature name *
          <input
            className={inputClass}
            name="featureName"
            value={form.featureName}
            onChange={updateField}
            maxLength={150}
            placeholder="e.g. User login"
            required
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-200">
        Requirements *
        <textarea
          className={`${inputClass} min-h-36 resize-y`}
          name="requirements"
          value={form.requirements}
          onChange={updateField}
          maxLength={10000}
          placeholder="Explain how the feature should work..."
          required
        />
      </label>

      <label className="block text-sm font-medium text-slate-200">
        Testing focus
        <select
          className={inputClass}
          name="testingFocus"
          value={form.testingFocus}
          onChange={updateField}
        >
          {focusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-200">
          Programming language (optional)
          <input
            className={inputClass}
            name="programmingLanguage"
            value={form.programmingLanguage}
            onChange={updateField}
            maxLength={80}
            placeholder="e.g. JavaScript"
          />
        </label>

        <div className="text-sm text-slate-400">
          Code snippet (optional)
          <p className="mt-2 leading-6">
            You can add code for context. The app will analyze it as text;
            it will not execute the supplied code.
          </p>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-200">
        Code snippet (optional)
        <textarea
          className={`${inputClass} min-h-28 font-mono`}
          name="codeSnippet"
          value={form.codeSnippet}
          onChange={updateField}
          maxLength={12000}
          placeholder="Paste a short code snippet..."
        />
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-sky-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Generating test cases..." : "Generate Test Cases"}
      </button>

      <p className="text-xs leading-5 text-slate-500">
        AI-generated test cases are proposals. Run the tests separately
        and record the actual outcomes to validate your software.
      </p>
    </form>
  );
}
// ```