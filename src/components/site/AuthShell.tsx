import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Badge } from "./Badge";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <motion.div
      // Opacity only: a residual filter: blur(0px) creates a containing block
      // and re-anchors every fixed child to this element.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,3,255,0.22),transparent_60%)]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <header className="container-page flex h-16 items-center justify-between pt-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100"
          >
            <span className="text-[19px] font-extrabold tracking-[-0.03em] text-[var(--mint)]">
              IndiQuant
            </span>
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-white/65 transition-colors hover:text-white"
          >
            <ArrowLeft
              size={13}
              strokeWidth={1.75}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="text-center">
              <Badge>{eyebrow}</Badge>
              <h1 className="mt-8 display-tight text-4xl leading-[1.1] text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 backdrop-blur-sm">
              {children}
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>
          </div>
        </main>

        <footer className="container-page pb-8">
          <p className="text-center font-mono text-[12px] uppercase tracking-[0.22em] text-white/55">
            © {new Date().getFullYear()} INDIQUANT INC.
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
