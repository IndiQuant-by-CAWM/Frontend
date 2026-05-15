import Link from "next/link";
import { SectionShell } from "@/components/ui/section-shell";

const previewCards = [
  {
    title: "Publications",
    detail: "Technical briefs, model notes, and validation summaries.",
  },
  {
    title: "Dataset Layers",
    detail: "Structured datasets and feature families for reproducible experimentation.",
  },
  {
    title: "Quant Categories",
    detail: "Market microstructure, attribution systems, and regime intelligence.",
  },
];

export function ResearchLabSection() {
  return (
    <SectionShell
      eyebrow="Research Lab"
      title="Research publication and dataset intelligence surfaces."
      description="A modular research environment for technical papers, experimental studies, and categorized quant exploration."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {previewCards.map((card) => (
          <article key={card.title} className="panel rounded-md p-5">
            <h3 className="text-base font-semibold text-ink-50">{card.title}</h3>
            <p className="mt-2 text-sm text-ink-300">{card.detail}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href="/research"
          className="terminal-label rounded border border-line px-4 py-2 text-xs text-ink-50 hover:border-primary"
        >
          Open Research Lab
        </Link>
      </div>
    </SectionShell>
  );
}
