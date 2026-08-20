import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Upload } from "lucide-react";

import { AppShell, StatusBadge } from "@/components/site/AppShell";
import { RequireAuth } from "@/components/site/RequireAuth";
import { Countdown } from "@/components/site/Countdown";
import { Button } from "@/components/site/Button";
import { useNow } from "@/hooks/use-now";
import {
  ApiError,
  datasetsApi,
  submissionsApi,
  tournamentsApi,
  type CurrentDataset,
  type SubmissionResponse,
  type Tournament,
} from "@/lib/api";

export const Route = createFileRoute("/tournaments/$tournamentId")({
  head: () => ({
    meta: [
      { title: "Round — IndiQuant" },
      { name: "description", content: "Tournament round detail and prediction upload." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TournamentDetailPage,
});

function TournamentDetailPage() {
  const { tournamentId } = Route.useParams();

  return (
    <AppShell>
      <RequireAuth redirectTo={`/tournaments/${tournamentId}`}>
        <TournamentDetail tournamentId={Number(tournamentId)} />
      </RequireAuth>
    </AppShell>
  );
}

function TournamentDetail({ tournamentId }: { tournamentId: number }) {
  const {
    data: tournament,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: () => tournamentsApi.get(tournamentId),
    enabled: Number.isInteger(tournamentId),
    refetchInterval: 60_000, // status moves on the hour: OPEN → LOCKED → SCORED
  });

  // Only the currently-open round has a dataset config to fetch, and the route
  // 404s between windows — so no retry, and an absent result is a normal state.
  const { data: dataset } = useQuery({
    queryKey: ["dataset", "current"],
    queryFn: () => datasetsApi.current(),
    enabled: tournament?.status === "SUBMISSION_OPEN",
    retry: false,
  });

  if (!Number.isInteger(tournamentId)) {
    return <Notice>That round id is not valid.</Notice>;
  }

  if (isLoading) {
    return (
      <div className="container-page flex items-center gap-2 py-24 text-sm text-white/40">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading round…
      </div>
    );
  }

  if (error || !tournament) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <Notice tone={notFound ? "muted" : "error"}>
        {notFound
          ? "That round does not exist."
          : error instanceof ApiError
            ? error.message
            : "Failed to load this round."}
      </Notice>
    );
  }

  // A round's own `submission_close_at` is not stamped until it actually
  // locks, so while the window is open the dataset endpoint is the only
  // source of the close instant. Guarded on tournament_id so a stale cached
  // config from a previous round can never be shown as this round's deadline.
  const closeAt =
    tournament.submission_close_at ??
    (dataset?.tournament_id === tournament.id ? dataset.submission_close_at : null);

  return (
    <div className="container-page py-16 sm:py-20">
      <Link
        to="/tournaments"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70"
      >
        <ArrowLeft size={13} strokeWidth={1.75} />
        All rounds
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={String(tournament.status)} />
          <span className="font-mono text-[11px] text-white/35">
            {tournament.dataset_version} · era {tournament.target_era} ·{" "}
            {tournament.horizon_minutes}m horizon
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl">
          {tournament.tournament_name}
        </h1>
      </header>

      <WindowPanel tournament={tournament} closeAt={closeAt} dataset={dataset} />

      <SubmitPanel tournament={tournament} closeAt={closeAt} />
    </div>
  );
}

function WindowPanel({
  tournament,
  closeAt,
  dataset,
}: {
  tournament: Tournament;
  closeAt: string | null;
  dataset: CurrentDataset | undefined;
}) {
  const isOpen = tournament.status === "SUBMISSION_OPEN";
  const isScored = tournament.status === "SCORED" || tournament.status === "COMPLETE";

  return (
    <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        {isOpen ? "Submissions lock in" : isScored ? "Round scored" : "Submission window"}
      </div>

      <div className="mt-5">
        {isOpen ? (
          <Countdown target={closeAt} elapsedLabel="Lock imminent" />
        ) : (
          <p className="text-sm text-white/55">
            {tournament.status === "LOCKED"
              ? "Locked — scoring runs one prediction horizon after the lock."
              : isScored
                ? "Results for this round are published."
                : "This round has not opened for submissions yet."}
          </p>
        )}
      </div>

      {dataset?.tournament_id === tournament.id && (
        <dl className="mt-8 grid gap-6 border-t border-white/[0.06] pt-6 sm:grid-cols-3">
          <Stat label="Ids in era" value={String(dataset.id_universe.length)} />
          <Stat label="Feature columns" value={String(dataset.feature_columns.length)} />
          <Stat label="Dataset rows" value={dataset.row_count.toLocaleString()} />
        </dl>
      )}

      {isScored && (
        <div className="mt-8 border-t border-white/[0.06] pt-6">
          <Link
            to="/leaderboard"
            search={{ tournament: tournament.id }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            View published standings →
          </Link>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</dt>
      <dd className="mt-2 font-mono text-lg tabular-nums text-white">{value}</dd>
    </div>
  );
}

function SubmitPanel({ tournament, closeAt }: { tournament: Tournament; closeAt: string | null }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const now = useNow();

  // The server is the authority on the window (it re-checks status AND the
  // close timestamp on every upload). This disable exists so the UI does not
  // invite a submission it already knows will be rejected — it is never the
  // thing that actually enforces the deadline.
  const closeMs = closeAt ? new Date(closeAt).getTime() : null;
  const windowOpen = tournament.status === "SUBMISSION_OPEN" && (closeMs === null || closeMs > now);

  const mutation = useMutation<SubmissionResponse, unknown, File>({
    mutationFn: (f) => submissionsApi.submit(tournament.id, f, f.name),
    onSuccess: () => {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["tournament", tournament.id] });
    },
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalError(null);
    mutation.reset();
    // Presence and emptiness only. Column, id-universe and score-range checks
    // belong to the server's validator (Frontend/CLAUDE.md §7) — duplicating
    // them here would make the browser a second, drifting source of truth.
    if (!file) {
      setLocalError("Choose a CSV file to submit.");
      return;
    }
    if (file.size === 0) {
      setLocalError("That file is empty.");
      return;
    }
    mutation.mutate(file);
  }

  return (
    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 sm:p-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        Submit predictions
      </div>

      <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-white/55">
        <li>
          CSV with exactly two columns: <code className="font-mono text-white/75">id</code> and{" "}
          <code className="font-mono text-white/75">score</code>.
        </li>
        <li>
          Every <code className="font-mono text-white/75">id</code> in this round&rsquo;s era
          universe must appear exactly once — no extras, no duplicates, no blanks.
        </li>
        <li>
          <code className="font-mono text-white/75">score</code> is a signed confidence in{" "}
          <span className="font-mono text-white/75">[-1, 1]</span>: the sign is your predicted
          direction, the magnitude your conviction.
        </li>
      </ul>

      <form onSubmit={onSubmit} className="mt-7">
        <input
          ref={fileInputRef}
          id="predictions"
          type="file"
          accept=".csv,text/csv"
          disabled={!windowOpen || mutation.isPending}
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setLocalError(null);
            mutation.reset();
          }}
          className="block w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition-colors file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-1.5 file:text-xs file:text-white hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        />

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={!windowOpen || mutation.isPending} withArrow>
            {mutation.isPending ? "Uploading…" : "Upload submission"}
          </Button>
          {!windowOpen && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/40">
              <Upload size={12} strokeWidth={1.75} />
              {tournament.status === "SUBMISSION_OPEN"
                ? "Window closed — waiting for the lock"
                : "This round is not accepting submissions"}
            </span>
          )}
        </div>
      </form>

      {localError && (
        <p className="mt-5 rounded-lg border border-[#ff8a8a]/30 bg-[#ff8a8a]/10 px-3 py-2 text-xs text-[#ff8a8a]">
          {localError}
        </p>
      )}

      {mutation.error != null && <RejectionNotice error={mutation.error} />}

      {mutation.isSuccess && mutation.data && <AcceptedNotice submission={mutation.data} />}
    </div>
  );
}

// A rejected CSV is the moment a researcher most needs specifics: Backend
// answers 422 with a list of {field, error} objects, one per rule broken, and
// each is surfaced verbatim rather than collapsed into "invalid file".
function RejectionNotice({ error }: { error: unknown }) {
  const rules = validationRules(error);

  return (
    <div className="mt-5 rounded-xl border border-[#ff8a8a]/25 bg-[#ff8a8a]/[0.06] px-5 py-4 text-sm text-[#ffb4b4]">
      <p className="font-medium">Submission rejected.</p>
      {rules ? (
        <ul className="mt-3 space-y-2">
          {rules.map((r, i) => (
            <li key={i} className="flex flex-wrap gap-x-2 text-xs leading-relaxed">
              <span className="font-mono uppercase tracking-[0.16em] text-[#ffb4b4]/60">
                {r.field}
              </span>
              <span className="flex-1 min-w-[12rem]">{r.error}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs">
          {error instanceof ApiError ? error.message : "Could not reach the server."}
        </p>
      )}
    </div>
  );
}

function validationRules(error: unknown): { field: string; error: string }[] | null {
  if (!(error instanceof ApiError)) return null;
  const detail = error.detail;
  if (!detail || typeof detail !== "object" || !("errors" in detail)) return null;
  const raw = (detail as { errors: unknown }).errors;
  if (!Array.isArray(raw)) return null;
  return raw.map((e) =>
    e && typeof e === "object"
      ? {
          field: String((e as Record<string, unknown>).field ?? "file"),
          error: String((e as Record<string, unknown>).error ?? ""),
        }
      : { field: "file", error: String(e) },
  );
}

function AcceptedNotice({ submission }: { submission: SubmissionResponse }) {
  return (
    <div className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-5 py-4 text-sm text-emerald-200">
      <p className="inline-flex items-center gap-2 font-medium">
        <CheckCircle2 size={15} strokeWidth={1.75} />
        Submission accepted.
      </p>
      <p className="mt-2 font-mono text-[11px] text-emerald-200/70">
        #{submission.id} · {submission.row_count.toLocaleString()} rows ·{" "}
        {submission.file_hash.slice(0, 12)}
      </p>
    </div>
  );
}

function Notice({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "error" }) {
  return (
    <div className="container-page py-24">
      <div
        className={
          tone === "error"
            ? "rounded-xl border border-[#ff8a8a]/25 bg-[#ff8a8a]/[0.06] px-5 py-4 text-sm text-[#ffb4b4]"
            : "rounded-xl border border-white/10 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/45"
        }
      >
        {children}
      </div>
    </div>
  );
}
