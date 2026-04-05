import PromptCardGrid from "@/components/energy/PromptCardGrid";
import { PROMPT_TEMPLATES } from "@/data/energy/prompts";

export default function PromptsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Prompts Library</h1>
        <p className="mt-1 text-slate-500 max-w-2xl">
          Copy these prompts into your AI assistant to refresh EIA data, analyse NYC borough
          opportunities, walk through LMORP calculations, or convert NYISO documents into
          website-ready content.
        </p>
      </div>

      <PromptCardGrid prompts={PROMPT_TEMPLATES} />
    </div>
  );
}
