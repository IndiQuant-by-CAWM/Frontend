import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { PLATFORM_SIGNIN_URL, PLATFORM_SIGNUP_URL } from "@/lib/platform";

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
 * DATED. The "late October 2026" sentence follows from Core rounds having
 * begun on 21 September 2026 with a 20-session target. Update it when the
 * first round resolves, or replace this page with a public board if one is
 * ever specified.
 */
export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Rankings — IndiQuant" },
      {
        name: "description",
        content:
          "IndiQuant's rankings are earned on realised market outcomes. Core rounds began 21 September 2026; the first scores land in late October 2026.",
      },
      { property: "og:title", content: "Rankings — IndiQuant" },
      { property: "og:url", content: "/leaderboard" },
    ],
    links: [{ rel: "canonical", href: "/leaderboard" }],
  }),
  component: RankingsPage,
});

const facts = [
  { label: "First Core round", value: "21 September 2026" },
  { label: "Cadence", value: "One round per NSE session" },
  { label: "Target", value: "20-session forward return" },
  { label: "First scores", value: "Late October 2026" },
];

function RankingsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Rankings"
        title="Earned on"
        italic="outcomes"
        tail=", not backtests."
        description="No round has resolved yet. Each Core round is scored twenty trading sessions after it opens, on what the market actually did."
      />
      <Section className="pt-0">
        <Container>
          <Reveal variant="blur">
            <dl className="grid gap-px border border-white/14 bg-white/14 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-[var(--ink)] px-6 py-6">
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-[17px] font-bold tracking-[-0.01em] text-white">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-[60ch] text-[16px] leading-[1.7] text-white/65">
              Rankings are shown to signed-in contributors on the platform once rounds resolve.
              Display names are public; email addresses and legal names never are. Sprint slots
              are frozen until their scoring exists, so only Core rounds count.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href={PLATFORM_SIGNUP_URL} target="_blank" rel="noopener noreferrer" variant="primary" withArrow>
                Register on the platform
              </Button>
              <Button as="a" href={PLATFORM_SIGNIN_URL} target="_blank" rel="noopener noreferrer" variant="ghost">
                Sign in
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
