import { createFileRoute } from "@tanstack/react-router";
import { EyeOff, Boxes, FunctionSquare, LineChart, TrendingUp, Layers } from "lucide-react";

import { PLATFORM_SIGNUP_URL, PLATFORM_URL } from "@/lib/platform";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageHead } from "@/lib/seo";
import {
  ATTEMPTS_PER_ROUND,
  FIRST_RANKED,
  FIRST_ROUND_DATE,
  FIRST_SCORES,
  FREE_TO_JOIN,
  GRANTS_PLANNED,
  GRANTS_STATUS,
  LEADERBOARD_MIN_ROUNDS,
  MAX_MODELS,
  ROUND_CLOSES_IST,
  SCORED_AFTER,
  TARGET_SESSIONS,
} from "@/lib/schedule";
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
  head: () =>
    pageHead({
      path: "/",
      title: "IndiQuant: research tournament for Indian equities",
      description:
        "Build models on anonymised NSE data and get scored on what the market does next. Free to join, no deposit, paper-traded. Rounds close 09:00 IST every NSE session.",
    }),
  component: Home,
});

const marqueeClaims = [
  "Because intuition is not a strategy",
  "Scored on realised outcomes",
  "Paper-traded, no client funds",
  "Free to join, no deposit",
];

// The five numbers a contributor needs before deciding to sign up.
const heroStats = [
  { value: "1 round", label: "every NSE session" },
  { value: ROUND_CLOSES_IST, label: "submissions close" },
  { value: `${TARGET_SESSIONS}-session`, label: "prediction target" },
  { value: `${ATTEMPTS_PER_ROUND} attempts`, label: "per round" },
  { value: `${MAX_MODELS} models`, label: "per contributor" },
];

const approachFacts = [
  { label: "Measured by", value: "Live outcomes" },
  { label: "Ignored", value: "Backtests or titles" },
  { label: "Re-scored", value: "Every round" },
];

const principles = [
  {
    title: "Diversity is the hypothesis.",
    body: "Independent approaches may find structure a single team misses; the platform measures whether they do.",
    tag: "Collective",
  },
  {
    title: "Every round is a fresh test.",
    body: "New models and new predictions are scored every NSE session, on the same rules for everyone.",
    tag: "Continuous",
  },
  {
    title: "Merit is measurable.",
    body: "Models are ranked on scored, out-of-sample results. No titles, no gatekeepers.",
    tag: "Meritocratic",
  },
];

const steps = [
  { k: "01", t: "Discover", d: "Explore the platform and the research rounds." },
  { k: "02", t: "Build", d: "Engineer features. Train models. Iterate." },
  {
    k: "03",
    t: "Submit",
    d: "Submit predictions each round for scoring on realised outcomes.",
  },
  { k: "04", t: "Improve", d: "Learn from your scores. Refine your model." },
  {
    k: "05",
    t: "Contribute",
    d: "Signals that score well are weighed into a paper-traded meta-model.",
  },
  { k: "06", t: "Grow", d: "Build a scored track record, round after round." },
];

// The columns the platform's leaderboard shows, so a visitor knows what a
// ranking will look like before one exists.
const rankingColumns = ["Rank", "Model", "t-stat", "Mean CORR ± SE", "Rounds"];

const platformSteps = [
  {
    k: "01",
    t: "Download the dataset",
    d: "Anonymised, cross-sectional market data. No tickers, no company names. Only features and a target.",
  },
  {
    k: "02",
    t: "Build your model",
    d: "Your machine, your tools, your method. Nothing about how you get there is prescribed.",
  },
  {
    k: "03",
    t: "Submit predictions",
    d: `Submit a score per name before the round locks at ${ROUND_CLOSES_IST}. Scoring runs against realised market outcomes.`,
  },
];

const stacks = [
  {
    t: "Anonymised data",
    d: "No tickers and no company names: features and a target, nothing else.",
    Icon: EyeOff,
  },
  {
    t: "Machine Learning",
    d: "Contributors bring their own methods; the platform scores the output.",
    Icon: Boxes,
  },
  {
    t: "Quantitative Research",
    d: "Every model is judged on evidence, not on its description.",
    Icon: FunctionSquare,
  },
  {
    t: "Statistics",
    d: "Scores carry a standard error, so noise is not mistaken for skill.",
    Icon: LineChart,
  },
  {
    t: "Indian Equity Markets",
    d: "NSE-listed equities, on a point-in-time universe.",
    Icon: TrendingUp,
  },
  {
    t: "Signal Aggregation",
    d: "Scored signals are combined into one paper-traded meta-model.",
    Icon: Layers,
  },
];

const investorFacts = [
  { label: "Contributors", value: "Independent researchers, open registration" },
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
        {/* Hero: in the first five seconds, what it is, who it is for, what it
          costs (nothing) and the numbers that define a round. */}
        <section className="relative z-2 pt-[140px] pb-24 sm:pt-[164px] md:pb-[110px]">
          <Container>
            <Badge>Research tournament for Indian equities</Badge>

            <h1 className="display-tight mt-8 max-w-[15ch] text-[clamp(40px,5.4vw,80px)] leading-[0.98] tracking-[-0.035em] sm:mt-10">
              Build models on anonymised NSE data. Get scored on what the market does next.
            </h1>

            <div className="mt-9 grid max-w-[1000px] items-end gap-8 md:mt-12 md:gap-14 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="max-w-[52ch] text-[17px] leading-[1.6] text-white/75 sm:text-[19px]">
                  For data scientists, ML engineers and quantitative researchers. Download the
                  round's dataset, submit a prediction per name before {ROUND_CLOSES_IST}, and build
                  a scored track record on realised returns.
                </p>
                <p className="mt-5 text-[16px] font-semibold text-[var(--mint)]">{FREE_TO_JOIN}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  withArrow
                >
                  Become a Contributor
                </Button>
                <Button as="a" href="#platform" variant="secondary" size="lg">
                  See how it works
                </Button>
              </div>
            </div>

            <dl className="mt-14 grid grid-cols-2 border-y border-white/14 sm:grid-cols-3 md:mt-20 lg:grid-cols-5">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col-reverse border-b border-white/10 px-5 py-5.5 last:border-b-0 sm:border-r sm:border-b-0 lg:first:pl-0 lg:last:border-r-0"
                >
                  <dt className="mt-1.5 font-mono text-[12px] tracking-[0.12em] text-white/65 uppercase">
                    {s.label}
                  </dt>
                  <dd className="text-[22px] font-extrabold tracking-[-0.02em] text-white">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Recognition: a thin band rather than a full Section, so it reads as
          a continuation of the hero stats strip above it. */}
        <section aria-labelledby="recognition-heading" className="relative z-2 py-8">
          <Container>
            <div className="flex flex-col gap-5 border-y border-white/14 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <div>
                <Eyebrow id="recognition-heading">Recognition</Eyebrow>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.65] text-white/70">
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
                    <span aria-hidden>/</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Approach: mint field, blue type, the signature inversion. */}
        <Section id="approach" data-ground="mint" className="bg-[var(--mint)] text-[var(--ink)]">
          <Container>
            <div className="grid items-start gap-10 md:gap-20 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--blue)] uppercase">
                  Our approach
                </p>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)] text-[var(--blue)]">
                  Only skill gets scored.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-[52ch] text-[22px] leading-[1.55] font-medium text-[var(--ink)]">
                  Every round, contributors submit predictive signals on anonymised market data. The
                  platform scores each one against what the market then did, and a meta-model weighs
                  the signals that hold up into a single paper-traded strategy.
                </p>
                <p className="mt-6.5 max-w-[52ch] text-[17px] leading-[1.7] text-[var(--ink-700)]">
                  Rankings measure out-of-sample predictive power, not backtests. Standing on the
                  board is a running record of what a researcher's signals contributed, measured on
                  realised outcomes. No capital is traded; the strategy runs on paper.
                </p>
                <dl className="mt-11 grid gap-px border border-[var(--blue)]/18 bg-[var(--blue)]/18 sm:grid-cols-3">
                  {approachFacts.map((f) => (
                    <div key={f.label} className="bg-[var(--mint)] px-5 py-5.5">
                      <dt className="font-mono text-[12px] tracking-[0.16em] text-[var(--ink)]/75 uppercase">
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
              A different kind of research platform.
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {principles.map((p) => (
                <Card key={p.title} className="p-7 sm:p-9">
                  <p className="font-mono text-[12px] tracking-[0.2em] text-[var(--mint)] uppercase">
                    {p.tag}
                  </p>
                  <h3 className="mt-8 text-[24px] leading-[1.15] font-extrabold tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-[16px] leading-[1.65] text-white/70">{p.body}</p>
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
                  From first model to a scored track record.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/70 lg:col-span-5">
                Six steps, no gatekeepers. Wherever your curiosity begins, the platform grows with
                you.
              </p>
            </div>
            <ol className="grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s) => (
                <li
                  key={s.k}
                  className="flex flex-col bg-[var(--ink)] px-6 pt-8 pb-9 transition-colors duration-200 hover:bg-[var(--blue)] sm:min-h-[220px] sm:px-8.5 sm:pt-10 sm:pb-11"
                >
                  <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--mint)]/85">
                    {s.k}
                  </p>
                  <h3 className="mt-6.5 text-[30px] font-extrabold tracking-[-0.03em]">{s.t}</h3>
                  <p className="mt-3 max-w-[26ch] text-[15px] leading-[1.65] text-white/70">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* The participant platform: this site explains it; the platform is
          where contributors actually work. */}
        <Section id="platform" className="border-t border-white/10">
          <Container>
            <div className="mb-10 grid items-end gap-8 md:mb-16 md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-6">
                <Eyebrow>The platform</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  Where the work actually happens.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/70 lg:col-span-5">
                This site explains the platform. Everything you do as a contributor happens on the
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
                  withArrow
                >
                  Become a Contributor
                </Button>
              </div>

              <ol className="grid gap-px bg-white/12 sm:grid-cols-3">
                {platformSteps.map((step) => (
                  <li key={step.k} className="bg-[rgba(8,8,26,0.9)] px-6 py-7 sm:px-8 sm:py-9">
                    <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--mint)]/85">
                      {step.k}
                    </p>
                    <h3 className="mt-5 text-[22px] font-extrabold tracking-[-0.02em]">{step.t}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-white/70">{step.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        {/* Rankings: nothing to show yet, so the section says so in one line
          and shows the columns a ranking will carry. */}
        <Section id="rankings">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-11 md:gap-10">
              <div>
                <Eyebrow>Contributor rankings</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  The board fills as rounds resolve.
                </h2>
              </div>
              <p className="font-mono text-[12px] tracking-[0.14em] text-white/70 uppercase">
                First scores expected {FIRST_SCORES}
              </p>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-white/16 bg-[rgba(8,8,26,0.72)] backdrop-blur-[8px]">
              <div
                aria-hidden
                className="hidden grid-cols-[90px_minmax(0,1fr)_120px_200px_110px] border-b border-white/14 px-7 py-4 font-mono text-[12px] tracking-[0.14em] text-white/65 uppercase md:grid"
              >
                {rankingColumns.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <div className="flex flex-col gap-6 px-6 py-8 sm:px-7 md:flex-row md:items-center md:justify-between">
                <p className="max-w-[60ch] text-[16px] leading-[1.7] text-white/75">
                  No model is ranked yet. Rounds began on {FIRST_ROUND_DATE} and each is scored{" "}
                  {SCORED_AFTER}; a model joins the board after {LEADERBOARD_MIN_ROUNDS} resolved
                  rounds, so the first ranked rows arrive around {FIRST_RANKED}.
                </p>
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  withArrow
                  className="shrink-0 self-start md:self-auto"
                >
                  Become a Contributor
                </Button>
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
                  The machinery of collective research.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/70 lg:col-span-5">
                Each layer plays a role in turning many independent ideas into one measured,
                paper-traded strategy.
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
                  <p className="text-[15px] leading-[1.65] text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Vision: blue field, mint type. */}
        <section
          id="vision"
          className="relative z-2 bg-[var(--blue)] py-28 text-[var(--mint)] md:py-[170px]"
        >
          <Container className="text-center">
            <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--mint)]/90 uppercase">
              Vision
            </p>
            <p className="display-tight mx-auto mt-8 max-w-[20ch] text-[clamp(40px,5.6vw,88px)] leading-[0.98] tracking-[-0.035em] md:mt-12">
              A research platform for Indian markets where every model is scored on the same rules.
            </p>
            <dl className="mt-12 grid gap-px border border-[var(--mint)]/25 bg-[var(--mint)]/25 text-left sm:grid-cols-3 md:mt-20">
              {investorFacts.map((f) => (
                <div key={f.label} className="bg-[var(--blue)] px-7 py-7.5">
                  <dt className="font-mono text-[12px] tracking-[0.16em] text-[var(--mint)]/90 uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-2.5 text-[18px] font-bold tracking-[-0.02em]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Join */}
        <Section id="join" data-ground="mint" className="bg-[var(--mint)] text-[var(--blue)]">
          <Container>
            <div className="grid items-end gap-10 md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-7">
                <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--ink)]/75 uppercase">
                  Join the platform
                </p>
                <h2 className="display-tight mt-7 max-w-[14ch] text-[clamp(40px,5.6vw,88px)] leading-[0.98] tracking-[-0.035em]">
                  Because intuition is not a strategy.
                </h2>
                <p className="mt-7 max-w-[52ch] text-[18px] leading-[1.65] text-[var(--ink-800)]">
                  If you have the skills, there is a seat for you. Your research, scored on realised
                  outcomes. {GRANTS_PLANNED} {GRANTS_STATUS}
                </p>
              </div>
              <div className="flex w-full flex-col items-stretch gap-3 sm:items-start lg:col-span-4">
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  withArrow
                >
                  Become a Contributor
                </Button>
                <Button
                  as="a"
                  href={`mailto:${CONTACT_EMAIL}`}
                  variant="ghost"
                  size="lg"
                  className="text-[var(--blue)] hover:bg-[var(--blue)]/10 hover:text-[var(--blue)]"
                >
                  Contact
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
