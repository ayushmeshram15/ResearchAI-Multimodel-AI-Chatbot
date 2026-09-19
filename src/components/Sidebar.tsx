import React from "react";
import { Plus, MessageSquare, Trash2, Sparkles, Search, PanelLeftClose, PanelLeft, Bot } from "lucide-react";
import { ChatSession } from "../types";

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  isOpen,
  onToggle,
}) => {
  const [filter, setFilter] = React.useState("");

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col w-72 bg-[#1e1f20] border-r border-[#333537] transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:border-r-0 md:overflow-hidden"
        }`}
      >
        {/* Top Header */}
        <div className="p-3.5 flex items-center justify-between border-b border-[#333537]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4285f4] via-[#9b72cf] to-[#d96570] flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#e3e3e3] leading-none flex items-center gap-1.5">
                <span>ResearchMind</span>
              </h1>
              <span className="text-[10px] font-mono text-[#8e918f] leading-none">
                Gemini Multi-Agent
              </span>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#282a2c] transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* New Research Button */}
        <div className="p-3">
          <button
            onClick={onNewSession}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-[#282a2c] hover:bg-[#333537] text-[#e3e3e3] hover:text-white border border-[#3c4043] font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer group"
          >
            <Plus className="w-4 h-4 text-[#7cacf8] group-hover:scale-110 transition-transform" />
            <span>New Research</span>
            <span className="ml-auto text-[10px] font-mono text-[#8e918f] px-1.5 py-0.5 rounded bg-[#131314]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Search / Filter past chats */}
        {sessions.length > 2 && (
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8e918f] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search research..."
                className="w-full bg-[#131314] border border-[#333537] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#e3e3e3] placeholder-[#8e918f] focus:outline-none focus:border-[#7cacf8]"
              />
            </div>
          </div>
        )}

        {/* Recent Research Chats List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
          <div className="px-2 py-1.5 text-[11px] font-mono text-[#8e918f] uppercase tracking-wider flex items-center justify-between">
            <span>Recent Research</span>
            <span className="text-[10px]">{filteredSessions.length}</span>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-[#8e918f]">
              <Bot className="w-6 h-6 mx-auto mb-2 opacity-30 text-[#a8c7fa]" />
              <p>No research sessions yet.</p>
              <p className="text-[11px] mt-1 text-[#8e918f]/70">
                Ask a question to start multi-agent analysis.
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const hasReport = session.messages.some((m) => m.result);

              return (
                <div
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                    isActive
                      ? "bg-[#282a2c] text-[#e3e3e3] font-medium shadow-xs"
                      : "text-[#c4c7c5] hover:bg-[#282a2c]/60 hover:text-[#e3e3e3]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                    <MessageSquare
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isActive ? "text-[#7cacf8]" : "text-[#8e918f]"
                      }`}
                    />
                    <span className="truncate">{session.title}</span>
                  </div>

                  <button
                    onClick={(e) => onDeleteSession(session.id, e)}
                    title="Delete session"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#333537] text-[#8e918f] hover:text-rose-400 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Ayush User Profile Footer */}
        <div className="p-3 border-t border-[#333537] bg-[#1a1b1d]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4285f4] to-[#9b72cf] p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#131314] flex items-center justify-center text-xs font-bold text-[#a8c7fa]">
                AM
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-[#e3e3e3] truncate">
                Ayush Meshram
              </div>
              <div className="text-[10px] font-mono text-[#81c995] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#81c995] animate-pulse" />
                <span>Multi-Agent Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
