import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/site/Button";
import { PLATFORM_SIGNIN_URL } from "@/lib/platform";

/**
 * Redirects to the participant platform.
 *
 * This page used to render a real sign-in form against this site's own API
 * client, and in production that form could not work: the Pages workflow sets no
 * VITE_AUTH_BASE, so the shipped bundle carries the localhost fallback and every
 * visitor's browser calls its own machine. It failed silently, looking like a
 * broken platform rather than a misconfigured one.
 *
 * Accounts, datasets and submissions all live on the platform, so rather than
 * wire this marketing site up as a second front door to the same API, the route
 * is kept -- old links and bookmarks still resolve -- and sends people where the
 * application actually is.
 *
 * The redirect runs on mount, and the visible button covers the moment before
 * that happens -- a slow load should still show somewhere to click rather than
 * an apparently empty page. It is NOT a no-JavaScript fallback: this whole site
 * is a client-rendered SPA, so a visitor without JavaScript sees nothing on any
 * route, and a meta-refresh here (tried, and not emitted by this router's head
 * handling) would not have changed that.
 */
export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign In — IndiQuant" },
      { name: "description", content: "Sign in to the IndiQuant participant platform." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignInRedirect,
});

function SignInRedirect() {
  useEffect(() => {
    window.location.replace(PLATFORM_SIGNIN_URL);
  }, []);

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign In"
      description="Signing in happens on the IndiQuant platform."
      footer={null}
    >
      <p className="text-sm text-muted-foreground">
        Signing in happens on the IndiQuant platform. If you are not redirected automatically, use
        the button below.
      </p>
      <Button as="a" href={PLATFORM_SIGNIN_URL} withArrow className="mt-4">
        Sign in on the platform
      </Button>
    </AuthShell>
  );
}
