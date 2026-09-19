import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, Globe, Paperclip, Sparkles, X, FileText } from "lucide-react";

interface PromptBarProps {
  onSubmit: (prompt: string, customContext?: string) => void;
  isRunning: boolean;
  hasMessages: boolean;
  initialContext?: string;
  onUpdateContext?: (ctx: string) => void;
}

export const PromptBar: React.FC<PromptBarProps> = ({
  onSubmit,
  isRunning,
  hasMessages,
  initialContext = "",
  onUpdateContext,
}) => {
  const [text, setText] = useState("");
  const [showRAGModal, setShowRAGModal] = useState(false);
  const [customContext, setCustomContext] = useState(initialContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCustomContext(initialContext);
  }, [initialContext]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isRunning) return;

    onSubmit(text.trim(), customContext.trim() || undefined);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasContext = Boolean(customContext.trim());

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2">
      {/* RAG Context Attachment Popover/Drawer */}
      {showRAGModal && (
        <div className="mb-3 p-3.5 rounded-2xl bg-[#1e1f20] border border-[#333537] shadow-xl animate-fadeIn space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e3e3e3]">
              <FileText className="w-3.5 h-3.5 text-[#7cacf8]" />
              <span>Attach Custom Documents or Notes (RAG Knowledge)</span>
            </div>
            <button
              onClick={() => setShowRAGModal(false)}
              className="p-1 rounded-md text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#282a2c] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-[#8e918f]">
            Paste internal research papers, meeting notes, or guidelines. The multi-agent pipeline will cross-reference this directly with web evidence.
          </p>
          <textarea
            value={customContext}
            onChange={(e) => {
              setCustomContext(e.target.value);
              if (onUpdateContext) onUpdateContext(e.target.value);
            }}
            placeholder="Paste your proprietary text, internal findings, or requirements here..."
            className="w-full h-24 bg-[#131314] border border-[#333537] rounded-xl p-2.5 text-xs text-[#e3e3e3] placeholder-[#8e918f] focus:outline-none focus:border-[#7cacf8] font-mono resize-none"
          />
          <div className="flex justify-end gap-2 pt-1">
            {hasContext && (
              <button
                type="button"
                onClick={() => {
                  setCustomContext("");
                  if (onUpdateContext) onUpdateContext("");
                }}
                className="text-[11px] text-rose-400 hover:underline px-2 cursor-pointer"
              >
                Clear Attachment
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowRAGModal(false)}
              className="px-3 py-1 rounded-lg bg-[#282a2c] hover:bg-[#333537] text-xs text-[#e3e3e3] font-medium border border-[#3c4043] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Floating Gemini Prompt Input Box */}
      <div className="bg-[#1e1f20]/90 backdrop-blur-md border border-[#333537] gemini-border-glow rounded-3xl p-2.5 shadow-xl transition-all">
        {/* Main Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            hasMessages
              ? "Ask a follow-up or enter a new research topic..."
              : "Ask anything or enter a research topic..."
          }
          rows={1}
          disabled={isRunning}
          className="w-full bg-transparent text-sm text-[#e3e3e3] placeholder-[#8e918f] focus:outline-none px-3 pt-1 pb-1 resize-none leading-relaxed max-h-40"
        />

        {/* Toolbar & Send Row */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div className="flex items-center gap-1.5">
            {/* Live Web Grounding Badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131314] border border-[#333537] text-[11px] font-mono text-[#a8c7fa] select-none"
              title="Google Search Grounding & Web Scraping is permanently active"
            >
              <Globe className="w-3 h-3 text-[#7cacf8]" />
              <span className="hidden sm:inline">Web Grounding</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#81c995] animate-pulse" />
            </div>

            {/* Attach RAG Context Button */}
            <button
              type="button"
              onClick={() => setShowRAGModal(!showRAGModal)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono transition-all cursor-pointer ${
                hasContext
                  ? "bg-[#4285f4]/15 border-[#4285f4]/40 text-[#a8c7fa]"
                  : "bg-[#131314] border-[#333537] text-[#8e918f] hover:text-[#e3e3e3] hover:border-[#3c4043]"
              }`}
            >
              <Paperclip className="w-3 h-3" />
              <span>{hasContext ? "Docs Attached" : "Attach Docs"}</span>
              {hasContext && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#7cacf8]" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSubmit()}
              disabled={!text.trim() || isRunning}
              type="button"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                text.trim() && !isRunning
                  ? "bg-gradient-to-tr from-[#4285f4] to-[#9b72cf] text-white shadow-md hover:scale-105 active:scale-95"
                  : "bg-[#282a2c] text-[#8e918f] cursor-not-allowed opacity-60"
              }`}
              title="Send research query (Enter)"
            >
              {isRunning ? (
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#a8c7fa]" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-2">
        <span className="text-[10px] font-mono text-[#8e918f]/70">
          ResearchMind may produce factual citations. Always verify critical decisions with sources.
        </span>
      </div>
    </div>
  );
};
