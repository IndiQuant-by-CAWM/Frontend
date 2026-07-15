import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type RevealVariant =
  | "fade"
  | "up"
  | "blur"
  | "scale"
  | "sequential";

const EASE = [0.22, 1, 0.36, 1] as const;

function buildVariants(variant: RevealVariant, y: number): Variants {
  const D = 0.7;
  switch (variant) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: D, ease: EASE } },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(8px)", y: 6 },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration: D, ease: EASE },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.99 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: D, ease: EASE },
        },
      };
    case "sequential":
      return {
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      };
    case "up":
    default:
      return {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: D, ease: EASE },
        },
      };
  }
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const variants = buildVariants(variant, y);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const showTransition =
    variants.show && typeof variants.show === "object" && "transition" in variants.show
      ? { ...(variants.show as { transition?: object }).transition, delay }
      : { delay, ease: EASE, duration: 0.8 };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        ...variants,
        show: { ...(variants.show as object), transition: showTransition },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
