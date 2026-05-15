import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/reveal";

export function HeroSection() {
  return (
    <section className="border-b border-border py-18 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="terminal-label text-xs text-primary-strong">Computational Intelligence Infrastructure</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-50 sm:text-6xl lg:text-7xl">
            Institutional Quant Research.
            <span className="mt-2 block text-primary-strong">Distributed, Explainable, Operational.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ink-300 sm:text-lg">
            IndiQuant is a research-first ecosystem for collective market intelligence where contributors,
            models, and validation systems operate as a unified infrastructure layer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/research"
              className="terminal-label rounded border border-line bg-panel-soft px-4 py-2 text-xs text-ink-50 hover:border-primary"
            >
              Enter Research Lab
            </Link>
            <Link
              to="/ecosystem"
              className="terminal-label rounded border border-border px-4 py-2 text-xs text-ink-300 hover:border-primary hover:text-primary-strong"
            >
              View Product Ecosystem
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="panel rounded-md p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="terminal-label text-[11px] text-ink-300">Intelligence Layer Snapshot</p>
            <span className="terminal-label rounded border border-line px-2 py-1 text-[10px] text-warning">
              Delayed Data
            </span>
          </div>
          <div className="space-y-3 text-sm text-ink-300">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span>Signal Streams Active</span>
              <strong className="text-ink-50">23</strong>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span>Validation Nodes Online</span>
              <strong className="text-ink-50">14 / 14</strong>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span>Model Cohorts in Rotation</span>
              <strong className="text-ink-50">6</strong>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span>Research Contributors</span>
              <strong className="text-ink-50">186</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Consensus State</span>
              <strong className="text-success">Stable</strong>
            </div>
            <p className="terminal-label pt-1 text-[10px] text-ink-500">
              Operational insights shown with delayed market telemetry, not real-time streaming.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
