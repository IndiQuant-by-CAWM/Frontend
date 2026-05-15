import { lazy, Suspense } from "react";
import { AlertFeed } from "@/components/dashboard/alert-feed";
import { LiveMetrics } from "@/components/dashboard/live-metrics";
import { SectionShell } from "@/components/ui/section-shell";
import { dashboardAlerts, dashboardMetrics, dashboardSeries } from "@/lib/mock-data";

const MetricsChart = lazy(() =>
  import("@/components/dashboard/metrics-chart").then((module) => ({ default: module.MetricsChart }))
);

export function LiveDashboardSection() {
  return (
    <SectionShell
      eyebrow="Dashboard"
      title="Operational telemetry surface for research infrastructure."
      description="Metrics are presented with delayed data for reliability and auditability, and do not represent real-time streaming."
    >
      <div className="space-y-4">
        <LiveMetrics metrics={dashboardMetrics} />
        <div className="grid gap-3 xl:grid-cols-[1.4fr_0.6fr]">
          <Suspense fallback={<div className="panel rounded-md p-5 text-sm text-ink-300">Loading chart...</div>}>
            <MetricsChart data={dashboardSeries} />
          </Suspense>
          <AlertFeed alerts={dashboardAlerts} />
        </div>
      </div>
    </SectionShell>
  );
}
