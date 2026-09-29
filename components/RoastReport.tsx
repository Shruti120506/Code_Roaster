import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const issues = result?.issues ?? [];
  const issueCount = issues.length;
  const issueLabel = issueCount === 1 ? "1 ISSUE" : `${issueCount} ISSUES`;

  const hasCorrectedCode = Boolean(result?.correctedCode && result.correctedCode.trim().length > 0);
  const hasTakeaway = Boolean(result?.takeaway && result.takeaway.trim().length > 0);
  const takeawaySectionNumber = hasCorrectedCode ? 4 : 3;

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-panel)] min-h-[450px] overflow-hidden">
      {/* 40px Header strip */}
      <div className="h-10 px-3 bg-[var(--color-canvas)] border-b border-[var(--color-frame)] flex items-center justify-between font-mono text-xs select-none">
        <span className="text-[var(--color-frame)] opacity-60 uppercase tracking-widest text-[11px]">
          AUDIT // REPORT
        </span>
        <span className="font-bold text-[var(--color-frame)] tracking-wider uppercase">
          Roast Report
        </span>
        <div className="w-16" />
      </div>

      {/* Body States */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-5">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="space-y-6">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="text-[var(--color-accent)] font-bold uppercase tracking-wider text-[10px] border border-[var(--color-accent)] px-1.5 py-0.5 bg-red-500/10">
                  STYLE: {roastLevel.toUpperCase()}
                </span>
              </SectionHeader>
              <div className="p-3 bg-[var(--color-canvas)] border-l-4 border-[var(--color-accent)] border-y border-r border-[var(--color-subtle)] font-mono text-sm leading-relaxed text-[var(--color-frame)]">
                &ldquo;{result.roast}&rdquo;
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-[var(--color-frame)] opacity-70 font-bold uppercase tracking-wider text-[10px]">
                  {issueLabel}
                </span>
              </SectionHeader>

              {issues.length === 0 ? (
                <div className="p-3 border border-[var(--color-opt)] bg-green-500/10 text-[var(--color-opt)] font-mono text-xs font-semibold">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {hasCorrectedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section */}
            {hasTakeaway && (
              <div>
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="p-3 bg-[var(--color-canvas)] border border-[var(--color-subtle)] font-mono text-xs leading-relaxed text-[var(--color-frame)]">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
