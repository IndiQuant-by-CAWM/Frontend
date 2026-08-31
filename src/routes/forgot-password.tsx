import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/site/Button";
import { PLATFORM_SIGNIN_URL } from "@/lib/platform";

/**
 * Redirects to the participant platform, matching /sign-in and /sign-up.
 *
 * This page used to render a reset form that called nothing at all: it checked
 * the address with a regex and then showed "Check your inbox. If an account
 * exists, a reset link is on its way." No request was ever made, so a locked-out
 * contributor waited for mail that had not been queued.
 *
 * Accounts live on the platform, so password recovery does too. The route is
 * kept so old links still resolve.
 */
export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — IndiQuant" },
      {
        name: "description",
        content: "Reset your IndiQuant password on the participant platform.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordRedirect,
});

function ForgotPasswordRedirect() {
  useEffect(() => {
    window.location.replace(PLATFORM_SIGNIN_URL);
  }, []);

  return (
    <AuthShell
      eyebrow="Recover"
      title="Reset your password"
      description="Password recovery happens on the IndiQuant platform."
      footer={null}
    >
      <p className="text-sm text-muted-foreground">
        Password recovery happens on the IndiQuant platform, where your account lives. If you are
        not redirected automatically, use the button below.
      </p>
      <Button as="a" href={PLATFORM_SIGNIN_URL} withArrow className="mt-4">
        Continue to the platform
      </Button>
    </AuthShell>
  );
}
