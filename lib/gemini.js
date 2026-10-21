import { GoogleGenAI } from "@google/genai";

let client;

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }

  return client;
}

export const MODEL_ID = "gemini-3.5-flash-lite";

export async function generateJSON(prompt) {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: MODEL_ID,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("The AI returned an empty response.");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("The AI returned invalid JSON.");
  }
}

