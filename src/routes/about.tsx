import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Microscope,
  Hourglass,
  Coins,
  Database,
  Brain,
  Gauge,
  Network,
  Briefcase,
  Eye,
  ShieldCheck,
  Lock,
  Crosshair,
} from "lucide-react";

import { PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { pageHead } from "@/lib/seo";
import {
  LEADERBOARD_MIN_ROUNDS,
  ROUND_CLOSES_IST,
  ROUND_OPENS_IST,
  TARGET_SESSIONS,
} from "@/lib/schedule";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About: IndiQuant",
      description:
        "IndiQuant is building a quantitative hedge fund for Indian equities on signals from independent researchers. Why we started it, what we believe and how the pipeline works.",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About IndiQuant"
        title="A hedge fund built on measured research."
        description="IndiQuant is building a quantitative hedge fund for Indian equities. Its signals come from independent researchers working on anonymised NSE data, and every one of them is scored the same way, on what the market did next."
      >
        <Button
          as="a"
          href={PLATFORM_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          withArrow
        >
          Become a contributor
        </Button>
      </PageHero>
      <WhyExist />
      <Philosophy />
      <Approach />
      <Vision />
      <Principles />
      <FinalCTA />
    </PageShell>
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
              <Eyebrow>Why we started</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                Most quant research happens behind closed doors.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.15} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                At most funds a small internal team produces every signal the book trades. That
                limits how many ideas get tested, and the ideas tend to look alike.
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                We think a large, open pool of researchers, scored on identical rules, will find
                signals one team would miss. IndiQuant is set up to test that with real measurement
                now and real capital from the live phase.
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
      title: "Independent models",
      body: "People who work apart are less likely to share the same blind spots. We combine their signals and weight them by evidence.",
    },
    {
      icon: Microscope,
      title: "Out-of-sample or nothing",
      body: "A model counts for what it scores on data it has never seen. Backtests and credentials don't enter into it.",
    },
    {
      icon: Hourglass,
      title: "A long record",
      body: `One good week is noise. A model earns weight over many rounds, and it needs ${LEADERBOARD_MIN_ROUNDS} resolved rounds before it appears on the leaderboard.`,
    },
    {
      icon: Coins,
      title: "Costs are real",
      body: "An edge that disappears after Indian trading costs was never an edge. Costs sit inside the portfolio optimiser.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="mt-6 max-w-2xl display-tight text-[clamp(34px,4.2vw,56px)] text-white">
              Four views behind how the fund is built.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <Card className="h-full">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--mint)]/35 text-[var(--mint)]">
                  <it.icon size={16} strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight text-white">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
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
    { icon: Database, t: "Data", d: `Anonymised NSE features, published by ${ROUND_OPENS_IST}.` },
    {
      icon: Brain,
      t: "Models",
      d: `One prediction per name, submitted before ${ROUND_CLOSES_IST}.`,
    },
    {
      icon: Gauge,
      t: "Scoring",
      d: `Each submission is scored once its ${TARGET_SESSIONS}-session outcome is known.`,
    },
    { icon: Network, t: "Meta-model", d: "Signals combined, weighted by each model's record." },
    { icon: Briefcase, t: "Book", d: "A weekly, cost-aware portfolio. On paper during testnet." },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>The pipeline</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                From data to book in five stages.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                The same loop runs every NSE session. In testnet it ends in paper trades. In the
                live phase it ends in real ones.
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
                    <s.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-white/70 transition-colors group-hover:text-white"
                    />
                  </div>
                  <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.22em] text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-sm font-medium tracking-tight text-white">{s.t}</h3>
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
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background font-mono text-[12px] text-muted-foreground group-hover:border-accent group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium tracking-tight text-white">{s.t}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{s.d}</p>
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
    <Section id="vision" className="relative overflow-hidden border-y border-white/10">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow>Vision</Eyebrow>
          <h2 className="display-tight mt-8 text-[clamp(36px,5vw,72px)] text-white">
            An Indian equities fund built from the best models we can find, wherever they come from.
          </h2>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- PRINCIPLES ---------- */
function Principles() {
  const items = [
    {
      icon: Eye,
      t: "Published rules",
      d: "Contributors know how they are scored before they submit.",
    },
    {
      icon: Microscope,
      t: "Evidence",
      d: "Out-of-sample results settle arguments. Opinions don't.",
    },
    {
      icon: ShieldCheck,
      t: "Risk first",
      d: "Limits live inside the optimiser, and execution checks them again before any trade.",
    },
    {
      icon: Lock,
      t: "Separation",
      d: "Contributors see anonymised data. Stock-level signals stay inside the execution environment.",
    },
    {
      icon: Crosshair,
      t: "Reproducibility",
      d: "Every round's dataset is fingerprinted, so any score can be traced to the data behind it.",
    },
    {
      icon: Hourglass,
      t: "Patience",
      d: "We move to live capital when the testnet record supports it, and not before.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>How we work</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                Rules we hold ourselves to.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                They apply to the research platform today and will apply to the fund when it trades
                real capital.
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
              <h3 className="mt-6 text-base font-medium tracking-tight text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
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
      <Container>
        <div className="max-w-4xl">
          <h2 className="display-tight text-[clamp(36px,5vw,72px)] text-white">
            Bring a model. See how it scores.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70">
            If you build models, there's room for yours. Contributing is free, and your record grows
            with every round you submit to.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button
              as="a"
              href={PLATFORM_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              withArrow
            >
              Become a contributor
            </Button>
            <Button as="a" href="/contributors/" variant="secondary">
              How contributing works
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
