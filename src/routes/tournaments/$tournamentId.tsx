import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/site/Button";
import { PLATFORM_URL } from "@/lib/platform";

/**
 * Redirects to the participant platform.
 *
 * The pilot's rounds page rendered from this site's own API client, which in
 * production pointed at localhost. Rounds, datasets and submissions live on
 * the v3 platform; the route is kept so old links resolve, and sends people
 * where the application actually is. Same shape as /sign-in.
 */
export const Route = createFileRoute("/tournaments/$tournamentId")({
  head: () => ({
    meta: [
      { title: "Round: IndiQuant" },
      { name: "description", content: "Rounds live on the IndiQuant participant platform." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RoundsRedirect,
});

function RoundsRedirect() {
  useEffect(() => {
    window.location.replace(PLATFORM_URL);
  }, []);

  return (
    <AuthShell
      eyebrow="Rounds"
      title="Round"
      description="Rounds live on the IndiQuant platform."
      footer={null}
    >
      <p className="text-sm text-muted-foreground">
        Rounds, datasets and submissions live on the platform. If you are not redirected
        automatically, use the button below.
      </p>
      <Button as="a" href={PLATFORM_URL} withArrow className="mt-4">
        Open the platform
      </Button>
    </AuthShell>
  );
}
