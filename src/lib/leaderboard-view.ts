// Which of the public leaderboard's mutually exclusive states to render.
//
// Kept out of the route component (and free of any React/`import.meta.env`
// dependency) so the precedence between "we have a published board" and "the
// background poll just failed" is a pure function with its own test.
//
// The precedence that matters: an already-rendered board OUTRANKS a poll
// error. The board is a snapshot pinned with `staleTime: Infinity` precisely
// so it does not move under a reader; letting one transient 5xx on a 60s
// background poll replace it with a red error panel would be a far bigger
// disruption than the re-sort that pinning exists to prevent. React Query
// keeps the data across the failure -- so we render it, and say it is stale
// non-destructively instead.

export type BoardView<Row> =
  | { kind: "loading" }
  /** Backend 404s the public route until the round reaches SCORED. */
  | { kind: "unpublished" }
  | { kind: "error" }
  /** The round scored, but with no ranked submissions. */
  | { kind: "empty" }
  | { kind: "rows"; rows: Row[]; stale: boolean };

export function boardView<Row>(input: {
  isLoading: boolean;
  isNotFound: boolean;
  hasError: boolean;
  rows: Row[] | undefined;
}): BoardView<Row> {
  const { isLoading, isNotFound, hasError, rows } = input;

  // Anything we can still show beats anything we can only apologise for.
  if (rows && rows.length > 0) return { kind: "rows", rows, stale: hasError };
  if (isLoading) return { kind: "loading" };
  if (isNotFound) return { kind: "unpublished" };
  if (hasError) return { kind: "error" };
  return { kind: "empty" };
}
