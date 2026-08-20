import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Loader2, Medal, Trophy } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/site/Button";
import { Input } from "@/components/site/Field";
import {
  ApiError,
  leaderboardApi,
  tournamentsApi,
  type PublicLeaderboardEntry,
  type Tournament,
} from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

interface LeaderboardSearch {
  tournament?: number;
}

export const Route = createFileRoute("/leaderboard")({
  validateSearch: (search: Record<string, unknown>): LeaderboardSearch => {
    const raw = search.tournament;
    const n = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
    return Number.isInteger(n) && n > 0 ? { tournament: n } : {};
  },
  head: () => ({
    meta: [
      { title: "Leaderboard — IndiQuant" },
      {
        name: "description",
        content:
          "Published results for IndiQuant research rounds: contributor handles, composite scores and ranks.",
      },
      { property: "og:title", content: "Leaderboard — IndiQuant" },
      { property: "og:url", content: "/leaderboard" },
    ],
    links: [{ rel: "canonical", href: "/leaderboard" }],
  }),
  component: LeaderboardPage,
});

// This is the one page on the platform served without a token — it is
// deliberately NOT wrapped in RequireAuth. Everything it renders comes from
// Backend's public leaderboard model, which carries a handle, a composite
// score, a rank and a scoring timestamp and nothing else. Component scores,
// selection thresholds and account identity stay server-side (root
// CLAUDE.md §2 guardrail #5).
function LeaderboardPage() {
  const { tournament } = Route.useSearch();

  return (
    <PageShell>
      <section className="container-page pt-36 pb-28 sm:pt-44 sm:pb-36">
        <header className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            <Trophy size={13} strokeWidth={1.75} />
            Public results
          </div>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
            Leaderboard
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Published standings for a scored research round. A round appears here only once its
            batch has been scored — there is no partial or provisional view.
          </p>
        </header>

        <RoundSelector selected={tournament} />

        {tournament == null ? (
          <p className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/45">
            Choose a round to see its published standings.
          </p>
        ) : (
          <Board tournamentId={tournament} />
        )}
      </section>
    </PageShell>
  );
}

// Backend has no unauthenticated route that enumerates tournaments, so an
// anonymous visitor reaches a board by round number (from the round's own
// page or its announcement). Signed-in contributors get the real picker.
function RoundSelector({ selected }: { selected?: number }) {
  const navigate = useNavigate();
  const { ready, authenticated } = useAuth();

  const { data } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => tournamentsApi.list(),
    enabled: ready && authenticated,
  });

  const published = (data ?? []).filter(
    (t: Tournament) => t.status === "SCORED" || t.status === "COMPLETE",
  );

  if (published.length > 0) {
    return (
      <div className="mt-10 flex flex-wrap gap-2">
        {published.map((t) => (
          <button
            key={t.id}
            onClick={() => navigate({ to: "/leaderboard", search: { tournament: t.id } })}
            className={`rounded-full border px-4 py-1.5 font-mono text-[11px] transition-colors ${
              t.id === selected
                ? "border-white/30 bg-white/[0.06] text-white"
                : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25 hover:text-white"
            }`}
          >
            {t.tournament_name}
          </button>
        ))}
      </div>
    );
  }

  return <RoundNumberForm selected={selected} />;
}

function RoundNumberForm({ selected }: { selected?: number }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(selected ? String(selected) : "");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) return;
    navigate({ to: "/leaderboard", search: { tournament: n } });
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 flex max-w-sm items-end gap-3">
      <div className="flex-1">
        <label
          htmlFor="round"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45"
        >
          Round
        </label>
        <Input
          id="round"
          name="round"
          inputMode="numeric"
          placeholder="e.g. 12"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button type="submit" size="md" variant="ghost">
        View
      </Button>
    </form>
  );
}

// The published watermark: the most recent scoring timestamp on the board.
// It is the React Query cache key for the rendered snapshot, which is then
// pinned with `staleTime: Infinity`. That is the point — a poll returning the
// same watermark cannot re-render or re-sort the table, so contributors never
// watch a ranking shuffle under them between batches. Only a genuinely new
// (or re-run) scoring batch advances the watermark and swaps the snapshot.
function publishedWatermark(rows: PublicLeaderboardEntry[] | undefined): string | null {
  if (!rows || rows.length === 0) return null;
  return rows.reduce(
    (latest, r) => (r.last_scored_at > latest ? r.last_scored_at : latest),
    rows[0].last_scored_at,
  );
}

function Board({ tournamentId }: { tournamentId: number }) {
  // The watch query. Backend 404s this route until the round reaches SCORED,
  // so there is nothing to render mid-computation; once scored, this exists
  // only to notice that the watermark moved.
  const watch = useQuery({
    queryKey: ["leaderboard", "public", tournamentId, "watch"],
    queryFn: () => leaderboardApi.getPublic(tournamentId),
    refetchInterval: 60_000, // the platform scores hourly; a minute is plenty
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 404) && failureCount < 2,
  });

  const watermark = publishedWatermark(watch.data);

  // The rendered snapshot, keyed on the watermark. `initialData` hands it the
  // rows the watch query already fetched, so a new batch costs no extra
  // request; `staleTime: Infinity` then freezes that snapshot for its key.
  const board = useQuery({
    queryKey: ["leaderboard", "public", tournamentId, watermark],
    queryFn: () => leaderboardApi.getPublic(tournamentId),
    enabled: watermark !== null,
    initialData: watermark !== null ? watch.data : undefined,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  if (watch.isLoading) {
    return (
      <div className="mt-10 flex items-center gap-2 py-16 text-sm text-white/40">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading standings…
      </div>
    );
  }

  if (watch.error instanceof ApiError && watch.error.status === 404) {
    return (
      <p className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/45">
        No published results for round {tournamentId} yet.
      </p>
    );
  }

  if (watch.error) {
    return (
      <p className="mt-10 rounded-xl border border-[#ff8a8a]/25 bg-[#ff8a8a]/[0.06] px-5 py-4 text-sm text-[#ffb4b4]">
        {watch.error instanceof ApiError ? watch.error.message : "Failed to load the leaderboard."}
      </p>
    );
  }

  const rows = board.data;
  if (!rows || rows.length === 0) {
    return (
      <p className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/45">
        This round scored with no ranked submissions.
      </p>
    );
  }

  return (
    <>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.015]">
        <table className="w-full min-w-[420px] text-left">
          <thead>
            <tr className="border-b border-white/[0.07] font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              <th className="px-6 py-4 font-normal">Rank</th>
              <th className="px-6 py-4 font-normal">Contributor</th>
              <th className="px-6 py-4 text-right font-normal">Composite score</th>
            </tr>
          </thead>
          <tbody>
            {/* Rendered in the order Backend returned. The frontend never
                re-ranks or re-scores a published board (Frontend/CLAUDE.md §9). */}
            {rows.map((row, i) => (
              <tr
                key={`${row.rank ?? "unranked"}-${row.display_name ?? "anonymous"}-${i}`}
                className="border-b border-white/[0.04] last:border-b-0"
              >
                <td className="px-6 py-4 font-mono text-sm tabular-nums text-white/70">
                  <span className="inline-flex items-center gap-2">
                    {row.rank != null && row.rank <= 3 && (
                      <Medal size={13} strokeWidth={1.75} className="text-white/50" />
                    )}
                    {row.rank ?? "—"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {row.display_name ?? <span className="text-white/40">anonymous</span>}
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm tabular-nums text-white/75">
                  {row.composite_score != null ? row.composite_score.toFixed(4) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {watermark && (
        <p className="mt-4 font-mono text-[11px] text-white/30">
          Published {new Date(watermark).toLocaleString()}
        </p>
      )}
    </>
  );
}
