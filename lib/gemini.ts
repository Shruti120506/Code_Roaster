import { GoogleGenAI } from "@google/genai";
import { AI } from "../config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "./prompt";
import { roastResponseSchema } from "./schema";
import { RoastRequest, RoastResult } from "../types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const rawMsg = error instanceof Error ? error.message : String(error);

  if (status === 400) {
    return `Invalid request to AI model: ${rawMsg}. Please check input formatting.`;
  }
  if (status === 403) {
    return "Invalid Gemini API key or access denied. Please verify your GEMINI_API_KEY in .env.local.";
  }
  if (status === 404) {
    return `Requested Gemini model '${AI.model}' was not found. Check AI.model in config/app.config.ts.`;
  }
  if (status === 429) {
    return "Gemini API rate limit exceeded. Please wait a moment before roasting again.";
  }
  if (status === 503) {
    return "Gemini AI service is temporarily overloaded. Please retry in a few seconds.";
  }

  return rawMsg || "An unexpected error occurred while communicating with Gemini API.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Received an empty response from Gemini.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        throw new Error("Failed to parse Gemini response as valid JSON.");
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || (typeof err?.code === "number" ? err.code : undefined);

      if (status === 503 && attempt < AI.maxAttempts) {
        const waitMs = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(undefined, lastError));
}
