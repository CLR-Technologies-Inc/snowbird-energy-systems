import PricingBySectorChart from "@/components/energy/PricingBySectorChart";
import MetricCardGrid from "@/components/energy/MetricCardGrid";
import { NY_PRICING_2024 } from "@/data/energy/eia-ny-2024";

export default function PricingPage() {
  const d = NY_PRICING_2024;
  const arbitrageDelta = d.residential - d.industrial;

  const cards = [
    { label: "Residential Price", value: `$${d.residential}/MMBtu`, subLabel: "Highest sector price", trend: "up" as const, colorScheme: "sky" as const },
    { label: "Commercial Price", value: `$${d.commercial}/MMBtu`, subLabel: "Second highest sector", colorScheme: "indigo" as const },
    { label: "Transport Price", value: `$${d.transport}/MMBtu`, subLabel: "EV charging & transit", colorScheme: "emerald" as const },
    { label: "Industrial Price", value: `$${d.industrial}/MMBtu`, subLabel: "Lowest sector — bulk tariffs", colorScheme: "amber" as const },
    { label: "All-Sector Average", value: `$${d.average}/MMBtu`, colorScheme: "slate" as const },
    { label: "Res–Industrial Delta", value: `$${arbitrageDelta.toFixed(2)}/MMBtu`, subLabel: "Core arbitrage signal", trend: "up" as const, colorScheme: "rose" as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Electricity Pricing by Sector</h1>
        <p className="mt-1 text-slate-500">
          New York State 2024 — dollars per million Btu. The{" "}
          <strong>${arbitrageDelta.toFixed(2)}/MMBtu</strong> spread between residential and
          industrial prices is the primary arbitrage signal driving new electrical service opportunities.
        </p>
      </div>

      <MetricCardGrid cards={cards} />

      <div className="mt-8">
        <PricingBySectorChart pricing={NY_PRICING_2024} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
          <h2 className="font-semibold text-sky-900">Residential Opportunity</h2>
          <p className="mt-1 text-sm text-sky-800">
            At $71.60/MMBtu, residential customers pay 2.7× the industrial rate. Smart
            demand-shifting — EV charging off-peak, battery storage dispatch — can materially reduce
            household bills while providing grid services.
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">Commercial Arbitrage</h2>
          <p className="mt-1 text-sm text-amber-800">
            Commercial buyers at $55.01/MMBtu represent the largest expenditure block ($13.3B/year).
            Behind-the-meter storage and demand response can reduce peak charges and generate LMORP
            reserve revenue under the 2027 Dynamic Reserves market.
          </p>
        </div>
      </div>
    </div>
  );
}
