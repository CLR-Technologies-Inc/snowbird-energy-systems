import LmorpFormula from "@/components/energy/LmorpFormula";
import ReserveRequirementsViz from "@/components/energy/ReserveRequirementsViz";
import BoroughOpportunityMap from "@/components/energy/BoroughOpportunityMap";
import {
  LMORP_VARIABLES,
  RESERVE_REQUIREMENTS,
  TARIFF_REVISIONS,
  PROJECT_MILESTONES,
} from "@/data/energy/dynamic-reserves";
import { BOROUGH_OPPORTUNITIES, TOTAL_NYC_RESERVE_POTENTIAL_MW } from "@/data/energy/borough-opportunities";

export default function DynamicReservesPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
            2027 Target
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
            Pending FERC approval
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">NYISO Dynamic Reserves</h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          The New York Independent System Operator is replacing static reserve requirements with a
          dynamic framework that responds in real-time to grid conditions. This introduces{" "}
          <strong>nodal reserve pricing (LMORP)</strong> — creating locational revenue opportunities
          for demand-response assets at constrained NYC nodes.
        </p>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Project Timeline</h2>
        <ol className="relative border-l border-slate-200 ml-3 space-y-4">
          {PROJECT_MILESTONES.map((m) => (
            <li key={m.year} className="ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 ring-4 ring-white text-xs font-bold text-sky-700">
                {String(m.year).slice(2)}
              </span>
              <p className="text-sm font-medium text-slate-700">{m.year}</p>
              <p className="text-sm text-slate-500">{m.event}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* LMORP Formula */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">LMORP Pricing Formula</h2>
        <LmorpFormula variables={LMORP_VARIABLES} />
        <p className="mt-3 text-sm text-slate-500">
          Resources at nodes that <em>relieve</em> a binding Locational Operating Reserve Constraint
          (positive GF × positive μ) receive an LMORP <strong>below</strong> the NYCA system price —
          meaning the locational reserve is cheaper. Resources at nodes that <em>tighten</em> a
          constraint receive an LMORP <strong>above</strong> the system price — a premium signal for
          investment in that location.
        </p>
      </div>

      {/* Reserve Requirements */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Reserve Requirements</h2>
        <ReserveRequirementsViz requirements={RESERVE_REQUIREMENTS} />
      </div>

      {/* Borough Opportunities */}
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-800">NYC Borough Opportunities</h2>
          <span className="text-sm text-slate-500">
            Total addressable: <strong>{TOTAL_NYC_RESERVE_POTENTIAL_MW} MW</strong>
          </span>
        </div>
        <BoroughOpportunityMap boroughs={BOROUGH_OPPORTUNITIES} />
      </div>

      {/* Tariff Revisions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Proposed Tariff Revisions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TARIFF_REVISIONS.map((t, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`rounded px-1.5 py-0.5 text-xs font-bold ${t.tariff === "MST" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}>
                  {t.tariff}
                </span>
                <span className="text-xs font-semibold text-slate-600">§ {t.section}</span>
              </div>
              <p className="text-sm text-slate-600">{t.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
