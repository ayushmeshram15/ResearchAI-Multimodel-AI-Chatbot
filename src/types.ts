export interface SourceItem {
  index: number;
  title: string;
  url: string;
  content: string;
}

export type StepId = "search" | "analyst" | "writer" | "critic" | "revision" | "finalize";

export interface PipelineStep {
  id: StepId;
  number: string;
  title: string;
  agent: string;
  description: string;
  status: "ready" | "in_progress" | "completed" | "error";
  message?: string;
  summary?: string;
}

export interface ResearchResult {
  topic: string;
  sources: SourceItem[];
  evidence: string;
  searchQueries?: string[];
  research_brief: string;
  initial_report: string;
  critique: string;
  needs_review: boolean;
  revision_count: number;
  final_report: string;
  executionTimeMs?: number;
  timestamp: string;
}

export interface LogItem {
  id: string;
  timestamp: string;
  step: StepId;
  type: "info" | "success" | "warn" | "error";
  text: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  result?: ResearchResult;
  isRunning?: boolean;
  activeStepId?: StepId | null;
  currentStageMsg?: string;
  progressPercent?: number;
  steps?: PipelineStep[];
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  customContext?: string;
}
