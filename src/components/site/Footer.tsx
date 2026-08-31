import { PLATFORM_SIGNIN_URL, PLATFORM_URL } from "@/lib/platform";
import { Container } from "./Container";

const explore = [
  { href: "/about", label: "About" },
  { href: "/contributors", label: "Contributor journey" },
  { href: "/leaderboard", label: "Rankings" },
  { href: "/investors", label: "Investors" },
];

const desk = [
  { href: "mailto:indiquant@protonmail.com", label: "indiquant@protonmail.com" },
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
              A quantitative research hedge fund shaped by the collective intelligence of
              independent minds — rewarded on live performance.
            </p>
          </div>

          <nav aria-label="Platform" className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
              Platform
            </p>
            <ul className="mt-5.5 flex flex-col gap-3 text-[15px]">
              {platform.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-[var(--mint)]/80 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
              Explore
            </p>
            <ul className="mt-5.5 flex flex-col gap-3 text-[15px]">
              {explore.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/72 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Desk" className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">Desk</p>
            <ul className="mt-5.5 flex flex-col gap-3 text-[15px]">
              {desk.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/72 transition-colors duration-200 hover:text-[var(--mint)] focus-visible:text-[var(--mint)] focus-visible:outline-none"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="text-white/45">Mumbai, Maharashtra</li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-6 border-t border-white/10 pt-6.5 font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
          <span>© {new Date().getFullYear()} IndiQuant. All rights reserved.</span>
          <span>Thousands of minds. One strategy.</span>
        </div>
      </Container>
    </footer>
  );
}
