import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="bg-[var(--color-canvas)] border-t border-[var(--color-frame)] px-4 py-2 font-mono text-[11px] text-[var(--color-frame)] select-none">
      {/* Main status row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="font-bold text-[var(--color-smell)] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-smell)] animate-ping" />
              PROCESSING...
            </span>
          ) : (
            <span className="font-bold text-[var(--color-opt)] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-opt)]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}

          <span className="hidden sm:inline opacity-40">|</span>
          <span className="hidden sm:inline opacity-70">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="font-bold tracking-widest uppercase opacity-80 text-[10px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second line crediting the workshop */}
      <div className="mt-1 text-center text-[10px] text-[var(--color-frame)] opacity-50 tracking-wider">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
