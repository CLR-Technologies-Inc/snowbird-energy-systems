"use client";

import { useState } from "react";
import PromptCard from "./PromptCard";
import { CATEGORY_LABELS } from "@/data/energy/prompts";
import type { PromptTemplate, PromptCategory } from "@/data/energy/prompts";

interface PromptCardGridProps {
  prompts: PromptTemplate[];
}

const ALL = "all" as const;
type Filter = PromptCategory | typeof ALL;

export default function PromptCardGrid({ prompts }: PromptCardGridProps) {
  const [active, setActive] = useState<Filter>(ALL);

  const categories = Array.from(new Set(prompts.map((p) => p.category))) as PromptCategory[];
  const filtered = active === ALL ? prompts : prompts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter bar */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActive(ALL)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            active === ALL
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All ({prompts.length})
        </button>
        {categories.map((cat) => {
          const count = prompts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {CATEGORY_LABELS[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}
