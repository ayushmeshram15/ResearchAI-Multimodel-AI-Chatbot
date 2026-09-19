import React from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { LogItem } from "../types";

interface ConsoleTabProps {
  logs: LogItem[];
}

export const ConsoleTab: React.FC<ConsoleTabProps> = ({ logs }) => {
  const [copied, setCopied] = React.useState(false);

  const fullLogText = logs
    .map((l) => `[${l.timestamp}] [${l.step.toUpperCase()}] ${l.text}`)
    .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLogText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="console-view-container" className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#ff8c32]" />
          <div>
            <h3 className="text-sm font-bold text-[#f0ebe0]">
              Multi-Agent Orchestration Logs
            </h3>
            <p className="text-xs text-[#77716a]">
              LangGraph State Transition Trace
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 hover:bg-white/10 text-[#f0ebe0] border border-white/10 transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#a09890]" />
              <span>Copy Console Log</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-[#07070c] border border-white/10 rounded-2xl p-5 font-mono text-xs text-[#a09890] max-h-96 overflow-y-auto space-y-2">
        {logs.length === 0 ? (
          <div className="text-[#555] py-4 text-center">
            Waiting for research pipeline to begin...
          </div>
        ) : (
          logs.map((log) => {
            const isWarn = log.type === "warn";
            const isSuccess = log.type === "success";
            const isError = log.type === "error";

            return (
              <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-[#555] select-none flex-shrink-0">
                  {log.timestamp}
                </span>
                <span className="text-[#ff8c32] font-semibold flex-shrink-0">
                  [{log.step.toUpperCase()}]
                </span>
                <span
                  className={
                    isError
                      ? "text-rose-400"
                      : isSuccess
                      ? "text-emerald-300"
                      : isWarn
                      ? "text-amber-300"
                      : "text-[#d8d3cb]"
                  }
                >
                  {log.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
