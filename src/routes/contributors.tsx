import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  Brain,
  Sparkles,
  BarChart3,
  Users,
  Code2,
  Database,
  LineChart,
  Compass,
  Hammer,
  Send,
  Repeat,
  Share2,
  Sprout,
  Plus,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { PLATFORM_CONTRIBUTOR_AGREEMENT_URL, PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { pageHead } from "@/lib/seo";
import {
  CONTRIBUTOR_AGREEMENT,
  FREE_TO_JOIN,
  GRANTS_PLANNED,
  GRANTS_STATUS,
  MAX_MODELS,
  ROUND_CLOSES_IST,
  ROUND_WINDOW,
  SCORED_AFTER,
  TARGET_SESSIONS,
} from "@/lib/schedule";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Reveal } from "@/components/site/Reveal";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/contributors")({
  head: () =>
    pageHead({
      path: "/contributors",
      title: "Contributors: IndiQuant",
      description:
        "Build models on anonymised NSE data, get scored on realised returns, and earn weight in the meta-model behind IndiQuant's book. Free to join. For data scientists, ML engineers and quant researchers.",
    }),
  component: ContributorsPage,
});

function ContributorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contributors"
        title="Your model, scored on what the market does."
        description={`Submit predictions on anonymised NSE data and build a scored track record. Models with a strong record feed the meta-model behind IndiQuant's book. ${FREE_TO_JOIN}`}
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
        <Button as="a" href="/faq/" variant="secondary">
          Read the FAQ
        </Button>
      </PageHero>

      <WhyJoin />
      <WhoCanJoin />
      <JourneyHighLevel />
      <Skills />
      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}

function WhyJoin() {
  const items = [
    {
      icon: BarChart3,
      t: "Ranked on results.",
      b: "Your standing follows your models' scores. Seniority and job titles don't come into it.",
    },
    {
      icon: Sparkles,
      t: "Real market outcomes.",
      b: "Every submission is scored against realised NSE returns, round after round.",
    },
    {
      icon: Users,
      t: "Weight in the book.",
      b: "Models with a strong record carry more weight in the meta-model the fund trades. During testnet that book trades paper capital.",
    },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Why contribute</Eyebrow>
            <h2 className="mt-6 max-w-2xl display-tight text-[clamp(34px,4.2vw,56px)] text-white">
              Research that turns into a track record.
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <Card className="h-full">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--mint)]/35 text-[var(--mint)]">
                  <it.icon size={16} strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight text-white">{it.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WhoCanJoin() {
  const rows = [
    "Data scientists exploring financial markets",
    "Machine learning engineers curious about live systems",
    "Quantitative researchers from any background",
    "Software engineers who like pulling signal out of noisy data",
    "Statisticians, mathematicians, physicists",
    "Self-taught practitioners with real projects to show",
  ];
  return (
    <Section>
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal variant="blur">
              <Eyebrow>Who can join</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                We look at the work, not the CV.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.1} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                If you can model data, or want to learn how, you can take part. You don't need a
                finance background.
              </p>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2">
                {rows.map((r) => (
                  <li key={r} className="bg-background p-5 text-sm text-white/80">
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function JourneyHighLevel() {
  const steps = [
    {
      k: "01",
      icon: Compass,
      t: "Discover",
      d: "Read the rules and download the round's dataset.",
    },
    {
      k: "02",
      icon: Hammer,
      t: "Build",
      d: "Engineer features, train, iterate. Any method is fine.",
    },
    {
      k: "03",
      icon: Send,
      t: "Submit",
      d: `Send one prediction per name before ${ROUND_CLOSES_IST}.`,
    },
    {
      k: "04",
      icon: Repeat,
      t: "Improve",
      d: `Scores arrive once the ${TARGET_SESSIONS}-session outcome is known.`,
    },
    {
      k: "05",
      icon: Share2,
      t: "Contribute",
      d: "Strong models carry more weight in the meta-model.",
    },
    { k: "06", icon: Sprout, t: "Grow", d: "Your record builds under a public handle." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                Six steps, repeated every round.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">{ROUND_WINDOW}</p>
            </Reveal>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute inset-x-0 top-[34px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.09} variant="sequential">
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-[68px] w-[68px] place-items-center rounded-full border border-border bg-background transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_0_6px_rgba(255,255,255,0.03)]">
                    <s.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-white/70 transition-colors group-hover:text-white"
                    />
                  </div>
                  <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.22em] text-white/60">
                    {s.k}
                  </p>
                  <h3 className="mt-2 text-sm font-medium tracking-tight text-white">{s.t}</h3>
                  <p className="mt-2 max-w-[16ch] text-xs leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <ol className="relative border-l border-border pl-8 md:hidden">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.09} variant="sequential">
              <li className="group relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background font-mono text-[12px] text-muted-foreground">
                  {s.k}
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

function Skills() {
  const items = [
    {
      icon: Brain,
      t: "Machine learning",
      d: "Supervised, unsupervised or deep. Use whatever works.",
    },
    {
      icon: Code2,
      t: "Python",
      d: "What most contributors use: NumPy, pandas, scikit-learn, PyTorch.",
    },
    {
      icon: Database,
      t: "Feature engineering",
      d: "Turning raw features into something a model can learn from.",
    },
    { icon: LineChart, t: "Statistics", d: "Knowing when a good result is only noise." },
    {
      icon: Sparkles,
      t: "Curiosity",
      d: "It keeps you testing new ideas after the first one fades.",
    },
    {
      icon: GraduationCap,
      t: "Discipline",
      d: "A steady model outscores an erratic one over enough rounds.",
    },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Skills that help</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                What tends to matter.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                None of these are requirements. Plenty of contributors start without several of them
                and pick them up along the way.
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

function FAQ() {
  const qs = [
    {
      q: "Do I need a finance background?",
      a: "No. A background in ML, physics, engineering or research is as useful as one in finance, and the market side can be learned as you go.",
    },
    {
      q: "Is there a cost to join?",
      a: `No. There is no fee and no deposit. You bring the ideas and the compute, and we provide the data and the scoring. Each contributor can own up to ${MAX_MODELS} models.`,
    },
    {
      q: "How is my work evaluated?",
      a: `Every submission is scored on realised, out-of-sample market outcomes, ${SCORED_AFTER}. The rules are the same for everyone and are published on the platform.`,
    },
    {
      q: "Do I own my models?",
      a: (
        <>
          You retain ownership of your models. {CONTRIBUTOR_AGREEMENT} <AgreementLink />.{" "}
          {GRANTS_PLANNED} {GRANTS_STATUS}
        </>
      ),
    },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-14">
          <Reveal>
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
              A few things worth knowing.
            </h2>
          </Reveal>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion items={qs} />
          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <BookOpen size={14} strokeWidth={1.5} />
            <span>
              More questions?{" "}
              <a href="/faq/" className="text-white underline underline-offset-4">
                Read the full FAQ
              </a>
              .
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** A link to the contributor agreement, for FAQ answers that mention it. */
export function AgreementLink() {
  return (
    <a
      href={PLATFORM_CONTRIBUTOR_AGREEMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline underline-offset-4"
    >
      Read the contributor agreement
    </a>
  );
}

export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium tracking-tight text-white sm:text-lg">
                {it.q}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 ${
                  isOpen ? "rotate-45 border-white/40 bg-white/[0.04]" : "text-white/60"
                }`}
              >
                <Plus size={14} strokeWidth={1.5} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-muted-foreground">
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function FinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,3,255,0.28),transparent_65%)]" />
      </div>
      <Container>
        <Reveal variant="scale">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="display-tight text-[clamp(36px,5vw,72px)] text-white">
              Bring your models. Meet the market.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Create your account and submit to the next Core round. {ROUND_WINDOW}
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Button
                as="a"
                href={PLATFORM_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                withArrow
              >
                Become a contributor
              </Button>
              <Button as="a" href="/contact/" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
