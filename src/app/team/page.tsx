import type { Metadata } from "next";
import Image from "next/image";
import { leadershipProfiles } from "@/lib/mock-data";
import { SectionShell } from "@/components/ui/section-shell";

export const metadata: Metadata = {
  title: "Team",
  description: "Institutional team profiles and specialization map.",
};

export default function TeamPage() {
  return (
    <SectionShell
      eyebrow="Team"
      title="Research, platform, and strategy leadership."
      description="Current profile content is migrated from existing public team information and structured for scalable growth."
      className="border-t border-border"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {leadershipProfiles.map((profile) => (
          <article key={profile.id} className="panel rounded-md p-5">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border bg-panel-soft">
                {profile.image ? (
                  <Image src={profile.image} alt={profile.name} fill sizes="56px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-ink-300">
                    {profile.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink-50">{profile.name}</h3>
                <p className="text-xs text-ink-300">{profile.role}</p>
              </div>
            </div>
            <p className="text-sm text-ink-300">{profile.specialization}</p>
            <a
              className="terminal-label mt-4 inline-block text-[11px] text-primary-strong hover:text-primary"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Profile
            </a>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
