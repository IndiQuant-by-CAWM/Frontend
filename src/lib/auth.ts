// Client-side auth state: JWT tokens live in localStorage (per Backend CORS
// notes — bearer tokens in the Authorization header, not cookies). All access
// is guarded for SSR, where `window`/`localStorage` do not exist.

const ACCESS_TOKEN_KEY = "iq.access_token";
const REFRESH_TOKEN_KEY = "iq.refresh_token";

// Fired whenever tokens change so components can re-render auth state.
export const AUTH_EVENT = "iq-auth-change";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearTokens(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isAuthenticated(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  const claims = decodeJwt(token);
  if (!claims) return true; // opaque token — assume valid until the API says otherwise
  if (typeof claims.exp === "number" && claims.exp * 1000 < Date.now()) return false;
  return true;
}

export interface JwtClaims {
  sub?: string | number;
  role?: string;
  email?: string;
  exp?: number;
  type?: string;
  [key: string]: unknown;
}

// Decodes the JWT payload for display only (role/email). NOT a security check —
// the Backend verifies the signature; the client never trusts these for access.
export function decodeJwt(token: string): JwtClaims | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const json =
      typeof atob !== "undefined"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("binary");
    return JSON.parse(json) as JwtClaims;
  } catch {
    return null;
  }
}

export function getCurrentUserClaims(): JwtClaims | null {
  const token = getAccessToken();
  return token ? decodeJwt(token) : null;
}
