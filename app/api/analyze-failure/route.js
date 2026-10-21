
// app/api/analyze-failure/route.js

import { NextResponse } from "next/server";
import { generateJSON } from "../../../lib/gemini";
import { buildFailurePrompt } from "../../../lib/prompts";
import { validateFailureRequest } from "../../../lib/validation";

export const runtime = "nodejs";

function validateAnalysis(result) {
  if (!result || typeof result !== "object") {
    throw new Error("Invalid failure analysis.");
  }

  const stringFields = ["failureSummary", "confidenceNote"];

  for (const field of stringFields) {
    if (typeof result[field] !== "string") {
      throw new Error("Invalid failure analysis response.");
    }
  }

  const arrayFields = [
    "possibleCauses",
    "recommendedChecks",
    "suggestedFixes",
  ];

  for (const field of arrayFields) {
    if (
      !Array.isArray(result[field]) ||
      !result[field].every((item) => typeof item === "string")
    ) {
      throw new Error("Invalid failure analysis response.");
    }
  }

  return result;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateFailureRequest(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const prompt = buildFailurePrompt(validation.data);
    const result = await generateJSON(prompt);
    const analysis = validateAnalysis(result);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Failure analysis failed:", error);

    const message =
      error instanceof Error ? error.message : "";

    if (message.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        { error: "The server AI API key is not configured." },
        { status: 500 }
      );
    }

    if (message.includes("429")) {
      return NextResponse.json(
        { error: "AI rate limit reached. Please try again shortly." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Unable to analyze the failure. Please try again." },
      { status: 500 }
    );
  }
}

