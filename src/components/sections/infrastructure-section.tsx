import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";

const layers = [
  {
    title: "Ingestion + Normalization",
    detail: "Market and contributor streams are normalized into deterministic feature contracts.",
  },
  {
    title: "Experimentation Mesh",
    detail: "Hypotheses are benchmarked across cohorts before inclusion into active stacks.",
  },
  {
    title: "Consensus Orchestrator",
    detail: "Adaptive weighting composes validated signals into portfolio-grade intelligence.",
  },
  {
    title: "Observability + Attribution",
    detail: "Telemetry and contribution quality remain visible through every pipeline stage.",
  },
];

export function InfrastructureSection() {
  return (
    <SectionShell
      eyebrow="Infrastructure"
      title="Operational research pipeline, not a black-box model stack."
      description="Each layer is designed for transparent diagnostics, reproducible outputs, and long-horizon maintainability."
    >
      <div className="grid gap-3 lg:grid-cols-4">
        {layers.map((layer, index) => (
          <Reveal key={layer.title} delay={index * 0.04}>
            <article className="panel h-full rounded-md p-4">
              <div className="mb-4 h-1.5 w-14 bg-primary/60" />
              <h3 className="text-base font-semibold text-ink-50">{layer.title}</h3>
              <p className="mt-2 text-sm text-ink-300">{layer.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
