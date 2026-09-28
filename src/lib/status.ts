/**
 * Where the company stands today, stated once, for the status strip under the
 * navigation bar on every page.
 *
 * This is the ONLY place in the site's UI that names the current phase. Pages
 * describe what IndiQuant does; this strip says where it is. When the phase
 * changes (live capital, then a fund), change it here and nowhere else. A test
 * (status.test.ts) fails if the phase word turns up anywhere else in src/.
 *
 * Present-tense statements must stay true: today rounds, scoring and the
 * meta-model run every session; the paper book is not trading yet (2026-09-28). No performance figures, returns, AUM or investor counts; none exist.
 */
import { LIVE_CAPITAL_TIMING } from "./fund";
import { ROUND_CLOSES_IST, ROUND_OPENS_IST } from "./schedule";

/** The current phase, as a short name. */
export const PHASE = "Testnet";

/** The items the strip scrolls through, in order. Keep each one short. */
export const STATUS_ITEMS: readonly string[] = [
  `Current phase: ${PHASE.toLowerCase()} — rounds, scoring and the meta-model run every NSE session; paper trading starts next`,
  `Live capital next, ${LIVE_CAPITAL_TIMING}`,
  `Core rounds open ${ROUND_OPENS_IST} the evening before each session and close ${ROUND_CLOSES_IST}`,
  "Contributors join free: no fee, no deposit",
];

/** The short form, for the static strip when motion is reduced. */
export const STATUS_SHORT = `Current phase: ${PHASE.toLowerCase()}. Paper trading starts next.`;

/** The whole message once, as screen readers hear it. */
export const STATUS_TEXT = `Company status: ${STATUS_ITEMS.join(". ")}.`;

/** Marquee speed in CSS pixels per second, the same at every viewport width. */
export const STATUS_SPEED_PX_PER_S = 48;
