import { createFileRoute } from "@tanstack/react-router";

import type { ReactNode } from "react";

import { CONTACT_EMAIL, GRIEVANCE_OFFICER } from "@/lib/contact";
import { PLATFORM_GRIEVANCE_URL, PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { LIVE_CAPITAL_TIMING } from "@/lib/fund";
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
import { Accordion, AgreementLink } from "./contributors";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      path: "/faq",
      title: "FAQ: IndiQuant",
      description:
        "How IndiQuant works: the fund and its testnet phase, rounds, scoring, rankings, and where the research-grant programme stands.",
    }),
  component: FAQPage,
});

const groups: { title: string; items: { q: string; a: ReactNode }[] }[] = [
  {
    title: "About IndiQuant",
    items: [
      {
        q: "What is IndiQuant?",
        a: "IndiQuant is a quantitative hedge fund in the making, focused on Indian equities. Independent contributors build models on anonymised NSE data. Each submission is scored on realised returns, and a trust-weighted meta-model combines the signals that hold up into one risk-managed book.",
      },
      {
        q: "What is the testnet phase?",
        a: `The whole pipeline (data, rounds, contributor models, the meta-model, the portfolio and execution) runs end to end every session, but on paper capital. It lets us find and fix problems before real money is involved. We expect to move to live capital ${LIVE_CAPITAL_TIMING}.`,
      },
      {
        q: "What does crowdsourced mean here?",
        a: "Many independent models, built by different people in different ways, scored on the same rules and combined into one book. Our view is that independent approaches find signals a single team misses. The scores show whether they do.",
      },
      {
        q: "Why Indian equities?",
        a: "We would rather model one market closely than several loosely. The platform covers NSE-listed equities on a point-in-time universe, and Indian trading costs are built into the portfolio optimiser.",
      },
      {
        q: "Can I invest in IndiQuant?",
        a: "Not yet. Nothing is on offer today. Any future fund will be offered only to eligible investors, as permitted by applicable regulation. If you would like to talk about it, see the Investors page or write to us.",
      },
    ],
  },
  {
    title: "For contributors",
    items: [
      {
        q: "Who can become a contributor?",
        a: "Anyone who can model data carefully. Data scientists, engineers, statisticians, physicists and self-taught practitioners are all welcome. The quality of the work matters far more than your background.",
      },
      {
        q: "What skills are useful?",
        a: "Python, machine learning, statistics and some feel for feature engineering. Knowing how markets work helps, but you can learn that as you go.",
      },
      {
        q: "How do I get started?",
        a: `Create an account on platform.indiquantresearch.in, verify your email, create a model under a public handle on your account page (each contributor may own up to ${MAX_MODELS}), install the SDK, and submit to the next Core round: rounds open ${ROUND_OPENS_IST} and close ${ROUND_CLOSES_IST} every NSE session.`,
      },
      {
        q: "Is there a cost to contribute?",
        a: "No. There is no fee and no deposit, and you never put your own money at risk. You bring the ideas and the compute; we provide the data and the scoring.",
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
        a: (
          <>
            Yes. You own your models. {CONTRIBUTOR_AGREEMENT} <AgreementLink />.
          </>
        ),
      },
    ],
  },
  {
    title: "Complaints and contact",
    items: [
      {
        q: "How do I raise a complaint?",
        a: (
          <>
            Write to our Grievance Officer, {GRIEVANCE_OFFICER.name} ({GRIEVANCE_OFFICER.role}), at{" "}
            <a
              href={`mailto:${GRIEVANCE_OFFICER.email}`}
              className="break-all text-white underline underline-offset-4"
            >
              {GRIEVANCE_OFFICER.email}
            </a>
            . Tell us what happened and which account it concerns. The{" "}
            <a
              href={PLATFORM_GRIEVANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              grievance procedure
            </a>{" "}
            on the platform explains how complaints are handled. For anything else, write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all text-white underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </>
        ),
      },
    ],
  },
];

function FAQPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        description="About the fund, the testnet, rounds, scoring and grants."
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
                Ask us directly.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Write to us and we'll reply by email.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
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
    </PageShell>
  );
}
