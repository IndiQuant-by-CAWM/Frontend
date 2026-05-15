"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TimeSeriesPoint } from "@/lib/mock-data";

interface MetricsChartProps {
  data: TimeSeriesPoint[];
}

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="panel h-[280px] rounded-md p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="terminal-label text-[11px] text-ink-300">Signal Throughput Simulation</p>
        <span className="terminal-label rounded border border-line px-2 py-1 text-[10px] text-warning">
          Demo Data
        </span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="signalsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#86bdeb" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#86bdeb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1d2a3f" strokeDasharray="3 3" />
          <XAxis dataKey="tick" tick={{ fill: "#aebfd3", fontSize: 11 }} axisLine={{ stroke: "#27476f" }} />
          <YAxis tick={{ fill: "#aebfd3", fontSize: 11 }} axisLine={{ stroke: "#27476f" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b121b",
              border: "1px solid #27476f",
              color: "#f2f7ff",
              borderRadius: "6px",
            }}
          />
          <Area type="monotone" dataKey="signals" stroke="#86bdeb" strokeWidth={2} fill="url(#signalsGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
