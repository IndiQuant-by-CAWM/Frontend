import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
      </span>
      {children}
    </span>
  );
}
