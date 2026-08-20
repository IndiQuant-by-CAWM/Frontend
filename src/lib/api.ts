// Typed API client for the IndiQuant Backend + Auth services.
//
// Base URLs come from env vars (see .env.example):
//   VITE_API_BASE  -> Backend, includes /api/v1  (tournaments, submit, leaderboard)
//   VITE_AUTH_BASE -> Auth service root          (/auth/login, /auth/register, ...)
//
// The fetch wrapper attaches the JWT bearer token from localStorage on every
// Backend call. This platform is a Numerai-style tournament for Indian equities:
// every instrument id crossing this boundary is an ANONYMIZED/obfuscated code —
// never a real ticker or ISIN. No trading/broker surface exists here.

import { getAccessToken, clearTokens } from "./auth";

const RAW_API_BASE = import.meta.env.VITE_API_BASE as string | undefined;
const RAW_AUTH_BASE = import.meta.env.VITE_AUTH_BASE as string | undefined;

// Sensible localhost defaults so the app builds/runs without a .env present.
export const API_BASE = (RAW_API_BASE ?? "http://localhost:8000/api/v1").replace(/\/$/, "");
export const AUTH_BASE = (RAW_AUTH_BASE ?? "http://localhost:8001").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  detail: unknown;
  constructor(status: number, detail: unknown, message?: string) {
    super(message ?? `Request failed (${status})`);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

interface RequestOptions {
  method?: string;
  body?: BodyInit | null;
  headers?: Record<string, string>;
  auth?: boolean; // attach bearer token (default true)
  json?: unknown; // convenience: JSON-serialize and set content-type
}

async function request<T>(baseUrl: string, path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", auth = true, json, headers = {} } = opts;
  let body = opts.body;

  const finalHeaders: Record<string, string> = { Accept: "application/json", ...headers };

  if (json !== undefined) {
    body = JSON.stringify(json);
    finalHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAccessToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, { method, headers: finalHeaders, body });

  if (res.status === 401 && auth) {
    // Token missing/expired/invalid — drop it so the UI can re-gate to sign-in.
    clearTokens();
  }

  if (res.status === 204) return undefined as T;

  const contentType = res.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const detail =
      payload && typeof payload === "object" && "detail" in payload
        ? (payload as { detail: unknown }).detail
        : payload;
    throw new ApiError(res.status, detail, humanizeDetail(detail) ?? `Request failed (${res.status})`);
  }

  return payload as T;
}

function humanizeDetail(detail: unknown): string | undefined {
  if (typeof detail === "string") return detail.replace(/_/g, " ");
  if (detail && typeof detail === "object" && "errors" in detail) {
    const errs = (detail as { errors: unknown }).errors;
    if (Array.isArray(errs)) {
      return errs
        .map((e) =>
          e && typeof e === "object"
            ? Object.values(e as Record<string, unknown>).join(": ")
            : String(e),
        )
        .join("; ");
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Types (mirror the Backend/Auth pydantic schemas)
// ---------------------------------------------------------------------------

export type TournamentStatus =
  | "ANNOUNCED"
  | "SUBMISSION_OPEN"
  | "LOCKED"
  | "SCORED"
  | "COMPLETE";

export interface Tournament {
  id: number;
  tournament_name: string;
  dataset_version: string;
  target_era: string;
  status: TournamentStatus | string;
  submission_open_at: string | null;
  submission_close_at: string | null;
  created_at: string;
}

export interface SubmissionResponse {
  id: number;
  tournament_id: number;
  user_id: number;
  file_hash: string;
  row_count: number;
  created_at: string;
}

// Participant-facing leaderboard row — composite score + rank only, never the
// raw scoring components (per Scoring-Engine/CLAUDE.md §8a).
export interface LeaderboardEntry {
  submission_id: number;
  user_id: number;
  composite_score: number | null;
  rank: number | null;
  qualification_status: string | null;
  computed_at: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: string;
  is_verified: boolean;
  verification_token?: string | null;
}

// ---------------------------------------------------------------------------
// Auth service calls
// ---------------------------------------------------------------------------

export const authApi = {
  login(email: string, password: string): Promise<TokenPair> {
    return request<TokenPair>(AUTH_BASE, "/auth/login", {
      method: "POST",
      auth: false,
      json: { email, password },
    });
  },
  register(email: string, password: string): Promise<RegisterResponse> {
    return request<RegisterResponse>(AUTH_BASE, "/auth/register", {
      method: "POST",
      auth: false,
      json: { email, password },
    });
  },
  refresh(refreshToken: string): Promise<TokenPair> {
    return request<TokenPair>(AUTH_BASE, "/auth/refresh", {
      method: "POST",
      auth: false,
      json: { refresh_token: refreshToken },
    });
  },
};

// ---------------------------------------------------------------------------
// Backend tournament / submission / leaderboard calls
// ---------------------------------------------------------------------------

export const tournamentsApi = {
  list(): Promise<Tournament[]> {
    return request<Tournament[]>(API_BASE, "/tournaments/");
  },
  listActive(): Promise<Tournament[]> {
    return request<Tournament[]>(API_BASE, "/tournaments/active");
  },
  get(tournamentId: number): Promise<Tournament> {
    return request<Tournament>(API_BASE, `/tournaments/${tournamentId}`);
  },
};

export const submissionsApi = {
  // Submits a prediction file (CSV with `id,score` columns of obfuscated codes).
  // Backend takes tournament_id as a query param and the file as multipart `file`.
  submit(tournamentId: number, file: File | Blob, filename = "predictions.csv"): Promise<SubmissionResponse> {
    const form = new FormData();
    form.append("file", file, filename);
    return request<SubmissionResponse>(
      API_BASE,
      `/submit/?tournament_id=${encodeURIComponent(tournamentId)}`,
      { method: "POST", body: form },
    );
  },
};

export const leaderboardApi = {
  get(tournamentId: number): Promise<LeaderboardEntry[]> {
    return request<LeaderboardEntry[]>(
      API_BASE,
      `/leaderboard/?tournament_id=${encodeURIComponent(tournamentId)}`,
    );
  },
};
