import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SkipLink } from "./SkipLink";
import { Eyebrow } from "./Section";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      id="top"
      // Opacity only. Animating a filter leaves filter: blur(0px) on the
      // element, which is not "none" and so creates a containing block -- every
      // fixed child inside it, the menu sheet and the grain overlay included,
      // was then positioned against this div instead of the viewport.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <SkipLink />
      <Navbar />
      <main id="content">{children}</main>
      <Footer />
    </motion.div>
  );
}

/**
 * The subpage hero, on the same system as the home page: left-aligned on the
 * ink ground, a mint label, an extrabold headline, and a single brand-blue
 * light source rather than the template's purple/cyan glow.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_70%_80%_at_20%_40%,black_10%,transparent_70%)]" />
        <div className="absolute -top-40 right-[-10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,3,255,0.32),transparent_62%)]" />
      </div>
      <div className="container-page relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display-tight mt-7 max-w-[20ch] text-[clamp(40px,6vw,84px)] leading-[1] tracking-[-0.035em] text-white">
          {title}
        </h1>
        <div className="mt-8 max-w-[60ch] text-[17px] leading-[1.65] text-white/72 sm:text-[19px]">
          {description}
        </div>
        {children && <div className="mt-10 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
