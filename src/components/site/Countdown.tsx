import { Clock } from "lucide-react";

import { useNow } from "@/hooks/use-now";
import { parseServerTime } from "@/lib/time";
import { cn } from "@/lib/utils";

// The platform runs on a 1-hour cadence: submissions LOCK at
// `submission_close_at`, and scores land roughly one prediction horizon (~1h)
// after the lock. This is a live countdown, not a weekly calendar view.
export const SCORE_HORIZON_MS = 60 * 60 * 1000;

function diffParts(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl leading-none tabular-nums text-white sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</span>
    </div>
  );
}

// Large countdown block used on the tournament detail / submit hero.
export function Countdown({
  target,
  className,
  elapsedLabel = "Time elapsed",
}: {
  target: string | number | Date | null | undefined;
  className?: string;
  elapsedLabel?: string;
}) {
  const now = useNow();

  if (target == null) {
    return (
      <div className={cn("font-mono text-sm text-white/40", className)}>Not scheduled</div>
    );
  }

  // Backend timestamps are naive UTC; parseServerTime reads them as UTC
  // rather than letting the browser assume local time (see lib/time.ts).
  const targetMs = parseServerTime(target);
  if (targetMs === null) {
    return <div className={cn("font-mono text-sm text-white/40", className)}>Not scheduled</div>;
  }

  const remaining = targetMs - now;

  if (remaining <= 0) {
    return (
      <div className={cn("font-mono text-sm uppercase tracking-[0.2em] text-white/50", className)}>
        {elapsedLabel}
      </div>
    );
  }

  const { days, hours, minutes, seconds } = diffParts(remaining);

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {days > 0 && (
        <>
          <Cell value={days} label="Days" />
          <span className="font-mono text-2xl text-white/20">:</span>
        </>
      )}
      <Cell value={hours} label="Hrs" />
      <span className="font-mono text-2xl text-white/20">:</span>
      <Cell value={minutes} label="Min" />
      <span className="font-mono text-2xl text-white/20">:</span>
      <Cell value={seconds} label="Sec" />
    </div>
  );
}

// Compact inline countdown chip for list rows.
export function CountdownChip({
  target,
  prefix,
  elapsedLabel = "closed",
  className,
}: {
  target: string | number | Date | null | undefined;
  prefix?: string;
  elapsedLabel?: string;
  className?: string;
}) {
  const now = useNow();

  const base =
    "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] tabular-nums text-white/70";

  if (target == null) {
    return <span className={cn(base, "text-white/30", className)}>—</span>;
  }

  // Backend timestamps are naive UTC; parseServerTime reads them as UTC
  // rather than letting the browser assume local time (see lib/time.ts).
  const targetMs = parseServerTime(target);
  if (targetMs === null) {
    return <span className={cn(base, "text-white/30", className)}>—</span>;
  }

  const remaining = targetMs - now;

  if (remaining <= 0) {
    return (
      <span className={cn(base, "text-white/40", className)}>
        <Clock size={11} strokeWidth={1.75} />
        {elapsedLabel}
      </span>
    );
  }

  const { days, hours, minutes, seconds } = diffParts(remaining);
  const text =
    days > 0
      ? `${days}d ${hours}h ${minutes}m`
      : hours > 0
        ? `${hours}h ${minutes}m ${seconds}s`
        : `${minutes}m ${seconds}s`;

  return (
    <span className={cn(base, className)}>
      <Clock size={11} strokeWidth={1.75} className="text-white/40" />
      {prefix ? `${prefix} ` : ""}
      {text}
    </span>
  );
}
