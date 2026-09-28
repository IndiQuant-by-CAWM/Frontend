/**
 * Where the fund is headed, stated once.
 *
 * IndiQuant is a hedge fund being built in phases: the whole pipeline proven
 * end to end first, then live capital, then a fund for outside investors. The
 * current phase is named in one place only, the status strip (lib/status.ts);
 * pages describe what the fund does, not which phase it is in. The timing of
 * the next phase and the site disclaimer are read from here, so the wording
 * cannot drift.
 *
 * Present-tense statements must stay true: no real money is traded yet. Do not
 * add performance figures, returns, AUM or investor counts; none exist.
 */

/** When live capital is expected, in words rather than a date. */
export const LIVE_CAPITAL_TIMING = "within the next few months";

/** The site's one disclaimer, shown in the footer of every page. */
export const DISCLAIMER =
  "IndiQuant does not yet trade live capital or accept money from outside investors. Nothing on this site is investment advice or an offer of any security or fund interest. Any future fund will be offered only to eligible investors, as permitted by applicable regulation.";
