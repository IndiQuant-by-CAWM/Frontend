import dynamic from "next/dynamic";
import { LiveMetrics } from "@/components/dashboard/live-metrics";
import { SectionShell } from "@/components/ui/section-shell";
import { dashboardMetrics, dashboardSeries } from "@/lib/mock-data";

const MetricsChart = dynamic(
  () => import("@/components/dashboard/metrics-chart").then((module) => module.MetricsChart),
  {
    ssr: false,
  }
);

export function LiveDashboardSection() {
  return (
    <SectionShell
      eyebrow="Live Dashboard"
      title="Operational telemetry surface for research infrastructure."
      description="All metrics here are simulated frontend data to demonstrate interface behavior and system observability design."
    >
      <div className="space-y-4">
        <LiveMetrics metrics={dashboardMetrics} />
        <MetricsChart data={dashboardSeries} />
      </div>
    </SectionShell>
  );
}
