"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { EvInfrastructure } from "@/data/energy/eia-ny-2024";

interface EvInfrastructureChartProps {
  data: EvInfrastructure[];
}

export default function EvInfrastructureChart({ data }: EvInfrastructureChartProps) {
  const chartData = data.map((d) => ({
    year: String(d.year),
    "Level 2": d.level2Ports,
    "DC Fast": d.dcFastPorts,
    "Level 1": d.level1Ports,
    "EV Stock (thousands)": d.evStockThousands,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart data={chartData} margin={{ top: 8, right: 40, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis
          yAxisId="ports"
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => v.toLocaleString()}
          label={{ value: "Ports", angle: -90, position: "insideLeft", offset: 10, fontSize: 11 }}
        />
        <YAxis
          yAxisId="stock"
          orientation="right"
          tick={{ fontSize: 12 }}
          label={{ value: "EV Stock (000s)", angle: 90, position: "insideRight", offset: 10, fontSize: 11 }}
        />
        <Tooltip
          formatter={(value, name) => {
            const v = typeof value === "number" ? value : 0;
            return name === "EV Stock (thousands)"
              ? [`${v.toFixed(1)}K vehicles`, name]
              : [v.toLocaleString() + " ports", name];
          }}
        />
        <Legend />
        <Bar yAxisId="ports" dataKey="Level 2" fill="#38bdf8" stackId="ports" radius={[0, 0, 0, 0]} />
        <Bar yAxisId="ports" dataKey="DC Fast" fill="#34d399" stackId="ports" radius={[0, 0, 0, 0]} />
        <Bar yAxisId="ports" dataKey="Level 1" fill="#94a3b8" stackId="ports" radius={[3, 3, 0, 0]} />
        <Line
          yAxisId="stock"
          type="monotone"
          dataKey="EV Stock (thousands)"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
