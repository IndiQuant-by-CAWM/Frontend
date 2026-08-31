import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
  ...rest
}: HTMLAttributes<HTMLElement> & { children: ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className={cn("relative z-2 py-20 sm:py-28 md:py-[150px]", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

// ALL-CAPS mono eyebrow — the brand's standard section label.
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.22em] text-[var(--mint)] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
