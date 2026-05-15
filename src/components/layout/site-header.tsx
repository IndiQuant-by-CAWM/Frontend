import Link from "next/link";

const navigation = [
  { label: "Intelligence", href: "/#intelligence-layer" },
  { label: "Research", href: "/research" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-ink/80 backdrop-blur-xl">
      <div className="flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="terminal-label text-sm font-semibold text-ink-50">
          INDIQUANT
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
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
