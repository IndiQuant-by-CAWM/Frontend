import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { PLATFORM_SIGNIN_URL, PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { pageHead } from "@/lib/seo";
import {
  FIRST_RANKED,
  FIRST_ROUND_DATE,
  FIRST_SCORES,
  LEADERBOARD_MIN_ROUNDS,
  RANKINGS_VISIBILITY,
  SCORED_AFTER,
  TARGET_SESSIONS,
} from "@/lib/schedule";

/**
 * A status page, not a board.
 *
 * This route used to render a live leaderboard from this site's own API
 * client, which in production pointed at localhost: the pilot's API ran on a
 * laptop and the Pages workflow set no base URL, so the page spun and showed
 * nothing. The v3 platform keeps its leaderboard behind sign-in (Spec §7.2),
 * and nothing has been scored yet, so the honest thing a public page can do is
 * say when scores exist and where to see them.
 *
 * DATED. The dates come from lib/schedule.ts and follow from Core rounds
 * having begun on 21 September 2026 with a 20-session target. Update them there
 * when the first round resolves.
 */
export const Route = createFileRoute("/leaderboard")({
  head: () =>
    pageHead({
      path: "/leaderboard",
      title: "Rankings: IndiQuant",
      description: `IndiQuant's rankings are earned on realised market outcomes. Core rounds began ${FIRST_ROUND_DATE}; first scores land in ${FIRST_SCORES} and the first ranked models around ${FIRST_RANKED}.`,
    }),
  component: RankingsPage,
});

const facts = [
  { label: "First Core round", value: FIRST_ROUND_DATE },
  { label: "Cadence", value: "One round per NSE session" },
  { label: "Target", value: `${TARGET_SESSIONS}-session forward return` },
  { label: "First scores", value: `Expected ${FIRST_SCORES}` },
  { label: "First ranked models", value: `Around ${FIRST_RANKED}` },
];

function RankingsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Rankings"
        title="Earned on outcomes, not backtests."
        description={`No round has resolved yet. Each Core round is scored ${SCORED_AFTER}, on what the market actually did.`}
      />
      <Section className="pt-14 md:pt-20">
        <Container>
          <Reveal variant="blur">
            <dl className="grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2 lg:grid-cols-5">
              {facts.map((f) => (
                <div key={f.label} className="bg-[var(--ink)] px-6 py-6">
                  <dt className="font-mono text-[12px] tracking-[0.22em] text-white/60 uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-[17px] font-bold tracking-[-0.01em] text-white">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-[60ch] text-[16px] leading-[1.7] text-white/65">
              {RANKINGS_VISIBILITY} A model joins the leaderboard after {LEADERBOARD_MIN_ROUNDS}{" "}
              resolved rounds. Sprint slots are frozen until their scoring exists, so only Core
              rounds count.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                as="a"
                href={PLATFORM_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                withArrow
              >
                Become a Contributor
              </Button>
              <Button
                as="a"
                href={PLATFORM_SIGNIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Sign in
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
