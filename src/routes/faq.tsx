import { createFileRoute } from "@tanstack/react-router";

import { PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { pageHead } from "@/lib/seo";
import {
  CONTRIBUTOR_AGREEMENT,
  FIRST_RANKED,
  FIRST_ROUND_DATE,
  FIRST_SCORES,
  GRANTS_PLANNED,
  GRANTS_STATUS,
  LEADERBOARD_MIN_ROUNDS,
  MAX_MODELS,
  RANKINGS_VISIBILITY,
  ROUND_CLOSES_IST,
  ROUND_OPENS_IST,
  SCORED_AFTER,
} from "@/lib/schedule";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Accordion } from "./contributors";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      path: "/faq",
      title: "FAQ: IndiQuant",
      description:
        "What IndiQuant is, how rounds work, how submissions are scored, who can see rankings, and where the research-grant programme stands.",
    }),
  component: FAQPage,
});

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "About IndiQuant",
    items: [
      {
        q: "What is IndiQuant?",
        a: "IndiQuant is a research tournament for Indian equities. Independent contributors build predictive models on anonymised NSE data; each submission is scored on realised outcomes, and the signals that hold up are combined into one paper-traded strategy. No client capital is managed and nothing is traded live.",
      },
      {
        q: "What does crowdsourced research mean here?",
        a: "Many independent models, built by different people using different approaches, are scored on the same rules and combined into one system. The hypothesis is that independent approaches may find structure a single team misses; the platform measures whether they do.",
      },
      {
        q: "Why focus on Indian equity markets?",
        a: "The platform is built around one market: NSE-listed equities on a point-in-time universe, so every model is scored against the same data.",
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
        a: `Create an account on platform.indiquantresearch.in, verify your email, create a model under a public handle on your account page (each contributor may own up to ${MAX_MODELS}), install the SDK, and submit to the next Core round: rounds open ${ROUND_OPENS_IST} and close ${ROUND_CLOSES_IST} every NSE session.`,
      },
      {
        q: "Is there a cost to contribute?",
        a: "No. Contributing is free: no fee, no deposit, and you never put capital at risk. You bring your ideas and your own compute; the platform provides the data and the evaluation.",
      },
    ],
  },
  {
    title: "Evaluation and grants",
    items: [
      {
        q: "How is my work evaluated?",
        a: `Each Core round is scored ${SCORED_AFTER}, on realised out-of-sample outcomes. The rules are published on the platform and are the same for everyone. Core rounds began on ${FIRST_ROUND_DATE}, so the first scores land in ${FIRST_SCORES}.`,
      },
      {
        q: "Who can see the rankings?",
        a: `${RANKINGS_VISIBILITY} A model joins the leaderboard after ${LEADERBOARD_MIN_ROUNDS} resolved rounds, so the first ranked rows are expected around ${FIRST_RANKED}.`,
      },
      {
        q: "Are there research grants?",
        a: `${GRANTS_STATUS} What accrues now is standing: your scores, your rank, and the track record that comes with them. ${GRANTS_PLANNED} No grant will ever require a fee or deposit from you.`,
      },
      {
        q: "Do I retain ownership of my work?",
        a: `Yes. You own your models. ${CONTRIBUTOR_AGREEMENT}`,
      },
    ],
  },
];

function FAQPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently Asked"
        title="Questions, clearly answered."
        description="Everything worth knowing about IndiQuant, in one place."
      />

      <Section className="pt-14 md:pt-20">
        <Container>
          <div className="max-w-3xl space-y-24">
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
            <div className="max-w-3xl">
              <h2 className="display-tight text-[clamp(30px,3.6vw,44px)] text-white">
                Still curious?
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Write to us and we'll get back to you by email.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  as="a"
                  href={PLATFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  withArrow
                >
                  Become a Contributor
                </Button>
                <Button as="a" href="/contact/" variant="secondary">
                  Contact
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
