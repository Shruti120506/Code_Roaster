import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="w-16 h-16 border-2 border-[var(--color-accent)] flex items-center justify-center text-3xl font-bold text-[var(--color-accent)] mb-4">
        !
      </div>
      <h3 className="font-bold text-sm tracking-wider uppercase text-[var(--color-accent)] mb-2 font-sans">
        Analysis Failed
      </h3>
      <p className="text-xs text-[var(--color-frame)] opacity-80 max-w-sm leading-relaxed mb-4">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="cursor-pointer border-2 border-[var(--color-frame)] bg-[var(--color-accent)] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-frame)] transition-colors shadow-[2px_2px_0px_#111111]"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
