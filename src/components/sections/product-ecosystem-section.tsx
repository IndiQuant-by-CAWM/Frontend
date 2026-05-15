import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { productModules } from "@/lib/mock-data";

export function ProductEcosystemSection() {
  const stageClass: Record<string, string> = {
    Operational: "border-success/60 bg-success/10 text-success",
    "In Development": "border-warning/60 bg-warning/10 text-warning",
    Research: "border-line bg-primary/10 text-primary-strong",
  };

  return (
    <SectionShell
      eyebrow="Product Ecosystem"
      title="Modular product surfaces connected to one intelligence core."
      description="Each product module consumes common research infrastructure while serving a distinct workflow." 
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productModules.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.03} variant="scale">
            <article className="dense-panel rounded-md p-5">
              <p
                className={`terminal-label inline-flex rounded border px-2 py-1 text-[10px] ${stageClass[product.stage]}`}
              >
                {product.stage}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-ink-50">{product.name}</h3>
              <p className="mt-3 text-sm text-ink-300">{product.summary}</p>
              <p className="terminal-label mt-4 text-[10px] text-ink-500">Module insights use delayed operational data and are not real-time.</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-6">
        <Link
          to="/ecosystem"
          className="terminal-label rounded border border-line px-4 py-2 text-xs text-ink-50 hover:border-primary"
        >
          Open Ecosystem Detail
        </Link>
      </div>
    </SectionShell>
  );
}
