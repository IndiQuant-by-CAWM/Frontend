import { cn } from "@/lib/utils";

interface SectionShellProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("border-b border-border py-16 sm:py-20", className)}>
      <header className="mb-10 grid gap-4 lg:grid-cols-[220px_1fr] lg:items-start">
        <p className="terminal-label text-xs text-primary-strong">{eyebrow}</p>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-50 sm:text-4xl">{title}</h2>
          {description ? <p className="max-w-3xl text-sm text-ink-300 sm:text-base">{description}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}
