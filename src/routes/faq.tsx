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
        a: "IndiQuant is a quantitative research initiative powered by crowdsourced AI. Independent contributors build predictive models; the strongest signals combine into a single, continuously-learning strategy focused on Indian equity markets.",
      },
      {
        q: "What is crowdsourced AI?",
        a: "It is the practice of aggregating many independent AI models — built by different people, using different approaches — into one collective system. The variance across contributors becomes a source of edge.",
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
        a: "Anyone with the curiosity and discipline to model markets. Data scientists, engineers, statisticians, physicists, self-taught practitioners — background matters far less than the quality of the work.",
      },
      {
        q: "What skills are useful?",
        a: "Python, machine learning, statistics, and a taste for feature engineering. Domain knowledge of markets helps, but it can be learned as you go.",
      },
      {
        q: "How do I get started?",
        a: "Create an account, explore the platform, and take part in the next research round. You can start small — even a first submission teaches you something the platform can measure.",
      },
      {
        q: "Is there a cost to contribute?",
        a: "No. Contributing is free and there is nothing to stake. You bring your ideas and your own compute; the platform provides the data, the arena and the evaluation.",
      },
    ],
  },
  {
    title: "Evaluation & Rewards",
    items: [
      {
        q: "How is my work evaluated?",
        a: "Models are scored on live, out-of-sample market performance. The rules are transparent and the same for everyone.",
      },
      {
        q: "How are contributors rewarded?",
        a: "Round 001 carries no cash reward. What accrues now is standing: your scores, your rank on the public board, and the track record that comes with them. Paid rounds follow once scoring and payouts are running — and when they do, reward will track measurable contribution to the collective strategy, judged on live results and nothing else.",
      },
      {
        q: "Do I retain ownership of my work?",
        a: "Yes. You own your models — contributing a signal does not hand us the model behind it. Once paid rounds begin, contribution to the collective strategy is what compensation is based on.",
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
