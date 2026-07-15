import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/site/Button";
import { Field, Input } from "@/components/site/Field";
import { AuthShell } from "@/components/site/AuthShell";

export const Route = createFileRoute("/sign-in")({
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const email = String(f.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
    if (!String(f.get("password") ?? "")) next.password = "Password is required.";
    setErrors(next);
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
        <Button type="submit" withArrow className="w-full">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
