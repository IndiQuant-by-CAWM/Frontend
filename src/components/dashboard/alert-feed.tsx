import type { DashboardAlert } from "@/lib/mock-data";
import { StatusChip } from "@/components/ui/status-chip";

interface AlertFeedProps {
  alerts: DashboardAlert[];
}

function getTone(type: DashboardAlert["type"]): "info" | "warning" | "success" {
  return type;
}

export function AlertFeed({ alerts }: AlertFeedProps) {
  return (
    <aside className="panel rounded-md p-4" aria-label="Telemetry alerts">
      <div className="mb-3 flex items-center justify-between">
        <p className="terminal-label text-[11px] text-ink-300">Telemetry Events</p>
        <StatusChip tone="info" text="Delayed Feed" />
      </div>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="rounded border border-border bg-panel-soft/40 p-3 transition-all duration-180 hover:border-primary-strong hover:bg-panel-soft/60">
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink-50">{alert.title}</p>
              <StatusChip tone={getTone(alert.type)} text={alert.type} />
            </div>
            <p className="text-xs text-ink-300">{alert.detail}</p>
            <p className="terminal-label mt-2 text-[10px] text-ink-500">{alert.at} UTC</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
