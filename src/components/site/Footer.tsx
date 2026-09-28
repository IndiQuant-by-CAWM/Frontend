import { CONTACT_EMAIL, GRIEVANCE_OFFICER } from "@/lib/contact";
import { HQ, INDIA_OFFICE } from "@/lib/entities";
import { DISCLAIMER } from "@/lib/fund";
import {
  PLATFORM_CONTRIBUTOR_AGREEMENT_URL,
  PLATFORM_GRIEVANCE_URL,
  PLATFORM_PRIVACY_URL,
  PLATFORM_SIGNIN_URL,
  PLATFORM_TERMS_URL,
  PLATFORM_URL,
} from "@/lib/platform";
import { AwardBadge } from "./AwardBadge";
import { Container } from "./Container";

const explore = [
  { href: "/about/", label: "About" },
  { href: "/contributors/", label: "Contributors" },
  { href: "/leaderboard/", label: "Rankings" },
  { href: "/investors/", label: "Investors" },
  { href: "/careers/", label: "Careers" },
];

// "Email us", not the address itself. The address is 192px wide and this column
// is 172px at every width past `lg` (the page container caps at 1232), so the
// full string could only ever wrap mid-domain — "indiquantr / esearch.in",
// which reads like a typo. Nothing is lost: the address is rendered verbatim,
// and selectable, in the legal block below, and the mailto href here is
// unchanged, so the link still does exactly what it did.
const contact = [
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email us" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
];

// The participant platform is a separate application, so it is listed on its
// own rather than mixed in with this site's pages.
const platform = [
  { href: PLATFORM_URL, label: "platform.indiquantresearch.in" },
  { href: PLATFORM_SIGNIN_URL, label: "Sign in" },
];

// The legal pages live on the platform, which is the service they govern.
const legal = [
  { href: PLATFORM_TERMS_URL, label: "Terms of Use" },
  { href: PLATFORM_PRIVACY_URL, label: "Privacy" },
  { href: PLATFORM_CONTRIBUTOR_AGREEMENT_URL, label: "Contributor agreement" },
  { href: PLATFORM_GRIEVANCE_URL, label: "Grievance" },
];

const heading = "font-mono text-[12px] tracking-[0.2em] text-white/65 uppercase";

// `block`, not `flex`, and `wrap-anywhere`, not `break-words`. Both halves
// matter and both were wrong, which is why `platform.indiquantresearch.in` and
// `office@indiquantresearch.in` painted over the columns beside them:
//
//   * a flex container lays its single anonymous text item out on ONE line
//     (`flex-wrap` defaults to `nowrap`), so the string could not wrap at all;
//   * `overflow-wrap: break-word` does not reduce a box's *min-content* width,
//     so even without the flex the column could not shrink to fit it.
//     `anywhere` is the one value that does.
//
// Measured before the fix at 820px: the email needed 202px in a 95px column.
// The tap target stays >=44px (WCAG 2.5.8) via padding rather than a flex
// centreing trick, so a link that wraps to two lines simply gets taller.
const link =
  "block py-[10px] wrap-anywhere text-white/75 transition-colors duration-200 hover:text-[var(--mint)] md:py-0";

export function Footer() {
  return (
    <footer className="relative z-2 border-t border-white/12 bg-[var(--ink)] pt-20 pb-11">
      <Container>
        {/* Five columns need ~1024px, not 768px. At `md` the brand and Platform
            share the top row and the three short lists sit beneath; the 3/3/2/2/2
            row only appears at `lg`, where a col-span-2 is wide enough to hold a
            wrapped email without looking broken. */}
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
          <div className="md:col-span-6 lg:col-span-3">
            {/* 40px is 227px wide for "INDIQUANT" alone — wider than a
                col-span-3 until the viewport is past ~1280. Scale it instead of
                letting it hang over the next column. */}
            <p className="text-[34px] leading-none font-extrabold tracking-[-0.035em] text-[var(--mint)] lg:text-[36px] xl:text-[40px]">
              INDIQUANT INC.
            </p>
            <p className="mt-5.5 max-w-[38ch] text-[15px] leading-[1.7] text-white/65">
              A hedge fund in the making for Indian equities, built on signals from independent
              researchers.
            </p>
            <div className="mt-7">
              <AwardBadge size="sm" />
            </div>
          </div>

          <nav aria-label="Platform" className="md:col-span-6 lg:col-span-3">
            <p className={heading}>Platform</p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3.5">
              {platform.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link} text-[var(--mint)]/85`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="md:col-span-4 lg:col-span-2">
            <p className={heading}>Explore</p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact" className="md:col-span-4 lg:col-span-2">
            <p className={heading}>Contact</p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3.5">
              {contact.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="md:col-span-4 lg:col-span-2">
            <p className={heading}>Legal</p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/10 pt-8 text-[14px] leading-[1.75] text-white/70">
          {DISCLAIMER}
        </p>

        <div className="mt-6 space-y-2 text-[13px] leading-[1.8] text-white/60">
          <p>
            <span className="text-white/85">{INDIA_OFFICE.name}</span>
            <Dot />
            CIN {INDIA_OFFICE.cin}
            <Dot />
            {INDIA_OFFICE.region}
          </p>
          <p>
            <span className="text-white/85">{HQ.name}</span>
            <Dot />
            {HQ.city}, United States
          </p>
          <p>
            <span className="text-white/85">Grievance Officer:</span> {GRIEVANCE_OFFICER.name}
            <Dot />
            <a
              href={`mailto:${GRIEVANCE_OFFICER.email}`}
              className="break-all underline decoration-white/30 underline-offset-4 hover:text-[var(--mint)]"
            >
              {GRIEVANCE_OFFICER.email}
            </a>
          </p>
          <p>
            <span className="text-white/85">Contact:</span>{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all underline decoration-white/30 underline-offset-4 hover:text-[var(--mint)]"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-6 border-t border-white/10 pt-6.5 font-mono text-[12px] tracking-[0.16em] text-white/60 uppercase">
          <span>© {new Date().getFullYear()} INDIQUANT INC. All rights reserved.</span>
          <span>Many models. One truth.</span>
        </div>
      </Container>
    </footer>
  );
}

function Dot() {
  return (
    <span aria-hidden className="mx-2 text-white/40">
      ·
    </span>
  );
}
