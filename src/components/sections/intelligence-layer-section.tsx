import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { intelligenceModules } from "@/lib/mock-data";

export function IntelligenceLayerSection() {
  return (
    <SectionShell
      id="intelligence-layer"
      eyebrow="Intelligence Layer"
      title="Collective intelligence architecture built for signal rigor."
      description="The system combines distributed research contributions, validation cycles, and explainable scoring to produce stable intelligence outputs."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {intelligenceModules.map((module, index) => (
          <Reveal key={module.id} delay={index * 0.04}>
            <article className="panel rounded-md p-5">
              <p className="terminal-label text-[10px] text-primary-strong">{module.domain}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink-50">{module.title}</h3>
              <p className="mt-3 text-sm text-ink-300">{module.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
