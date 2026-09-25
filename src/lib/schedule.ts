/**
 * Round cadence and programme status, stated once.
 *
 * Every page that tells a visitor when a round opens, when it closes, how long
 * scoring takes or what a grant is used to retype these facts, and they drifted:
 * one page gave an opening time half an hour earlier than the platform's.
 * Anything on this site that states one of these facts must read it from here.
 *
 * DATED. FIRST_SCORES and FIRST_RANKED follow from Core rounds having begun on
 * 21 September 2026. Update them (and the leaderboard page) once the first round
 * resolves.
 */

/** Rounds open at this time on every NSE trading session (IST). */
export const ROUND_OPENS_IST = "07:00 IST";

/** Submissions lock at this time on every NSE trading session (IST). */
export const ROUND_CLOSES_IST = "09:00 IST";

/** The window as a compact range, for stat strips: "07:00–09:00 IST". */
export const ROUND_HOURS_IST = `${ROUND_OPENS_IST.replace(" IST", "")}–${ROUND_CLOSES_IST}`;

/** One sentence for the schedule, so the two times are never quoted apart. */
export const ROUND_WINDOW = `Rounds open at ${ROUND_OPENS_IST} and close at ${ROUND_CLOSES_IST} every NSE trading session.`;

/** The prediction target is a forward return over this many sessions. */
export const TARGET_SESSIONS = 20;

/** How long after it opens a round is scored, in plain words. */
export const SCORED_AFTER = "about 21 trading sessions after it opens";

/** Submission attempts allowed per model per round. */
export const ATTEMPTS_PER_ROUND = 10;

/** Models each contributor may own. */
export const MAX_MODELS = 3;

/** Resolved rounds a model needs before it appears on the leaderboard. */
export const LEADERBOARD_MIN_ROUNDS = 20;

/** The first Core round opened on this date. */
export const FIRST_ROUND_DATE = "21 September 2026";

/** When the first round is expected to be scored. */
export const FIRST_SCORES = "late October 2026";

/** When the first model is expected to reach LEADERBOARD_MIN_ROUNDS. */
export const FIRST_RANKED = "late November 2026";

/** Who can see the rankings. */
export const RANKINGS_VISIBILITY =
  "Rankings are visible to every signed-in contributor under your public handle. Email addresses and legal names are never shown.";

/** The grant programme, in the only wording this site uses for it. */
export const GRANTS_PLANNED =
  "A company-funded research-grant programme is planned; it starts only after counsel's opinion, the research gate and the contributor agreement are in place, and it is discretionary.";

/** Grant status today. */
export const GRANTS_STATUS = "No grant has been paid.";

/** The contributor agreement, in the only wording this site uses for it. */
export const CONTRIBUTOR_AGREEMENT =
  "The contributor agreement is being finalised with counsel and will be presented for acceptance before any grant cycle. Until then the Terms of Use govern participation.";

/** What joining costs. */
export const FREE_TO_JOIN = "Free to join. No fee, no deposit.";
