import { createFileRoute } from "@tanstack/react-router";

import { PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Accordion } from "./contributors";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — IndiQuant" },
      {
        name: "description",
        content:
          "Answers to the most common questions about IndiQuant, crowdsourced AI research, and how contributors get started.",
      },
      { property: "og:title", content: "FAQ — IndiQuant" },
      {
        property: "og:description",
        content: "A quick guide to what IndiQuant is and how to take part.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "About IndiQuant",
    items: [
      {
        q: "What is IndiQuant?",
        a: "IndiQuant is a crowdsourced quantitative research platform for Indian equities. Independent contributors build predictive models on obfuscated NSE data; each submission is scored on realised outcomes, and the signals that hold up are combined into one paper-traded strategy. No client capital is managed and nothing is traded live today.",
      },
      {
        q: "What is crowdsourced AI?",
        a: "It is the practice of aggregating many independent AI models, built by different people using different approaches, into one collective system. The variance across contributors becomes a source of edge.",
      },
      {
        q: "Why focus on Indian equity markets?",
        a: "Indian markets are deep, dynamic, and rich in structure. They reward original research and remain underexplored by global quantitative work.",
      },
    ],
  },
  {
    title: "For Contributors",
    items: [
      {
        q: "Who can become a contributor?",
        a: "Anyone with the curiosity and discipline to model markets. Data scientists, engineers, statisticians, physicists, self-taught practitioners. Background matters far less than the quality of the work.",
      },
      {
        q: "What skills are useful?",
        a: "Python, machine learning, statistics, and a taste for feature engineering. Domain knowledge of markets helps, but it can be learned as you go.",
      },
      {
        q: "How do I get started?",
        a: "Create an account on platform.indiquantresearch.in, verify your email, create a model under a public handle on your account page, install the SDK, and submit to the next Core round: published 06:30 IST every NSE session, closing 09:00 IST.",
      },
      {
        q: "Is there a cost to contribute?",
        a: "No. Contributing is free and you never put capital at risk. You bring your ideas and your own compute; the platform provides the data and the evaluation.",
      },
    ],
  },
  {
    title: "Evaluation & Rewards",
    items: [
      {
        q: "How is my work evaluated?",
        a: "Each Core round is scored 20 trading sessions after it opens, on realised out-of-sample outcomes. The rules are published on the platform and are the same for everyone. Core rounds began on 21 September 2026, so the first scores land in late October 2026.",
      },
      {
        q: "How are contributors rewarded?",
        a: "No grant has been paid yet. What accrues now is standing: your scores, your rank, and the track record that comes with them. A company-funded research-grant programme for demonstrated skill is planned and is with counsel for review; when it runs, grants are discretionary, periodic, India-resident only in the first phase, and never require a fee or deposit from you.",
      },
      {
        q: "Do I retain ownership of my work?",
        a: "Yes. You own your models. Under the contributor agreement with IndiQuant Inc. you license the submitted signal, not the model behind it.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently Asked"
        title="Questions,"
        italic="clearly"
        tail="answered."
        description="Everything worth knowing about IndiQuant, in one place."
      />

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl space-y-24">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <div>
                  <Eyebrow>{g.title}</Eyebrow>
                  <div className="mt-8">
                    <Accordion items={g.items} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal variant="scale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
                Still curious?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                We're happy to talk. Write to us and we'll get back to you.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button as="a" href="/contact" withArrow>
                  Contact us
                </Button>
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                >
                  Create an account
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
