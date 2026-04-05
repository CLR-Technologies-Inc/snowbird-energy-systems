// Year-over-year savings comparison: 2024 vs 2025
// Based on a single NYC home, 20% demand-response savings, NYISO Zone J retail rate

interface MonthRow {
  month: string;
  usage2024: number; // kWh
  usage2025: number; // kWh
  rate2024: number;  // $/kWh retail
  rate2025: number;  // $/kWh retail
}

const MONTHS: MonthRow[] = [
  { month: "Jan", usage2024: 42,  usage2025: 40,  rate2024: 0.220, rate2025: 0.228 },
  { month: "Feb", usage2024: 38,  usage2025: 36,  rate2024: 0.220, rate2025: 0.228 },
  { month: "Mar", usage2024: 32,  usage2025: 30,  rate2024: 0.222, rate2025: 0.230 },
  { month: "Apr", usage2024: 27,  usage2025: 25,  rate2024: 0.222, rate2025: 0.230 },
  { month: "May", usage2024: 28,  usage2025: 26,  rate2024: 0.225, rate2025: 0.233 },
  { month: "Jun", usage2024: 38,  usage2025: 36,  rate2024: 0.228, rate2025: 0.236 },
  { month: "Jul", usage2024: 48,  usage2025: 46,  rate2024: 0.228, rate2025: 0.236 },
  { month: "Aug", usage2024: 45,  usage2025: 43,  rate2024: 0.228, rate2025: 0.236 },
  { month: "Sep", usage2024: 35,  usage2025: 33,  rate2024: 0.225, rate2025: 0.233 },
  { month: "Oct", usage2024: 28,  usage2025: 26,  rate2024: 0.222, rate2025: 0.230 },
  { month: "Nov", usage2024: 33,  usage2025: 31,  rate2024: 0.220, rate2025: 0.228 },
  { month: "Dec", usage2024: 41,  usage2025: 39,  rate2024: 0.220, rate2025: 0.228 },
];

const SAVINGS_RATE = 0.20;

function calcSavings(usage: number, rate: number) {
  return usage * SAVINGS_RATE * rate;
}

export default function SavingsComparePage() {
  const rows = MONTHS.map((m) => ({
    ...m,
    savings2024: calcSavings(m.usage2024, m.rate2024),
    savings2025: calcSavings(m.usage2025, m.rate2025),
  }));

  const total2024 = rows.reduce((s, r) => s + r.savings2024, 0);
  const total2025 = rows.reduce((s, r) => s + r.savings2025, 0);
  const delta = total2025 - total2024;
  const deltaPct = ((delta / total2024) * 100).toFixed(1);

  const maxSavings = Math.max(...rows.map((r) => Math.max(r.savings2024, r.savings2025)));

  return (
    <main className="w-full py-8 px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-display">Year-over-year savings</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Single NYC home &middot; 20% demand-response savings &middot; NYISO Zone J retail rate
          </p>
        </div>

        {/* Summary chips */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-500 mb-1">2024 total</p>
            <p className="text-xl font-bold font-mono text-slate-700">${total2024.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-500 mb-1">2025 total</p>
            <p className="text-xl font-bold font-mono text-sky-600">${total2025.toFixed(2)}</p>
          </div>
          <div className={`rounded-xl border px-4 py-3 ${delta >= 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
            <p className="text-xs text-slate-500 mb-1">YoY change</p>
            <p className={`text-xl font-bold font-mono ${delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {delta >= 0 ? "+" : ""}${delta.toFixed(2)}
              <span className="text-sm font-normal ml-1">({delta >= 0 ? "+" : ""}{deltaPct}%)</span>
            </p>
          </div>
        </div>

        {/* Bar chart */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Monthly comparison</h2>
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.month} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium text-slate-500 text-right">{row.month}</span>
                <div className="flex-1 space-y-1">
                  {/* 2024 bar */}
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 rounded-full bg-slate-300"
                      style={{ width: `${(row.savings2024 / maxSavings) * 100}%` }}
                    />
                    <span className="text-xs text-slate-500 tabular-nums">${row.savings2024.toFixed(2)}</span>
                  </div>
                  {/* 2025 bar */}
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 rounded-full bg-sky-400"
                      style={{ width: `${(row.savings2025 / maxSavings) * 100}%` }}
                    />
                    <span className="text-xs text-sky-600 tabular-nums font-medium">${row.savings2025.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-4 rounded-full bg-slate-300" /> 2024</span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-4 rounded-full bg-sky-400" /> 2025</span>
          </div>
        </section>

        {/* Detail table */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Monthly detail</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3 text-right">2024 usage</th>
                  <th className="px-4 py-3 text-right">2024 saved</th>
                  <th className="px-4 py-3 text-right">2025 usage</th>
                  <th className="px-4 py-3 text-right">2025 saved</th>
                  <th className="px-4 py-3 text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => {
                  const diff = row.savings2025 - row.savings2024;
                  return (
                    <tr key={row.month} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-700">{row.month}</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 tabular-nums">{row.usage2024} kWh</td>
                      <td className="px-4 py-2.5 text-right text-slate-600 tabular-nums">${row.savings2024.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 tabular-nums">{row.usage2025} kWh</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-sky-600 tabular-nums">${row.savings2025.toFixed(2)}</td>
                      <td className={`px-4 py-2.5 text-right tabular-nums text-xs ${diff >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {diff >= 0 ? "+" : ""}${diff.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-semibold">
                  <td className="px-4 py-3 text-slate-800">Total</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3 text-right text-slate-700 tabular-nums">${total2024.toFixed(2)}</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3 text-right text-sky-600 tabular-nums">${total2025.toFixed(2)}</td>
                  <td className={`px-4 py-3 text-right tabular-nums ${delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {delta >= 0 ? "+" : ""}${delta.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Usage estimates based on NYC residential averages &middot; 2025 rate reflects 3.6% Con Ed tariff adjustment
          </p>
        </section>

      </div>
    </main>
  );
}

export const metadata = {
  title: "Year-over-year savings — snowbird systems",
  description: "2024 vs 2025 monthly demand-response savings comparison for a single NYC home.",
};
