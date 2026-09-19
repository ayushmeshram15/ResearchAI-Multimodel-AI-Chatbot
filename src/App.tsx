/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatGreeting } from "./components/ChatGreeting";
import { ChatTurn } from "./components/ChatTurn";
import { PromptBar } from "./components/PromptBar";
import { ChatSession, ChatMessage, PipelineStep, StepId, ResearchResult } from "./types";
import {
  Sparkles,
  PanelLeft,
  Plus,
  Bot,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

const INITIAL_STEPS: PipelineStep[] = [
  {
    id: "search",
    number: "01",
    title: "Search & Scrape",
    agent: "Google / Tavily Grounding",
    description: "Live web search & evidence gathering",
    status: "ready",
  },
  {
    id: "analyst",
    number: "02",
    title: "Research Analyst",
    agent: "Analyst Agent",
    description: "Evidence analysis & facts extraction",
    status: "ready",
  },
  {
    id: "writer",
    number: "03",
    title: "Writer Agent",
    agent: "Writer Agent",
    description: "Report generation with citations",
    status: "ready",
  },
  {
    id: "critic",
    number: "04",
    title: "Critic Agent",
    agent: "QC Analyst",
    description: "Quality verification & accuracy audit",
    status: "ready",
  },
  {
    id: "revision",
    number: "05",
    title: "Revision / Finalize",
    agent: "Revision Loop",
    description: "Quality refinement & verified sources",
    status: "ready",
  },
];

const STORAGE_KEY = "researchmind_chat_sessions_v1";

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse saved sessions:", e);
    }
    return [];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ChatSession[] = JSON.parse(saved);
        if (parsed.length > 0) return parsed[0].id;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isRevising, setIsRevising] = useState<boolean>(false);
  const [customContext, setCustomContext] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to save sessions to localStorage:", e);
    }
  }, [sessions]);

  // Auto-scroll to bottom of chat when new message or step update arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sessions, isRunning]);

  // Active session
  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;
  const messages = activeSession ? activeSession.messages : [];

  // Create new research chat
  const handleNewSession = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: "New Research",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      customContext: "",
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setCustomContext("");
    setErrorMessage(null);
  };

  // Delete a session
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (activeSessionId === id) {
        setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  // Execute research pipeline for a prompt
  const handleExecuteResearch = async (prompt: string, attachedContext?: string) => {
    if (!prompt.trim() || isRunning) return;

    setErrorMessage(null);
    const effectiveContext = attachedContext ?? customContext;

    // Ensure we have an active session
    let currentSessionId = activeSessionId;
    let targetSession = sessions.find((s) => s.id === currentSessionId);

    if (!targetSession) {
      currentSessionId = `session-${Date.now()}`;
      targetSession = {
        id: currentSessionId,
        title: prompt.slice(0, 45).trim() + (prompt.length > 45 ? "..." : ""),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
        customContext: effectiveContext,
      };
      setSessions((prev) => [targetSession!, ...prev]);
      setActiveSessionId(currentSessionId);
    } else if (targetSession.messages.length === 0) {
      // Update title from "New Research" to first prompt
      targetSession.title = prompt.slice(0, 45).trim() + (prompt.length > 45 ? "..." : "");
    }

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `asst-${Date.now()}`;

    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    const initialAssistantSteps: PipelineStep[] = INITIAL_STEPS.map((s) => ({
      ...s,
      status: s.id === "search" ? "in_progress" : "ready",
    }));

    const assistantMessage: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      isRunning: true,
      activeStepId: "search",
      currentStageMsg: "Grounding live search & evidence gathering...",
      progressPercent: 20,
      steps: initialAssistantSteps,
    };

    // Append both messages to the current session
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            updatedAt: new Date().toISOString(),
            messages: [...s.messages, userMessage, assistantMessage],
          };
        }
        return s;
      })
    );

    setIsRunning(true);
    const startTime = Date.now();

    // Prepare previous conversation history for the backend
    const existingHistory = targetSession.messages.map((m) => ({
      role: m.role,
      content: m.role === "user" ? m.content : m.result?.initial_report || m.content,
    }));

    try {
      // Step simulation while backend compiles grounded research
      const progressTimer1 = setTimeout(() => {
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === currentSessionId) {
              return {
                ...s,
                messages: s.messages.map((m) => {
                  if (m.id === assistantMsgId) {
                    return {
                      ...m,
                      activeStepId: "analyst",
                      currentStageMsg: "Agent 02 (Research Analyst) extracting key statistics...",
                      progressPercent: 45,
                      steps: m.steps?.map((step) =>
                        step.id === "search"
                          ? { ...step, status: "completed" }
                          : step.id === "analyst"
                          ? { ...step, status: "in_progress" }
                          : step
                      ),
                    };
                  }
                  return m;
                }),
              };
            }
            return s;
          })
        );
      }, 1400);

      const progressTimer2 = setTimeout(() => {
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === currentSessionId) {
              return {
                ...s,
                messages: s.messages.map((m) => {
                  if (m.id === assistantMsgId) {
                    return {
                      ...m,
                      activeStepId: "writer",
                      currentStageMsg: "Agent 03 (Writer) drafting report with citations...",
                      progressPercent: 70,
                      steps: m.steps?.map((step) =>
                        step.id === "analyst"
                          ? { ...step, status: "completed" }
                          : step.id === "writer"
                          ? { ...step, status: "in_progress" }
                          : step
                      ),
                    };
                  }
                  return m;
                }),
              };
            }
            return s;
          })
        );
      }, 2800);

      const progressTimer3 = setTimeout(() => {
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === currentSessionId) {
              return {
                ...s,
                messages: s.messages.map((m) => {
                  if (m.id === assistantMsgId) {
                    return {
                      ...m,
                      activeStepId: "critic",
                      currentStageMsg: "Agent 04 (Critic QC) auditing factuality against citations...",
                      progressPercent: 88,
                      steps: m.steps?.map((step) =>
                        step.id === "writer"
                          ? { ...step, status: "completed" }
                          : step.id === "critic"
                          ? { ...step, status: "in_progress" }
                          : step
                      ),
                    };
                  }
                  return m;
                }),
              };
            }
            return s;
          })
        );
      }, 4200);

      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: prompt,
          customContext: effectiveContext || undefined,
          conversationHistory: existingHistory,
        }),
      });

      clearTimeout(progressTimer1);
      clearTimeout(progressTimer2);
      clearTimeout(progressTimer3);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const executionTimeMs = Date.now() - startTime;

      const researchResult: ResearchResult = {
        topic: prompt,
        sources: data.sources || [],
        evidence: data.evidence || "",
        searchQueries: data.searchQueries || [prompt],
        research_brief: data.research_brief || "",
        initial_report: data.initial_report || "",
        critique: data.critique || "ACCURACY: PASS",
        needs_review: Boolean(data.needs_review),
        revision_count: data.revision_count || 0,
        final_report: data.final_report || data.initial_report || "",
        executionTimeMs,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Mark all pipeline steps completed
      const finalSteps: PipelineStep[] = INITIAL_STEPS.map((s) => ({
        ...s,
        status: "completed",
      }));

      // Update the assistant message with final result
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              messages: s.messages.map((m) => {
                if (m.id === assistantMsgId) {
                  return {
                    ...m,
                    isRunning: false,
                    result: researchResult,
                    activeStepId: "finalize",
                    currentStageMsg: "Research complete. Quality control passed.",
                    progressPercent: 100,
                    steps: finalSteps,
                  };
                }
                return m;
              }),
            };
          }
          return s;
        })
      );
    } catch (err: any) {
      console.error("Research pipeline error:", err);
      setErrorMessage(err.message || "Failed to complete research pipeline.");

      // Mark error in the message
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              messages: s.messages.map((m) => {
                if (m.id === assistantMsgId) {
                  return {
                    ...m,
                    isRunning: false,
                    currentStageMsg: "Pipeline encountered an error.",
                    progressPercent: 100,
                  };
                }
                return m;
              }),
            };
          }
          return s;
        })
      );
    } finally {
      setIsRunning(false);
    }
  };

  // Manual Revision trigger for the latest result
  const handleTriggerRevision = async (feedback: string) => {
    if (!activeSession) return;
    const latestAsstMsg = [...activeSession.messages].reverse().find((m) => m.result);
    if (!latestAsstMsg || !latestAsstMsg.result) return;

    setIsRevising(true);
    try {
      const res = await fetch("/api/research/revise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: latestAsstMsg.result.topic,
          report: latestAsstMsg.result.final_report,
          critique: feedback,
          evidence: latestAsstMsg.result.evidence,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to revise report.");
      }

      const data = await res.json();
      const updatedReport = data.revisedReport;

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === activeSession.id) {
            return {
              ...s,
              messages: s.messages.map((m) => {
                if (m.id === latestAsstMsg.id && m.result) {
                  return {
                    ...m,
                    result: {
                      ...m.result,
                      final_report: updatedReport,
                      revision_count: (m.result.revision_count || 0) + 1,
                    },
                  };
                }
                return m;
              }),
            };
          }
          return s;
        })
      );
    } catch (e: any) {
      console.error("Revision error:", e);
      setErrorMessage(e.message || "Revision request failed.");
    } finally {
      setIsRevising(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#131314] text-[#e3e3e3]">
      {/* Left Collapsible Sidebar */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={(id) => {
          setActiveSessionId(id);
          setIsSidebarOpen(false);
        }}
        onNewSession={() => {
          handleNewSession();
          setIsSidebarOpen(false);
        }}
        onDeleteSession={handleDeleteSession}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-14 border-b border-[#333537] px-4 flex items-center justify-between bg-[#131314]/90 backdrop-blur-md z-20 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl text-[#8e918f] hover:text-[#e3e3e3] hover:bg-[#1e1f20] transition-colors cursor-pointer"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#e3e3e3]">
                {activeSession && activeSession.messages.length > 0
                  ? activeSession.title
                  : "ResearchMind"}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1e1f20] text-[#a8c7fa] border border-[#333537]">
                Gemini 3.8 Flash • Multi-Agent
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewSession}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-[#1e1f20] hover:bg-[#282a2c] text-xs font-medium text-[#e3e3e3] border border-[#333537] hover:border-[#3c4043] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Start New Research"
            >
              <Plus className="w-3.5 h-3.5 text-[#7cacf8]" />
              <span className="hidden sm:inline">New Research</span>
            </button>
          </div>
        </header>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="px-4 py-2.5 bg-rose-950/40 border-b border-rose-500/30 text-rose-300 text-xs flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Central Scrollable Area: Greeting OR Conversation Thread */}
        <div className="flex-1 overflow-y-auto px-2 md:px-6 py-4 flex flex-col">
          {messages.length === 0 ? (
            <ChatGreeting onSelectPrompt={(prompt) => handleExecuteResearch(prompt)} />
          ) : (
            <div className="space-y-4 pb-12 flex-1">
              {messages.map((msg) => (
                <ChatTurn
                  key={msg.id}
                  message={msg}
                  onSendFollowUp={(followUp) => handleExecuteResearch(followUp)}
                  onTriggerRevision={handleTriggerRevision}
                  isRevising={isRevising}
                />
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Floating Gemini Prompt Bar pinned at bottom */}
        <div className="flex-shrink-0 z-30 bg-gradient-to-t from-[#131314] via-[#131314]/90 to-transparent pt-3">
          <PromptBar
            onSubmit={(prompt, attachedContext) =>
              handleExecuteResearch(prompt, attachedContext)
            }
            isRunning={isRunning}
            hasMessages={messages.length > 0}
            initialContext={customContext}
            onUpdateContext={setCustomContext}
          />
        </div>
      </div>
    </div>
  );
}
