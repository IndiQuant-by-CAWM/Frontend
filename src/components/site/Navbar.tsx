import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { Button } from "./Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/contributors", label: "Contributors" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/investors", label: "Investors" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // A single mint hairline under the header tracks reading position.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-60 border-b border-[var(--mint)]/12 bg-[rgba(8,8,26,0.86)] backdrop-blur-[20px] backdrop-saturate-150">
      <div className="container-page flex h-[68px] items-center justify-between gap-8">
        <a
          href="/"
          className="text-[19px] font-extrabold tracking-[-0.03em] text-[var(--mint)] transition-opacity duration-200 hover:opacity-85"
        >
          IndiQuant
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/60 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            as="a"
            href={PLATFORM_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            withArrow
          >
            Become a Contributor
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-[10px] border border-white/15 text-[var(--mint)] md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <div className="h-0.5 w-full bg-[var(--mint)]/10">
        <div
          className="h-0.5 bg-[var(--mint)] shadow-[0_0_12px_rgba(200,255,199,0.8)]"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0.1, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[rgba(8,8,26,0.96)] backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-4 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-[var(--mint)]"
                >
                  {l.label}
                </a>
              ))}
              <Button as="a" href="/contributors" withArrow className="self-start">
                Become a Contributor
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
