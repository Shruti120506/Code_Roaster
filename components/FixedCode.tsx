"use client";

import React, { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig ? langConfig.extension : "txt";
  const fakeFileName = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-4 font-mono text-xs">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[var(--color-opt)] font-bold text-[10px] tracking-wider uppercase border border-[var(--color-opt)] px-1.5 py-0.5 bg-green-500/10">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-[var(--color-frame)] bg-white mb-3">
        {/* Header strip */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--color-canvas)] border-b border-[var(--color-subtle)] text-[11px]">
          <span className="font-bold text-[var(--color-frame)] tracking-wide">
            {fakeFileName}
          </span>
          <span className="text-[var(--color-opt)] font-bold tracking-wider text-[10px] uppercase">
            READY TO APPLY
          </span>
        </div>

        {/* Code block */}
        <pre className="p-3 bg-[var(--color-panel)] overflow-x-auto text-[11px] leading-relaxed text-[var(--color-frame)]">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="cursor-pointer border border-[var(--color-frame)] bg-white px-3 py-1.5 font-bold text-[11px] uppercase tracking-wider text-[var(--color-frame)] hover:bg-[var(--color-frame)] hover:text-white transition-colors"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="cursor-pointer border border-[var(--color-frame)] bg-[var(--color-frame)] text-white px-3 py-1.5 font-bold text-[11px] uppercase tracking-wider hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors shadow-[2px_2px_0px_#111111]"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
