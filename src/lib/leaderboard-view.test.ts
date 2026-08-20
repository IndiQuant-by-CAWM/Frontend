import { test } from "node:test";
import assert from "node:assert/strict";

import { boardView } from "./leaderboard-view";

const rows = [{ rank: 1 }, { rank: 2 }];

// The confirmed defect: the route evaluated `if (watch.error)` before it
// rendered `board.data`, so one failed 60s background poll replaced a
// perfectly good published leaderboard with a red error panel.
test("a failed background poll does not discard an already-rendered board", () => {
  const view = boardView({ isLoading: false, isNotFound: false, hasError: true, rows });
  assert.equal(view.kind, "rows");
  assert.deepEqual(view.kind === "rows" && view.rows, rows);
  assert.equal(view.kind === "rows" && view.stale, true);
});

test("a healthy board is not marked stale", () => {
  const view = boardView({ isLoading: false, isNotFound: false, hasError: false, rows });
  assert.equal(view.kind === "rows" && view.stale, false);
});

test("an error with nothing cached still surfaces as an error", () => {
  assert.equal(
    boardView({ isLoading: false, isNotFound: false, hasError: true, rows: undefined }).kind,
    "error",
  );
  assert.equal(
    boardView({ isLoading: false, isNotFound: false, hasError: true, rows: [] }).kind,
    "error",
  );
});

test("404 (round not scored yet) outranks the generic error panel", () => {
  assert.equal(
    boardView({ isLoading: false, isNotFound: true, hasError: true, rows: undefined }).kind,
    "unpublished",
  );
});

test("the first load shows the spinner", () => {
  assert.equal(
    boardView({ isLoading: true, isNotFound: false, hasError: false, rows: undefined }).kind,
    "loading",
  );
});

test("a round scored with no ranked submissions is empty, not an error", () => {
  assert.equal(
    boardView({ isLoading: false, isNotFound: false, hasError: false, rows: [] }).kind,
    "empty",
  );
});
