import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Microscope,
  Hourglass,
  Users,
  Brain,
  Cpu,
  Sigma,
  LineChart,
  Sparkles,
  Network,
  Compass,
} from "lucide-react";

import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Card } from "@/components/site/Card";
import { Reveal } from "@/components/site/Reveal";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investors — IndiQuant" },
      {
        name: "description",
        content:
          "The long-term research vision behind IndiQuant: collective intelligence, AI-driven quantitative research, built for Indian equity markets.",
      },
      { property: "og:title", content: "Investors — IndiQuant" },
      {
        property: "og:description",
        content:
          "Our research philosophy, technology, and long-term vision — for partners who think in decades.",
      },
      { property: "og:url", content: "/investors" },
    ],
    links: [{ rel: "canonical", href: "/investors" }],
  }),
  component: InvestorsPage,
});

function InvestorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="For Investors"
        title="Research"
        italic="compounded"
        tail="across a collective."
        description="A long-horizon approach to quantitative research — built on AI, discipline, and the intelligence of many independent minds."
      >
        <Button as="a" href="/contact" withArrow>
          Get in touch
        </Button>
      </PageHero>

      <Philosophy />
      <Technology />
      <LongTermVision />
      <WhyCollective />
      <ContactCTA />
    </PageShell>
  );
}

function Philosophy() {
  const items = [
    { icon: Microscope, t: "Evidence over narrative.", d: "Every conviction begins with a measurement, not a story." },
    { icon: Hourglass, t: "Long-horizon discipline.", d: "We optimize for durable edge — not for the next quarter." },
    { icon: Compass, t: "Repeatable process.", d: "Structure protects the research from the mood of the market." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal variant="blur">
              <Eyebrow>Research Philosophy</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                A discipline of measurement.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1} variant="blur">
              <p className="text-xl leading-relaxed text-white/85 text-balance">
                We treat quantitative research the way great labs treat
                science — with skepticism, patience, and rigor. Nothing enters
                the strategy that has not been tested against reality.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <Card className="h-full">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-border">
                  <it.icon size={16} strokeWidth={1.5} className="text-white/80" />
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight text-white">{it.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Technology() {
  const stack = [
    { icon: Brain, t: "Artificial Intelligence", d: "Reads structure inside noisy market data." },
    { icon: Cpu, t: "Machine Learning", d: "Adapts across regimes so no view dominates." },
    { icon: Sigma, t: "Quantitative Research", d: "Grounds every model in measurable evidence." },
    { icon: LineChart, t: "Statistics", d: "Distinguishes real edge from randomness." },
    { icon: Network, t: "Signal Aggregation", d: "Combines contributor alpha into one strategy." },
    { icon: Sparkles, t: "Continuous Evaluation", d: "Every round is a fresh test against reality." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>Technology</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                The machinery behind the research.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                A stack built to turn thousands of independent ideas into one
                disciplined, continuously-learning strategy.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s, i) => (
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

function LongTermVision() {
  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06),transparent_65%)]" />
      </div>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="fade">
            <Eyebrow>Long-Term Vision</Eyebrow>
          </Reveal>
          <Reveal delay={0.15} variant="blur">
            <h2 className="mt-8 font-display text-4xl leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
              Building one of the world's leading{" "}
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

function WhyCollective() {
  const items = [
    { icon: Users, k: "01", t: "Diversity of thought", d: "Independent minds cover more ground than any single team." },
    { icon: Network, k: "02", t: "Resilience", d: "A portfolio of ideas is more robust than any single view." },
    { icon: Sparkles, k: "03", t: "Compounding research", d: "Every round leaves the system a little sharper than the last." },
  ];
  return (
    <Section>
      <Container>
        <div className="mb-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Why Collective Intelligence</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                The edge in variance.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                A single research team is a single point of view. A collective,
                properly aggregated, is a broader lens on the market — more
                perspectives, more tested ideas, more chances to see clearly.
              </p>
            </Reveal>
          </div>
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
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ContactCTA() {
  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.10),transparent_65%)]" />
      </div>
      <Container>
        <Reveal variant="scale">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
              A quiet conversation is often{" "}
              <span className="italic text-white/65">the best place to begin</span>.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              For partners interested in the long horizon, we're happy to talk.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="/contact" withArrow>
                Contact us
              </Button>
              <Button as="a" href="/about" variant="ghost">
                Read the story
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
