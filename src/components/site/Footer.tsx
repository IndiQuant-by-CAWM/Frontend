import { Container } from "./Container";

const links = [
  { href: "/about", label: "About" },
  { href: "/contributors", label: "Contributors" },
  { href: "/investors", label: "Investors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/sign-in", label: "Sign In" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <Container className="py-20">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
              IndiQuant
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              A quantitative research hedge fund shaped by the collective
              intelligence of independent minds — rewarded on live performance.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-4 md:col-start-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Explore
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    <span>{l.label}</span>
                    <span
                      aria-hidden
                      className="h-px w-0 bg-white/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-4"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            © {new Date().getFullYear()} IndiQuant. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            Thousands of minds. One strategy.
          </p>
        </div>
      </Container>
    </footer>
  );
}
