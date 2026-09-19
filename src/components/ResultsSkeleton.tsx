import React from "react";
import { Loader2, Sparkles, FileText, Link2, Brain, ShieldCheck, Database } from "lucide-react";
import { PipelineStep, StepId } from "../types";

interface ResultsSkeletonProps {
  currentStageMsg: string;
  progressPercent: number;
  activeStepId: StepId | null;
  steps: PipelineStep[];
}

export const ResultsSkeleton: React.FC<ResultsSkeletonProps> = ({
  currentStageMsg,
  progressPercent,
  activeStepId,
  steps,
}) => {
  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div
      id="results-skeleton-container"
      className="mt-6 pt-4 border-t border-[#333537]/60 space-y-5 animate-fadeIn"
    >
      {/* Header with real-time status pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#4285f4] via-[#9b72cf] to-[#d96570] flex items-center justify-center p-0.5 animate-pulse">
            <div className="w-full h-full bg-[#131314] rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#a8c7fa] animate-spin" />
            </div>
          </div>
          <span className="text-sm font-semibold text-[#e3e3e3]">
            {activeStep?.title || "Agent Pipeline Working..."}
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4285f4]/10 border border-[#4285f4]/25 text-[#a8c7fa] text-xs font-mono">
            <Loader2 className="w-3 h-3 animate-spin text-[#7cacf8]" />
            <span>{progressPercent}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8e918f]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#4285f4] animate-ping" />
          <span>{currentStageMsg || "Synthesizing research graph..."}</span>
        </div>
      </div>

      {/* 4 Metrics Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-4">
        {[
          { label: "GROUNDED SOURCES", icon: Link2, hint: "Gathering live web citations..." },
          { label: "ANALYST BRIEF", icon: Brain, hint: "Extracting verified facts..." },
          { label: "CRITIC QC", icon: ShieldCheck, hint: "Auditing factual claims..." },
          { label: "REVISION PASS", icon: Sparkles, hint: "Ensuring zero hallucinations..." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-[#1e1f20]/60 border border-[#333537] rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            <div className="flex items-center justify-between text-[#8e918f] text-[11px] font-mono mb-2">
              <span>{item.label}</span>
              <item.icon className="w-3.5 h-3.5 text-[#7cacf8]/60" />
            </div>

            <div className="my-1">
              <div className="h-7 w-20 bg-white/10 rounded-md animate-pulse" />
            </div>

            <div className="text-[11px] text-[#8e918f] font-mono mt-1 flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7cacf8] animate-pulse flex-shrink-0" />
              <span className="truncate">{item.hint}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="border-b border-[#333537] flex flex-wrap gap-1.5 pt-1">
        {[
          { icon: FileText, label: "Synthesis Report", active: true },
          { icon: Link2, label: "Grounded Sources", active: false },
          { icon: Brain, label: "Analyst Brief", active: false },
          { icon: ShieldCheck, label: "Critic QC Audit", active: false },
          { icon: Database, label: "Raw Evidence", active: false },
        ].map((tab, idx) => (
          <div
            key={idx}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg flex items-center gap-2 border-b-2 ${
              tab.active
                ? "text-[#a8c7fa] border-[#7cacf8] bg-[#1e1f20]"
                : "text-[#5f6368] border-transparent opacity-60"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            {tab.active && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#7cacf8] animate-ping ml-0.5" />
            )}
          </div>
        ))}
      </div>

      {/* Main Report Body Skeleton */}
      <div className="space-y-4">
        {/* Skeleton Document Card */}
        <div className="bg-[#1e1f20]/50 border border-[#333537] rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Subtle ongoing shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.2s_infinite] bg-gradient-to-r from-transparent via-[#4285f4]/[0.03] to-transparent pointer-events-none" />

          <div className="space-y-5">
            {/* Section 1: Title & Lead */}
            <div className="space-y-2.5 pb-4 border-b border-[#333537]/60">
              <div className="h-7 w-2/3 bg-white/15 rounded-lg animate-pulse" />
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-white/10 rounded animate-pulse" />
              </div>
            </div>

            {/* Section 2: Key Findings */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-2">
                <div className="h-5 w-40 bg-[#7cacf8]/25 rounded animate-pulse" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8e918f]">
                  Cross-referencing verified sources...
                </span>
              </div>

              {/* Bullet skeleton list */}
              <div className="space-y-3 pl-3">
                {[
                  { w1: "w-11/12", w2: "w-3/4" },
                  { w1: "w-full", w2: "w-5/6" },
                  { w1: "w-10/12", w2: "w-2/3" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7cacf8] mt-2 flex-shrink-0 animate-pulse" />
                    <div className="flex-1 space-y-1.5">
                      <div className={`h-4 ${row.w1} bg-white/10 rounded animate-pulse`} />
                      <div className="flex items-center gap-2">
                        <div className={`h-3.5 ${row.w2} bg-white/5 rounded animate-pulse`} />
                        <div className="h-4 w-16 bg-[#4285f4]/15 border border-[#4285f4]/25 rounded text-[10px] font-mono text-[#a8c7fa] flex items-center justify-center animate-pulse">
                          Source {i + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Message */}
            <div className="pt-3 border-t border-[#333537]/50 flex items-center justify-between text-xs font-mono text-[#8e918f]">
              <span className="flex items-center gap-2 text-[#c4c7c5]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7cacf8]" />
                Critic Agent is evaluating claims factuality and generating source bibliography...
              </span>
              <span className="text-[#a8c7fa] font-bold">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
