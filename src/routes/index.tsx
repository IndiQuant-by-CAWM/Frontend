import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Boxes, FunctionSquare, LineChart, TrendingUp, Sparkles } from "lucide-react";

import { PLATFORM_SIGNUP_URL, PLATFORM_URL } from "@/lib/platform";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Badge } from "@/components/site/Badge";
import { AwardBadge } from "@/components/site/AwardBadge";
import { GlobeScene } from "@/components/site/GlobeScene";
import { SkipLink } from "@/components/site/SkipLink";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IndiQuant — Crowdsourced AI Quantitative Research" },
      {
        name: "description",
        content:
          "IndiQuant is a quantitative research hedge fund powered by crowdsourced AI for the Indian equity markets. Thousands of independent minds. One strategy. Rewarded on live performance.",
      },
      {
        property: "og:title",
        content: "IndiQuant — Crowdsourced AI Quantitative Research",
      },
      {
        property: "og:description",
        content:
          "A quantitative research hedge fund shaped by the collective intelligence of independent minds, rewarded on live performance.",
      },
    ],
  }),
  component: Home,
});

const marqueeClaims = [
  "Because intuition is not a strategy",
  "Only skill gets paid",
  "Built to be compliant",
  "Alpha without headcount",
];

const heroStats = [
  { label: "Contributors", value: "Global" },
  { label: "Market", value: "Indian equities" },
  { label: "Research", value: "Continuous" },
  { label: "Rewards", value: "Performance" },
];

const approachFacts = [
  { label: "Measured by", value: "Live accuracy" },
  { label: "Ignored", value: "Backtests or titles" },
  { label: "Re-scored", value: "Every round" },
];

const principles = [
  {
    k: "01",
    title: "Diversity is the alpha.",
    body: "Independent minds see patterns no single team can. That variance compounds into edge.",
    tag: "Collective",
  },
  {
    k: "02",
    title: "Research that never sleeps.",
    body: "New models, new signals, evaluated every round. The strategy keeps learning.",
    tag: "Continuous",
  },
  {
    k: "03",
    title: "Merit is measurable.",
    body: "Contributors are rewarded on live performance. Nothing else. No titles, no gatekeepers.",
    tag: "Meritocratic",
  },
];

const steps = [
  { k: "01", t: "Discover", d: "Explore the platform and the research rounds." },
  { k: "02", t: "Build", d: "Engineer features. Train models. Iterate." },
  {
    k: "03",
    t: "Compete",
    d: "Submit predictions each round for live evaluation.",
  },
  { k: "04", t: "Improve", d: "Learn from feedback. Refine your edge." },
  {
    k: "05",
    t: "Contribute",
    d: "Your best signals join the collective strategy.",
  },
  { k: "06", t: "Grow", d: "Earn on performance. Grow with the fund." },
];

const emptyRows = ["01", "02", "03", "04", "05"];

const rankingFields = ["Contributor", "Score", "Δ round", "Signals"];

const platformSteps = [
  {
    k: "01",
    t: "Download the dataset",
    d: "Obfuscated, cross-sectional market data. No tickers, no company names. Only features and a target.",
  },
  {
    k: "02",
    t: "Build your model",
    d: "Your machine, your tools, your method. Nothing about how you get there is prescribed.",
  },
  {
    k: "03",
    t: "Submit predictions",
    d: "Upload a prediction per row before the round locks. Scoring runs against live market outcomes.",
  },
];

const stacks = [
  {
    t: "Artificial Intelligence",
    d: "Turns raw market data into predictive intuition.",
    Icon: BrainCircuit,
  },
  {
    t: "Machine Learning",
    d: "Learns across regimes so no single view dominates.",
    Icon: Boxes,
  },
  {
    t: "Quantitative Research",
    d: "Grounds every model in rigorous evidence.",
    Icon: FunctionSquare,
  },
  {
    t: "Statistics",
    d: "Separates real edge from noise, round after round.",
    Icon: LineChart,
  },
  {
    t: "Indian Equity Markets",
    d: "The arena: NSE and BSE, deeply understood.",
    Icon: TrendingUp,
  },
  {
    t: "Signal Aggregation",
    d: "Weaves contributor alpha into one coherent strategy.",
    Icon: Sparkles,
  },
];

const investorFacts = [
  { label: "Contributors", value: "Global network of researchers" },
  { label: "Approach", value: "Research-driven, evidence-first" },
  { label: "Focus", value: "Serious quantitative work" },
];

function Home() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SkipLink />
      <GlobeScene />
      <Navbar />
      <main id="content">
        {/* Hero */}
        <section className="relative z-2 pt-[210px] pb-[150px]">
          <Container>
            <Badge>Round 001 · Contributor onboarding open</Badge>

            <h1 className="display-tight mt-8 max-w-[14ch] sm:mt-11 text-[clamp(52px,8.6vw,132px)] leading-[0.94] tracking-[-0.035em]">
              Many models. <span className="text-[var(--mint)]">One truth.</span>
            </h1>

            <div className="mt-10 grid max-w-[1000px] items-end gap-8 md:mt-13 md:gap-16 lg:grid-cols-2">
              <p className="text-[17px] leading-[1.6] text-white/72 sm:text-[19px]">
                IndiQuant is a quantitative research hedge fund powered by crowdsourced AI for the
                Indian equity markets. Thousands of independent minds. One strategy. Rewarded on
                live performance.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="lg"
                  withArrow
                >
                  Become a Contributor
                </Button>
                <Button as="a" href="#approach" variant="secondary" size="lg">
                  See how it works
                </Button>
              </div>
            </div>

            <dl className="mt-16 grid grid-cols-2 border-y border-white/14 sm:grid-cols-4 md:mt-[110px]">
              {heroStats.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    "px-6 py-6.5 " +
                    (i === 0 ? "sm:pl-0 " : "") +
                    (i === heroStats.length - 1 ? "sm:pr-0" : "sm:border-r sm:border-white/12")
                  }
                >
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-[var(--mint)]/85 uppercase">
                    {s.label}
                  </dt>
                  <dd className="mt-2.5 text-[18px] font-bold tracking-[-0.02em]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Recognition — a thin band rather than a full Section, so it reads as
          a continuation of the hero stats strip above it, not a third stop
          before the marquee. */}
        <section aria-labelledby="recognition-heading" className="relative z-2 py-8">
          <Container>
            <div className="flex flex-col gap-5 border-y border-white/14 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <div>
                <Eyebrow id="recognition-heading">Recognition</Eyebrow>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.65] text-white/65">
                  Ranked #2 Top Company in Research by F6S, August 2026.
                </p>
              </div>
              <AwardBadge size="lg" className="self-start sm:self-auto" />
            </div>
          </Container>
        </section>

        {/* Claim marquee */}
        <div className="relative z-2 overflow-hidden border-y border-[var(--mint)]/25 bg-[var(--blue)] py-5.5">
          <div className="iq-marquee-track flex w-max [animation:iq-marquee_30s_linear_infinite]">
            {[0, 1].map((dup) => (
              <span
                key={dup}
                aria-hidden={dup === 1}
                className="flex gap-14 pr-14 font-mono text-[15px] tracking-[0.2em] whitespace-nowrap text-[var(--mint)] uppercase"
              >
                {marqueeClaims.map((c) => (
                  <span key={c} className="flex gap-14">
                    <span>{c}</span>
                    <span aria-hidden>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Approach — mint field, blue type: the signature inversion. */}
        <Section id="approach" className="bg-[var(--mint)] text-[var(--ink)]">
          <Container>
            <div className="grid items-start gap-10 md:gap-20 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--blue)] uppercase">
                  Our approach
                </p>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)] text-[var(--blue)]">
                  Only skill gets paid.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-[52ch] text-[22px] leading-[1.55] font-medium text-[var(--ink)]">
                  Every round, contributors submit predictive signals on anonymised market data. A
                  meta-model engine weighs them, scores them against live outcomes, and folds the
                  survivors into a single strategy.
                </p>
                <p className="mt-6.5 max-w-[52ch] text-[17px] leading-[1.7] text-[var(--ink-700)]">
                  Math-based rankings reward real predictive power, not lucky backtests. Standing on
                  the board is a running record of the alpha a researcher has added to the
                  collective, measured in the only currency that clears.
                </p>
                <dl className="mt-11 grid gap-px border border-[var(--blue)]/18 bg-[var(--blue)]/18 sm:grid-cols-3">
                  {approachFacts.map((f) => (
                    <div key={f.label} className="bg-[var(--mint)] px-5 py-5.5">
                      <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--ink)]/70 uppercase">
                        {f.label}
                      </dt>
                      <dd className="mt-2 text-[16px] font-bold tracking-[-0.01em] text-[var(--blue)]">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Container>
        </Section>

        {/* Principles */}
        <Section id="principles">
          <Container>
            <Eyebrow>Why IndiQuant</Eyebrow>
            <h2 className="display-tight mt-6.5 mb-[70px] max-w-[16ch] text-[clamp(38px,4.6vw,68px)]">
              A different kind of hedge fund.
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((p) => (
                <Card key={p.k} className="p-7 sm:p-9">
                  <p className="font-mono text-[42px] leading-none font-bold tracking-[-0.02em] text-[var(--mint)]/85">
                    {p.k}
                  </p>
                  <h3 className="mt-11 text-[24px] leading-[1.15] font-extrabold tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-[16px] leading-[1.65] text-white/65">{p.body}</p>
                  <p className="mt-9 border-t border-white/12 pt-4.5 font-mono text-[10px] tracking-[0.22em] text-[var(--mint)]/85 uppercase">
                    {p.tag}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Contributor journey */}
        <Section id="journey" className="border-t border-white/10">
          <Container>
            <div className="mb-12 grid items-end gap-8 md:mb-20 md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-6">
                <Eyebrow>Contributor journey</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  From first model to real-world alpha.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/65 lg:col-span-5">
                Six steps, no gatekeepers. Wherever your curiosity begins, the fund grows with you.
              </p>
            </div>
            <ol className="grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s) => (
                <li
                  key={s.k}
                  className="flex flex-col bg-[var(--ink)] px-6 pt-8 pb-9 transition-colors duration-200 sm:min-h-[220px] sm:px-8.5 sm:pt-10 sm:pb-11 hover:bg-[var(--blue)]"
                >
                  <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mint)]/75">
                    {s.k}
                  </p>
                  <h3 className="mt-6.5 text-[30px] font-extrabold tracking-[-0.03em]">{s.t}</h3>
                  <p className="mt-3 max-w-[26ch] text-[15px] leading-[1.65] text-white/62">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* The participant platform — the marketing site explains the fund; the
          platform is where contributors actually work. */}
        <Section id="platform" className="border-t border-white/10">
          <Container>
            <div className="mb-10 grid items-end gap-8 md:mb-16 md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-6">
                <Eyebrow>The platform</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  Where the work actually happens.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/65 lg:col-span-5">
                This site explains the fund. Everything you do as a contributor happens on the
                platform: data, models, submissions.
              </p>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-[var(--mint)]/25 bg-[rgba(8,8,26,0.72)] backdrop-blur-[8px]">
              <div className="flex flex-col gap-5 border-b border-white/12 px-6 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8">
                <a
                  href={PLATFORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center font-mono text-[15px] tracking-[0.06em] text-[var(--mint)] transition-opacity duration-200 hover:opacity-80 md:min-h-0"
                >
                  platform.indiquantresearch.in
                </a>
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  withArrow
                >
                  Open the platform
                </Button>
              </div>

              <ol className="grid gap-px bg-white/12 sm:grid-cols-3">
                {platformSteps.map((step) => (
                  <li key={step.k} className="bg-[rgba(8,8,26,0.9)] px-6 py-7 sm:px-8 sm:py-9">
                    <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mint)]/75">
                      {step.k}
                    </p>
                    <h3 className="mt-5 text-[22px] font-extrabold tracking-[-0.02em]">{step.t}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-white/62">{step.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        {/* Rankings — empty until the first round is scored. */}
        <Section id="rankings">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-11 md:gap-10">
              <div>
                <Eyebrow>Contributor rankings</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  The board opens with round 001.
                </h2>
              </div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase">
                Scoring not yet live
              </p>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-white/16 bg-[rgba(8,8,26,0.72)] backdrop-blur-[8px]">
              {/* A five-column table cannot survive a phone, so below md each
                rank becomes its own labelled card instead of scrolling
                sideways with two columns cut off. */}
              <div className="md:hidden">
                {emptyRows.map((rank) => (
                  <div key={rank} className="border-b border-white/[0.07] px-6 py-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] tracking-[0.22em] text-white/60 uppercase">
                        Rank
                      </span>
                      <span className="font-mono text-[16px] text-white/55">{rank}</span>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                      {rankingFields.map((field) => (
                        <div key={field} className="flex items-baseline justify-between">
                          <dt className="font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase">
                            {field}
                          </dt>
                          <dd className="font-mono text-[14px] text-white/55">—</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-[90px_minmax(0,1fr)_160px_160px_140px] border-b border-white/14 px-7 py-4 font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
                    <span>Rank</span>
                    <span>Contributor</span>
                    <span>Score</span>
                    <span>Δ round</span>
                    <span>Signals</span>
                  </div>
                  {emptyRows.map((rank) => (
                    <div
                      key={rank}
                      className="grid grid-cols-[90px_minmax(0,1fr)_160px_160px_140px] border-b border-white/[0.07] px-7 py-5 font-mono text-[14px] text-white/55"
                    >
                      <span>{rank}</span>
                      <span>—</span>
                      <span>—</span>
                      <span>—</span>
                      <span>—</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-7 pt-14 pb-15 text-center">
                <p className="text-[20px] font-bold tracking-[-0.02em] text-[var(--mint)]">
                  No rounds have been scored yet.
                </p>
                <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-white/55">
                  Rankings publish after the first scored round. Every position on this board will
                  be earned on live market performance. Nothing else.
                </p>
                <div className="mt-7">
                  <Button
                    as="a"
                    href={PLATFORM_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    withArrow
                  >
                    Register for round 001
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Technology */}
        <Section id="technology" className="border-t border-white/10">
          <Container>
            <div className="mb-12 grid items-end gap-8 md:mb-[70px] md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-6">
                <Eyebrow>Technology</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  The machinery of collective intelligence.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/65 lg:col-span-5">
                Each layer plays a role in turning thousands of independent ideas into one
                disciplined strategy.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stacks.map(({ t, d, Icon }) => (
                <div
                  key={t}
                  className="flex flex-col gap-4 rounded-[14px] border border-white/14 bg-[rgba(8,8,26,0.55)] px-7 pt-7.5 pb-8 transition-[border-color,background-color] duration-200 hover:border-[var(--mint)]/50 hover:bg-[var(--mint)]/[0.07]"
                >
                  <div className="grid h-9.5 w-9.5 place-items-center rounded-[10px] border border-[var(--mint)]/35 text-[var(--mint)]">
                    <Icon size={19} strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-[19px] font-bold tracking-[-0.02em]">{t}</h3>
                  <p className="text-[15px] leading-[1.65] text-white/60">{d}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Vision — blue field, mint type. */}
        <section
          id="investors"
          className="relative z-2 bg-[var(--blue)] py-28 text-[var(--mint)] md:py-[170px]"
        >
          <Container className="text-center">
            <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mint)]/85 uppercase">
              Vision
            </p>
            <p className="display-tight mx-auto mt-8 max-w-[18ch] md:mt-12 text-[clamp(42px,6.4vw,100px)] leading-[0.98] tracking-[-0.035em]">
              To become the world's largest crowdsourced AI hedge fund.
            </p>
            <dl className="mt-12 grid gap-px border border-[var(--mint)]/25 bg-[var(--mint)]/25 text-left sm:grid-cols-3 md:mt-20">
              {investorFacts.map((f) => (
                <div key={f.label} className="bg-[var(--blue)] px-7 py-7.5">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--mint)]/85 uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-2.5 text-[18px] font-bold tracking-[-0.02em]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Join */}
        <Section id="join" className="bg-[var(--mint)] text-[var(--blue)]">
          <Container>
            <div className="grid items-end gap-10 md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--ink)]/70 uppercase">
                  Join the fund
                </p>
                <h2 className="display-tight mt-7 max-w-[14ch] text-[clamp(40px,5.6vw,88px)] leading-[0.98] tracking-[-0.035em]">
                  Because intuition is not a strategy.
                </h2>
                <p className="mt-7 max-w-[48ch] text-[18px] leading-[1.65] text-[var(--ink-800)]">
                  If you have the skills, the fund has a seat for you. Your research. Live
                  performance. Real rewards.
                </p>
              </div>
              <div className="flex w-full flex-col items-stretch gap-3 sm:items-start lg:col-span-4">
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  withArrow
                >
                  Become a Contributor
                </Button>
                <Button
                  as="a"
                  href="mailto:indiquant@protonmail.com"
                  variant="ghost"
                  size="lg"
                  className="text-[var(--blue)] hover:bg-[var(--blue)]/10 hover:text-[var(--blue)]"
                >
                  Talk to the desk
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
