import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/site/Button";
import { PLATFORM_SIGNUP_URL } from "@/lib/platform";

/**
 * Redirects to the participant platform.
 *
 * This page used to render a real registration form against this site's own API
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
export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create Account — IndiQuant" },
      {
        name: "description",
        content: "Create your IndiQuant account on the participant platform.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignUpRedirect,
});

function SignUpRedirect() {
  useEffect(() => {
    window.location.replace(PLATFORM_SIGNUP_URL);
  }, []);

  return (
    <AuthShell
      eyebrow="Join IndiQuant"
      title="Create Account"
      description="Creating an account happens on the IndiQuant platform."
      footer={null}
    >
      <p className="text-sm text-muted-foreground">
        Creating an account happens on the IndiQuant platform. If you are not redirected
        automatically, use the button below.
      </p>
      <Button as="a" href={PLATFORM_SIGNUP_URL} withArrow className="mt-4">
        Continue to the platform
      </Button>
    </AuthShell>
  );
}
