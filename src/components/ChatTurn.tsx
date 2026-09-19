import React, { useState } from "react";
import {
  Sparkles,
  FileText,
  Link2,
  Brain,
  ShieldCheck,
  Database,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { ChatMessage, PipelineStep, StepId } from "../types";
import { ReportTab } from "./ReportTab";
import { SourcesTab } from "./SourcesTab";
import { AnalystTab } from "./AnalystTab";
import { CriticTab } from "./CriticTab";
import { EvidenceTab } from "./EvidenceTab";
import { ResultsSkeleton } from "./ResultsSkeleton";

interface ChatTurnProps {
  message: ChatMessage;
  onSendFollowUp?: (prompt: string) => void;
  onTriggerRevision?: (feedback: string) => Promise<void>;
  isRevising?: boolean;
}

export const ChatTurn: React.FC<ChatTurnProps> = ({
  message,
  onSendFollowUp,
  onTriggerRevision,
  isRevising,
}) => {
  const [activeTab, setActiveTab] = useState<"report" | "sources" | "analyst" | "critic" | "evidence">("report");
  const [showAgentTrace, setShowAgentTrace] = useState(false);

  // If this is a user message
  if (message.role === "user") {
    return (
      <div className="flex items-start justify-end gap-3 max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
        <div className="flex flex-col items-end max-w-[85%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-[#c4c7c5]">Ayush</span>
            <span className="text-[10px] font-mono text-[#8e918f]">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-[#282a2c] text-[#e3e3e3] border border-[#3c4043] shadow-sm text-sm leading-relaxed">
            {message.content}
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4285f4] to-[#9b72cf] p-0.5 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-full h-full rounded-full bg-[#131314] flex items-center justify-center text-xs font-bold text-[#a8c7fa]">
            AM
          </div>
        </div>
      </div>
    );
  }

  // Assistant Research Turn
  const isRunning = message.isRunning;
  const result = message.result;
  const steps = message.steps || [];

  return (
    <div className="flex items-start gap-3.5 max-w-3xl mx-auto px-4 py-4 animate-fadeIn">
      {/* Gemini Sparkle Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4285f4] via-[#9b72cf] to-[#d96570] p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
        <div className="w-full h-full rounded-full bg-[#131314] flex items-center justify-center">
          <Sparkles className={`w-4 h-4 text-[#a8c7fa] ${isRunning ? "animate-spin" : ""}`} />
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#e3e3e3]">ResearchMind</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1e1f20] text-[#a8c7fa] border border-[#333537]">
              Multi-Agent
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8e918f]">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* Live Running Skeleton & Step Progress */}
        {isRunning && (
          <div className="space-y-4">
            {/* Real-time Step Progress Strip */}
            <div className="p-3.5 rounded-2xl bg-[#1e1f20]/90 border border-[#333537] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#e3e3e3] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4285f4] animate-ping" />
                  {message.currentStageMsg || "Orchestrating agents..."}
                </span>
                <span className="font-mono text-[#a8c7fa] font-bold">
                  {message.progressPercent || 20}%
                </span>
              </div>

              {/* Step indicator pills */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[
                  { label: "Search", id: "search" },
                  { label: "Analyst", id: "analyst" },
                  { label: "Writer", id: "writer" },
                  { label: "Critic", id: "critic" },
                  { label: "Finalize", id: "finalize" },
                ].map((st, i) => {
                  const stepObj = steps.find((s) => s.id === st.id);
                  const isDone = stepObj?.status === "completed";
                  const isCurrent = message.activeStepId === st.id;

                  return (
                    <div
                      key={i}
                      className={`py-1 text-center text-[10px] font-mono rounded-lg transition-colors ${
                        isDone
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                          : isCurrent
                          ? "bg-[#4285f4]/20 text-[#a8c7fa] border border-[#4285f4]/40 animate-pulse font-bold"
                          : "bg-[#131314] text-[#8e918f] border border-[#333537]/50 opacity-60"
                      }`}
                    >
                      {st.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skeleton Loading State */}
            <ResultsSkeleton
              currentStageMsg={message.currentStageMsg || "Synthesizing research..."}
              progressPercent={message.progressPercent || 35}
              activeStepId={message.activeStepId || "search"}
              steps={steps}
            />
          </div>
        )}

        {/* Finalized Result State */}
        {result && (
          <div className="space-y-4">
            {/* Top Metrics Badge Strip */}
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#1e1f20] border border-[#333537] text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#282a2c] text-[#81c995] font-mono font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#81c995]" />
                <span>Critic QC: PASS</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#282a2c] text-[#a8c7fa] font-mono">
                <Link2 className="w-3.5 h-3.5 text-[#7cacf8]" />
                <span>{result.sources.length} Grounded Sources</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#282a2c] text-[#c4c7c5] font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#c58af9]" />
                <span>5 Agents Coordinated</span>
              </div>

              {result.executionTimeMs && (
                <div className="flex items-center gap-1 text-[#8e918f] font-mono text-[11px] ml-auto">
                  <Clock className="w-3 h-3" />
                  <span>{(result.executionTimeMs / 1000).toFixed(1)}s</span>
                </div>
              )}
            </div>

            {/* Expandable Multi-Agent Execution Steps */}
            <div className="rounded-xl border border-[#333537] bg-[#1e1f20]/50 overflow-hidden">
              <button
                onClick={() => setShowAgentTrace(!showAgentTrace)}
                type="button"
                className="w-full px-3.5 py-2 flex items-center justify-between text-xs text-[#c4c7c5] hover:text-[#e3e3e3] hover:bg-[#282a2c]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7cacf8]" />
                  <span>Multi-Agent Execution Pipeline Trace</span>
                </div>
                {showAgentTrace ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#8e918f]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#8e918f]" />
                )}
              </button>

              {showAgentTrace && (
                <div className="p-3 border-t border-[#333537] bg-[#131314]/80 space-y-2 text-xs font-mono">
                  <div className="space-y-1.5">
                    <div className="p-2 rounded bg-[#1e1f20] border border-[#333537] flex items-center justify-between">
                      <span className="text-[#a8c7fa]">1. Web Grounding &amp; Evidence Scraper</span>
                      <span className="text-emerald-400">Completed ({result.sources.length} sources)</span>
                    </div>
                    <div className="p-2 rounded bg-[#1e1f20] border border-[#333537] flex items-center justify-between">
                      <span className="text-[#a8c7fa]">2. Research Analyst</span>
                      <span className="text-emerald-400">Facts &amp; Statistics Extracted</span>
                    </div>
                    <div className="p-2 rounded bg-[#1e1f20] border border-[#333537] flex items-center justify-between">
                      <span className="text-[#a8c7fa]">3. Synthesizing Writer</span>
                      <span className="text-emerald-400">Markdown Draft with Citations</span>
                    </div>
                    <div className="p-2 rounded bg-[#1e1f20] border border-[#333537] flex items-center justify-between">
                      <span className="text-[#a8c7fa]">4. Critic QC Auditor</span>
                      <span className="text-emerald-400">PASS (Zero Hallucinations)</span>
                    </div>
                    <div className="p-2 rounded bg-[#1e1f20] border border-[#333537] flex items-center justify-between">
                      <span className="text-[#a8c7fa]">5. Finalizer &amp; Source Bibliography</span>
                      <span className="text-emerald-400">Ready</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Navigation Tabs for the Research Turn */}
            <div className="border-b border-[#333537] flex flex-wrap gap-1 pt-1">
              {[
                { id: "report", label: "Synthesis Report", icon: FileText },
                { id: "sources", label: `Sources (${result.sources.length})`, icon: Link2 },
                { id: "analyst", label: "Analyst Brief", icon: Brain },
                { id: "critic", label: "Critic QC", icon: ShieldCheck },
                { id: "evidence", label: "Raw Evidence", icon: Database },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-t-lg flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#a8c7fa] border-[#7cacf8] bg-[#1e1f20]"
                        : "text-[#8e918f] hover:text-[#e3e3e3] border-transparent"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab View */}
            <div className="pt-2">
              {activeTab === "report" && (
                <ReportTab
                  result={result}
                  onTriggerRevision={onTriggerRevision}
                  isRevising={isRevising}
                />
              )}
              {activeTab === "sources" && <SourcesTab sources={result.sources} />}
              {activeTab === "analyst" && <AnalystTab researchBrief={result.research_brief} />}
              {activeTab === "critic" && <CriticTab critique={result.critique} />}
              {activeTab === "evidence" && <EvidenceTab evidence={result.evidence} />}
            </div>

            {/* Quick Follow-up Suggestions Chips */}
            {onSendFollowUp && (
              <div className="pt-3 border-t border-[#333537]/60 space-y-2">
                <span className="text-[11px] font-mono text-[#8e918f] uppercase tracking-wider block">
                  Suggested Follow-up Inquiries
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    `What are the most critical limitations identified for ${result.topic}?`,
                    `Explain the primary statistics and benchmark metrics in more detail.`,
                    `How do these developments compare to previous industry solutions?`,
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSendFollowUp(chip)}
                      type="button"
                      className="px-3 py-1.5 text-xs rounded-xl bg-[#1e1f20] hover:bg-[#282a2c] text-[#c4c7c5] hover:text-[#e3e3e3] border border-[#333537] hover:border-[#7cacf8]/40 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                    >
                      <span className="truncate max-w-[280px]">{chip}</span>
                      <ArrowRight className="w-3 h-3 text-[#7cacf8] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
