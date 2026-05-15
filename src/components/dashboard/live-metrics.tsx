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

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {grouped.map((metric, idx) => (
        <motion.article
          key={metric.id}
          className="panel rounded-md p-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: reduceMotion ? 0 : idx * 0.05, duration: 0.35 }}
        >
          <p className="terminal-label text-[11px] text-ink-300">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold text-ink-50">{formatValue(metric)}</p>
          <p className={`mt-1 text-xs ${metric.deltaPct >= 0 ? "text-success" : "text-warning"}`}>
            {metric.deltaPct >= 0 ? "+" : ""}
            {metric.deltaPct}% rolling window
          </p>
        </motion.article>
      ))}
    </div>
  );
}
