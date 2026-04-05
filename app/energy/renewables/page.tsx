import RenewablesChart from "@/components/energy/RenewablesChart";
import DegreeDaysChart from "@/components/energy/DegreeDaysChart";
import MetricCardGrid from "@/components/energy/MetricCardGrid";
import { NY_RENEWABLES_2024, NY_DEGREE_DAYS_2024 } from "@/data/energy/eia-ny-2024";

export default function RenewablesPage() {
  const r = NY_RENEWABLES_2024;
  const d = NY_DEGREE_DAYS_2024;
  const totalRenewableGWh = r.windTotalMWh + r.solarTotalMWh;

  const cards = [
    { label: "Wind Generation", value: `${r.windTotalMWh.toLocaleString()} GWh`, subLabel: `Capacity factor ${r.windCapacityFactorPct}% · ${(r.windCapacityKW / 1_000_000).toFixed(2)} GW installed`, trend: "up" as const, colorScheme: "sky" as const },
    { label: "Solar Generation", value: `${r.solarTotalMWh.toLocaleString()} GWh`, subLabel: `Capacity factor ${r.solarCapacityFactorPct}% · ${(r.solarCapacityKW / 1_000_000).toFixed(2)} GW installed`, trend: "up" as const, colorScheme: "amber" as const },
    { label: "Total Renewable Capacity", value: `${(r.totalRenewableCapacityKW / 1_000_000).toFixed(1)} GW`, subLabel: "All renewable sources combined", colorScheme: "emerald" as const },
    { label: "Residential Solar", value: `${r.solarResidentialMWh.toLocaleString()} GWh`, subLabel: "Small-scale rooftop PV generation", trend: "up" as const, colorScheme: "amber" as const },
    { label: "Heating Degree Days", value: `${d.heatingDegreeDays.toLocaleString()}`, subLabel: "2024 — drives winter electricity demand", colorScheme: "sky" as const },
    { label: "Cooling Degree Days", value: `${d.coolingDegreeDays.toLocaleString()}`, subLabel: "2024 — drives summer peak demand", colorScheme: "rose" as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Renewables & Degree Days</h1>
        <p className="mt-1 text-slate-500">
          New York State 2024 — wind and solar generation, capacity factors, and heating/cooling
          degree days. Intermittency from renewables is a core driver of NYISO&apos;s Dynamic
          Reserves framework.
        </p>
      </div>

      <MetricCardGrid cards={cards} />

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">Wind & Solar Generation</h2>
        <RenewablesChart data={[NY_RENEWABLES_2024]} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">Heating & Cooling Degree Days</h2>
        <DegreeDaysChart data={[NY_DEGREE_DAYS_2024]} />
      </div>

      <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5">
        <h2 className="font-semibold text-sky-900">Intermittency &amp; Reserve Requirements</h2>
        <p className="mt-1 text-sm text-sky-800">
          Wind ({r.windCapacityFactorPct}% capacity factor) and solar ({r.solarCapacityFactorPct}%
          capacity factor) both operate well below nameplate capacity. This intermittency creates the
          uncertainty that NYISO&apos;s Dynamic Reserves framework is designed to address — by setting
          reserve requirements based on real-time contingencies rather than static rules. Assets that
          can respond within 10 minutes (demand response, batteries, V2G) are the most valuable under
          this framework.
        </p>
      </div>
    </div>
  );
}
