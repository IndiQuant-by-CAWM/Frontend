// Regression tests for the naive-UTC misparse.
//
// Backend serializes `datetime.now(timezone.utc).replace(tzinfo=None)` with NO
// offset, and ECMAScript reads that offset-less form as LOCAL time. These run
// under a deliberately non-UTC timezone (IST, +05:30 -- the platform's actual
// audience) so a regression to plain `new Date(...)` fails here loudly instead
// of passing on a UTC CI box and locking Indian contributors out in production.
process.env.TZ = "Asia/Kolkata";

import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeServerTimestamp, parseServerTime, formatServerTime } from "./time";

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

test("the test process really is on a non-UTC timezone", () => {
  // Guards the guard: on UTC every assertion below would pass trivially.
  assert.equal(new Date("2026-08-21T10:00:00Z").getTimezoneOffset(), -330);
});

test("an offset-less Backend timestamp is read as UTC, not as local time", () => {
  const raw = "2026-08-21T10:00:00";
  assert.equal(parseServerTime(raw), Date.UTC(2026, 7, 21, 10, 0, 0));
  // The bug, stated explicitly: the naive parse lands 5h30m earlier.
  assert.equal(parseServerTime(raw)! - new Date(raw).getTime(), IST_OFFSET_MS);
});

test("microsecond precision from pydantic survives (truncated to ms)", () => {
  assert.equal(parseServerTime("2026-08-20T08:00:00.123456"), Date.UTC(2026, 7, 20, 8, 0, 0, 123));
});

test("an explicit designator or offset is left alone", () => {
  const utc = Date.UTC(2026, 7, 21, 10, 0, 0);
  assert.equal(parseServerTime("2026-08-21T10:00:00Z"), utc);
  assert.equal(parseServerTime("2026-08-21T15:30:00+05:30"), utc);
  assert.equal(normalizeServerTimestamp("2026-08-21T10:00:00Z"), "2026-08-21T10:00:00Z");
});

test("absent and unparseable timestamps are null, never NaN", () => {
  assert.equal(parseServerTime(null), null);
  assert.equal(parseServerTime(undefined), null);
  assert.equal(parseServerTime("not a date"), null);
  assert.equal(parseServerTime(new Date("nope")), null);
});

test("Date and epoch-ms inputs pass through", () => {
  const d = new Date(Date.UTC(2026, 7, 21, 10));
  assert.equal(parseServerTime(d), d.getTime());
  assert.equal(parseServerTime(d.getTime()), d.getTime());
});

// The defect the reviewer confirmed: the submission-window gate on
// /tournaments/$tournamentId. `windowOpen` is
//   status === "SUBMISSION_OPEN" && (closeMs === null || closeMs > now)
// with closeMs from the round's close instant. This reproduces that arithmetic
// at an instant 20 minutes BEFORE the close, in IST.
test("the submission window gate stays open until the real close instant", () => {
  const closeAt = "2026-08-21T10:00:00.000000"; // naive UTC, as Backend sends it
  const twentyMinutesBefore = Date.UTC(2026, 7, 21, 9, 40, 0);

  const closeMs = parseServerTime(closeAt);
  assert.equal(closeMs !== null && closeMs > twentyMinutesBefore, true);

  // Same instant, the old parse: the window reads as closed 5.5h too early.
  const naiveCloseMs = new Date(closeAt).getTime();
  assert.equal(naiveCloseMs > twentyMinutesBefore, false);
});

test("the gate closes once the real close instant passes", () => {
  const closeMs = parseServerTime("2026-08-21T10:00:00.000000")!;
  assert.equal(closeMs > Date.UTC(2026, 7, 21, 10, 0, 1), false);
});

test("formatServerTime renders the UTC instant in the viewer's own zone", () => {
  // 10:00 UTC is 15:30 IST. The leaderboard's "Published ..." line used to
  // show 10:00 to an IST reader.
  const out = formatServerTime("2026-08-21T10:00:00", { hour: "2-digit", minute: "2-digit" });
  assert.match(out!, /15:30|3:30/);
  assert.equal(formatServerTime(null), null);
});
