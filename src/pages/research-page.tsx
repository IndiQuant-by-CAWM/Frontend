import { SectionShell } from "@/components/ui/section-shell";
import { usePageMeta } from "@/lib/use-page-meta";

const researchPapers = [
  {
    category: "Market Microstructure",
    title: "Signal Persistence in Indian Derivatives Regimes",
    preview:
      "Study template for evaluating persistence windows and degradation curves across volatility clusters.",
  },
  {
    category: "Modeling",
    title: "Adaptive Ensemble Confidence Surfaces",
    preview:
      "Framework for confidence-weighted blending under shifting market states.",
  },
  {
    category: "Attribution",
    title: "Contributor Quality Scoring Under Delayed Outcomes",
    preview:
      "Attribution method for disentangling contribution quality from regime-driven outcomes.",
  },
];

const datasets = [
  "Price and volume derivatives feeds",
  "Feature-store snapshots",
  "Contributor hypothesis logs",
  "Experiment telemetry traces",
];

export function ResearchPage() {
  usePageMeta({
    title: "Research Lab",
    description: "Research publication layout and dataset intelligence surfaces.",
  });

  return (
    <>
      <SectionShell
        eyebrow="Research Lab"
        title="Evidence-first research surfaces for quant infrastructure."
        description="Publication previews and dataset modules are represented as structured frontend components for scalable expansion."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {researchPapers.map((paper) => (
            <article key={paper.title} className="panel rounded-md p-5">
              <p className="terminal-label text-[10px] text-primary-strong">{paper.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink-50">{paper.title}</h3>
              <p className="mt-3 text-sm text-ink-300">{paper.preview}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Datasets"
        title="Dataset intelligence layers"
        description="Dataset panels are published with delayed reporting windows and are not real-time streams."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {datasets.map((dataset) => (
            <article key={dataset} className="panel rounded-md p-4">
              <p className="text-sm text-ink-200">{dataset}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
