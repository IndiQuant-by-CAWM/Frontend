import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  withArrow?: boolean;
  as?: "button" | "a";
  href?: string;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
  as = "button",
  href,
  ...rest
}: Props) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    sizes[size],
  );
  const variants: Record<Variant, string> = {
    primary: cn(
      "bg-white text-black",
      "shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)]",
      "hover:-translate-y-[2px] hover:shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_22px_50px_-18px_rgba(108,99,255,0.35)]",
      "active:translate-y-0 active:duration-150",
    ),
    ghost: cn(
      "text-white/85 border border-white/12 bg-white/[0.015]",
      "hover:text-white hover:border-white/25 hover:bg-white/[0.04] hover:-translate-y-[2px]",
      "active:translate-y-0 active:duration-150",
    ),
  };

  const iconSize = size === "sm" ? 13 : 15;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight
          size={iconSize}
          strokeWidth={1.75}
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={cn(base, variants[variant], className)}>
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
