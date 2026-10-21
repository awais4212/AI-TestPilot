// app/api/test-cases/route.js

import { NextResponse } from "next/server";
import { generateJSON } from "../../../lib/gemini";
import { buildTestCasePrompt } from "../../../lib/prompts";
import {
  validateTestRequest,
  validateGeneratedTestCases,
} from "../../../lib/validation";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateTestRequest(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const prompt = buildTestCasePrompt(validation.data);
    const aiResult = await generateJSON(prompt);
    const validated = validateGeneratedTestCases(aiResult);

    return NextResponse.json({
      testCases: validated.testCases,
    });
  } catch (error) {
    console.error("Test case generation failed:", error);

    const message = error instanceof Error ? error.message : "";

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
      { error: "Unable to generate test cases. Please try again." },
      { status: 500 }
    );
  }
}