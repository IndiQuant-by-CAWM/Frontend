import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/lib/useAuth";

// Client-side auth gate for tournament pages. Redirects unauthenticated users
// to /sign-in (preserving where they were headed). During SSR / pre-hydration
// it renders a neutral loader so protected content never flashes.
export function RequireAuth({ children, redirectTo }: { children: ReactNode; redirectTo?: string }) {
  const { ready, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authenticated) {
      navigate({
        to: "/sign-in",
        search: redirectTo ? { redirect: redirectTo } : undefined,
      });
    }
  }, [ready, authenticated, navigate, redirectTo]);

  if (!ready || !authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-white/40" aria-label="Loading" />
      </div>
    );
  }

  return <>{children}</>;
}
