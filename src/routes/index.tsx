import { createFileRoute } from "@tanstack/react-router";
import { EyeOff, Boxes, FunctionSquare, LineChart, ShieldCheck, Layers } from "lucide-react";

import { PLATFORM_SIGNUP_URL, PLATFORM_URL } from "@/lib/platform";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageHead } from "@/lib/seo";
import { LIVE_CAPITAL_TIMING, PHASE_LINE } from "@/lib/fund";
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
  ROUND_HOURS_IST,
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
      title: "IndiQuant: a hedge fund in the making for Indian equities",
      description:
        "IndiQuant is building a quantitative hedge fund for Indian equities. Independent researchers model anonymised NSE data, a trust-weighted meta-model combines their signals, and the book trades paper capital during testnet.",
    }),
  component: Home,
});

const marqueeClaims = [
  "Because intuition is not a strategy",
  "Testnet phase on paper capital",
  "Live capital next",
  "Scored on realised returns",
  "One risk-managed book",
];

// What the fund is doing today, in numbers that are true today.
const heroStats = [
  { value: "Testnet", label: "paper capital, today" },
  { value: "NSE", label: "equities only" },
  { value: ROUND_HOURS_IST, label: "round window" },
  { value: `${TARGET_SESSIONS}-session`, label: "prediction target" },
  { value: "Weekly", label: "portfolio rebalance" },
];

const approachFacts = [
  { label: "Scored on", value: "Realised returns" },
  { label: "Weighted by", value: "Track record" },
  { label: "Traded as", value: "One weekly book" },
];

const principles = [
  {
    title: "Many independent models.",
    body: "One research desk tends to find the same kind of signal again and again. Many people working independently on the same data find different ones, and the meta-model uses that spread.",
    tag: "Breadth",
  },
  {
    title: "Weight is earned.",
    body: "A model's say in the book follows its scored, out-of-sample record. Backtests and job titles count for nothing.",
    tag: "Evidence",
  },
  {
    title: "One market, studied closely.",
    body: "NSE equities on a point-in-time universe, with Indian trading costs priced into the portfolio from the start.",
    tag: "India",
  },
];

const steps = [
  { k: "01", t: "Discover", d: "Read the rules and download the round's dataset." },
  { k: "02", t: "Build", d: "Engineer features, train, iterate. Any method is fine." },
  { k: "03", t: "Submit", d: `Send one prediction per name before ${ROUND_CLOSES_IST}.` },
  {
    k: "04",
    t: "Improve",
    d: `Scores come back once the ${TARGET_SESSIONS}-session outcome is known.`,
  },
  {
    k: "05",
    t: "Contribute",
    d: "Models with a strong record carry more weight in the meta-model.",
  },
  { k: "06", t: "Grow", d: "Your record builds round by round, under a public handle." },
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
    d: "Use whatever tools and methods you like, on your own machine. We only see the predictions.",
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
    d: "Contributors get features and a target. No tickers, no company names.",
    Icon: EyeOff,
  },
  {
    t: "Contributor models",
    d: `Up to ${MAX_MODELS} models each, any method, ${ATTEMPTS_PER_ROUND} submission attempts per round.`,
    Icon: Boxes,
  },
  {
    t: "Scoring",
    d: `Correlation with the realised ${TARGET_SESSIONS}-session return, reported with a standard error.`,
    Icon: FunctionSquare,
  },
  {
    t: "Meta-model",
    d: "Signals weighted by each model's scored record. Near-duplicates are discounted.",
    Icon: Layers,
  },
  {
    t: "Portfolio",
    d: "Rebalanced weekly by an optimiser that prices trading costs and holds sector, liquidity and turnover limits.",
    Icon: LineChart,
  },
  {
    t: "Execution",
    d: "Runs in a separate, locked-down environment. Testnet fills are on paper; live routing stays off until the live phase.",
    Icon: ShieldCheck,
  },
];

// The three phases, in order. Only the first has started.
const phases = [
  { label: "Now", value: "Testnet on paper capital" },
  { label: "Next", value: `Live capital, ${LIVE_CAPITAL_TIMING}` },
  { label: "Then", value: "A fund for eligible investors" },
];

function Home() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SkipLink />
      <GlobeScene />
      <Navbar />
      <main id="content">
        {/* Hero: what IndiQuant is, the phase it is in, and the two ways in. */}
        <section className="relative z-2 pt-[140px] pb-24 sm:pt-[164px] md:pb-[110px]">
          <Container>
            <Badge>{PHASE_LINE}</Badge>

            <h1 className="display-tight mt-8 max-w-[14ch] text-[clamp(52px,8.6vw,132px)] leading-[0.94] tracking-[-0.035em] sm:mt-10">
              Many models. <span className="text-[var(--mint)]">One book.</span>
            </h1>

            <div className="mt-9 grid max-w-[1000px] items-end gap-8 md:mt-12 md:gap-14 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="max-w-[52ch] text-[17px] leading-[1.6] text-white/75 sm:text-[19px]">
                  IndiQuant is a hedge fund in the making, trading Indian equities. Independent
                  researchers build models on anonymised NSE data. We score every submission against
                  what the market did, weight the models that hold up by their record, and trade the
                  combined signal as one risk-managed book.
                </p>
                <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] font-semibold text-[var(--mint)]">
                  Testnet is running now: the whole pipeline, every session, on paper capital. Live
                  capital follows {LIVE_CAPITAL_TIMING}.
                </p>
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
                  Become a contributor
                </Button>
                <Button as="a" href="/investors/" variant="secondary" size="lg">
                  For investors
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
                  How the fund works
                </p>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)] text-[var(--blue)]">
                  Only skill gets scored.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-[52ch] text-[22px] leading-[1.55] font-medium text-[var(--ink)]">
                  Every NSE session, contributors send a prediction for each name in the round. Once
                  the {TARGET_SESSIONS}-session outcome is in, each submission gets a score. The
                  meta-model weights contributors by those scores, and the portfolio layer turns the
                  result into a weekly, cost-aware book.
                </p>
                <p className="mt-6.5 max-w-[52ch] text-[17px] leading-[1.7] text-[var(--ink-700)]">
                  Backtests don't count here. A model's rank and its weight both come from
                  out-of-sample results. During testnet the book trades paper capital, so every
                  stage can be checked end to end before real money goes in.
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
            <Eyebrow>The thesis</Eyebrow>
            <h2 className="display-tight mt-6.5 mb-[70px] max-w-[16ch] text-[clamp(38px,4.6vw,68px)]">
              Why build a fund this way.
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

        {/* For contributors */}
        <Section id="contribute" className="border-t border-white/10">
          <Container>
            <div className="mb-12 grid items-end gap-8 md:mb-20 md:gap-20 lg:grid-cols-11">
              <div className="lg:col-span-6">
                <Eyebrow>For contributors</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  From first model to a scored track record.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/70 lg:col-span-5">
                {FREE_TO_JOIN} You bring the model and the compute. We supply the data, the scoring
                and a place in the meta-model if your record earns it.
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
                  Where contributors work.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/70 lg:col-span-5">
                This site describes IndiQuant. Datasets, models and submissions all live on the
                platform.
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
                  Become a contributor
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
                  Become a contributor
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
                <Eyebrow>The stack</Eyebrow>
                <h2 className="display-tight mt-6.5 text-[clamp(38px,4.6vw,68px)]">
                  From anonymised data to a risk-managed book.
                </h2>
              </div>
              <p className="text-[17px] leading-[1.7] text-white/70 lg:col-span-5">
                Six stages, with a signed hand-off between each. In testnet all of them run for
                real, and the last one fills on paper.
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
              An Indian equities fund built from the best models we can find, wherever they come
              from.
            </p>
            <dl className="mt-12 grid gap-px border border-[var(--mint)]/25 bg-[var(--mint)]/25 text-left sm:grid-cols-3 md:mt-20">
              {phases.map((f) => (
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
                  If you can build a model that scores, there's room for it in the book. Investors
                  and partners who want to follow the testnet can write to us.
                </p>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--ink-700)]">
                  {GRANTS_PLANNED} {GRANTS_STATUS}
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
                  Become a contributor
                </Button>
                <Button
                  as="a"
                  href={`mailto:${CONTACT_EMAIL}`}
                  variant="ghost"
                  size="lg"
                  className="text-[var(--blue)] hover:bg-[var(--blue)]/10 hover:text-[var(--blue)]"
                >
                  Talk to us
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
