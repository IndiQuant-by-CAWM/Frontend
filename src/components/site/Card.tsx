import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"> {
  children: ReactNode;
}

export function Card({ className, children, ...rest }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-8 backdrop-blur-sm",
        "transition-[border-color,box-shadow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-white/15 hover:bg-white/[0.02]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-700 hover:before:opacity-100",
        "after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:opacity-0 after:transition-opacity after:duration-700 hover:after:opacity-100",
        "shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_20px_60px_-40px_rgba(0,0,0,0.8)]",
        "hover:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_80px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.02)]",
        className,
      )}
      {...(rest as object)}
    >
      {children}
    </motion.div>
  );
}
