import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/site/Button";
import { Field, Input } from "@/components/site/Field";
import { AuthShell } from "@/components/site/AuthShell";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(f.get("name") ?? "").trim()) next.name = "Please enter your name.";
    const email = String(f.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
    const pw = String(f.get("password") ?? "");
    if (pw.length < 8) next.password = "At least 8 characters.";
    setErrors(next);
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
        <Field label="Name" htmlFor="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Your full name" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@domain.com" />
        </Field>
        <Field label="Password" htmlFor="password" hint="8+ characters" error={errors.password}>
          <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" />
        </Field>
        <Button type="submit" withArrow className="w-full">
          Create account
        </Button>
        <p className="text-center text-xs text-white/40">
          By continuing you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}
