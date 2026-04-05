"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { SectorPricing } from "@/data/energy/eia-ny-2024";

interface PricingBySectorChartProps {
  pricing: SectorPricing;
}

const SECTOR_COLORS: Record<string, string> = {
  Residential: "#38bdf8",
  Commercial: "#818cf8",
  Industrial: "#fbbf24",
  Transport: "#34d399",
  Average: "#94a3b8",
};

export default function PricingBySectorChart({ pricing }: PricingBySectorChartProps) {
  const data = [
    { sector: "Residential", price: pricing.residential },
    { sector: "Commercial", price: pricing.commercial },
    { sector: "Transport", price: pricing.transport },
    { sector: "Average", price: pricing.average },
    { sector: "Industrial", price: pricing.industrial },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 80, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v) => `$${v}`}
          tick={{ fontSize: 12 }}
          unit="/MMBtu"
        />
        <YAxis type="category" dataKey="sector" tick={{ fontSize: 12 }} width={90} />
        <Tooltip formatter={(v) => [typeof v === "number" ? `$${v.toFixed(2)}/MMBtu` : v, "Price"]} />
        <ReferenceLine x={pricing.average} stroke="#94a3b8" strokeDasharray="4 2" label={{ value: "Avg", position: "top", fontSize: 11 }} />
        <Bar dataKey="price" radius={[0, 3, 3, 0]}>
          {data.map((entry) => (
            <Cell key={entry.sector} fill={SECTOR_COLORS[entry.sector] ?? "#94a3b8"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
