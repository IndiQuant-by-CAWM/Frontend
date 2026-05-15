import { Reveal } from "@/components/motion/reveal";
import { PipelineDiagram } from "@/components/diagram/pipeline-diagram";
import { SectionShell } from "@/components/ui/section-shell";
import { infrastructureStages } from "@/lib/mock-data";

export function InfrastructureSection() {
  return (
    <SectionShell
      eyebrow="Infrastructure"
      title="Operational research pipeline, not a black-box model stack."
      description="Each layer is designed for transparent diagnostics, reproducible outputs, and long-horizon maintainability."
    >
      <div className="space-y-4">
        <Reveal variant="fade">
          <PipelineDiagram stages={infrastructureStages} />
        </Reveal>

        <div className="grid gap-3 lg:grid-cols-4">
          {infrastructureStages.map((layer, index) => (
            <Reveal key={layer.id} delay={index * 0.04} variant="scale">
              <article className="dense-panel h-full rounded-md p-4">
                <div className="mb-4 h-1.5 w-14 bg-primary/60" />
                <h3 className="text-base font-semibold text-ink-50">{layer.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{layer.detail}</p>
                <p className="terminal-label mt-3 text-[10px] text-success">{layer.throughput}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="terminal-label text-[11px] text-ink-500">
          Diagram reflects system architecture with delayed telemetry signals, not real-time data.
        </p>
      </div>
    </SectionShell>
  );
}
