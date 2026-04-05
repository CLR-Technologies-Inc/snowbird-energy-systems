import SavingsCounter from "@/components/savingsCounter";

const HOURLY_DATA = [
  { label: "12am – 6am", hours: 6,  usageKwh: 0.5,  daPrice: 28,  savingsRetail: 6 * 0.5 * 0.20 * 0.22 },
  { label: "6am – 7am",  hours: 1,  usageKwh: 0.8,  daPrice: 38,  savingsRetail: 1 * 0.8 * 0.20 * 0.22 },
  { label: "7am – 9am",  hours: 2,  usageKwh: 1.5,  daPrice: 55,  savingsRetail: 2 * 1.5 * 0.20 * 0.22 },
  { label: "9am – 3pm",  hours: 6,  usageKwh: 1.0,  daPrice: 38,  savingsRetail: 6 * 1.0 * 0.20 * 0.22 },
  { label: "3pm – 4pm",  hours: 1,  usageKwh: 1.5,  daPrice: 48,  savingsRetail: 1 * 1.5 * 0.20 * 0.22 },
  { label: "4pm – 8pm",  hours: 4,  usageKwh: 2.0,  daPrice: 62,  savingsRetail: 4 * 2.0 * 0.20 * 0.22 },
  { label: "8pm – 10pm", hours: 2,  usageKwh: 1.2,  daPrice: 44,  savingsRetail: 2 * 1.2 * 0.20 * 0.22 },
  { label: "10pm – 12am",hours: 2,  usageKwh: 0.8,  daPrice: 32,  savingsRetail: 2 * 0.8 * 0.20 * 0.22 },
];

const totalUsageKwh = HOURLY_DATA.reduce((sum, r) => sum + r.hours * r.usageKwh, 0);
const totalSavingsKwh = totalUsageKwh * 0.20;
const totalSavingsRetail = HOURLY_DATA.reduce((sum, r) => sum + r.savingsRetail, 0);
const totalSavingsDA = HOURLY_DATA.reduce((sum, r) => sum + r.hours * r.usageKwh * 0.20 * (r.daPrice / 1000), 0);

type Mode = "charity" | "income";

export default function SavingsPage({ searchParams }: { searchParams: { mode?: string } }) {
  const mode: Mode = searchParams.mode === "income" ? "income" : "charity";
  const modeLabel = mode === "charity" ? "Charity" : "Passive Income";
  const modeColor = mode === "charity" ? "text-sky-600" : "text-emerald-600";

  return (
    <main className="w-full py-8 px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <span className={`text-xs font-semibold uppercase tracking-widest ${modeColor}`}>
            {modeLabel} mode
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1 font-display">
            Your April 4, 2024 savings estimate
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Single NYC home &middot; 27 kWh typical spring day &middot; 20% demand-response savings &middot; NYISO Zone J
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Day-ahead market estimate</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatCard label="Daily usage" value={`${totalUsageKwh.toFixed(1)} kWh`} />
            <StatCard label="20% saved" value={`${totalSavingsKwh.toFixed(1)} kWh`} />
            <StatCard label="Retail savings" value={`$${totalSavingsRetail.toFixed(2)}`} accent />
            <StatCard label="DA wholesale" value={`$${totalSavingsDA.toFixed(2)}`} />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3 text-right">Usage (kWh/hr)</th>
                  <th className="px-4 py-3 text-right">DA Price ($/MWh)</th>
                  <th className="px-4 py-3 text-right">Period total (kWh)</th>
                  <th className="px-4 py-3 text-right">Retail savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {HOURLY_DATA.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700 font-medium">{row.label}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.usageKwh.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${row.daPrice >= 55 ? "text-amber-600" : "text-slate-600"}`}>
                        ${row.daPrice}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">{(row.hours * row.usageKwh).toFixed(1)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-sky-700">${row.savingsRetail.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-semibold">
                  <td className="px-4 py-3 text-slate-800">Total</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3 text-right text-slate-700">{totalUsageKwh.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right text-sky-700">${totalSavingsRetail.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Retail rate: $0.22/kWh &middot; DA wholesale prices are indicative NYISO Zone J estimates for April 4, 2024
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Real-time accruing savings</h2>
          <SavingsCounter mode={mode} />
        </section>

      </div>
    </main>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-bold font-mono tabular-nums ${accent ? "text-sky-600" : "text-slate-800"}`}>
        {value}
      </p>
    </div>
  );
}

export const metadata = {
  title: "Savings Estimate — Snowbird",
  description: "April 4, 2024 NYC day-ahead market savings estimate for a single home at 20% demand response.",
};
