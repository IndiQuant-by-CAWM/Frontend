import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      id="top"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
      <Navbar />
      {children}
      <Footer />
    </motion.div>
  );
}

export function PageHero({
  eyebrow,
  title,
  italic,
  tail,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  tail?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-44 pb-28 sm:pt-56 sm:pb-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-[0.28] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.09),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="container-page relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
          className="mx-auto max-w-[64rem] text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <BadgeEyebrow>{eyebrow}</BadgeEyebrow>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mt-10 font-display text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-6xl md:text-[5rem] md:leading-[1.02]"
          >
            {title}
            {italic && (
              <>
                {" "}
                <span className="italic text-white/65">{italic}</span>
              </>
            )}
            {tail && <> {tail}</>}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mx-auto mt-10 max-w-xl text-[15px] leading-[1.7] text-white/60 sm:text-base"
          >
            {description}
          </motion.p>

          {children && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Local re-import to avoid cycle
import { Badge as BadgeEyebrow } from "./Badge";
