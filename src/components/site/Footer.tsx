import { CONTACT_EMAIL } from "@/lib/contact";
import { ENTITIES } from "@/lib/entities";
import { PLATFORM_SIGNIN_URL, PLATFORM_URL } from "@/lib/platform";
import { AwardBadge } from "./AwardBadge";
import { Container } from "./Container";

const explore = [
  { href: "/about", label: "About" },
  { href: "/contributors", label: "Contributor journey" },
  { href: "/leaderboard", label: "Rankings" },
  { href: "/investors", label: "Investors" },
  { href: "/careers", label: "Careers" },
];

const desk = [
  { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// The participant platform is a separate application, so it is listed on its
// own rather than mixed in with this site's pages.
const platform = [
  { href: PLATFORM_URL, label: "platform.indiquantresearch.in" },
  { href: PLATFORM_SIGNIN_URL, label: "Sign in" },
];

export function Footer() {
  return (
    <footer className="relative z-2 border-t border-white/12 bg-[var(--ink)] pt-20 pb-11">
      <Container>
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <p className="text-[40px] leading-none font-extrabold tracking-[-0.035em] text-[var(--mint)]">
              IndiQuant
            </p>
            <p className="mt-5.5 max-w-[38ch] text-[15px] leading-[1.7] text-white/60">
              A crowdsourced quantitative research platform for Indian equities. Independent
              contributors, scored on live market outcomes.
            </p>
            <div className="mt-7">
              <AwardBadge size="sm" />
            </div>
          </div>

          <nav aria-label="Platform" className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
              Platform
            </p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3">
              {platform.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center break-words text-[var(--mint)]/80 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none md:min-h-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
              Explore
            </p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="flex min-h-[44px] items-center text-white/72 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none md:min-h-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Desk" className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">Desk</p>
            <ul className="mt-4 flex flex-col text-[15px] md:mt-5.5 md:gap-3">
              {desk.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="flex min-h-[44px] items-center text-white/72 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none md:min-h-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
          {ENTITIES.map((e) => (
            <address key={e.name} className="text-[13px] leading-[1.7] text-white/60 not-italic">
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
                {e.audience}
              </p>
              <p className="mt-2 font-semibold text-white/85">{e.name}</p>
              {e.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-6 border-t border-white/10 pt-6.5 font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
          <span>© {new Date().getFullYear()} IndiQuant Inc. and Indiquant Private Limited. All rights reserved.</span>
          <span>Many models. One truth.</span>
        </div>
      </Container>
    </footer>
  );
}
