import type { LmorpVariable } from "@/data/energy/dynamic-reserves";

interface LmorpFormulaProps {
  variables: LmorpVariable[];
}

export default function LmorpFormula({ variables }: LmorpFormulaProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 text-white">
      {/* Formula display */}
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
        LMORP Formula
      </p>
      <div className="my-4 text-center font-mono text-lg sm:text-2xl">
        <span className="text-amber-400">γ</span>
        <sub className="text-amber-300 text-sm">i,p</sub>
        <span className="mx-2 text-slate-300">=</span>
        <span className="text-sky-400">λ</span>
        <sup className="text-sky-300 text-sm">R</sup>
        <sub className="text-sky-300 text-sm">p</sub>
        <span className="mx-2 text-slate-300">−</span>
        <span className="text-slate-300">Σ</span>
        <sub className="text-slate-400 text-xs">k ∈ K</sub>
        <span className="mx-1.5 text-slate-300">(</span>
        <span className="text-emerald-400">GF</span>
        <sub className="text-emerald-300 text-sm">ik</sub>
        <span className="mx-1 text-slate-300">×</span>
        <span className="text-rose-400">μ</span>
        <sub className="text-rose-300 text-sm">k</sub>
        <span className="text-slate-300">)</span>
      </div>

      {/* Variable table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="pb-2 text-left font-medium text-slate-400 pr-4">Symbol</th>
              <th className="pb-2 text-left font-medium text-slate-400 pr-4">Name</th>
              <th className="pb-2 text-left font-medium text-slate-400 pr-4">Unit</th>
              <th className="pb-2 text-left font-medium text-slate-400">Definition</th>
            </tr>
          </thead>
          <tbody>
            {variables.map((v, i) => (
              <tr key={i} className="border-b border-slate-800">
                <td className="py-2 pr-4 font-mono text-amber-300">{v.symbol}</td>
                <td className="py-2 pr-4 text-slate-200 whitespace-nowrap">{v.name}</td>
                <td className="py-2 pr-4 text-slate-400 whitespace-nowrap">{v.unit}</td>
                <td className="py-2 text-slate-300 text-xs leading-relaxed">{v.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
