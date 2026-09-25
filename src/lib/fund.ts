/**
 * Where the fund stands, stated once.
 *
 * IndiQuant is a hedge fund being built in phases: testnet (the whole pipeline
 * running on paper capital), then live capital, then a fund for outside
 * investors. Every page that names the phase, the timing of the next one or the
 * site disclaimer reads it from here, so the wording cannot drift.
 *
 * Present-tense statements must stay true: today the book trades paper capital
 * only. Do not add performance figures, returns, AUM or investor counts; none
 * exist.
 */

/** The current phase. */
export const PHASE = "Testnet";

/** One line for badges and cards. */
export const PHASE_LINE = "Testnet phase: paper capital. Live capital next.";

/** When live capital is expected, in words rather than a date. */
export const LIVE_CAPITAL_TIMING = "within the next few months";

/** The site's one disclaimer, shown in the footer of every page. */
export const DISCLAIMER =
  "IndiQuant is currently in a testnet phase and trades paper capital. Nothing on this site is investment advice or an offer of any security or fund interest. Any future fund will be offered only to eligible investors, as permitted by applicable regulation.";
