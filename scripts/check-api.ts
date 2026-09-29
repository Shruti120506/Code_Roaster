import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[TEST] Testing Gemini API with model: ${AI.model}...`);
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n--- ROAST RESULT ---");
    console.log("Roast:\n", result.roast);
    console.log(`\nIssues Detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`\n[#${idx + 1}] Line ${issue.line} [${issue.severity}]: ${issue.title}`);
      console.log(`  Snippet: ${issue.codeSnippet}`);
      console.log(`  Diagnosis: ${issue.diagnosis}`);
      console.log(`  Expected: ${issue.expected}`);
    });
    console.log("\nCorrected Code Preview:\n", result.correctedCode);
    console.log("\nTakeaway:\n", result.takeaway);
    console.log("\n[SUCCESS] Gemini API responded properly with valid JSON schema!");
  } catch (error: any) {
    console.error("\n[ERROR] API Check failed:", error.message || error);
    process.exit(1);
  }
}

main();
