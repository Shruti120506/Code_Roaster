import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-frame)] opacity-70 font-bold uppercase text-[11px]">
          Roast Level:
        </span>
        <div className="flex items-center border border-[var(--color-frame)] bg-white divide-x divide-[var(--color-frame)]">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`cursor-pointer px-2.5 py-1 text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 select-none ${
                  isSelected
                    ? "bg-[var(--color-frame)] text-white"
                    : "text-[var(--color-frame)] hover:bg-[var(--color-canvas)]"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="hidden"
                />
                <span
                  className={`w-2 h-2 border border-current rounded-full ${
                    isSelected ? "bg-[var(--color-accent)]" : "bg-transparent"
                  }`}
                />
                {level.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Selector */}
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-frame)] opacity-70 font-bold uppercase text-[11px] hidden lg:inline">
          Language:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="cursor-pointer appearance-none bg-white border border-[var(--color-frame)] px-2.5 py-1 pr-6 font-mono text-[11px] font-bold text-[var(--color-frame)] uppercase focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-[var(--color-frame)]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`cursor-pointer px-2.5 py-1 font-bold text-[11px] border border-dashed border-[var(--color-frame)] transition-colors uppercase ${
          errorDrawerOpen
            ? "bg-[var(--color-frame)] text-white"
            : "bg-white text-[var(--color-frame)] hover:bg-[var(--color-canvas)]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary CTA Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`cursor-pointer px-3.5 py-1.5 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-[var(--color-frame)] ${
          isRoasting
            ? "bg-[var(--color-frame)] text-white opacity-80 cursor-not-allowed animate-pulse"
            : "bg-[var(--color-frame)] text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] shadow-[2px_2px_0px_#111111]"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-white/20 px-1 py-0.5 text-[9px] font-mono tracking-tight text-white border border-white/40">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
