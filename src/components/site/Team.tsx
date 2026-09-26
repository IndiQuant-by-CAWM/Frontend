import { ArrowUpRight } from "lucide-react";

import { TEAM, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

/**
 * The people, from lib/team.ts. `full` is the /about layout (large portraits);
 * `compact` is the /investors strip (small round portraits in one row).
 */
export function TeamGrid({ variant = "full" }: { variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  return (
    <ul className={cn("grid gap-6", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:max-w-4xl")}>
      {TEAM.map((m) => (
        <li key={m.name}>{compact ? <CompactMember m={m} /> : <FullMember m={m} />}</li>
      ))}
    </ul>
  );
}

function LinkedInLink({ m, className }: { m: TeamMember; className?: string }) {
  return (
    <a
      href={m.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${m.name} on LinkedIn (opens in a new tab)`}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[12px] tracking-[0.16em] text-[var(--mint)] uppercase transition-colors hover:text-white md:min-h-0",
        className,
      )}
    >
      LinkedIn
      <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
    </a>
  );
}

function FullMember({ m }: { m: TeamMember }) {
  return (
    <article className="h-full rounded-2xl border border-white/[0.14] bg-card p-6 sm:p-8">
      <img
        src={m.photo}
        alt={m.alt}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        className="aspect-square w-full max-w-[220px] rounded-xl border border-white/10 object-cover"
      />
      <h3 className="mt-7 text-[24px] font-extrabold tracking-[-0.02em] text-white">{m.name}</h3>
      <p className="mt-1 text-[16px] text-white/70">{m.role}</p>
      <LinkedInLink m={m} className="mt-4" />
    </article>
  );
}

function CompactMember({ m }: { m: TeamMember }) {
  return (
    <div className="flex items-center gap-5 rounded-[14px] border border-white/14 px-5 py-5 sm:px-6">
      <img
        src={m.photo}
        alt={m.alt}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        className="h-16 w-16 shrink-0 rounded-full border border-white/15 object-cover"
      />
      <div className="min-w-0">
        <p className="text-[18px] font-bold text-white">{m.name}</p>
        <p className="text-[15px] text-white/70">{m.role}</p>
        <LinkedInLink m={m} className="mt-1" />
      </div>
    </div>
  );
}
