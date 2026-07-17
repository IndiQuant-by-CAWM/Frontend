import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("container-page", className)} {...rest}>
      {children}
    </div>
  );
}
