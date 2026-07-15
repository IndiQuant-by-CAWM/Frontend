import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Microscope,
  Hourglass,
  Cpu,
  Brain,
  FlaskConical,
  Gauge,
  Repeat,
  Network,
  Eye,
  Sparkles,
  Handshake,
  Crosshair,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Badge } from "@/components/site/Badge";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IndiQuant" },
      {
        name: "description",
        content:
          "Why IndiQuant exists: a collaborative, AI-powered quantitative research platform building the future of investment research through collective intelligence.",
      },
      { property: "og:title", content: "About — IndiQuant" },
      {
        property: "og:description",
        content:
          "The philosophy, purpose, and ambition behind IndiQuant — collective intelligence meets AI-driven quantitative research.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:title", content: "About — IndiQuant" },
      {
        name: "twitter:description",
        content:
          "Building the future of quantitative intelligence — through collective research and AI.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <motion.div
      id="top"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen bg-background text-foreground"
    >
      {/* Global grain — matches homepage */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      <Navbar />
      <Hero />
      <WhyExist />
      <Philosophy />
      <Approach />
      <Vision />
      <Principles />
      <FinalCTA />
      <Footer />
    </motion.div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-44 pb-32 sm:pt-56 sm:pb-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-[0.28] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.09),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <Container className="relative">
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
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Badge>About IndiQuant</Badge>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mt-10 font-display text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-6xl md:text-[5.25rem] md:leading-[1.02]"
          >
            Building the Future of{" "}
            <span className="italic text-white/65">Quantitative</span>{" "}
            Intelligence.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mx-auto mt-10 max-w-xl text-[15px] leading-[1.7] text-white/60 sm:text-base"
          >
            IndiQuant is a collaborative, AI-powered quantitative research
            platform — a place where independent contributors help shape the
            future of investment research.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Button as="a" href="/#contribute" withArrow>
              Become a Contributor
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------- WHY WE EXIST ---------- */
function WhyExist() {
  return (
    <Section>
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal variant="blur">
              <Eyebrow>Why We Exist</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                Research shouldn't live behind closed doors.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.15} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                For decades, quantitative research has been confined to small
                internal teams — a handful of minds, working in isolation,
                behind institutional walls.
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                IndiQuant exists to explore a different possibility: that
                collective intelligence, guided by AI, can unlock a broader,
                deeper, more resilient kind of research — one no single team
                could produce alone.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- PHILOSOPHY ---------- */
function Philosophy() {
  const items = [
    {
      icon: Users,
      k: "01",
      title: "Collective Intelligence",
      body: "The best signal rarely comes from the loudest voice. It comes from many independent minds, tested and combined with discipline.",
    },
    {
      icon: Microscope,
      k: "02",
      title: "Research First",
      body: "Every decision begins with evidence. We optimize for insight, not narrative — for what is measurable, repeatable, and true.",
    },
    {
      icon: Hourglass,
      k: "03",
      title: "Long-term Thinking",
      body: "Enduring edge is compounded, not chased. We build for the decade ahead, not the quarter behind.",
    },
    {
      icon: Cpu,
      k: "04",
      title: "Technology with Purpose",
      body: "AI is a means, not a mission. We use it where it deepens research and clarifies decisions — never as decoration.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Our Philosophy</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              Four convictions that shape everything we build.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-border">
                    <it.icon size={16} strokeWidth={1.5} className="text-white/80" />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {it.k}
                  </p>
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {it.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------- APPROACH ---------- */
function Approach() {
  const flow = [
    { icon: Brain, t: "Artificial Intelligence", d: "The engine that reads structure inside noise." },
    { icon: FlaskConical, t: "Research", d: "Ideas become models. Models become hypotheses." },
    { icon: Gauge, t: "Evaluation", d: "Every round is measured against live reality." },
    { icon: Repeat, t: "Continuous Improvement", d: "Feedback compounds. The strategy learns." },
    { icon: Network, t: "Collective Intelligence", d: "Signals from many minds converge into one." },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Our Approach</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                A discipline, not a formula.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our process is deliberately simple in shape and deep in
                practice — a continuous loop where research, evaluation, and
                collaboration reinforce one another.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Desktop flow */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute inset-x-0 top-[34px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-5 gap-4">
            {flow.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.09} variant="sequential">
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-[68px] w-[68px] place-items-center rounded-full border border-border bg-background transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_0_6px_rgba(255,255,255,0.03)]">
                    <s.icon size={20} strokeWidth={1.5} className="text-white/70 transition-colors group-hover:text-white" />
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-sm font-medium tracking-tight text-white">
                    {s.t}
                  </h3>
                  <p className="mt-2 max-w-[18ch] text-xs leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile vertical flow */}
        <ol className="relative border-l border-border pl-8 md:hidden">
          {flow.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.09} variant="sequential">
              <li className="group relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background font-mono text-[10px] text-muted-foreground group-hover:border-accent group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium tracking-tight text-white">
                  {s.t}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ---------- VISION ---------- */
function Vision() {
  return (
    <Section id="vision" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_65%)]" />
      </div>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade">
            <Eyebrow>Vision</Eyebrow>
          </Reveal>
          <Reveal delay={0.15} variant="blur">
            <h2 className="mt-8 font-display text-4xl leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
              Our ambition is to build one of the world's leading{" "}
              <span className="italic text-white/65">AI-powered</span>{" "}
              quantitative research ecosystems.
            </h2>
          </Reveal>
          <Reveal delay={0.3} variant="fade">
            <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-muted-foreground">
              Not a product. Not a platform. An ecosystem — where research
              compounds, contributors grow, and intelligence becomes truly
              collective.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- PRINCIPLES ---------- */
function Principles() {
  const items = [
    { icon: Eye, t: "Transparency", d: "Clear rules. Clear evaluation. No hidden gatekeepers." },
    { icon: Microscope, t: "Research", d: "Depth over volume. Evidence over opinion." },
    { icon: Sparkles, t: "Innovation", d: "Curiosity is our raw material — everywhere, always." },
    { icon: Handshake, t: "Collaboration", d: "The best minds sharpen against one another." },
    { icon: Crosshair, t: "Precision", d: "Every detail matters when compounding edge." },
    { icon: GraduationCap, t: "Continuous Learning", d: "The moment we stop learning, we stop leading." },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Core Principles</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                What we hold true.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Six principles guide how we build, how we research, and how we
                treat every contributor who joins us.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className="group relative bg-background p-8"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border">
                <s.icon size={16} strokeWidth={1.5} className="text-white/80" />
              </div>
              <h3 className="mt-6 text-base font-medium tracking-tight text-white">
                {s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <Section id="contribute" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.10),transparent_65%)]" />
      </div>
      <Container>
        <Reveal variant="scale">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
              Join the Future of{" "}
              <span className="italic text-white/65">Quantitative Research</span>.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              If you think in models, patterns, and probabilities — there is a
              seat for you here. Contribute your research. Sharpen your edge.
              Grow with a fund built by many.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="/#contribute" withArrow>
                Become a Contributor
              </Button>
              <Link
                to="/"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.015] px-6 text-sm font-medium tracking-tight text-white/85 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:border-white/25 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ArrowLeft
                  size={15}
                  strokeWidth={1.75}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5"
                />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
