import { SectionShell } from "@/components/ui/section-shell";

const communityBlocks = [
  {
    title: "Contributor Network",
    text: "Structured onboarding for research contributors across quant, data, and platform tracks.",
  },
  {
    title: "Open Collaboration Workflows",
    text: "Shared experiments and evidence-first discussion loops built for constructive dissent.",
  },
  {
    title: "Community Gateway",
    text: "Discord and collaborative channels are used for participation, updates, and research calls.",
  },
];

export function CommunitySection() {
  return (
    <SectionShell
      eyebrow="Community"
      title="A contributor ecosystem designed for rigorous collaboration."
      description="IndiQuant grows through community participation, but operational standards remain research-grade."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {communityBlocks.map((block) => (
          <article key={block.title} className="panel rounded-md p-5">
            <h3 className="text-base font-semibold text-ink-50">{block.title}</h3>
            <p className="mt-2 text-sm text-ink-300">{block.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
