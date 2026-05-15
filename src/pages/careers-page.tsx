import { SectionShell } from "@/components/ui/section-shell";
import { careerRoles } from "@/lib/mock-data";
import { usePageMeta } from "@/lib/use-page-meta";

export function CareersPage() {
  usePageMeta({
    title: "Careers",
    description: "Mission-driven engineering and research opportunities at IndiQuant.",
  });

  return (
    <>
      <SectionShell
        eyebrow="Careers"
        title="Build systems that shape collective market intelligence."
        description="Role cards below are migrated from current openings and reframed into mission and systems outcomes."
        className="border-t border-border"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {careerRoles.map((role) => (
            <article key={role.id} className="panel rounded-md p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="terminal-label rounded border border-line px-2 py-1 text-[10px] text-primary-strong">
                  {role.mode}
                </span>
                <span className="terminal-label text-[10px] text-ink-300">{role.track}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink-50">{role.title}</h3>
              <p className="mt-3 text-sm text-ink-300">{role.whatYouBuild}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Apply"
        title="What you'll build"
        description="Research infrastructure, observability surfaces, and scalable intelligence workflows for real market systems."
      >
        <div className="panel rounded-md p-6">
          <p className="text-sm text-ink-300">
            Apply through
            <a href="mailto:apply@indiquantresearch.in" className="mx-1 text-primary-strong hover:text-primary">
              apply@indiquantresearch.in
            </a>
            with your track, portfolio, and a brief systems-thinking note.
          </p>
        </div>
      </SectionShell>
    </>
  );
}
