import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export function IssueCard({ index, issue }: IssueCardProps) {
  const indexChip = String(index).padStart(2, "0");

  let badgeStyle = "text-[var(--color-accent)] border-[var(--color-accent)] bg-red-500/10";
  let stripeStyle = "border-l-[var(--color-accent)]";

  if (issue.severity === "CODE SMELL") {
    badgeStyle = "text-[var(--color-smell)] border-[var(--color-smell)] bg-amber-500/10";
    stripeStyle = "border-l-[var(--color-smell)]";
  } else if (issue.severity === "OPTIMIZATION") {
    badgeStyle = "text-[var(--color-opt)] border-[var(--color-opt)] bg-green-500/10";
    stripeStyle = "border-l-[var(--color-opt)]";
  }

  return (
    <div className="border border-[var(--color-subtle)] bg-white p-3 mb-3 shadow-[2px_2px_0px_#111111] font-mono text-xs">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[var(--color-subtle)]">
        <div className="flex items-center gap-2">
          <span className="bg-[var(--color-frame)] text-white px-1.5 py-0.5 text-[10px] font-bold">
            {indexChip}
          </span>
          <span className="font-bold text-[var(--color-frame)]">
            LINE {issue.line}
          </span>
          <span
            className={`border px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${badgeStyle}`}
          >
            {issue.severity}
          </span>
        </div>
        <div className="text-[var(--color-frame)] opacity-70 text-[11px] font-medium break-words text-right">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div className="mb-2">
          <pre
            className={`p-2 bg-[var(--color-canvas)] border border-[var(--color-subtle)] border-l-4 ${stripeStyle} overflow-x-auto text-[11px] text-[var(--color-frame)] font-mono`}
          >
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1 mt-2 text-[11px] leading-relaxed">
        <div className="text-[var(--color-accent)] flex items-start gap-1.5">
          <span className="font-bold">✕</span>
          <span>
            <strong className="font-semibold">Diagnosis:</strong> {issue.diagnosis}
          </span>
        </div>
        <div className="text-[var(--color-opt)] flex items-start gap-1.5">
          <span className="font-bold">✓</span>
          <span>
            <strong className="font-semibold">Expected:</strong> {issue.expected}
          </span>
        </div>
      </div>
    </div>
  );
}
