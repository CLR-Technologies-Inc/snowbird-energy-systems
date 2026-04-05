import SectorConsumptionChart from "@/components/energy/SectorConsumptionChart";
import MetricCardGrid from "@/components/energy/MetricCardGrid";
import { NY_CONSUMPTION_2024 } from "@/data/energy/eia-ny-2024";

export default function ConsumptionPage() {
  const d = NY_CONSUMPTION_2024;

  const cards = [
    { label: "Residential", value: `${d.residential.toLocaleString()} GWh`, subLabel: `${((d.residential / d.total) * 100).toFixed(1)}% of total`, colorScheme: "sky" as const },
    { label: "Commercial", value: `${d.commercial.toLocaleString()} GWh`, subLabel: `${((d.commercial / d.total) * 100).toFixed(1)}% of total — largest sector`, colorScheme: "indigo" as const },
    { label: "Industrial", value: `${d.industrial.toLocaleString()} GWh`, subLabel: `${((d.industrial / d.total) * 100).toFixed(1)}% of total`, colorScheme: "amber" as const },
    { label: "Transport", value: `${d.transport.toLocaleString()} GWh`, subLabel: `${((d.transport / d.total) * 100).toFixed(1)}% of total — growing with EV adoption`, colorScheme: "emerald" as const },
    { label: "Total", value: `${d.total.toLocaleString()} GWh`, subLabel: "All sectors combined", colorScheme: "slate" as const },
    { label: "Per Capita", value: "7,072 kWh", subLabel: "Annual consumption per New Yorker", colorScheme: "slate" as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Sector Electricity Consumption</h1>
        <p className="mt-1 text-slate-500">
          New York State 2024 — electricity sales to ultimate customers by sector (Million kWh / GWh).
          Commercial is the largest sector at {((d.commercial / d.total) * 100).toFixed(1)}% of total.
        </p>
      </div>

      <MetricCardGrid cards={cards} />

      <div className="mt-8">
        <SectorConsumptionChart data={[NY_CONSUMPTION_2024]} />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="font-semibold text-slate-800">Demand-Response Context</h2>
        <p className="mt-1 text-sm text-slate-600">
          Commercial buildings ({d.commercial.toLocaleString()} GWh) represent the largest
          controllable load pool for demand response. Under NYISO&apos;s 2027 Dynamic Reserves framework,
          commercial HVAC curtailment at high-congestion NYC nodes can earn LMORP premiums above the
          NYCA system reserve price. Transport sector consumption ({d.transport.toLocaleString()} GWh)
          is growing rapidly with EV adoption — creating new V2G reserve participation opportunities.
        </p>
      </div>
    </div>
  );
}
