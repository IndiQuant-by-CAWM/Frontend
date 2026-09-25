import { createFileRoute } from "@tanstack/react-router";

import { CONTACT_EMAIL } from "@/lib/contact";
import { HQ, INDIA_OFFICE } from "@/lib/entities";
import { LIVE_CAPITAL_TIMING } from "@/lib/fund";
import { pageHead } from "@/lib/seo";
import { FIRST_ROUND_DATE, ROUND_CLOSES_IST, TARGET_SESSIONS } from "@/lib/schedule";
import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { PageShell, PageHero } from "@/components/site/PageShell";

/**
 * The fund, for prospective investors and partners.
 *
 * Only what the platform actually does is described here: the portfolio and
 * execution facts follow the indiquant repo (Architecture §A2/§A5, BUILDLOG).
 * There are no performance figures, returns, AUM, investor counts, team names or
 * registration numbers on this page because none exist; do not add any. The
 * phase and its timing come from lib/fund.ts, the entities from lib/entities.ts.
 */
export const Route = createFileRoute("/investors")({
  head: () =>
    pageHead({
      path: "/investors",
      title: "Investors: IndiQuant",
      description:
        "IndiQuant is a quantitative hedge fund in the making for Indian equities. Testnet on paper capital now, live capital next. The thesis, the phases, how the book is built, and who to talk to.",
    }),
  component: InvestorsPage,
});

const TALK_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Investor enquiry")}`;

const phases = [
  {
    k: "01",
    name: "Testnet",
    when: "Now",
    body: `The whole pipeline runs end to end on paper capital: daily rounds, scoring, the meta-model, the weekly portfolio and execution. The point is to prove each stage works, and keeps working, before real money is involved. Core rounds began on ${FIRST_ROUND_DATE}.`,
    current: true,
  },
  {
    k: "02",
    name: "Live capital",
    when: `Next, ${LIVE_CAPITAL_TIMING}`,
    body: "The same pipeline and the same risk limits, trading real capital. Live order routing is switched on once the testnet record and our own checks say it is ready.",
    current: false,
  },
  {
    k: "03",
    name: "Fund",
    when: "After a live record",
    body: "A fund for eligible investors, set up under the applicable regulation once live trading has a record to show.",
    current: false,
  },
];

const book = [
  {
    label: "Signal",
    text: `Contributors predict a ${TARGET_SESSIONS}-session, sector-neutral return for every name in the universe. Submissions close at ${ROUND_CLOSES_IST} each NSE session.`,
  },
  {
    label: "Meta-model",
    text: "After each session the meta-model is rebuilt from the latest scores. Each model is weighted by its trust, an estimate of skill from its scored record, and near-duplicate models are discounted so one idea sent twice does not count twice.",
  },
  {
    label: "Rebalance",
    text: `Weekly, on the first session of the week. With a ${TARGET_SESSIONS}-session target the book holds positions for weeks, not hours.`,
  },
  {
    label: "Optimiser",
    text: "A constrained optimiser sets the weights. Gross and net exposure, sector, liquidity and turnover limits sit inside the solver, and one-way turnover is capped at 30% per rebalance.",
  },
  {
    label: "Costs",
    text: "Trading costs are priced into the objective rather than subtracted afterwards, so a trade has to cover its cost before the optimiser will make it.",
  },
  {
    label: "Execution",
    text: "Orders are built inside the Execution Trust Zone, a separate environment with its own credentials. It re-checks every limit before trading, and stock-level signals never leave it.",
  },
  {
    label: "Live guard",
    text: "In testnet the Execution Trust Zone fills on paper. A runtime guard refuses live orders until live trading is deliberately switched on.",
  },
];

function InvestorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Investors and partners"
        title="A hedge fund in the making."
        description={
          <>
            <p>
              IndiQuant trades Indian equities on signals from independent researchers. A
              trust-weighted meta-model combines them, and a portfolio optimiser turns the result
              into one risk-managed book.
            </p>
            <p className="mt-5">
              We are in the testnet phase. The full stack runs every session on paper capital, and
              live capital follows {LIVE_CAPITAL_TIMING}.
            </p>
          </>
        }
      >
        <Button as="a" href={TALK_MAILTO} withArrow>
          Talk to us
        </Button>
        <Button as="a" href="#book" variant="secondary">
          How the book is built
        </Button>
      </PageHero>

      <Section className="border-t border-white/10">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Thesis</Eyebrow>
              <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
                Crowdsourced signals, one disciplined book.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-white/75 md:col-span-7 md:col-start-6">
              <p>
                Good equity signals are scarce, and they fade. A single research team tends to find
                the same kind of signal over and over. We hand anonymised NSE data to a wide pool of
                independent researchers, score what they send back against realised returns, and
                keep what holds up out of sample.
              </p>
              <p>
                Contributors never see tickers or company names, and they never see the book. What
                reaches the portfolio is the meta-model: their signals, weighted by each model's
                scored record.
              </p>
              <p>
                India is the market we chose to do this in. We trade NSE equities on a point-in-time
                universe, with Indian trading costs built into the optimiser from the start.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/10">
        <Container>
          <Eyebrow>Phases</Eyebrow>
          <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
            Where we are.
          </h2>
          <ol className="mt-12 grid gap-px border border-white/14 bg-white/14 md:grid-cols-3">
            {phases.map((p) => (
              <li
                key={p.k}
                className={
                  "flex flex-col px-6 py-8 sm:px-8 " +
                  (p.current ? "bg-[var(--blue)]" : "bg-[var(--ink)]")
                }
              >
                <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--mint)]/85">
                  {p.k}
                </p>
                <h3 className="mt-5 text-[28px] font-extrabold tracking-[-0.03em] text-white">
                  {p.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] tracking-[0.16em] text-[var(--mint)] uppercase">
                  {p.when}
                </p>
                <p className="mt-5 text-[16px] leading-[1.65] text-white/80">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="book" className="border-t border-white/10">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Portfolio and risk</Eyebrow>
              <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
                How the book is built.
              </h2>
              <p className="mt-6 max-w-[40ch] text-[16px] leading-[1.7] text-white/70">
                Everything below runs in testnet today, on paper capital.
              </p>
            </div>
            <dl className="md:col-span-7 md:col-start-6">
              {book.map((b) => (
                <div
                  key={b.label}
                  className="grid gap-2 border-t border-white/12 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[150px_1fr] sm:gap-8"
                >
                  <dt className="font-mono text-[12px] tracking-[0.16em] text-[var(--mint)] uppercase sm:pt-1">
                    {b.label}
                  </dt>
                  <dd className="text-[16px] leading-[1.7] text-white/80">{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/10">
        <Container>
          <Eyebrow>Entity structure</Eyebrow>
          <h2 className="display-tight mt-6 text-[clamp(34px,4.2vw,56px)] text-white">
            One company, two offices.
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
                The parent company, incorporated in Delaware. The platform terms are with this
                entity.
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

      <Section data-ground="mint" className="bg-[var(--mint)] text-[var(--ink)]">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-[12px] tracking-[0.22em] text-[var(--blue)] uppercase">
                Talk to us
              </p>
              <h2 className="display-tight mt-6 text-[clamp(34px,4.6vw,64px)] text-[var(--blue)]">
                Follow the testnet with us.
              </h2>
              <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.65] text-[var(--ink-800)]">
                If you are a prospective investor, allocator or partner, write to{" "}
                <a href={TALK_MAILTO} className="font-bold underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
                . Tell us who you are and what you would like to see, and we will reply by email.
              </p>
            </div>
            <div className="lg:col-span-4">
              <Button as="a" href={TALK_MAILTO} size="lg" withArrow>
                Talk to us
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
