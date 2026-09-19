import React, { useState } from "react";
import { Database, Copy, Check, Search } from "lucide-react";

interface EvidenceTabProps {
  evidence: string;
}

export const EvidenceTab: React.FC<EvidenceTabProps> = ({ evidence }) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(evidence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!evidence) {
    return (
      <div className="p-8 text-center bg-[#1e1f20]/50 border border-[#333537] rounded-xl">
        <p className="text-[#8e918f]">No evidence retrieved yet.</p>
      </div>
    );
  }

  const charCount = evidence.length;
  const wordCount = evidence.trim().split(/\s+/).length;

  return (
    <div id="evidence-view-container" className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#1e1f20]/80 border border-[#333537]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#4285f4]/15 text-[#7cacf8] border border-[#4285f4]/30">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#e3e3e3]">
              Retrieved Raw Evidence &amp; Grounding Blocks
            </h3>
            <p className="text-[11px] text-[#8e918f]">
              {wordCount.toLocaleString()} words · {charCount.toLocaleString()} characters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8e918f] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find in evidence..."
              className="bg-[#131314] border border-[#3c4043] rounded-lg pl-8 pr-3 py-1 text-xs text-[#e3e3e3] focus:outline-none focus:border-[#7cacf8]"
            />
          </div>

          <button
            onClick={handleCopy}
            type="button"
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#e3e3e3] border border-[#3c4043] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8e918f]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Raw Output Block */}
      <div className="bg-[#131314] border border-[#333537] rounded-xl p-4 overflow-x-auto max-h-[500px]">
        <pre className="text-xs font-mono text-[#c4c7c5] whitespace-pre-wrap leading-relaxed">
          {searchTerm
            ? evidence
                .split(new RegExp(`(${searchTerm})`, "gi"))
                .map((part, i) =>
                  part.toLowerCase() === searchTerm.toLowerCase() ? (
                    <mark key={i} className="bg-[#4285f4]/40 text-[#a8c7fa] rounded px-0.5">
                      {part}
                    </mark>
                  ) : (
                    part
                  )
                )
            : evidence}
        </pre>
      </div>
    </div>
  );
};
