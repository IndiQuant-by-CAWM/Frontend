import { SectionShell } from "@/components/ui/section-shell";
import { roadmapItems } from "@/lib/mock-data";

export function RoadmapSection() {
  return (
    <SectionShell
      eyebrow="Roadmap"
      title="Current systems, near-term expansion, and experimental horizon."
      description="Roadmap lanes keep operational priorities visible without over-claiming unfinished capabilities."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {["Now", "Next", "Experimental"].map((lane) => (
          <div key={lane} className="panel rounded-md p-5">
            <p className="terminal-label text-[11px] text-primary-strong">{lane}</p>
            <div className="mt-4 space-y-4">
              {roadmapItems
                .filter((item) => item.stream === lane)
                .map((item) => (
                  <article key={item.id} className="border-l border-line pl-3">
                    <h3 className="text-sm font-semibold text-ink-50">{item.title}</h3>
                    <p className="mt-1 text-xs text-ink-300">{item.description}</p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
