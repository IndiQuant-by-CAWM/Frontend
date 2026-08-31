import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// Surfaces sit on the ink ground with a crisp hairline; hover shifts the border
// to mint and the fill toward brand blue. No spring, no scale — the brand is
// composed, not bouncy.
export function Card({ className, children, ...rest }: Props) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-white/[0.14] bg-card p-8 backdrop-blur-[6px]",
        "transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.2,0,0.1,1)]",
        "hover:-translate-y-1 hover:border-[var(--mint)]/55 hover:bg-[var(--blue)]/20",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
