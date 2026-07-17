import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Badge } from "./Badge";

export function AuthShell({
  eyebrow,
  title,
  italic,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
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
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <header className="container-page flex h-16 items-center justify-between pt-6">
          <Link to="/" className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100">
            <Logo />
            <span className="text-sm font-medium tracking-tight text-white">IndiQuant</span>
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={13} strokeWidth={1.75} className="transition-transform group-hover:-translate-x-0.5" />
            Home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="text-center">
              <Badge>{eyebrow}</Badge>
              <h1 className="mt-8 font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl">
                {title}
                {italic && (
                  <>
                    {" "}
                    <span className="italic text-white/65">{italic}</span>
                  </>
                )}
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
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
            © {new Date().getFullYear()} IndiQuant
          </p>
        </footer>
      </div>
    </motion.div>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" stroke="url(#g2)" strokeWidth="1" />
      <circle cx="11" cy="11" r="2" fill="#fff" />
      <circle cx="11" cy="3" r="1" fill="#6C63FF" />
      <circle cx="19" cy="11" r="1" fill="#00D4FF" />
      <circle cx="11" cy="19" r="1" fill="#6C63FF" />
      <circle cx="3" cy="11" r="1" fill="#00D4FF" />
      <line x1="11" y1="11" x2="11" y2="3" stroke="rgba(255,255,255,0.3)" />
      <line x1="11" y1="11" x2="19" y2="11" stroke="rgba(255,255,255,0.3)" />
      <line x1="11" y1="11" x2="11" y2="19" stroke="rgba(255,255,255,0.3)" />
      <line x1="11" y1="11" x2="3" y2="11" stroke="rgba(255,255,255,0.3)" />
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="22" y2="22">
          <stop stopColor="#6C63FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
