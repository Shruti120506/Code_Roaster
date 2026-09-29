import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="px-4 py-3 bg-[var(--color-canvas)] border-b border-[var(--color-frame)] flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* App branding */}
      <div className="flex items-center gap-2.5">
        <h1 className="font-sans font-bold text-base sm:text-lg tracking-widest uppercase text-[var(--color-frame)]">
          {APP.name}
        </h1>
        <span className="font-mono text-[10px] font-bold border border-[var(--color-frame)] px-1.5 py-0.5 bg-white text-[var(--color-frame)]">
          {APP.version}
        </span>
      </div>

      {/* Controls */}
      <div>{children}</div>
    </header>
  );
}
