import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/site/Button";
import { Field, Input } from "@/components/site/Field";
import { AuthShell } from "@/components/site/AuthShell";
import { authApi, ApiError } from "@/lib/api";
import { setTokens } from "@/lib/auth";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create Account — IndiQuant" },
      {
        name: "description",
        content: "Create your IndiQuant account and join the next research round.",
      },
      { property: "og:title", content: "Create Account — IndiQuant" },
      { property: "og:url", content: "/sign-up" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/sign-up" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const f = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(f.get("name") ?? "").trim()) next.name = "Please enter your name.";
    const email = String(f.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
    const pw = String(f.get("password") ?? "");
    if (pw.length < 8) next.password = "At least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      // Register, then log in to obtain a token pair (registration returns the
      // user record, not tokens). The Auth service assigns the FORECASTER role.
      await authApi.register(email, pw);
      const tokens = await authApi.login(email, pw);
      setTokens(tokens.access_token, tokens.refresh_token);
      navigate({ to: "/tournaments" });
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setFormError("An account with this email already exists. Try signing in.");
      } else if (err instanceof ApiError) {
        setFormError(err.message);
      } else {
        setFormError("Could not reach the server. Check your connection and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Begin"
      title="Create your"
      italic="account"
      description="Join a research community that rewards signal on measurable outcomes."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-white underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        {formError && (
          <p className="rounded-lg border border-[#ff8a8a]/30 bg-[#ff8a8a]/10 px-3 py-2 text-xs text-[#ff8a8a]">
            {formError}
          </p>
        )}
        <Field label="Name" htmlFor="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Your full name" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@domain.com" />
        </Field>
        <Field label="Password" htmlFor="password" hint="8+ characters" error={errors.password}>
          <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" />
        </Field>
        <Button type="submit" withArrow className="w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-center text-xs text-white/40">
          By continuing you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}
