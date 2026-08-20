// Parsing of timestamps that come off the IndiQuant Backend.
//
// Backend stamps every datetime with `backend_paths.utcnow()`, which is
// `datetime.now(timezone.utc).replace(tzinfo=None)` -- naive-but-UTC by
// convention (SQLite does not round-trip tzinfo, so the whole service compares
// naive UTC to naive UTC). Pydantic therefore serializes it WITHOUT an offset:
//
//     "2026-08-20T08:00:00.123456"
//
// ECMAScript parses that offset-less date-time form as LOCAL time, so
// `new Date(...)` on an IST browser lands 5h30m before the true instant. That
// is not cosmetic: the submission window gate on the tournament page compares
// the close instant to `Date.now()`, so an Indian contributor would see the
// upload control disabled for essentially the whole window (and a contributor
// west of UTC would be invited to upload into a window the server has closed).
//
// Every consumer of a Backend timestamp must go through this module rather than
// calling `new Date(...)` directly, so there is exactly one place this
// convention is encoded.

// Date-time with no timezone designator and no offset: "2026-08-20T08:00:00",
// "2026-08-20T08:00", "2026-08-20T08:00:00.123456", or the same with a space
// separator. A trailing "Z" or "+05:30" means the server was explicit and we
// leave the value completely alone.
const OFFSETLESS_DATETIME = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/;

/** Append the UTC designator to an offset-less Backend timestamp. */
export function normalizeServerTimestamp(value: string): string {
  const trimmed = value.trim();
  return OFFSETLESS_DATETIME.test(trimmed) ? `${trimmed.replace(" ", "T")}Z` : trimmed;
}

/**
 * Epoch milliseconds for a Backend timestamp, or null if it is absent or
 * unparseable. Offset-less strings are read as UTC, never as local time.
 */
export function parseServerTime(value: string | number | Date | null | undefined): number | null {
  if (value == null) return null;
  if (value instanceof Date) {
    const ms = value.getTime();
    return Number.isNaN(ms) ? null : ms;
  }
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const ms = new Date(normalizeServerTimestamp(value)).getTime();
  return Number.isNaN(ms) ? null : ms;
}

/**
 * A Backend timestamp rendered in the viewer's own locale and timezone --
 * correctly converted from UTC first. Returns null when there is nothing
 * parseable to show, so callers decide their own fallback.
 */
export function formatServerTime(
  value: string | number | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string | null {
  const ms = parseServerTime(value);
  if (ms === null) return null;
  return new Date(ms).toLocaleString(undefined, options);
}
