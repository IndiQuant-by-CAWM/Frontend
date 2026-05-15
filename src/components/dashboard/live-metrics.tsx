"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DashboardMetric } from "@/lib/mock-data";

interface LiveMetricsProps {
  metrics: DashboardMetric[];
}

function formatValue(metric: DashboardMetric): string {
  if (metric.unit === "ms") {
    return `${metric.value}ms`;
  }
  if (metric.unit) {
    return `${metric.value.toLocaleString()} ${metric.unit}`;
  }
  return metric.value.toLocaleString();
}

export function LiveMetrics({ metrics }: LiveMetricsProps) {
  const reduceMotion = useReducedMotion();
  const grouped = useMemo(() => metrics, [metrics]);

  const maxTrend = Math.max(...grouped.flatMap((metric) => metric.trend));

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {grouped.map((metric, idx) => (
        <motion.article
          key={metric.id}
          className="dense-panel rounded-md p-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: reduceMotion ? 0 : idx * 0.05, duration: 0.35 }}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="terminal-label text-[11px] text-ink-300">{metric.label}</p>
            <span
              className={`terminal-label rounded border px-2 py-1 text-[10px] ${
                metric.deltaPct >= 0
                  ? "border-success/60 bg-success/10 text-success"
                  : "border-warning/60 bg-warning/10 text-warning"
              }`}
            >
              {metric.deltaPct >= 0 ? "+" : ""}
              {metric.deltaPct}%
            </span>
          </div>

          <p className="kpi-value mt-2 text-2xl font-semibold text-ink-50">{formatValue(metric)}</p>

          <div className="mt-3 flex h-8 items-end gap-1">
            {metric.trend.map((point, pointIdx) => (
              <span
                key={`${metric.id}-${pointIdx}`}
                className="w-full rounded-sm bg-primary/45"
                style={{ height: `${Math.max(12, Math.round((point / maxTrend) * 100))}%` }}
                aria-hidden
              />
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
