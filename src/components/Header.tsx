import React from "react";
import { Sparkles, ShieldCheck, Cpu } from "lucide-react";

interface HeaderProps {
  serverStatus: "checking" | "connected" | "disconnected";
}

export const Header: React.FC<HeaderProps> = ({ serverStatus }) => {
  return (
    <header id="app-header" className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
      {/* Small badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8c32]/10 border border-[#ff8c32]/25 mb-4 text-[#ff8c32] font-mono text-xs tracking-widest uppercase">
        <Cpu className="w-3.5 h-3.5 animate-pulse" />
        MULTI-AGENT AI RESEARCH SYSTEM
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#f0ebe0] mb-2 font-display">
        Research<span className="text-[#ff8c32]">Mind</span>
      </h1>

      {/* Greeting */}
      <div className="text-lg md:text-xl font-semibold text-[#ff8c32] mb-3 flex items-center justify-center gap-2">
        <span>Hello, Ayush 👋</span>
      </div>

      {/* Hero Description */}
      <p className="text-sm md:text-base text-[#a09890] max-w-2xl mx-auto leading-relaxed">
        Search the web, analyze evidence, generate research reports, and verify their quality using a LangGraph-orchestrated multi-agent architecture powered by LLM &amp; RAG.
      </p>

      {/* Status Bar */}
      <div className="mt-4 inline-flex items-center gap-4 text-xs font-mono text-[#77716a] bg-[#14141f]/70 px-4 py-1.5 rounded-full border border-white/5">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              serverStatus === "connected"
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                : serverStatus === "checking"
                ? "bg-amber-400 animate-ping"
                : "bg-rose-400"
            }`}
          />
          {serverStatus === "connected"
            ? "Pipeline Service Active"
            : serverStatus === "checking"
            ? "Connecting..."
            : "Offline"}
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1 text-[#a09890]">
          <Sparkles className="w-3 h-3 text-[#ff8c32]" />
          Gemini 3.8 Flash + Live Search
        </span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1 text-[#a09890]">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Critic Quality Control
        </span>
      </div>
    </header>
  );
};
