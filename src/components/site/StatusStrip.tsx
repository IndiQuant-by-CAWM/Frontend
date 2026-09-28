import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { STATUS_ITEMS, STATUS_SHORT, STATUS_SPEED_PX_PER_S, STATUS_TEXT } from "@/lib/status";

// Each half of the track repeats the items this many times, so one half is
// always wider than the viewport (~1,900px per pass at 11px mono) and the -50%
// loop never shows a gap, even on a 2560px screen.
const PASSES_PER_HALF = 2;

// Until the track is measured, estimate its duration from the character count:
// Space Mono at 11px with 0.14em tracking is ~8.3px a glyph.
const APPROX_PX_PER_CHAR = 8.3;
const SEPARATOR_PX = 40;
const estimatedHalfWidth =
  PASSES_PER_HALF *
  STATUS_ITEMS.reduce((w, item) => w + item.length * APPROX_PX_PER_CHAR + SEPARATOR_PX, 0);

/**
 * The company's current status, in a slim ticker directly under the navigation
 * bar on every page. The message lives in lib/status.ts and nowhere else.
 *
 * - Motion is a CSS transform on a duplicated track (GPU-composited, no JS
 *   timers). The duration is set from the measured track width, so the text
 *   moves at the same px/s at every viewport width.
 * - It pauses on hover, on keyboard focus inside the strip, and with the
 *   pause button (WCAG 2.2.2). With prefers-reduced-motion it does not move at
 *   all and shows a short static line instead.
 * - Screen readers hear the whole message once, from a visually hidden
 *   paragraph; the moving copies are aria-hidden. It is not a live region, so
 *   nothing is re-announced.
 */
export function StatusStrip() {
  const halfRef = useRef<HTMLSpanElement>(null);
  const [duration, setDuration] = useState(estimatedHalfWidth / STATUS_SPEED_PX_PER_S);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = halfRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setDuration(width / STATUS_SPEED_PX_PER_S);
    };
    measure();
    // Re-measure when the web font lands and the glyph widths change.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const half = (copy: number) => (
    <span
      ref={copy === 0 ? halfRef : undefined}
      className="flex shrink-0 items-center"
      data-copy={copy}
    >
      {Array.from({ length: PASSES_PER_HALF }, (_, pass) =>
        STATUS_ITEMS.map((item) => (
          <span key={`${pass}-${item}`} className="flex items-center">
            <span>{item}</span>
            <span aria-hidden className="iq-status-sep" />
          </span>
        )),
      )}
    </span>
  );

  return (
    <div
      role="note"
      aria-label="Company status"
      className="iq-status border-t border-[var(--mint)]/12 bg-[rgba(0,3,255,0.16)] font-mono text-[11px] tracking-[0.14em] text-[var(--mint)]/90 uppercase"
      data-paused={paused || undefined}
    >
      <p className="sr-only">{STATUS_TEXT}</p>
      <div className="container-page flex h-[30px] items-center gap-3">
        {/* Fixed "Now" label with the live dot; the ticker scrolls beside it. */}
        <div
          aria-hidden
          className="flex h-full shrink-0 items-center gap-2 border-r border-[var(--mint)]/15 pr-3"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--mint)] opacity-40 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--mint)] shadow-[0_0_10px_var(--mint)]" />
          </span>
          <span className="text-[var(--mint)]">Now</span>
        </div>

        <div
          aria-hidden
          className="iq-status-viewport relative h-full min-w-0 flex-1 overflow-hidden whitespace-nowrap"
        >
          <div
            className="iq-status-track flex h-full w-max items-center"
            style={{ animationDuration: `${duration.toFixed(1)}s` }}
          >
            {half(0)}
            {half(1)}
          </div>
          <p className="iq-status-static h-full items-center truncate">{STATUS_SHORT}</p>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label="Pause the status ticker"
          className="iq-status-toggle -mr-1 grid h-6 w-6 shrink-0 place-items-center rounded-[6px] text-[var(--mint)]/75 transition-colors hover:bg-[var(--mint)]/10 hover:text-[var(--mint)]"
        >
          {paused ? <Play size={12} aria-hidden /> : <Pause size={12} aria-hidden />}
        </button>
      </div>
    </div>
  );
}
