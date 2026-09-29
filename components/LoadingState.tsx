import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="w-16 h-16 border-2 border-[var(--color-frame)] flex items-center justify-center text-2xl font-bold text-[var(--color-accent)] mb-4 animate-spin">
        /
      </div>
      <h3 className="font-bold text-sm tracking-wider uppercase text-[var(--color-frame)] mb-2 animate-pulse font-sans">
        Analyzing Code
      </h3>
      <p className="text-xs text-[var(--color-frame)] opacity-70 max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
