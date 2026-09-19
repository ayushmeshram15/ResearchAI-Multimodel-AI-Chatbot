import React from "react";
import { Sparkles, Bot, Cpu, Zap, BatteryCharging, Globe, ShieldCheck } from "lucide-react";

interface ChatGreetingProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ChatGreeting: React.FC<ChatGreetingProps> = ({ onSelectPrompt }) => {
  const samplePrompts = [
    {
      title: "Humanoid Robotics & Locomotion",
      description: "Examine mechanical breakthroughs, actuator efficiency, and real-world production bottlenecks",
      icon: Bot,
      color: "from-blue-500/20 to-indigo-500/20",
      accent: "text-[#7cacf8]",
      query: "Latest developments in humanoid robotics and bipedal locomotion",
    },
    {
      title: "Frontier AI Reasoning & Scaling Laws",
      description: "Analyze post-training test-time compute, verified chain-of-thought, and RL error convergence",
      icon: Cpu,
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-[#c58af9]",
      query: "Frontier AI reasoning models, post-training scaling laws, and verification benchmarks",
    },
    {
      title: "Quantum Computing Advances",
      description: "Benchmark topological qubits, fault-tolerant error correction thresholds, and commercial roadmaps",
      icon: Zap,
      color: "from-cyan-500/20 to-blue-500/20",
      accent: "text-[#a8c7fa]",
      query: "Quantum computing breakthroughs and fault-tolerant qubit hardware roadmaps",
    },
    {
      title: "Solid-State Battery Breakthroughs",
      description: "Evaluate ceramic electrolyte interfaces, thermal degradation, and 2026 EV commercialization milestones",
      icon: BatteryCharging,
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-[#81c995]",
      query: "Solid-state battery commercialization breakthroughs and ceramic electrolyte stability",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-8 md:py-12 animate-fadeIn">
      {/* Sparkle Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1f20] border border-[#333537] text-xs text-[#a8c7fa] mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#7cacf8]" />
        <span className="font-medium">ResearchMind • Multi-Agent Grounding Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight mb-3">
        <span className="gemini-gradient-text">Hello, Ayush</span>{" "}
        <span className="inline-block animate-wave">👋</span>
      </h1>

      <p className="text-base md:text-lg text-[#8e918f] text-center max-w-xl mb-10 font-normal">
        Where shall our 5-agent research pipeline investigate today?
      </p>

      {/* Suggestion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mb-10">
        {samplePrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(item.query)}
            type="button"
            className="text-left p-4 rounded-2xl bg-[#1e1f20]/80 hover:bg-[#282a2c] border border-[#333537] hover:border-[#7cacf8]/40 transition-all duration-200 group relative overflow-hidden shadow-sm cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} ${item.accent} border border-white/5 group-hover:scale-105 transition-transform flex-shrink-0`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-[#e3e3e3] group-hover:text-[#a8c7fa] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#8e918f] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#8e918f] font-mono">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1f20]/60 border border-[#333537]">
          <Globe className="w-3.5 h-3.5 text-[#7cacf8]" />
          <span>Live Web Grounding</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1f20]/60 border border-[#333537]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#81c995]" />
          <span>Critic Quality Pass</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1f20]/60 border border-[#333537]">
          <Sparkles className="w-3.5 h-3.5 text-[#c58af9]" />
          <span>Zero Hallucination Loop</span>
        </div>
      </div>
    </div>
  );
};
