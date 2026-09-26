import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { Container } from "@/components/site/Container";
import { Section, Eyebrow } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { CONTACT_EMAIL, GRIEVANCE_OFFICER } from "@/lib/contact";
import { PLATFORM_GRIEVANCE_URL } from "@/lib/platform";
import { OFFICES } from "@/lib/entities";
import { pageHead } from "@/lib/seo";

/**
 * The address, shown plainly.
 *
 * This page used to carry a contact form. The site is a static build with no
 * backend, so the form could only hand the message to the visitor's mail app
 * and then show a success state regardless of whether anything was sent. A
 * visible address and a mailto link are honest about what happens.
 */
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact: IndiQuant",
      description: `Write to IndiQuant at ${CONTACT_EMAIL}. For contributors, investors and partners. Registered office in Newark, Delaware; India office in Navi Mumbai.`,
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Write to us."
        description="One address for contributors, investors, partners and press. We read every message and reply by email."
      />

      <Section className="pt-14 md:pt-20">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-6">
              <Eyebrow>Email</Eyebrow>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 flex items-center gap-4 text-[clamp(22px,3vw,34px)] font-extrabold tracking-[-0.02em] break-all text-white underline decoration-[var(--mint)]/60 underline-offset-8 transition-colors hover:text-[var(--mint)]"
              >
                <Mail
                  size={26}
                  strokeWidth={1.75}
                  aria-hidden
                  className="shrink-0 text-[var(--mint)]"
                />
                {CONTACT_EMAIL}
              </a>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.7] text-white/70">
                Copy the address into any mail client, or use the button to start a message in
                yours. There is no form on this site.
              </p>
              <div className="mt-8">
                <Button as="a" href={`mailto:${CONTACT_EMAIL}`} withArrow>
                  Email IndiQuant
                </Button>
              </div>
              <div className="mt-12 max-w-[48ch] border-t border-white/12 pt-8">
                <Eyebrow>Grievance Officer</Eyebrow>
                <p className="mt-4 text-[16px] leading-[1.7] text-white/75">
                  For a complaint about the platform or how we handle your data, write to{" "}
                  <span className="text-white">{GRIEVANCE_OFFICER.name}</span>,{" "}
                  {GRIEVANCE_OFFICER.role}, at{" "}
                  <a
                    href={`mailto:${GRIEVANCE_OFFICER.email}`}
                    className="break-all text-white underline underline-offset-4"
                  >
                    {GRIEVANCE_OFFICER.email}
                  </a>
                  . The{" "}
                  <a
                    href={PLATFORM_GRIEVANCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4"
                  >
                    grievance procedure
                  </a>{" "}
                  is published on the platform.
                </p>
              </div>
              <p className="mt-12 max-w-sm text-[15px] leading-relaxed text-white/70">
                Contributor questions are often answered faster in the{" "}
                <a href="/faq/" className="text-white underline underline-offset-4">
                  FAQ
                </a>
                .
              </p>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <Eyebrow>Offices</Eyebrow>
              <ul className="mt-6 space-y-8">
                {OFFICES.map((e) => (
                  <li key={e.name}>
                    <address className="text-[15px] leading-relaxed text-white/70 not-italic">
                      <span className="block font-mono text-[12px] tracking-[0.14em] text-white/65 uppercase">
                        {e.role}
                      </span>
                      <span className="mt-2 block text-[17px] font-bold text-white">{e.name}</span>
                      {e.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <span className="mt-2 block text-white/60">{e.dealsWith}</span>
                    </address>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
