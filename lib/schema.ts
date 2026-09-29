import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "../config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A funny and sharp critique in Hinglish with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues and defects, ordered by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the issue in the submitted code.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the bug.",
          },
          title: {
            type: Type.STRING,
            description: "Short title of the issue in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code snippet from the user's code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of why this is broken in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "What should be done instead in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete corrected code without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Key learning lesson or advice in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
