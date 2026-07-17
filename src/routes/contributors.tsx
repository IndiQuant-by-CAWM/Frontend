import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Brain,
  Sparkles,
  Trophy,
  Users,
  Code2,
  Database,
  LineChart,
  Compass,
  Hammer,
  Swords,
  Repeat,
  Share2,
  Sprout,
  Plus,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Reveal } from "@/components/site/Reveal";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/contributors")({
  head: () => ({
    meta: [
      { title: "Contributors — IndiQuant" },
      {
        name: "description",
        content:
          "Build models. Compete. Get rewarded on live performance. Join IndiQuant as an independent researcher or AI practitioner.",
      },
      { property: "og:title", content: "Contributors — IndiQuant" },
      {
        property: "og:description",
        content:
          "For researchers, data scientists, and AI practitioners who want to shape a collectively-built hedge fund.",
      },
      { property: "og:url", content: "/contributors" },
    ],
    links: [{ rel: "canonical", href: "/contributors" }],
  }),
  component: ContributorsPage,
});

function ContributorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contributors"
        title="Research that pays"
        italic="on merit"
        tail="alone."
        description="Contribute models to a live quantitative strategy. No titles, no gatekeepers — only measurable edge."
      >
        <Button as="a" href="/sign-up" withArrow>
          Create your account
        </Button>
        <Button as="a" href="/faq" variant="ghost">
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
    { icon: Trophy, k: "01", t: "Rewarded on performance.", b: "Your compensation follows the live outcome of your models — not politics, not seniority." },
    { icon: Sparkles, k: "02", t: "Work on real markets.", b: "Every submission is evaluated against live Indian equity data, round after round." },
    { icon: Users, k: "03", t: "Join a research collective.", b: "Independent contributors, one shared strategy. Sharpen your edge against the best." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Why Become a Contributor</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              A place where research becomes capital.
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-border">
                    <it.icon size={16} strokeWidth={1.5} className="text-white/80" />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{it.k}</p>
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
    "Software engineers who love clean signal from noisy data",
    "Statisticians, mathematicians, physicists",
    "Self-taught practitioners with real projects to show",
  ];
  return (
    <Section>
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal variant="blur">
              <Eyebrow>Who Can Join</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                Talent has no résumé.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.1} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                We care about the work, not the pedigree. If you can model
                markets — or want to learn — you belong here.
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
    { k: "01", icon: Compass, t: "Discover", d: "Explore the platform and its research rounds." },
    { k: "02", icon: Hammer, t: "Build", d: "Engineer features. Train models. Iterate." },
    { k: "03", icon: Swords, t: "Compete", d: "Submit each round for live evaluation." },
    { k: "04", icon: Repeat, t: "Improve", d: "Learn from feedback. Refine your edge." },
    { k: "05", icon: Share2, t: "Contribute", d: "Your best signals join the collective." },
    { k: "06", icon: Sprout, t: "Grow", d: "Earn on performance. Grow with the fund." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Contribution Journey</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                A transparent path, end to end.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Six steps in a continuous loop. The details evolve — the shape
                stays clear.
              </p>
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
                    <s.icon size={20} strokeWidth={1.5} className="text-white/70 transition-colors group-hover:text-white" />
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{s.k}</p>
                  <h3 className="mt-2 text-sm font-medium tracking-tight text-white">{s.t}</h3>
                  <p className="mt-2 max-w-[16ch] text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <ol className="relative border-l border-border pl-8 md:hidden">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.09} variant="sequential">
              <li className="group relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background font-mono text-[10px] text-muted-foreground">
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
    { icon: Brain, t: "Machine Learning", d: "Supervised, unsupervised, deep — the toolbox is open." },
    { icon: Code2, t: "Python", d: "Our lingua franca. NumPy, pandas, PyTorch, scikit-learn." },
    { icon: Database, t: "Feature Engineering", d: "The craft of turning raw signals into intuition." },
    { icon: LineChart, t: "Statistics", d: "Reasoning under uncertainty is the job." },
    { icon: Sparkles, t: "Curiosity", d: "The one skill that keeps the others sharp." },
    { icon: GraduationCap, t: "Discipline", d: "Consistency beats brilliance across enough rounds." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Skills That Help</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                What tends to compound.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                None of these are strict requirements. Many of the best
                contributors arrive missing several — and grow into them.
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
    { q: "Do I need a finance background?", a: "No. Many contributors come from ML, physics, engineering, or research — not finance. The platform teaches the domain as you go." },
    { q: "Is there a cost to join?", a: "Contributing to IndiQuant is free. You bring your ideas and your compute; we provide the arena." },
    { q: "How is my work evaluated?", a: "Every model is scored on live, out-of-sample market performance. The rules are the same for everyone." },
    { q: "Do I own my models?", a: "You retain ownership of your work. When your signals contribute to the collective strategy, you're rewarded for that contribution." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-14">
          <Reveal>
            <Eyebrow>Frequently Asked</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
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
              <a href="/faq" className="text-white underline-offset-4 hover:underline">
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

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none"
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
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.10),transparent_65%)]" />
      </div>
      <Container>
        <Reveal variant="scale">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
              Bring your models.{" "}
              <span className="italic text-white/65">Meet the market.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Create your account and start with the next research round.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="/sign-up" withArrow>
                Create your account
              </Button>
              <Button as="a" href="/contact" variant="ghost">
                Talk to us
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
