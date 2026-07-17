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
      className={cn("relative py-24 sm:py-32 md:py-40", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-px w-6 bg-muted-foreground/40" />
      {children}
    </div>
  );
}
