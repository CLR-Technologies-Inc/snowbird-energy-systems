import type { BoroughOpportunity } from "@/data/energy/borough-opportunities";

interface BoroughOpportunityMapProps {
  boroughs: BoroughOpportunity[];
}

const opportunityColors: Record<string, string> = {
  "Commercial HVAC": "bg-indigo-100 text-indigo-700",
  "EV Fleet": "bg-emerald-100 text-emerald-700",
  "Industrial DR": "bg-amber-100 text-amber-700",
  "Mixed": "bg-sky-100 text-sky-700",
};

const mwColor = (mw: number) => {
  if (mw >= 150) return "text-rose-600";
  if (mw >= 100) return "text-amber-600";
  return "text-slate-700";
};

export default function BoroughOpportunityMap({ boroughs }: BoroughOpportunityMapProps) {
  const sorted = [...boroughs].sort((a, b) => b.reservePotentialMW - a.reservePotentialMW);

  return (
    <div>
      {/* Simple NYC silhouette (decorative) */}
      <div className="mb-6 flex items-end justify-center gap-1 h-16 opacity-20 select-none" aria-hidden>
        {/* Rough skyline bars representing the 5 boroughs in geographic order */}
        {[
          { w: 12, h: 64, label: "SI" },
          { w: 16, h: 40, label: "Bx" },
          { w: 20, h: 56, label: "M" },
          { w: 18, h: 48, label: "Bk" },
          { w: 22, h: 44, label: "Q" },
        ].map((b) => (
          <div
            key={b.label}
            className="bg-slate-700 rounded-t-sm"
            style={{ width: `${b.w * 4}px`, height: `${b.h}px` }}
          />
        ))}
      </div>

      {/* Borough cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((b, rank) => (
          <div
            key={b.borough}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            {/* Rank + borough name */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">#{rank + 1}</span>
                <h3 className="text-base font-bold text-slate-900">{b.borough}</h3>
                <p className="text-xs text-slate-400">{b.nyisoNode}</p>
              </div>
              <span className={`text-2xl font-bold ${mwColor(b.reservePotentialMW)}`}>
                {b.reservePotentialMW} <span className="text-sm font-normal text-slate-400">MW</span>
              </span>
            </div>

            {/* Opportunity badge */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${opportunityColors[b.primaryOpportunity] ?? "bg-slate-100 text-slate-600"}`}
              >
                {b.primaryOpportunity}
              </span>
              {b.lorcs.map((lorc) => (
                <span
                  key={lorc}
                  className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                >
                  {lorc}
                </span>
              ))}
            </div>

            {/* Asset type */}
            <p className="mt-2 text-xs font-medium text-slate-600">{b.keyAssetType}</p>

            {/* Deploy timeline */}
            <p className="mt-1 text-xs text-slate-400">
              Deploy in ~{b.deployTimelineMonths} months · {b.evPortsApprox.toLocaleString()} EV ports (est.)
            </p>

            {/* Notes */}
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">{b.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
