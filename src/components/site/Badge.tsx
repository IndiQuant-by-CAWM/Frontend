import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-[var(--mint)]/25 bg-[var(--mint)]/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mint)] backdrop-blur-sm",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--mint)] opacity-40 motion-reduce:hidden" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--mint)] shadow-[0_0_10px_var(--mint)]" />
      </span>
      {children}
    </span>
  );
}
