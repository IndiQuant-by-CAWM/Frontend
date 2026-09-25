import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";

import { PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { pageHead } from "@/lib/seo";
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
        "Why IndiQuant exists: a machine-learning research platform for Indian equities where independent contributors are scored on the same rules, on realised outcomes.",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About IndiQuant"
        title="A research platform built on measurement."
        description="IndiQuant is a machine-learning research platform for Indian equities. Independent contributors build models on anonymised NSE data, and every submission is scored the same way, on what the market then did."
      >
        <Button
          as="a"
          href={PLATFORM_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          withArrow
        >
          Become a Contributor
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
              <Eyebrow>Why We Exist</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                Research shouldn't live behind closed doors.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.15} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                For decades, quantitative research has been confined to small internal teams, a
                handful of minds, working in isolation, behind institutional walls.
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                IndiQuant exists to test a different possibility: that many independent researchers,
                scored on the same rules, may find structure a single team would miss. The platform
                exists to measure whether they do.
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
      title: "Collective Intelligence",
      body: "The best signal rarely comes from the loudest voice. It comes from many independent minds, tested and combined with discipline.",
    },
    {
      icon: Microscope,
      title: "Research First",
      body: "Every decision begins with evidence. We optimise for insight over narrative, for what can be measured and repeated.",
    },
    {
      icon: Hourglass,
      title: "Long-term Thinking",
      body: "We care about research that holds up over many rounds, not a lucky week.",
    },
    {
      icon: Cpu,
      title: "Technology with Purpose",
      body: "Machine learning is a means, not a mission. We use it where it deepens research and clarifies decisions, never as decoration.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Our Philosophy</Eyebrow>
            <h2 className="mt-6 max-w-2xl display-tight text-[clamp(34px,4.2vw,56px)] text-white">
              Four convictions that shape everything we build.
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
    {
      icon: Brain,
      t: "Machine Learning",
      d: "Models look for structure inside noisy data.",
    },
    { icon: FlaskConical, t: "Research", d: "Ideas become models. Models become hypotheses." },
    { icon: Gauge, t: "Evaluation", d: "Every round is scored against realised outcomes." },
    { icon: Repeat, t: "Continuous Improvement", d: "Each round's scores inform the next model." },
    {
      icon: Network,
      t: "Collective Intelligence",
      d: "Signals from many minds converge into one.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Our Approach</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                A discipline, not a formula.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our process is deliberately simple in shape and deep in practice: a continuous loop
                where research, evaluation, and collaboration reinforce one another.
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
            A machine-learning research platform for Indian equities, where every model is scored on
            the same rules.
          </h2>
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
    { icon: Sparkles, t: "Innovation", d: "Curiosity is our raw material: everywhere, always." },
    { icon: Handshake, t: "Collaboration", d: "The best minds sharpen against one another." },
    { icon: Crosshair, t: "Precision", d: "Every detail matters when results are measured." },
    {
      icon: GraduationCap,
      t: "Continuous Learning",
      d: "The moment we stop learning, we stop leading.",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Core Principles</Eyebrow>
              <h2 className="mt-6 display-tight text-[clamp(34px,4.2vw,56px)] text-white">
                What we hold true.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Six principles guide how we build, how we research, and how we treat every
                contributor who joins us.
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
            If you think in models, patterns and probabilities, there is a seat for you here.
            Contribute your research and build a scored track record.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button
              as="a"
              href={PLATFORM_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              withArrow
            >
              Become a Contributor
            </Button>
            <Button as="a" href="/contributors/" variant="secondary">
              Read the contributor journey
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
