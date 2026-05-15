"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeSeriesPoint } from "@/lib/mock-data";

interface MetricsChartProps {
  data: TimeSeriesPoint[];
}

export function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="panel h-[300px] rounded-md p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="terminal-label text-[11px] text-ink-300">Signal Throughput Trend</p>
          <span className="terminal-label rounded border border-line px-2 py-1 text-[10px] text-warning">
            Delayed Data
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
            <Legend wrapperStyle={{ fontSize: 11, color: "#aebfd3" }} />
            <Area type="monotone" dataKey="signals" stroke="#86bdeb" strokeWidth={2} fill="url(#signalsGradient)" />
            <Line type="monotone" dataKey="contributors" stroke="#71cf98" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="panel h-[300px] rounded-md p-3">
        <p className="terminal-label mb-3 text-[11px] text-ink-300">Experiment and Latency Envelope</p>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
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
            <Bar dataKey="experiments" fill="#d6b35f" radius={[3, 3, 0, 0]} />
            <Line type="monotone" dataKey="latency" stroke="#d07f7f" strokeWidth={2} dot={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
