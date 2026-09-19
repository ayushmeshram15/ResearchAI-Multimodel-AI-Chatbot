import React from "react";
import Markdown from "react-markdown";
import { ShieldCheck, AlertCircle, CheckCircle2, Copy, Check } from "lucide-react";

interface CriticTabProps {
  critique: string;
}

export const CriticTab: React.FC<CriticTabProps> = ({ critique }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(critique);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!critique) {
    return (
      <div className="p-8 text-center bg-[#1e1f20]/50 border border-[#333537] rounded-xl">
        <p className="text-[#8e918f]">No critic feedback available yet.</p>
      </div>
    );
  }

  const isPass = critique.toUpperCase().includes("PASS");

  return (
    <div id="critic-view-container" className="space-y-4">
      {/* Top Banner */}
      <div
        className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
          isPass
            ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
            : "bg-amber-950/20 border-amber-500/30 text-amber-300"
        }`}
      >
        <div className="flex items-center gap-3">
          {isPass ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          )}
          <div>
            <h3 className="font-semibold text-xs text-[#e3e3e3]">
              {isPass ? "Critic Audit Passed (Factually Grounded)" : "Critic Flagged Revisions Needed"}
            </h3>
            <p className="text-[11px] opacity-80 text-[#c4c7c5]">
              {isPass
                ? "All asserted facts, metrics, and conclusions are corroborated by retrieved evidence."
                : "Critic flagged unsupported claims, triggering an automated revision pass."}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#131314]/60 hover:bg-[#131314] border border-[#3c4043] text-[#e3e3e3] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8e918f]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Critique Breakdown Card */}
      <div className="bg-[#1e1f20]/60 border border-[#333537] rounded-2xl p-6 shadow-md">
        <div className="markdown-body">
          <Markdown>{critique}</Markdown>
        </div>
      </div>
    </div>
  );
};
