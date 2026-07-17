import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain,
  LineChart,
  Sparkles,
  Sigma,
  TrendingUp,
  Cpu,
  Compass,
  Hammer,
  Swords,
  Repeat,
  Share2,
  Sprout,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Badge } from "@/components/site/Badge";
import { Reveal } from "@/components/site/Reveal";
import { HeroVisual } from "@/components/site/HeroVisual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IndiQuant — Crowdsourced AI Quantitative Research" },
      {
        name: "description",
        content:
          "IndiQuant is a quantitative research hedge fund powered by a global community of AI researchers. Build models. Compete. Get rewarded on live performance.",
      },
      {
        property: "og:title",
        content: "IndiQuant — Crowdsourced AI Quantitative Research",
      },
      {
        property: "og:description",
        content:
          "A hedge fund shaped by the collective intelligence of thousands. Contribute models. Earn on live performance.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <motion.div
      id="top"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen bg-background text-foreground"
    >
      {/* Global page grain — extremely subtle, adds tactile depth. */}
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
      <About />
      <Why />
      <Journey />
      <Technology />
      <Vision />
      <Proof />
      <FinalCTA />
      <Footer />
    </motion.div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-44 pb-40 sm:pt-56 sm:pb-48">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-[52%]">
          <HeroVisual />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.10),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
          className="mx-auto max-w-[62rem] text-center"
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
            <Badge>Now onboarding contributors</Badge>
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
            className="mt-10 font-display text-[2.75rem] leading-[1.04] tracking-[-0.02em] text-white text-balance sm:text-6xl md:text-[5.75rem] md:leading-[1.02]"
          >
            A Quantitative Research{" "}
            <span className="italic text-white/65">Hedge Fund</span>, powered by{" "}
            <span className="text-white">Crowdsourced AI</span>.
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
            className="mx-auto mt-10 max-w-lg text-[15px] leading-[1.7] text-white/60 sm:text-base"
          >
            Thousands of minds. One strategy. Rewarded on live performance.
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
            <Button as="a" href="#contribute" withArrow>
              Start Contributing
            </Button>
            <Button as="a" href="#about" variant="ghost">
              See how it works
            </Button>
          </motion.div>
        </motion.div>

        <Reveal delay={0.6}>
          <div className="mx-auto mt-32 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-4">
            {[
              { k: "Contributors", v: "Global" },
              { k: "Markets", v: "Indian Equities" },
              { k: "Research", v: "Continuous" },
              { k: "Rewards", v: "Performance" },
            ].map((m) => (
              <div key={m.k} className="bg-background px-6 py-7 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {m.k}
                </p>
                <p className="mt-2.5 text-sm font-medium tracking-tight text-white">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <motion.a
          href="#about"
          aria-label="Scroll to explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/40 transition-colors duration-500 hover:text-white/80 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
            Scroll
          </span>
          <span className="relative block h-9 w-[1px] overflow-hidden bg-white/10">
            <motion.span
              className="absolute inset-x-0 top-0 block h-3 bg-gradient-to-b from-white/80 to-transparent"
              animate={{ y: ["-100%", "300%"] }}
              transition={{
                duration: 2.6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </span>
        </motion.a>
      </Container>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal variant="blur">
              <Eyebrow>About</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                One fund. Thousands of minds.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.15} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                IndiQuant is a research platform where data scientists,
                engineers, and quants around the world build AI models for the
                Indian equity markets — together.
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                The strongest signals from every contributor combine into a
                single meta-strategy. Not one team. One collective.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- WHY ---------- */
function Why() {
  const items = [
    {
      k: "01",
      title: "Diversity is the alpha.",
      body: "Independent minds see patterns no single team can. That variance compounds into edge.",
    },
    {
      k: "02",
      title: "Research that never sleeps.",
      body: "New models, new signals, evaluated every round. The strategy keeps learning.",
    },
    {
      k: "03",
      title: "Merit is measurable.",
      body: "You are rewarded on live performance. Nothing else — no titles, no gatekeepers.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Why IndiQuant</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              A different kind of hedge fund.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <Card className="h-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {it.k} — Principle
                </p>
                <h3 className="mt-8 text-lg font-medium tracking-tight text-white">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {it.body}
                </p>
                <div className="mt-10 hairline opacity-60" />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {["Collective", "Continuous", "Meritocratic"][i]}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------- JOURNEY ---------- */
function Journey() {
  const steps = [
    { k: "01", icon: Compass, t: "Discover", d: "Explore the platform and the research rounds." },
    { k: "02", icon: Hammer, t: "Build", d: "Engineer features. Train models. Iterate." },
    { k: "03", icon: Swords, t: "Compete", d: "Submit predictions each round for live evaluation." },
    { k: "04", icon: Repeat, t: "Improve", d: "Learn from feedback. Refine your edge." },
    { k: "05", icon: Share2, t: "Contribute", d: "Your best signals join the collective strategy." },
    { k: "06", icon: Sprout, t: "Grow", d: "Earn on performance. Grow with the fund." },
  ];

  return (
    <Section id="journey" className="relative">
      <Container>
        <div className="mb-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Contributor Journey</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                From first model to real-world alpha.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                A transparent path — six steps, no gatekeepers. Wherever your
                curiosity begins, the fund grows with you.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Desktop connected flow */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute inset-x-0 top-[34px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.09} variant="sequential">
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-[68px] w-[68px] place-items-center rounded-full border border-border bg-background transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_0_6px_rgba(255,255,255,0.03)]">
                    <s.icon size={20} strokeWidth={1.5} className="text-white/70 transition-colors group-hover:text-white" />
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {s.k}
                  </p>
                  <h3 className="mt-2 text-sm font-medium tracking-tight text-white">
                    {s.t}
                  </h3>
                  <p className="mt-2 max-w-[16ch] text-xs leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile vertical flow */}
        <ol className="relative border-l border-border pl-8 md:hidden">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.09} variant="sequential">
              <li className="group relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background font-mono text-[10px] text-muted-foreground transition-colors group-hover:border-accent group-hover:text-white">
                  {s.k}
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

/* ---------- TECHNOLOGY ---------- */
function Technology() {
  const stacks = [
    { icon: Brain, t: "Artificial Intelligence", d: "Turns raw market data into predictive intuition." },
    { icon: Cpu, t: "Machine Learning", d: "Learns across regimes so no single view dominates." },
    { icon: Sigma, t: "Quantitative Research", d: "Grounds every model in rigorous evidence." },
    { icon: LineChart, t: "Statistics", d: "Separates real edge from noise, round after round." },
    { icon: TrendingUp, t: "Indian Equity Markets", d: "The arena — NSE and BSE, deeply understood." },
    { icon: Sparkles, t: "Signal Aggregation", d: "Weaves contributor alpha into one coherent strategy." },
  ];

  return (
    <Section id="technology">
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Technology</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                The machinery of collective intelligence.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Each layer plays a role in turning thousands of independent
                ideas into one disciplined strategy.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {stacks.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
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

/* ---------- VISION ---------- */
function Vision() {
  return (
    <Section id="vision" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 -z-10 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <Reveal variant="fade">
            <Eyebrow>Vision</Eyebrow>
          </Reveal>
          <Reveal delay={0.25} variant="fade">
            <p className="mt-14 font-display text-4xl leading-[1.08] tracking-tight text-white text-balance sm:text-6xl md:text-7xl">
              To become the{" "}
              <span className="italic text-white/60">world&apos;s largest</span>{" "}
              crowdsourced AI hedge fund.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- PROOF ---------- */
function Proof() {
  const items = [
    { k: "Contributors", v: "Global network of researchers" },
    { k: "Approach", v: "Research-driven, evidence-first" },
    { k: "Focus", v: "Serious quantitative work" },
  ];
  return (
    <Section className="py-16 sm:py-20">
      <Container>
        <Reveal variant="fade">
          <div className="mx-auto grid max-w-5xl gap-10 border-y border-border py-14 sm:grid-cols-3">
            {items.map((it) => (
              <div key={it.k} className="text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {it.k}
                </p>
                <p className="mt-3 text-sm font-medium tracking-tight text-white/90">
                  {it.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <Section id="contribute" className="pt-8 pb-28 sm:pt-12">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 sm:p-16 md:p-24">
          <div className="absolute inset-0 -z-10 opacity-60">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[color:var(--accent-2)]/10 blur-3xl" />
          </div>

          <div className="relative grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal variant="scale">
                <Eyebrow>Join the fund</Eyebrow>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-white text-balance sm:text-6xl">
                  Help shape the future of{" "}
                  <span className="italic text-white/60">quantitative finance</span>.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                  If you have the skills, the fund has a seat for you. Your
                  research. Live performance. Real rewards.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Reveal delay={0.15} variant="scale">
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <Button as="a" href="#" withArrow>
                    Start Contributing
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
