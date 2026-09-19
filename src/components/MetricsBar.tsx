import React from "react";
import { Link2, Sparkles, ShieldCheck, RefreshCw, Clock } from "lucide-react";
import { ResearchResult } from "../types";

interface MetricsBarProps {
  result: ResearchResult;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ result }) => {
  const isPass = result.critique.toUpperCase().includes("PASS");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {/* Metric 1: Sources */}
      <div
        id="metric-sources"
        className="bg-white/[0.025] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#ff8c32]/30 transition-colors"
      >
        <div className="flex items-center justify-between text-[#77716a] text-xs font-mono mb-1">
          <span>SOURCES</span>
          <Link2 className="w-3.5 h-3.5 text-[#ff8c32]" />
        </div>
        <div className="text-2xl font-bold text-[#f0ebe0]">
          {result.sources.length}
        </div>
        <div className="text-[11px] text-[#a09890] mt-1 truncate">
          Verified live web citations
        </div>
      </div>

      {/* Metric 2: Research Status */}
      <div
        id="metric-research"
        className="bg-white/[0.025] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
      >
        <div className="flex items-center justify-between text-[#77716a] text-xs font-mono mb-1">
          <span>RESEARCH</span>
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold text-emerald-400">
          Complete
        </div>
        <div className="text-[11px] text-[#a09890] mt-1">
          Evidence brief synthesized
        </div>
      </div>

      {/* Metric 3: Quality Check */}
      <div
        id="metric-quality"
        className="bg-white/[0.025] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#ff8c32]/30 transition-colors"
      >
        <div className="flex items-center justify-between text-[#77716a] text-xs font-mono mb-1">
          <span>QUALITY CHECK</span>
          <ShieldCheck
            className={`w-3.5 h-3.5 ${
              isPass ? "text-emerald-400" : "text-amber-400"
            }`}
          />
        </div>
        <div
          className={`text-2xl font-bold ${
            isPass ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          {isPass ? "PASS" : "Reviewed"}
        </div>
        <div className="text-[11px] text-[#a09890] mt-1 truncate">
          {result.needs_review ? "Critic audit & revision applied" : "Verified clean"}
        </div>
      </div>

      {/* Metric 4: Revisions */}
      <div
        id="metric-revisions"
        className="bg-white/[0.025] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#ff8c32]/30 transition-colors"
      >
        <div className="flex items-center justify-between text-[#77716a] text-xs font-mono mb-1">
          <span>REVISIONS</span>
          <RefreshCw className="w-3.5 h-3.5 text-[#ff8c32]" />
        </div>
        <div className="text-2xl font-bold text-[#f0ebe0]">
          {result.revision_count}
        </div>
        <div className="text-[11px] text-[#a09890] mt-1">
          {result.executionTimeMs
            ? `Completed in ${(result.executionTimeMs / 1000).toFixed(1)}s`
            : "Quality loops executed"}
        </div>
      </div>
    </div>
  );
};
