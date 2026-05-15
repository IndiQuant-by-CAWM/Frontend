import type { InfrastructureStage } from "@/lib/mock-data";

interface PipelineDiagramProps {
  stages: InfrastructureStage[];
}

export function PipelineDiagram({ stages }: PipelineDiagramProps) {
  return (
    <div className="panel overflow-hidden rounded-md p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="terminal-label text-[11px] text-ink-300">System Flow Map</p>
        <span className="terminal-label rounded border border-line px-2 py-1 text-[10px] text-warning">
          Delayed Data View
        </span>
      </div>
      <div className="grid gap-3 lg:grid-cols-4">
        {stages.map((stage, index) => (
          <article key={stage.id} className="relative rounded border border-border bg-panel-soft/35 p-3 transition-all duration-180 hover:-translate-y-0.5 hover:border-primary-strong hover:bg-panel-soft/55">
            {index < stages.length - 1 ? (
              <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-[2px] w-4 -translate-y-1/2 bg-primary/70 lg:block" />
            ) : null}
            <div className="mb-2 inline-block rounded border border-line px-2 py-1 text-[10px] terminal-label text-primary-strong">
              Stage {index + 1}
            </div>
            <h3 className="text-sm font-semibold text-ink-50">{stage.title}</h3>
            <p className="mt-2 text-xs text-ink-300">{stage.detail}</p>
            <p className="terminal-label mt-3 text-[10px] text-success">{stage.throughput}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
