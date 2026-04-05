"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SectorConsumption } from "@/data/energy/eia-ny-2024";

interface SectorConsumptionChartProps {
  data: SectorConsumption[];
}

const fmt = (v: number) => `${v.toLocaleString()} GWh`;

export default function SectorConsumptionChart({ data }: SectorConsumptionChartProps) {
  const chartData = data.map((d) => ({
    year: String(d.year),
    Residential: d.residential,
    Commercial: d.commercial,
    Industrial: d.industrial,
    Transport: d.transport,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} unit=" GWh" />
        <Tooltip formatter={(value) => typeof value === "number" ? fmt(value) : value} />
        <Legend />
        <Bar dataKey="Residential" fill="#38bdf8" radius={[3, 3, 0, 0]} />
        <Bar dataKey="Commercial" fill="#818cf8" radius={[3, 3, 0, 0]} />
        <Bar dataKey="Industrial" fill="#fbbf24" radius={[3, 3, 0, 0]} />
        <Bar dataKey="Transport" fill="#34d399" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
