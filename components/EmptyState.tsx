import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="w-16 h-16 border-2 border-dashed border-[var(--color-frame)] flex items-center justify-center text-2xl font-bold text-[var(--color-frame)] mb-4">
        &#123;&#125;
      </div>
      <h3 className="font-bold text-sm tracking-wider uppercase text-[var(--color-frame)] mb-2 font-sans">
        Awaiting Code Submission
      </h3>
      <p className="text-xs text-[var(--color-frame)] opacity-70 max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
