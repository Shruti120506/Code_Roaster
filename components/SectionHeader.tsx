import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b border-[var(--color-frame)] pb-1.5 mb-3 font-mono">
      <div className="font-bold text-xs sm:text-sm tracking-widest text-[var(--color-frame)] uppercase">
        {formattedNumber} // {title}
      </div>
      {children && <div className="text-xs">{children}</div>}
    </div>
  );
}
