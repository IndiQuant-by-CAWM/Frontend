import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "block w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-all duration-300 focus:border-white/25 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/15";

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45"
      >
        <span>{label}</span>
        {hint && <span className="text-white/25 normal-case tracking-normal">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#ff8a8a]">{error}</p>}
    </div>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, "min-h-[140px] resize-y", className)} {...rest} />;
}
