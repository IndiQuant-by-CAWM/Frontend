import { Link } from "react-router-dom";

const navigation = [
  { label: "Intelligence", href: "/#intelligence-layer" },
  { label: "Research", href: "/research" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/70 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="terminal-label text-sm font-semibold text-ink-50">
          INDIQUANT
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="terminal-label text-xs text-ink-300 hover:text-primary-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="terminal-label rounded border border-line px-2 py-1 text-[10px] text-ink-300">
          Research-First Infrastructure
        </div>
      </div>
    </header>
  );
}
