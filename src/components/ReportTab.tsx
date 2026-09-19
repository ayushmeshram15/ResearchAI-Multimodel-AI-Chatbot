import React, { useState } from "react";
import Markdown from "react-markdown";
import { Copy, Download, Check, Sparkles, FileText, ArrowRight, RefreshCw } from "lucide-react";
import { ResearchResult } from "../types";

interface ReportTabProps {
  result: ResearchResult;
  onSelectSource?: (idx: number) => void;
  onTriggerRevision?: (feedback: string) => Promise<void>;
  isRevising?: boolean;
}

export const ReportTab: React.FC<ReportTabProps> = ({
  result,
  onTriggerRevision,
  isRevising,
}) => {
  const [copied, setCopied] = useState(false);
  const [customRevisionPrompt, setCustomRevisionPrompt] = useState("");
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  const reportText = result.final_report || result.initial_report || "No report generated yet.";

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${result.topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}_research_report.md`;
    const blob = new Blob([reportText], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onTriggerRevision && customRevisionPrompt.trim()) {
      onTriggerRevision(customRevisionPrompt.trim());
      setCustomRevisionPrompt("");
      setShowRevisionForm(false);
    }
  };

  return (
    <div id="report-view-container" className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#1e1f20]/80 border border-[#333537]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#7cacf8]" />
          <span className="text-xs font-semibold text-[#e3e3e3]">
            Synthesized Research Report
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#333537] text-[#a8c7fa]">
            {result.sources.length} Sources Grounded
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="copy-report-btn"
            onClick={handleCopy}
            type="button"
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#e3e3e3] border border-[#3c4043] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8e918f]" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            id="download-report-btn"
            onClick={handleDownload}
            type="button"
            className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#a8c7fa] border border-[#3c4043] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>

          {onTriggerRevision && (
            <button
              onClick={() => setShowRevisionForm(!showRevisionForm)}
              type="button"
              className="px-3 py-1.5 text-xs font-mono text-[#c4c7c5] hover:text-[#e3e3e3] rounded-lg bg-[#282a2c] hover:bg-[#333537] border border-[#3c4043] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-[#c58af9]" />
              <span>Refine with Critic</span>
            </button>
          )}
        </div>
      </div>

      {/* Optional Custom Revision Input Form */}
      {showRevisionForm && onTriggerRevision && (
        <form
          onSubmit={handleRevisionSubmit}
          className="p-4 rounded-xl bg-[#1e1f20] border border-[#4285f4]/40 space-y-3 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#a8c7fa] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c58af9]" />
              Direct Targeted Revision Request to Writer &amp; Critic
            </span>
            <span className="text-[11px] text-[#8e918f]">
              Maintains strict evidence grounding
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customRevisionPrompt}
              onChange={(e) => setCustomRevisionPrompt(e.target.value)}
              placeholder="e.g. Expand on quantitative benchmarks and strengthen Source 1 citations..."
              disabled={isRevising}
              className="flex-1 bg-[#131314] border border-[#3c4043] rounded-lg px-3 py-2 text-xs text-[#e3e3e3] focus:outline-none focus:border-[#7cacf8]"
            />
            <button
              type="submit"
              disabled={isRevising || !customRevisionPrompt.trim()}
              className="px-4 py-2 bg-gradient-to-r from-[#4285f4] to-[#9b72cf] hover:opacity-90 text-white font-mono font-medium text-xs rounded-lg transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              {isRevising ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Revising...</span>
                </>
              ) : (
                <>
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Main Report Card */}
      <div
        id="report-markdown-card"
        className="bg-[#1e1f20]/60 border border-[#333537] rounded-2xl p-6 md:p-8 shadow-lg relative"
      >
        <div className="markdown-body">
          <Markdown>{reportText}</Markdown>
        </div>
      </div>
    </div>
  );
};
