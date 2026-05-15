import { SectionShell } from "@/components/ui/section-shell";
import { roadmapItems } from "@/lib/mock-data";

export function RoadmapSection() {
  const laneConfidence: Record<string, string> = {
    Now: "Execution confidence: 84%",
    Next: "Execution confidence: 68%",
    Experimental: "Execution confidence: 39%",
  };

  return (
    <SectionShell
      eyebrow="Roadmap"
      title="Current systems, near-term expansion, and experimental horizon."
      description="Roadmap lanes keep operational priorities visible without over-claiming unfinished capabilities."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {["Now", "Next", "Experimental"].map((lane) => (
          <div key={lane} className="dense-panel rounded-md p-5">
            <p className="terminal-label text-[11px] text-primary-strong">{lane}</p>
            <p className="terminal-label mt-1 text-[10px] text-ink-500">{laneConfidence[lane]}</p>
            <div className="mt-4 space-y-4">
              {roadmapItems
                .filter((item) => item.stream === lane)
                .map((item) => (
                  <article key={item.id} className="rounded border-l border-line pl-3 transition-all duration-180 hover:border-primary-strong/40 hover:bg-panel-soft/20">
                    <h3 className="text-sm font-semibold text-ink-50">{item.title}</h3>
                    <p className="mt-1 text-xs text-ink-300">{item.description}</p>
                    <p className="terminal-label mt-2 text-[10px] text-ink-500">Planning metrics shown with delayed reporting data</p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
