import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Brand buttons are the two-color identity in miniature: a blue field with mint
// type, or a mint field with blue type. Radius is the 10px control default and
// motion is quick with no bounce — press nudges 1px, it never scales.
type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  withArrow?: boolean;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-7 text-[17px]",
};

const variants: Record<Variant, string> = {
  primary: cn(
    "bg-[var(--blue)] text-[var(--mint)]",
    "shadow-[0_8px_24px_rgba(0,3,255,0.24)]",
    "hover:bg-[var(--blue-hover)]",
    "active:bg-[var(--blue-pressed)] active:translate-y-px",
  ),
  accent: cn(
    "bg-[var(--mint)] text-[var(--blue)]",
    "hover:bg-[var(--mint-hover)]",
    "active:bg-[var(--mint-pressed)] active:translate-y-px",
  ),
  secondary: cn(
    "border-[1.5px] border-white/25 text-white/90",
    "hover:border-[var(--mint)]/50 hover:bg-[var(--mint)]/10 hover:text-white",
    "active:translate-y-px",
  ),
  ghost: cn(
    "border border-current/20 text-white/85",
    "hover:bg-white/[0.06] hover:text-[var(--mint)]",
    "active:translate-y-px",
  ),
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
  as = "button",
  href,
  target,
  rel,
  ...rest
}: Props) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-[10px] font-bold tracking-[-0.01em]",
    "transition-[background-color,border-color,color,transform] duration-[180ms] ease-[cubic-bezier(0.2,0,0.1,1)]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,3,255,0.28)]",
    sizes[size],
  );

  const iconSize = size === "sm" ? 13 : size === "lg" ? 17 : 15;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight
          size={iconSize}
          strokeWidth={2}
          className="transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0,0.1,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (as === "a") {
    return (
      <a href={href} target={target} rel={rel} className={cn(base, variants[variant], className)}>
        {content}
      </a>
    );
  }
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {content}
    </button>
  );
}
