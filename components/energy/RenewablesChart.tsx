"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RenewablesGeneration } from "@/data/energy/eia-ny-2024";

interface RenewablesChartProps {
  data: RenewablesGeneration[];
}

export default function RenewablesChart({ data }: RenewablesChartProps) {
  const chartData = data.map((d) => ({
    year: String(d.year),
    "Wind (GWh)": d.windTotalMWh,
    "Solar (GWh)": d.solarTotalMWh,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <defs>
          <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => v.toLocaleString()} tick={{ fontSize: 12 }} unit=" GWh" />
        <Tooltip formatter={(v, name) => [typeof v === "number" ? `${v.toLocaleString()} GWh` : v, name]} />
        <Legend />
        <Area
          type="monotone"
          dataKey="Wind (GWh)"
          stroke="#38bdf8"
          strokeWidth={2}
          fill="url(#windGrad)"
        />
        <Area
          type="monotone"
          dataKey="Solar (GWh)"
          stroke="#fbbf24"
          strokeWidth={2}
          fill="url(#solarGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
