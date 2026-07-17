import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/site/Button";
import { Field, Input } from "@/components/site/Field";
import { AuthShell } from "@/components/site/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — IndiQuant" },
      {
        name: "description",
        content: "Reset your IndiQuant account password.",
      },
      { property: "og:title", content: "Forgot Password — IndiQuant" },
      { property: "og:url", content: "/forgot-password" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/forgot-password" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError(undefined);
    setSent(true);
  }

  return (
    <AuthShell
      eyebrow="Recover"
      title="Reset your"
      italic="password"
      description="Enter your email and we'll send a link to reset your password."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/sign-in" className="text-white underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="py-4 text-center"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03]">
              <Check size={18} strokeWidth={1.75} className="text-white" />
            </div>
            <p className="mt-6 text-base text-white">Check your inbox.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists, a reset link is on its way.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-6"
          >
            <Field label="Email" htmlFor="email" error={error}>
              <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@domain.com" />
            </Field>
            <Button type="submit" withArrow className="w-full">
              Send reset link
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
