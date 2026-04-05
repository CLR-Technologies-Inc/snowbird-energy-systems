import MetricCardGrid from "@/components/energy/MetricCardGrid";
import {
  NY_CONSUMPTION_2024,
  NY_PRICING_2024,
  NY_EV_2024,
  NY_RENEWABLES_2024,
  NY_EXPENDITURE_2024,
} from "@/data/energy/eia-ny-2024";
import { TOTAL_NYC_RESERVE_POTENTIAL_MW } from "@/data/energy/borough-opportunities";

export default function OverviewPage() {
  const renewableMWh = NY_RENEWABLES_2024.windTotalMWh + NY_RENEWABLES_2024.solarTotalMWh;
  const renewableCapacityGW = (NY_RENEWABLES_2024.totalRenewableCapacityKW / 1_000_000).toFixed(1);

  const cards = [
    {
      label: "Total Electricity Consumption",
      value: `${(NY_CONSUMPTION_2024.total / 1000).toFixed(0)} TWh`,
      subLabel: "2024 annual — all sectors",
      colorScheme: "sky" as const,
    },
    {
      label: "Total Electricity Expenditure",
      value: `$${(NY_EXPENDITURE_2024.total / 1000).toFixed(1)}B`,
      subLabel: "2024 — residential, commercial, industrial & transport",
      colorScheme: "indigo" as const,
    },
    {
      label: "Average Electricity Price",
      value: `$${NY_PRICING_2024.average}/MMBtu`,
      subLabel: "All sectors — residential $71.60 vs industrial $26.89",
      trend: "up" as const,
      colorScheme: "amber" as const,
    },
    {
      label: "EV Charging Ports",
      value: NY_EV_2024.totalPorts.toLocaleString(),
      subLabel: `${NY_EV_2024.dcFastPorts.toLocaleString()} DC fast · ${NY_EV_2024.totalLocations.toLocaleString()} locations`,
      trend: "up" as const,
      colorScheme: "emerald" as const,
    },
    {
      label: "EV Stock (NY State)",
      value: `${(NY_EV_2024.evStockThousands).toFixed(0)}K vehicles`,
      subLabel: `${NY_EV_2024.evSharePercent}% of all light-duty vehicles`,
      trend: "up" as const,
      colorScheme: "emerald" as const,
    },
    {
      label: "Renewable Generation",
      value: `${renewableMWh.toLocaleString()} GWh`,
      subLabel: `Wind ${NY_RENEWABLES_2024.windTotalMWh.toLocaleString()} + Solar ${NY_RENEWABLES_2024.solarTotalMWh.toLocaleString()} · ${renewableCapacityGW} GW capacity`,
      trend: "up" as const,
      colorScheme: "sky" as const,
    },
    {
      label: "NYC Reserve Potential",
      value: `${TOTAL_NYC_RESERVE_POTENTIAL_MW} MW`,
      subLabel: "Addressable demand-response across 5 boroughs",
      colorScheme: "rose" as const,
    },
    {
      label: "Residential–Industrial Price Delta",
      value: `$${(NY_PRICING_2024.residential - NY_PRICING_2024.industrial).toFixed(2)}/MMBtu`,
      subLabel: "Key arbitrage signal — residential 2.7× industrial price",
      trend: "up" as const,
      colorScheme: "amber" as const,
    },
    {
      label: "Renewable Capacity",
      value: `${renewableCapacityGW} GW`,
      subLabel: "Wind 2.87 GW · Solar 2.67 GW · Total renewables 10.5 GW",
      trend: "up" as const,
      colorScheme: "sky" as const,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">NYC Energy Overview</h1>
        <p className="mt-1 text-slate-500">
          2024 New York State baseline — EIA SEDS data. Explore sector consumption, pricing
          differentials, EV infrastructure growth, and NYISO Dynamic Reserves opportunities.
        </p>
      </div>

      <MetricCardGrid cards={cards} />

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-semibold text-amber-900">Arbitrage Signal</h2>
        <p className="mt-1 text-sm text-amber-800">
          The spread between residential ($71.60/MMBtu) and industrial ($26.89/MMBtu) electricity
          prices creates a <strong>${(NY_PRICING_2024.residential - NY_PRICING_2024.industrial).toFixed(2)}/MMBtu</strong> arbitrage
          opportunity. Combined with NYISO&apos;s 2027 Dynamic Reserves market launch — which introduces
          nodal reserve pricing (LMORP) — NYC demand-response assets at constrained nodes can capture
          both energy cost savings and reserve market revenue.
        </p>
      </div>
    </div>
  );
}
