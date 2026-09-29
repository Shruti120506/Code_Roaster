"use client";

import React, { useRef } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPos, setCursorPos] = React.useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langConfig ? langConfig.label : language;

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const start = target.selectionStart;
    const textBefore = target.value.substring(0, start);
    const line = textBefore.split("\n").length;
    const col = start - textBefore.lastIndexOf("\n");
    setCursorPos({ line, col });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces via setRangeText
      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);

      // Re-trigger select calculation
      const textBefore = textarea.value.substring(0, textarea.selectionStart);
      const line = textBefore.split("\n").length;
      const col = textarea.selectionStart - textBefore.lastIndexOf("\n");
      setCursorPos({ line, col });
    }
  };

  const handleClear = () => {
    onChange("");
    setCursorPos({ line: 1, col: 1 });
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-panel)] border-b md:border-b-0 md:border-r border-[var(--color-frame)] min-h-[450px]">
      {/* 40px Header Strip */}
      <div className="h-10 px-3 bg-[var(--color-canvas)] border-b border-[var(--color-frame)] flex items-center justify-between font-mono text-xs select-none">
        <span className="text-[var(--color-frame)] opacity-60 uppercase tracking-widest text-[11px]">
          INPUT // SRC
        </span>
        <span className="font-bold text-[var(--color-frame)] tracking-wider uppercase">
          Your Code
        </span>
        <div className="flex items-center gap-3 text-[11px] font-bold">
          <button
            type="button"
            onClick={onLoadSample}
            className="cursor-pointer text-[var(--color-accent)] hover:underline uppercase"
          >
            SAMPLE BUG
          </button>
          <span className="text-[var(--color-subtle)]">|</span>
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer text-[var(--color-frame)] opacity-70 hover:opacity-100 uppercase"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Surface: Gutter + Textarea */}
      <div className="flex-1 flex relative overflow-hidden font-mono text-xs">
        {/* Synced Gutter */}
        <div
          ref={gutterRef}
          className="w-12 py-3 bg-[var(--color-canvas)] border-r border-[var(--color-subtle)] select-none overflow-hidden text-right pr-2 text-[var(--color-frame)] opacity-50 flex flex-col flex-shrink-0"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`h-5 leading-5 text-[11px] ${
                  isError
                    ? "text-[var(--color-accent)] font-bold bg-red-500/20"
                    : ""
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={handleSelect}
          onKeyUp={handleSelect}
          onClick={handleSelect}
          onKeyDown={handleKeyDown}
          placeholder="// Paste your code here..."
          spellCheck={false}
          className="flex-1 p-3 bg-transparent resize-none outline-none leading-5 text-xs text-[var(--color-frame)] font-mono whitespace-pre overflow-auto"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Status Strip Overlay */}
      <div className="h-7 px-3 bg-[var(--color-canvas)] border-t border-[var(--color-subtle)] hidden sm:flex items-center justify-between font-mono text-[10px] text-[var(--color-frame)] opacity-80 select-none">
        <div>
          Ln {cursorPos.line}, Col {cursorPos.col} · {languageLabel}
        </div>
        <div>UTF-8 · Tab Size: 4</div>
      </div>
    </div>
  );
}
