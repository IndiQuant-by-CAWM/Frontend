import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Mail, Send, Check } from "lucide-react";

import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Field, Input, Textarea } from "@/components/site/Field";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IndiQuant" },
      {
        name: "description",
        content:
          "Get in touch with the IndiQuant team — for contributors, partners, and long-term investors.",
      },
      { property: "og:title", content: "Contact — IndiQuant" },
      {
        property: "og:description",
        content: "A quiet conversation is often the best place to begin.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Say"
        italic="hello"
        tail="."
        description="We read every message. Tell us what you're working on, or what you'd like to know."
      />

      <Section className="pt-0">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal variant="blur">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Direct channels
                </p>
                <ul className="mt-8 space-y-6">
                  <li>
                    <a
                      href="mailto:hello@indiquant.com"
                      className="group flex items-start gap-4 text-white/80 transition-colors hover:text-white"
                    >
                      <span className="mt-1 grid h-9 w-9 place-items-center rounded-lg border border-border">
                        <Mail size={15} strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block text-sm text-white">Email</span>
                        <span className="block text-sm text-muted-foreground">
                          hello@indiquant.com
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="group flex items-start gap-4 text-white/80 transition-colors hover:text-white"
                    >
                      <span className="mt-1 grid h-9 w-9 place-items-center rounded-lg border border-border">
                        <Send size={15} strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block text-sm text-white">LinkedIn</span>
                        <span className="block text-sm text-muted-foreground">
                          Coming soon
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <p className="mt-16 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  For contributor questions, the fastest path is the{" "}
                  <a href="/faq" className="text-white underline-offset-4 hover:underline">
                    FAQ
                  </a>{" "}
                  — most answers live there.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={0.15}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(f.get("name") ?? "").trim()) next.name = "Please enter your name.";
    const email = String(f.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email.";
    if (!String(f.get("message") ?? "").trim()) next.message = "A few words help us reply.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="py-8 text-center"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03]">
              <Check size={18} strokeWidth={1.75} className="text-white" />
            </div>
            <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight text-white">
              Thank you.
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Your message is in. We'll be in touch shortly.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSent(false)}
              >
                Send another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" htmlFor="name" error={errors.name}>
                <Input id="name" name="name" placeholder="Your name" autoComplete="name" />
              </Field>
              <Field label="Email" htmlFor="email" error={errors.email}>
                <Input id="email" name="email" type="email" placeholder="you@domain.com" autoComplete="email" />
              </Field>
            </div>
            <Field label="Subject" hint="Optional" htmlFor="subject">
              <Input id="subject" name="subject" placeholder="What's this about?" />
            </Field>
            <Field label="Message" htmlFor="message" error={errors.message}>
              <Textarea id="message" name="message" placeholder="Tell us a little more…" />
            </Field>
            <div className="flex items-center justify-between pt-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                We reply within a few days
              </p>
              <Button type="submit" withArrow>
                Send message
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}



