import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { useAuth } from "@/lib/useAuth";

// Lightweight shell for the authenticated tournament area. Mirrors the site's
// dark aesthetic (grain + ambient light) but carries app navigation and the
// signed-in identity / sign-out control instead of the marketing navbar.
export function AppShell({ children }: { children: ReactNode }) {
  const { authenticated, claims, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      id="top"
      // Opacity only: a residual filter: blur(0px) creates a containing block
      // and re-anchors every fixed child to this element.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen bg-background text-foreground"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100"
            >
              <Logo />
              <span className="text-sm font-medium tracking-tight text-white">IndiQuant</span>
            </Link>
            <nav aria-label="Tournament" className="hidden items-center gap-6 md:flex">
              <Link
                to="/tournaments"
                className="text-sm text-white/60 transition-colors hover:text-white [&.active]:text-white"
              >
                Tournaments
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {authenticated && claims?.email && (
              <span className="hidden font-mono text-[11px] text-white/45 sm:inline">
                {String(claims.email)}
                {claims.role ? ` · ${String(claims.role).toLowerCase()}` : ""}
              </span>
            )}
            {authenticated ? (
              <button
                onClick={() => {
                  signOut();
                  navigate({ to: "/sign-in" });
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                <LogOut size={13} strokeWidth={1.75} />
                Sign out
              </button>
            ) : (
              <Link
                to="/sign-in"
                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.02] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>
    </motion.div>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" stroke="url(#g3)" strokeWidth="1" />
      <circle cx="11" cy="11" r="2" fill="#fff" />
      <circle cx="11" cy="3" r="1" fill="#6C63FF" />
      <circle cx="19" cy="11" r="1" fill="#00D4FF" />
      <circle cx="11" cy="19" r="1" fill="#6C63FF" />
      <circle cx="3" cy="11" r="1" fill="#00D4FF" />
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="22" y2="22">
          <stop stopColor="#6C63FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Small status pill for a tournament's lifecycle state.
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ANNOUNCED: "border-white/15 bg-white/[0.04] text-white/60",
    SUBMISSION_OPEN: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    LOCKED: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    SCORED: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    COMPLETE: "border-white/15 bg-white/[0.04] text-white/45",
  };
  const cls = map[status] ?? "border-white/15 bg-white/[0.04] text-white/60";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${cls}`}
    >
      {status.replace(/_/g, " ").toLowerCase()}
    </span>
  );
}
