"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "fade" | "scale";
  distance?: number;
}

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
  distance = 18,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const initial =
    variant === "fade"
      ? { opacity: 0 }
      : variant === "scale"
        ? { opacity: 0, scale: 0.97 }
        : { opacity: 0, y: distance };

  const animate =
    variant === "fade"
      ? { opacity: 1 }
      : variant === "scale"
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, y: 0 };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
