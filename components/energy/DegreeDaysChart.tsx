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
import type { DegreeDays } from "@/data/energy/eia-ny-2024";

interface DegreeDaysChartProps {
  data: DegreeDays[];
}

export default function DegreeDaysChart({ data }: DegreeDaysChartProps) {
  const chartData = data.map((d) => ({
    year: String(d.year),
    "Heating (HDD)": d.heatingDegreeDays,
    "Cooling (CDD)": d.coolingDegreeDays,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} unit=" days" />
        <Tooltip formatter={(v, name) => [typeof v === "number" ? `${v.toLocaleString()} days` : v, name]} />
        <Legend />
        <Bar dataKey="Heating (HDD)" fill="#60a5fa" radius={[3, 3, 0, 0]} />
        <Bar dataKey="Cooling (CDD)" fill="#fb923c" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
