import { createFileRoute } from "@tanstack/react-router";

import { CONTACT_EMAIL } from "@/lib/contact";
import { HQ, INDIA_OFFICE } from "@/lib/entities";
import { PLATFORM_TERMS_URL } from "@/lib/platform";
import { pageHead } from "@/lib/seo";
import {
  CONTRIBUTOR_AGREEMENT,
  FIRST_ROUND_DATE,
  FIRST_SCORES,
  GRANTS_PLANNED,
  GRANTS_STATUS,
  ROUND_WINDOW,
} from "@/lib/schedule";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { PageShell, PageHero } from "@/components/site/PageShell";

/**
 * A factual diligence page, not a pitch.
 *
 * The route and its nav label stay "Investors" for now (renaming it is a later
 * decision), but nothing here invites investment: IndiQuant runs no fund and
 * takes no client money. Every fact on this page comes from a shared constant
 * (lib/schedule.ts, lib/entities.ts, lib/contact.ts) so it cannot drift from
 * the rest of the site. There is deliberately no team section: no names are
 * recorded anywhere in this codebase, and inventing them is not an option.
 */
export const Route = createFileRoute("/investors")({
  head: () =>
    pageHead({
      path: "/investors",
      title: "Investors and partners: IndiQuant",
      description:
        "What IndiQuant is, its current status, entity structure and regulatory posture. IndiQuant does not offer, manage or solicit investment in any fund, scheme or security.",
    }),
  component: InvestorsPage,
});

const DISCLAIMER =
  "IndiQuant does not offer, manage or solicit investment in any fund, scheme or security. Nothing on this site is an offer or investment advice.";

const status = [
  { label: "Platform", value: `Live since ${FIRST_ROUND_DATE}` },
  { label: "Trading", value: "Paper only. No capital is traded." },
  { label: "Rounds", value: ROUND_WINDOW },
  { label: "First scores", value: `Expected ${FIRST_SCORES}` },
  { label: "Research grants", value: `${GRANTS_STATUS} ${GRANTS_PLANNED}` },
  { label: "Contributor agreement", value: CONTRIBUTOR_AGREEMENT },
];

const posture = [
  "No client funds are accepted, held or managed. Contributors never pay a fee or deposit.",
  "Nothing IndiQuant publishes is investment advice or a recommendation to buy, sell or hold any security.",
  "IndiQuant does not claim any SEBI registration, and nothing it publishes should be read as if it held one.",
  "Contributors work on anonymised data: no tickers and no company names reach the platform's participants.",
];

const MATERIALS_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Request for materials")}`;

function InvestorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Investors and partners"
        title="What IndiQuant is, and what it is not."
        description={
          <>
            <p
              role="note"
              className="rounded-[14px] border border-[var(--mint)]/40 bg-[var(--mint)]/[0.06] px-5 py-4 text-[16px] leading-[1.6] font-semibold text-white sm:text-[17px]"
            >
              {DISCLAIMER}
            </p>
            <p className="mt-6">
              A plain account of the company, the platform's status and its regulatory posture, for
              anyone doing diligence.
            </p>
          </>
        }
      >
        <Button as="a" href={MATERIALS_MAILTO} withArrow>
          Request materials
        </Button>
      </PageHero>

      <Section className="border-t border-white/10">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>What it is</Eyebrow>
              <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
                A research tournament for Indian equities.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-white/75 md:col-span-7 md:col-start-6">
              <p>
                Independent contributors download anonymised, cross-sectional NSE data, build their
                own models, and submit a prediction per name each round. The platform scores every
                submission against realised market outcomes, on the same published rules for
                everyone.
              </p>
              <p>
                Signals that hold up are combined by a meta-model into a single strategy that runs
                on paper. No capital is traded, and contributors never put money at risk.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/10">
        <Container>
          <Eyebrow>Status</Eyebrow>
          <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
            Where things stand.
          </h2>
          <dl className="mt-12 grid gap-px border border-white/14 bg-white/14 md:grid-cols-2">
            {status.map((s) => (
              <div key={s.label} className="bg-[var(--ink)] px-6 py-6 sm:px-8">
                <dt className="font-mono text-[12px] tracking-[0.16em] text-[var(--mint)] uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2.5 max-w-[56ch] text-[16px] leading-[1.6] text-white/85">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[15px] leading-[1.7] text-white/70">
            Participation is governed by the{" "}
            <a
              href={PLATFORM_TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              Terms of Use
            </a>{" "}
            on the platform.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-white/10">
        <Container>
          <Eyebrow>Entity structure</Eyebrow>
          <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
            One company, two locations.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <address className="rounded-[14px] border border-white/14 px-6 py-7 text-[16px] leading-[1.7] text-white/75 not-italic sm:px-8">
              <span className="block font-mono text-[12px] tracking-[0.16em] text-[var(--mint)] uppercase">
                Parent company · {HQ.role}
              </span>
              <span className="mt-3 block text-[20px] font-bold text-white">{HQ.name}</span>
              {HQ.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-4 block text-white/70">
                {HQ.dealsWith}. The platform terms are {HQ.name}'s.
              </span>
            </address>
            <address className="rounded-[14px] border border-white/14 px-6 py-7 text-[16px] leading-[1.7] text-white/75 not-italic sm:px-8">
              <span className="block font-mono text-[12px] tracking-[0.16em] text-[var(--mint)] uppercase">
                Indian subsidiary · {INDIA_OFFICE.role}
              </span>
              <span className="mt-3 block text-[20px] font-bold text-white">
                {INDIA_OFFICE.name}
              </span>
              {INDIA_OFFICE.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-4 block text-white/70">{INDIA_OFFICE.dealsWith}.</span>
            </address>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/10">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Regulatory posture</Eyebrow>
              <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
                No client money, no advice.
              </h2>
            </div>
            <ul className="space-y-4 md:col-span-7 md:col-start-6">
              {posture.map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-[var(--mint)]/60 pl-5 text-[17px] leading-[1.65] text-white/80"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section data-ground="mint" className="bg-[var(--mint)] text-[var(--ink)]">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--blue)] uppercase">
                Request materials
              </p>
              <h2 className="display-tight mt-6 text-[clamp(34px,4.6vw,64px)] text-[var(--blue)]">
                Diligence questions go to one address.
              </h2>
              <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.65] text-[var(--ink-800)]">
                Write to{" "}
                <a href={MATERIALS_MAILTO} className="font-bold underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>{" "}
                with what you need, and we will reply by email.
              </p>
            </div>
            <div className="lg:col-span-4">
              <Button as="a" href={MATERIALS_MAILTO} size="lg" withArrow>
                Request materials
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
