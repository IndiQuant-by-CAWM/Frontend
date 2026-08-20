import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/site/Button";
import { Field, Input } from "@/components/site/Field";
import { AuthShell } from "@/components/site/AuthShell";
import { authApi, ApiError } from "@/lib/api";
import { setTokens } from "@/lib/auth";

interface SignInSearch {
  redirect?: string;
}

export const Route = createFileRoute("/sign-in")({
  validateSearch: (search: Record<string, unknown>): SignInSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In — IndiQuant" },
      { name: "description", content: "Sign in to your IndiQuant contributor account." },
      { property: "og:title", content: "Sign In — IndiQuant" },
      { property: "og:url", content: "/sign-in" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/sign-in" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const f = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const tokens = await authApi.login(email, password);
      setTokens(tokens.access_token, tokens.refresh_token);
      navigate({ to: redirect ?? "/tournaments" });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setFormError("Invalid email or password.");
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
      eyebrow="Welcome back"
      title="Sign in to"
      italic="IndiQuant"
      description="Return to your research. Your models are where you left them."
      footer={
        <>
          New here?{" "}
          <Link to="/sign-up" className="text-white underline-offset-4 hover:underline">
            Create an account
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
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@domain.com" />
        </Field>
        <Field
          label="Password"
          htmlFor="password"
          error={errors.password}
          hint={
            <Link to="/forgot-password" className="normal-case tracking-normal text-white/60 hover:text-white">
              Forgot?
            </Link>
          }
        >
          <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
        </Field>
        <Button type="submit" withArrow className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
