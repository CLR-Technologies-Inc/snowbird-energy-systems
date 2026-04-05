import EvInfrastructureChart from "@/components/energy/EvInfrastructureChart";
import MetricCardGrid from "@/components/energy/MetricCardGrid";
import { NY_EV_2024 } from "@/data/energy/eia-ny-2024";

export default function EvInfrastructurePage() {
  const d = NY_EV_2024;
  const networkedPct = ((d.networkedOnly / d.totalLocations) * 100).toFixed(0);

  const cards = [
    { label: "Total Charging Ports", value: d.totalPorts.toLocaleString(), subLabel: `Across ${d.totalLocations.toLocaleString()} locations`, trend: "up" as const, colorScheme: "emerald" as const },
    { label: "DC Fast Charging Ports", value: d.dcFastPorts.toLocaleString(), subLabel: `${d.dcFastPortsPerLocation} ports/location avg`, trend: "up" as const, colorScheme: "sky" as const },
    { label: "Level 2 Ports", value: d.level2Ports.toLocaleString(), subLabel: `${d.level2PortsPerLocation} ports/location avg`, colorScheme: "sky" as const },
    { label: "EV Stock", value: `${d.evStockThousands.toFixed(0)}K vehicles`, subLabel: `${d.evSharePercent}% of light-duty fleet`, trend: "up" as const, colorScheme: "emerald" as const },
    { label: "EV Energy Consumption", value: `${d.evConsumptionMWh} GWh/year`, subLabel: "Growing with fleet electrification", trend: "up" as const, colorScheme: "amber" as const },
    { label: "Networked Locations", value: `${networkedPct}%`, subLabel: `${d.networkedOnly.toLocaleString()} of ${d.totalLocations.toLocaleString()} locations — V2G-ready`, colorScheme: "indigo" as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">EV Charging Infrastructure</h1>
        <p className="mt-1 text-slate-500">
          New York State 2024 — charging ports, locations, EV stock and consumption. Networked
          charging infrastructure ({networkedPct}% of locations) is the foundation for V2G reserve
          market participation.
        </p>
      </div>

      <MetricCardGrid cards={cards} />

      <div className="mt-8">
        <EvInfrastructureChart data={[NY_EV_2024]} />
      </div>

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="font-semibold text-emerald-900">V2G Reserve Market Potential</h2>
        <p className="mt-1 text-sm text-emerald-800">
          With {d.evStockThousands.toFixed(0)}K EVs consuming {d.evConsumptionMWh} GWh/year and{" "}
          {d.dcFastPorts.toLocaleString()} DC fast ports across NYC, vehicle-to-grid (V2G) aggregation
          can contribute meaningfully to the NYISO Dynamic Reserves 500 MW NYC floor requirement.
          Fleet-based V2G (airports, depots, ferries) offers the fastest path to 10-minute reserve
          compliance ahead of the 2027 implementation date.
        </p>
      </div>
    </div>
  );
}
