import type { ReserveRequirement } from "@/data/energy/dynamic-reserves";

interface ReserveRequirementsVizProps {
  requirements: ReserveRequirement[];
}

const MAX_MW = 600; // scale for bar widths

function MWBar({ staticMW, label, tsaNote }: { staticMW: number; label: string; tsaNote?: string | null }) {
  const staticPct = (staticMW / MAX_MW) * 100;
  const dynamicPct = Math.min(((staticMW * 1.08) / MAX_MW) * 100, 98); // ~8% dynamic headroom

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-xs text-slate-500">{staticMW} MW static floor</span>
      </div>
      <div className="relative h-7 rounded-full bg-slate-100">
        {/* Dynamic headroom */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-sky-100 border border-dashed border-sky-300"
          style={{ width: `${dynamicPct}%` }}
        />
        {/* Static floor */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-sky-500 flex items-center justify-end pr-2"
          style={{ width: `${staticPct}%` }}
        >
          <span className="text-xs font-semibold text-white">{staticMW} MW</span>
        </div>
        {/* Dynamic label */}
        <span
          className="absolute inset-y-0 flex items-center text-xs text-sky-600"
          style={{ left: `calc(${staticPct}% + 6px)` }}
        >
          +dynamic
        </span>
      </div>
      {tsaNote && (
        <p className="mt-1 text-xs text-amber-600">⚡ TSA: {tsaNote}</p>
      )}
    </div>
  );
}

export default function ReserveRequirementsViz({ requirements }: ReserveRequirementsVizProps) {
  const withFloor = requirements.filter((r) => r.staticFloorMW !== null);
  const dynamic = requirements.filter((r) => r.staticFloorMW === null);

  return (
    <div className="space-y-6">
      {/* Static floor bars */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 font-semibold text-slate-800">Locational Static Floors</h3>
        {withFloor.map((r, i) => (
          <MWBar
            key={i}
            staticMW={r.staticFloorMW!}
            label={`${r.region} — ${r.productType}`}
            tsaNote={r.tsaOverride}
          />
        ))}
      </div>

      {/* Dynamic-only requirements */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-3 font-semibold text-slate-800">NYCA Dynamic Requirements (no static floor)</h3>
        <div className="space-y-3">
          {dynamic.map((r, i) => (
            <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-700">{r.productType}</p>
              <p className="mt-0.5 text-xs text-slate-500">{r.dynamicBasis}</p>
              {r.notes && <p className="mt-1 text-xs text-slate-400">{r.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
