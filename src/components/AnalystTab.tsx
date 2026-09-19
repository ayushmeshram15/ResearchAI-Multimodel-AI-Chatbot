import React from "react";
import Markdown from "react-markdown";
import { Brain, Copy, Check, Info } from "lucide-react";

interface AnalystTabProps {
  researchBrief: string;
}

export const AnalystTab: React.FC<AnalystTabProps> = ({ researchBrief }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(researchBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!researchBrief) {
    return (
      <div className="p-8 text-center bg-[#1e1f20]/50 border border-[#333537] rounded-xl">
        <p className="text-[#8e918f]">No research analysis available yet.</p>
      </div>
    );
  }

  return (
    <div id="analyst-view-container" className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#1e1f20]/80 border border-[#333537]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#9b72cf]/15 text-[#c58af9] border border-[#9b72cf]/30">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#e3e3e3]">
              Research Analyst Structured Brief
            </h3>
            <p className="text-[11px] text-[#8e918f]">
              Synthesized from grounded citations by Agent 02 (Key Facts, Trends & Limitations)
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#e3e3e3] border border-[#3c4043] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8e918f]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Analyst Guidelines Callout */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1e1f20]/40 border border-[#333537] text-xs text-[#8e918f]">
        <Info className="w-4 h-4 text-[#7cacf8] flex-shrink-0 mt-0.5" />
        <p>
          The Research Analyst agent extracts strictly verifiable facts, statistics, and domain trends without extrapolation.
        </p>
      </div>

      {/* Brief Content Card */}
      <div className="bg-[#1e1f20]/60 border border-[#333537] rounded-2xl p-6 shadow-md">
        <div className="markdown-body">
          <Markdown>{researchBrief}</Markdown>
        </div>
      </div>
    </div>
  );
};
