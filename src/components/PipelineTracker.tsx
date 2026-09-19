import React from "react";
import { CheckCircle2, Loader2, Circle, AlertTriangle, ArrowRight } from "lucide-react";
import { PipelineStep, StepId } from "../types";

interface PipelineTrackerProps {
  steps: PipelineStep[];
  activeStepId: StepId | null;
  onSelectStepTab?: (stepId: StepId) => void;
}

export const PipelineTracker: React.FC<PipelineTrackerProps> = ({
  steps,
  activeStepId,
  onSelectStepTab,
}) => {
  return (
    <div
      id="research-pipeline-card"
      className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#f0ebe0]">Research Pipeline</h2>
        <span className="text-xs font-mono text-[#a09890] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c32]" />
          LangGraph State Flow
        </span>
      </div>

      <div className="space-y-2.5">
        {steps.map((step) => {
          const isActive = activeStepId === step.id;
          const isCompleted = step.status === "completed";
          const isInProgress = step.status === "in_progress";
          const isError = step.status === "error";

          return (
            <div
              key={step.id}
              id={`pipeline-step-${step.id}`}
              onClick={() => onSelectStepTab && onSelectStepTab(step.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                isInProgress
                  ? "bg-[#ff8c32]/10 border-[#ff8c32] shadow-[0_0_15px_rgba(255,140,50,0.15)]"
                  : isCompleted
                  ? "bg-white/[0.03] border-white/10 hover:border-emerald-500/40"
                  : "bg-white/[0.015] border-white/5 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#ff8c32]">
                    {step.number}
                  </span>
                  <span className="text-sm font-bold text-[#f0ebe0]">
                    {step.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#77716a] hidden sm:inline">
                    ({step.agent})
                  </span>
                </div>

                {/* Status indicator */}
                <div>
                  {isInProgress ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#ff8c32]">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      RUNNING
                    </span>
                  ) : isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ✓ DONE
                    </span>
                  ) : isError ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-rose-400">
                      <AlertTriangle className="w-3 h-3" />
                      FAILED
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[#77716a]">
                      READY
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-1 text-xs text-[#77716a]">
                <span>{step.description}</span>
                {isCompleted && (
                  <span className="text-[11px] font-mono text-[#ff8c32]/70 flex items-center gap-0.5 hover:underline">
                    view <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
