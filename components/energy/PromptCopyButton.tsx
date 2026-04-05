"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface PromptCopyButtonProps {
  promptText: string;
}

export default function PromptCopyButton({ promptText }: PromptCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        copied
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy Prompt
        </>
      )}
    </button>
  );
}
