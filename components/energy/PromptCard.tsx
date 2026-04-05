import PromptCopyButton from "./PromptCopyButton";
import { CATEGORY_LABELS } from "@/data/energy/prompts";
import type { PromptTemplate } from "@/data/energy/prompts";

const categoryColors: Record<string, string> = {
  "eia-data-refresh": "bg-sky-100 text-sky-700",
  "borough-opportunity": "bg-emerald-100 text-emerald-700",
  "lmorp-calculation": "bg-amber-100 text-amber-700",
  "market-design-update": "bg-indigo-100 text-indigo-700",
};

const modelBadge: Record<string, string> = {
  gemini: "bg-blue-50 text-blue-600",
  claude: "bg-orange-50 text-orange-600",
  both: "bg-slate-100 text-slate-500",
};

interface PromptCardProps {
  prompt: PromptTemplate;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[prompt.category]}`}>
              {CATEGORY_LABELS[prompt.category]}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs ${modelBadge[prompt.targetModel]}`}>
              {prompt.targetModel === "both" ? "Gemini / Claude" : prompt.targetModel}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900">{prompt.title}</h3>
        </div>
        <PromptCopyButton promptText={prompt.promptText} />
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500">{prompt.description}</p>

      {/* Variables */}
      {prompt.variables.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1">Fill before running:</p>
          <div className="flex flex-wrap gap-1">
            {prompt.variables.map((v) => (
              <code key={v} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 font-mono">
                {v}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* Prompt text preview */}
      <details className="group">
        <summary className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 list-none flex items-center gap-1">
          <span className="group-open:hidden">▶ Show prompt</span>
          <span className="hidden group-open:inline">▼ Hide prompt</span>
        </summary>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-600 whitespace-pre-wrap font-mono leading-relaxed border border-slate-200">
          {prompt.promptText}
        </pre>
      </details>
    </div>
  );
}
