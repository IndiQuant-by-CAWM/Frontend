import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Loader2, Trophy } from "lucide-react";

import { AppShell, StatusBadge } from "@/components/site/AppShell";
import { RequireAuth } from "@/components/site/RequireAuth";
import { CountdownChip } from "@/components/site/Countdown";
import { tournamentsApi, ApiError, type Tournament } from "@/lib/api";

export const Route = createFileRoute("/tournaments/")({
  head: () => ({
    meta: [
      { title: "Tournaments — IndiQuant" },
      { name: "description", content: "Active research tournaments and their submission windows." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TournamentsPage,
});

function TournamentsPage() {
  return (
    <AppShell>
      <RequireAuth redirectTo="/tournaments">
        <TournamentsList />
      </RequireAuth>
    </AppShell>
  );
}

function TournamentsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tournaments"],
    queryFn: () => tournamentsApi.list(),
    refetchInterval: 60_000, // 1h cadence — a light refresh keeps windows current
  });

  return (
    <div className="container-page py-16 sm:py-20">
      <header className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          <Trophy size={13} strokeWidth={1.75} />
          Tournaments
        </div>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
          Research rounds
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Predict relative returns on an anonymized universe of Indian equities. Submissions
          run on a 1-hour cadence — each round locks, then scores one horizon later.
        </p>
      </header>

      {isLoading && (
        <div className="flex items-center gap-2 py-16 text-sm text-white/40">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading tournaments…
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-xl border border-[#ff8a8a]/25 bg-[#ff8a8a]/[0.06] px-5 py-4 text-sm text-[#ffb4b4]">
          {error instanceof ApiError ? error.message : "Failed to load tournaments."}
        </div>
      )}

      {!isLoading && !error && data && data.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/45">
          No tournaments are open right now. Check back soon.
        </div>
      )}

      {!isLoading && !error && data && data.length > 0 && (
        <ul className="grid gap-4">
          {data.map((t) => (
            <TournamentRow key={t.id} tournament={t} />
          ))}
        </ul>
      )}
    </div>
  );
}

function TournamentRow({ tournament: t }: { tournament: Tournament }) {
  const isOpen = t.status === "SUBMISSION_OPEN";
  const isScored = t.status === "SCORED" || t.status === "COMPLETE";

  return (
    <li>
      <Link
        to="/tournaments/$tournamentId"
        params={{ tournamentId: String(t.id) }}
        className="group block rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.03]"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <StatusBadge status={String(t.status)} />
              <span className="font-mono text-[11px] text-white/35">
                {t.dataset_version} · era {t.target_era}
              </span>
            </div>
            <h2 className="mt-3 truncate text-lg font-medium tracking-tight text-white">
              {t.tournament_name}
            </h2>
          </div>
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            className="mt-1 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {isOpen ? (
            <CountdownChip target={t.submission_close_at} prefix="Locks in" elapsedLabel="lock imminent" />
          ) : isScored ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/[0.08] px-3 py-1 font-mono text-[11px] text-sky-200">
              Results available
            </span>
          ) : t.status === "LOCKED" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-3 py-1 font-mono text-[11px] text-amber-200">
              Locked · scoring
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/45">
              Not yet open
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}
