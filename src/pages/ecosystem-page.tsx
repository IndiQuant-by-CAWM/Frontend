import { SectionShell } from "@/components/ui/section-shell";
import { productModules } from "@/lib/mock-data";
import { usePageMeta } from "@/lib/use-page-meta";

export function EcosystemPage() {
  usePageMeta({
    title: "Product Ecosystem",
    description: "Modular product surfaces connected to IndiQuant intelligence infrastructure.",
  });

  return (
    <SectionShell
      eyebrow="Ecosystem"
      title="Product modules spanning research, analytics, and intelligence workflows."
      description="Modules below are represented as architecture components with staged readiness."
      className="border-t border-border"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productModules.map((item) => (
          <article key={item.id} className="panel rounded-md p-5">
            <p className="terminal-label text-[10px] text-primary-strong">{item.stage}</p>
            <h3 className="mt-2 text-lg font-semibold text-ink-50">{item.name}</h3>
            <p className="mt-3 text-sm text-ink-300">{item.summary}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
