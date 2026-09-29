import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-[var(--color-canvas)] border-b border-[var(--color-frame)] p-3 font-mono">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-bold text-[var(--color-frame)] uppercase tracking-wider">
          Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-[10px] font-bold text-[var(--color-accent)] hover:underline uppercase"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'..."
        className="w-full p-2 bg-white border border-[var(--color-subtle)] font-mono text-xs text-[var(--color-frame)] outline-none resize-y placeholder:opacity-40"
      />
    </div>
  );
}
