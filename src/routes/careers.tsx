import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/lib/contact";
import { PLATFORM_SIGNUP_URL } from "@/lib/platform";
import { Button } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Section, Eyebrow } from "@/components/site/Section";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — IndiQuant" },
      {
        name: "description",
        content:
          "IndiQuant is not hiring at the moment. Open roles will be listed here when they exist.",
      },
      { property: "og:title", content: "Careers — IndiQuant" },
      {
        property: "og:description",
        content: "No open roles right now. Contributing is the way to work with IndiQuant today.",
      },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

interface Role {
  title: string;
  /** e.g. "Engineering", "Research" */
  team: string;
  /** e.g. "Mumbai", "Remote (India)" */
  location: string;
  /** e.g. "Full-time" */
  type: string;
  /** Where an application goes. A real destination, always. */
  applyHref: string;
  summary: string;
}

/**
 * Open roles. Empty means the page renders the not-hiring state below.
 *
 * To open hiring, add entries here — nothing else on this page needs to change.
 * Keep `applyHref` pointing somewhere that actually receives applications; a
 * role nobody can apply to is worse than a role that is not listed.
 */
const roles: Role[] = [];

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="No open roles"
        italic="right now"
        tail="."
        description="We're a small team and we're not hiring at the moment. When that changes, the roles will be listed on this page."
      />

      <Section className="pt-0">
        <Container>{roles.length > 0 ? <OpenRoles /> : <NotHiring />}</Container>
      </Section>
    </PageShell>
  );
}

function NotHiring() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-12 md:gap-12">
      <Reveal variant="blur" className="md:col-span-7">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-8 sm:p-10">
          <Eyebrow>The short version</Eyebrow>
          <h2 className="mt-5 font-display text-2xl leading-tight tracking-tight text-white sm:text-3xl">
            We have nothing open, and we'd rather say so.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            IndiQuant is early and deliberately small. Rather than keep a page of roles we are not
            actually recruiting for, this one stays honest: when we open a position, it appears here
            with a team, a location and a way to apply.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            There is no waiting list and no general application to submit. We would only be
            collecting CVs we could not act on.
          </p>
        </div>
      </Reveal>

      <Reveal variant="blur" className="md:col-span-5">
        <div className="flex h-full flex-col rounded-2xl border border-[var(--mint)]/20 bg-[var(--mint)]/[0.04] p-8 sm:p-10">
          <Eyebrow>The way in today</Eyebrow>
          <h2 className="mt-5 font-display text-2xl leading-tight tracking-tight text-white">
            Contribute.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            The platform is open to independent researchers now, and it is the honest route into
            IndiQuant: you build models, submit predictions, and your scores and rank become a
            public track record. Round 001 carries no cash reward. What accrues is standing.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            It is also how we get to know people's work before we ever get to know their CV.
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button
              as="a"
              href={PLATFORM_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="accent"
              withArrow
            >
              Become a Contributor
            </Button>
            <Button as="a" href="/contributors" variant="secondary">
              Read the contributor journey
            </Button>
          </div>
        </div>
      </Reveal>

      <Reveal variant="fade" className="md:col-span-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-xl leading-tight tracking-tight text-white">
              Think you're the exception?
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-white/60">
              If your work is genuinely unusual and you think we should know about it, write to the
              desk. We read everything, and we answer honestly, including when the answer is that we
              have nothing for you yet.
            </p>
          </div>
          <Button
            as="a"
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Careers introduction")}`}
            variant="ghost"
            className="shrink-0"
          >
            Write to the desk
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

// Renders once `roles` has entries. Kept alongside the empty state so opening
// hiring is a data change rather than a rebuild of this page.
function OpenRoles() {
  return (
    <div className="mx-auto max-w-5xl">
      <Eyebrow>Open roles</Eyebrow>
      <ul className="mt-8 grid gap-4">
        {roles.map((role) => (
          <li
            key={`${role.team}-${role.title}`}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-8"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="font-display text-2xl leading-tight tracking-tight text-white">
                {role.title}
              </h2>
              <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--mint)]/80 uppercase">
                {role.team}
              </span>
            </div>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-white/60">
              {role.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase">
                {role.location}
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase">
                {role.type}
              </span>
              <Button as="a" href={role.applyHref} variant="primary" withArrow className="ml-auto">
                Apply
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
