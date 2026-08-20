import { useEffect, useState } from "react";

import {
  AUTH_EVENT,
  clearTokens,
  getCurrentUserClaims,
  isAuthenticated,
  type JwtClaims,
} from "./auth";

export interface AuthState {
  ready: boolean; // hydrated on the client (false during SSR / first paint)
  authenticated: boolean;
  claims: JwtClaims | null;
  signOut: () => void;
}

// Client-side auth state. During SSR and the first paint `ready` is false and
// `authenticated` is false, so gated UI shows a neutral placeholder rather than
// flashing protected content before hydration.
export function useAuth(): AuthState {
  const [state, setState] = useState<{ authenticated: boolean; claims: JwtClaims | null; ready: boolean }>({
    authenticated: false,
    claims: null,
    ready: false,
  });

  useEffect(() => {
    const sync = () =>
      setState({ authenticated: isAuthenticated(), claims: getCurrentUserClaims(), ready: true });
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { ...state, signOut: () => clearTokens() };
}
