import React, { useState } from "react";
import { Zap, Bot, Brain, Atom, FileText, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

interface ResearchFormProps {
  topic: string;
  setTopic: (t: string) => void;
  customContext: string;
  setCustomContext: (c: string) => void;
  isRunning: boolean;
  progressPercent: number;
  currentStageMsg: string;
  onRun: () => void;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({
  topic,
  setTopic,
  customContext,
  setCustomContext,
  isRunning,
  progressPercent,
  currentStageMsg,
  onRun,
}) => {
  const [showRAGDrawer, setShowRAGDrawer] = useState(false);

  const exampleTopics = [
    { label: "🤖 Robotics", query: "Latest developments in robotics" },
    { label: "🧠 AI", query: "Latest developments in artificial intelligence" },
    { label: "⚛️ Quantum", query: "Latest developments in quantum computing" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRunning && topic.trim()) {
      onRun();
    }
  };

  return (
    <div
      id="research-input-card"
      className="bg-white/[0.03] border border-[#ff8c32]/25 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#f0ebe0] flex items-center gap-2">
          <span>Research Topic</span>
        </h2>
        <span className="text-xs font-mono text-[#ff8c32] bg-[#ff8c32]/10 px-2.5 py-0.5 rounded-full border border-[#ff8c32]/20">
          Step 01 Entry
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Topic Input */}
        <div className="relative">
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isRunning}
            placeholder="e.g. Latest developments in robotics"
            className="w-full bg-[#0e0e16] border border-white/10 rounded-xl px-4 py-3.5 text-[#f0ebe0] placeholder-[#77716a] focus:outline-none focus:border-[#ff8c32] focus:ring-1 focus:ring-[#ff8c32] transition-all text-base disabled:opacity-50"
          />
        </div>

        {/* Optional Custom RAG context accordion */}
        <div className="rounded-xl border border-white/5 bg-black/20 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowRAGDrawer(!showRAGDrawer)}
            className="w-full px-4 py-2.5 text-xs text-[#a09890] hover:text-[#f0ebe0] flex items-center justify-between transition-colors font-mono"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#ff8c32]" />
              {customContext.trim() ? "Custom RAG Context (Added)" : "+ Add Custom RAG Notes / Context (Optional)"}
            </span>
            {showRAGDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showRAGDrawer && (
            <div className="p-3 border-t border-white/5 bg-[#0a0a10]">
              <p className="text-xs text-[#77716a] mb-2">
                Supply proprietary notes, excerpts, or paper text to feed the Research Analyst alongside live web search.
              </p>
              <textarea
                id="custom-rag-input"
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                disabled={isRunning}
                rows={3}
                placeholder="Paste reference text, internal company docs, or specific data points..."
                className="w-full bg-[#11111a] border border-white/10 rounded-lg p-2.5 text-xs text-[#f0ebe0] placeholder-[#555] focus:outline-none focus:border-[#ff8c32]"
              />
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          id="run-pipeline-button"
          type="submit"
          disabled={isRunning || !topic.trim()}
          className="w-full bg-gradient-to-r from-[#ff8c32] to-[#e66c1e] hover:from-[#ff9947] hover:to-[#f07b2d] text-black font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(255,140,50,0.25)] hover:shadow-[0_0_25px_rgba(255,140,50,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-sm tracking-wide"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Running Research Pipeline...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>⚡ Run Research Pipeline</span>
            </>
          )}
        </button>
      </form>

      {/* Example Topics */}
      <div className="mt-5 pt-4 border-t border-white/5">
        <span className="text-xs font-mono text-[#77716a] block mb-2.5">Example topics</span>
        <div className="grid grid-cols-3 gap-2">
          {exampleTopics.map((ex) => (
            <button
              key={ex.label}
              id={`example-topic-${ex.label.toLowerCase().replace(/[^a-z]/g, "")}`}
              type="button"
              disabled={isRunning}
              onClick={() => setTopic(ex.query)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-white/[0.03] hover:bg-[#ff8c32]/15 text-[#f0ebe0] hover:text-[#ff8c32] border border-white/5 hover:border-[#ff8c32]/30 transition-all text-center truncate disabled:opacity-40"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Progress Bar when Running */}
      {isRunning && (
        <div className="mt-6 pt-4 border-t border-[#ff8c32]/20">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-[#ff8c32] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff8c32] animate-ping" />
              {currentStageMsg || "Orchestrating agents..."}
            </span>
            <span className="text-[#f0ebe0] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#ff8c32] to-amber-300 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
