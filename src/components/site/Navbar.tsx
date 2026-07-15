import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "./Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/contributors", label: "Contributors" },
  { href: "/investors", label: "Investors" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Glass intensifies smoothly from 0 → 1 over the first 240px of scroll.
  const t = Math.min(1, scrollY / 240);
  const bgAlpha = 0.35 + t * 0.45; // 0.35 → 0.80
  const blurPx = 12 + t * 16; // 12 → 28
  const borderAlpha = 0.02 + t * 0.08; // 0.02 → 0.10
  const shadowAlpha = t * 0.35;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: `rgba(5,5,5,${bgAlpha.toFixed(3)})`,
        backdropFilter: `blur(${blurPx}px) saturate(160%)`,
        borderBottom: `1px solid rgba(255,255,255,${borderAlpha.toFixed(3)})`,
        boxShadow: `0 14px 40px -30px rgba(0,0,0,${shadowAlpha.toFixed(3)})`,
      }}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-85"
        >
          <Logo />
          <span className="text-sm font-medium tracking-tight text-white">
            IndiQuant
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-white/60 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {l.label}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            as="a"
            href="/contributors"
            variant="primary"
            size="sm"
            withArrow
          >
            Become a Contributor
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-4 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-white"
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

function Logo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="11" cy="11" r="10" stroke="url(#g)" strokeWidth="1" />
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
        <linearGradient id="g" x1="0" y1="0" x2="22" y2="22">
          <stop stopColor="#6C63FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
