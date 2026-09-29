import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

const VALID_LANGUAGES = new Set(LANGUAGES.map((l) => l.id));
const VALID_ROAST_LEVELS = new Set(ROAST_LEVELS.map((r) => r.id));

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body provided." },
      { status: 400 }
    );
  }

  const rawCode = typeof body.code === "string" ? body.code : "";
  const rawErrorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // 1. Validate empty code
  if (!rawCode.trim()) {
    return NextResponse.json(
      { error: "No code provided. I can't roast the void." },
      { status: 400 }
    );
  }

  // 2. Validate code length
  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code is too long (${rawCode.length} characters). Maximum allowed is ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message is too long (${rawErrorMessage.length} characters). Maximum allowed is ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Language & Roast Level fallback to DEFAULTS if invalid
  const language: LanguageId = VALID_LANGUAGES.has(body.language)
    ? body.language
    : DEFAULTS.language;

  const roastLevel: RoastLevel = VALID_ROAST_LEVELS.has(body.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  const roastRequest: RoastRequest = {
    language,
    code: rawCode,
    roastLevel,
    errorMessage: rawErrorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastRequest);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("[ROAST_API_ERROR]", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to roast code due to an internal server error.",
      },
      { status: 500 }
    );
  }
}
