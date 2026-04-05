// Annual savings and donation summary
// Single NYC home, 20% demand-response savings, NYISO Zone J
// Charity split: 50% donated, 50% retained as passive income (default allocation)

const ANNUAL_DATA = [
  {
    year: 2024,
    totalSavingsRetail: 57.84, // sum of monthly retail savings (20% × usage × rate)
    charityPct: 50,
    charityName: "NYC Food Bank",
    co2AvoidedKg: 98.4, // 0.386 kg CO2/kWh × 5.4 kWh/day × 365 × 20% avoided
    kwhSaved: 435,
  },
  {
    year: 2025,
    totalSavingsRetail: 60.84, // ~5.2% more due to rate increase + modest usage reduction
    charityPct: 50,
    charityName: "NYC Food Bank",
    co2AvoidedKg: 102.0,
    kwhSaved: 420,
  },
];

function fmt(n: number, decimals = 2) {
  return n.toFixed(decimals);
}

export default function AnnualSummaryPage() {
  return (
    <main className="w-full py-8 px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-display">Annual savings &amp; donations</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Single NYC home &middot; 50% donated to charity &middot; 50% retained as passive income
          </p>
        </div>

        {/* Year cards */}
        <div className="space-y-6 mb-10">
          {ANNUAL_DATA.map((yr) => {
            const donated = yr.totalSavingsRetail * (yr.charityPct / 100);
            const retained = yr.totalSavingsRetail - donated;
            const donatedMeals = Math.round(donated / 0.85); // ~$0.85/meal equivalent at NYC Food Bank

            return (
              <div key={yr.year} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {/* Year header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-800 font-display">{yr.year}</h2>
                  <span className="text-2xl font-bold font-mono text-sky-600">${fmt(yr.totalSavingsRetail)}</span>
                </div>

                {/* Split breakdown */}
                <div className="px-6 py-5 grid grid-cols-2 gap-6">

                  {/* Charity column */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-sky-500">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">Charity</span>
                      <span className="ml-auto text-xs text-slate-400">{yr.charityPct}%</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-sky-600 mb-1">${fmt(donated)}</p>
                    <p className="text-xs text-slate-500">donated to {yr.charityName}</p>
                    <div className="mt-3 rounded-lg bg-sky-50 px-3 py-2">
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-sky-700">≈ {donatedMeals} meals</span> funded at $0.85/meal equivalent
                      </p>
                    </div>
                  </div>

                  {/* Passive income column */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-emerald-500">
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">Passive income</span>
                      <span className="ml-auto text-xs text-slate-400">{100 - yr.charityPct}%</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-emerald-600 mb-1">${fmt(retained)}</p>
                    <p className="text-xs text-slate-500">returned to homeowner</p>
                    <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2">
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-emerald-700">${fmt(retained / 12)}/month</span> average passive return
                      </p>
                    </div>
                  </div>
                </div>

                {/* Environmental row */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-6">
                  <div>
                    <p className="text-xs text-slate-500">kWh saved</p>
                    <p className="text-sm font-semibold text-slate-700 tabular-nums">{yr.kwhSaved} kWh</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">CO₂ avoided</p>
                    <p className="text-sm font-semibold text-slate-700 tabular-nums">{fmt(yr.co2AvoidedKg, 1)} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Avg rate</p>
                    <p className="text-sm font-semibold text-slate-700 tabular-nums">
                      ${fmt(yr.totalSavingsRetail / (yr.kwhSaved * 0.20), 3)}/kWh
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-year combined */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Two-year combined</h2>
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-right">Total savings</th>
                  <th className="px-4 py-3 text-right">Donated</th>
                  <th className="px-4 py-3 text-right">Income</th>
                  <th className="px-4 py-3 text-right">CO₂ avoided</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ANNUAL_DATA.map((yr) => {
                  const donated = yr.totalSavingsRetail * (yr.charityPct / 100);
                  const retained = yr.totalSavingsRetail - donated;
                  return (
                    <tr key={yr.year} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">{yr.year}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700">${fmt(yr.totalSavingsRetail)}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-sky-600">${fmt(donated)}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-600">${fmt(retained)}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-500">{fmt(yr.co2AvoidedKg, 1)} kg</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-semibold">
                  <td className="px-4 py-3 text-slate-800">Total</td>
                  {(() => {
                    const total = ANNUAL_DATA.reduce((s, y) => s + y.totalSavingsRetail, 0);
                    const totalDonated = ANNUAL_DATA.reduce((s, y) => s + y.totalSavingsRetail * y.charityPct / 100, 0);
                    const totalRetained = total - totalDonated;
                    const totalCo2 = ANNUAL_DATA.reduce((s, y) => s + y.co2AvoidedKg, 0);
                    return (
                      <>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-700">${fmt(total)}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-sky-600">${fmt(totalDonated)}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-600">${fmt(totalRetained)}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-500">{fmt(totalCo2, 1)} kg</td>
                      </>
                    );
                  })()}
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            CO₂ factor: 0.386 kg/kWh (NYISO 2024 emissions intensity) &middot; Meal equivalent: NYC Food Bank rate
          </p>
        </section>

      </div>
    </main>
  );
}

export const metadata = {
  title: "Annual savings & donations — snowbird systems",
  description: "Annual demand-response savings, charity donations, and passive income summary for a single NYC home.",
};
