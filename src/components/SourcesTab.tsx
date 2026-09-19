import React from "react";
import { ExternalLink, Globe, Link2, Copy, Check } from "lucide-react";
import { SourceItem } from "../types";

interface SourcesTabProps {
  sources: SourceItem[];
}

export const SourcesTab: React.FC<SourcesTabProps> = ({ sources }) => {
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const handleCopyLink = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const getDomain = (url: string) => {
    try {
      const u = new URL(url);
      return u.hostname.replace("www.", "");
    } catch {
      return "web source";
    }
  };

  if (!sources || sources.length === 0) {
    return (
      <div className="p-8 text-center bg-[#1e1f20]/50 border border-[#333537] rounded-xl">
        <p className="text-[#8e918f]">No sources available yet. Run the research pipeline to retrieve web sources.</p>
      </div>
    );
  }

  return (
    <div id="sources-view-container" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#e3e3e3] flex items-center gap-2">
            <span>Verified Grounded Web Sources</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#4285f4]/15 text-[#a8c7fa] border border-[#4285f4]/30">
              {sources.length} Grounded
            </span>
          </h3>
          <p className="text-xs text-[#8e918f] mt-0.5">
            Retrieved and scraped by the Grounding Engine for citation verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {sources.map((source) => {
          const domain = getDomain(source.url);
          const isCopied = copiedIdx === source.index;

          return (
            <div
              key={source.index}
              id={`source-card-${source.index}`}
              className="bg-[#1e1f20]/70 border border-[#333537] hover:border-[#7cacf8]/40 rounded-xl p-4 transition-all group"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#282a2c] flex items-center justify-center text-xs font-mono text-[#a8c7fa] border border-[#3c4043] flex-shrink-0">
                    {source.index}
                  </div>
                  <h4 className="text-sm font-medium text-[#e3e3e3] group-hover:text-[#a8c7fa] transition-colors truncate">
                    {source.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopyLink(source.url, source.index)}
                    title="Copy Source URL"
                    className="p-1.5 rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#8e918f] hover:text-[#e3e3e3] border border-[#3c4043] transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#282a2c] hover:bg-[#333537] text-[#7cacf8] border border-[#3c4043] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8e918f] font-mono mb-2">
                <Globe className="w-3 h-3 text-[#7cacf8]" />
                <span className="text-[#a8c7fa]">{domain}</span>
                <span className="text-[#3c4043]">•</span>
                <span className="truncate text-[#8e918f] max-w-[280px]">{source.url}</span>
              </div>

              {source.content && (
                <div className="mt-2 text-xs text-[#c4c7c5] leading-relaxed bg-[#131314]/60 p-3 rounded-lg border border-[#282a2c]">
                  <p className="line-clamp-3 italic">"{source.content}"</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
