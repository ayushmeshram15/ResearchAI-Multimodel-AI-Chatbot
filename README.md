# ResearchMind 🧠⚡
### Multi-Agent Grounded Research Engine powered by Google Gemini

[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google GenAI SDK](https://img.shields.io/badge/Google_GenAI_SDK-@google/genai-4285f4.svg?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**ResearchMind** is an autonomous multi-agent research platform that orchestrates five specialized AI agents to gather live web evidence, analyze empirical facts, draft structured reports with inline source citations, audit factual accuracy via a dedicated Critic agent, and deliver hallucination-free research briefs.

Styled with the signature **Google Gemini** design language, ResearchMind offers a conversational multi-turn chat experience, interactive multi-tab inspector, custom RAG document grounding, and one-click Markdown report export.

---

## 📑 Table of Contents

- [Key Highlights](#-key-highlights)
- [Architecture & Multi-Agent Pipeline](#-architecture--multi-agent-pipeline)
- [Interactive Features](#-interactive-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Project Structure](#-project-structure)
- [Exporting & Syncing to GitHub](#-exporting--syncing-to-github)
- [License](#-license)

---

## ✨ Key Highlights

- 🤖 **5-Agent Autonomous Workflow**: Sequential chain of specialized agents guaranteeing evidence-backed outputs with zero unverified claims.
- 🌐 **Live Web Grounding**: Integrated Google Search Grounding & Tavily web scraping retrieves live, high-authority web citations.
- 🛡️ **Autonomous Critic QC**: Strict quality control agent reviews every sentence against retrieved sources before final publication.
- 🔄 **Conversational Multi-Turn Follow-Ups**: Ask progressive questions within the same research session; full context is passed to the backend.
- 📎 **Custom Document Grounding (RAG)**: Attach internal notes, proprietary research, or specs to cross-reference with live web evidence.
- 📊 **5-Tab Transparency Inspector**: Inspect every stage: Synthesis Report, Grounded Sources, Analyst Brief, Critic QC Audit, and Raw Evidence.
- 💎 **Google Gemini Aesthetic**: Dark theme (`#131314`, `#1e1f20`, `#333537`) with signature Gemini gradients (`#4285f4`, `#9b72cf`, `#d96570`) and JetBrains Mono typographic accents.
- 📥 **Export to Markdown**: Download research reports as formatted `.md` files or copy straight to the clipboard with one click.

---

## 🏛️ Architecture & Multi-Agent Pipeline

ResearchMind splits the research task across specialized micro-agents:

```text
       ┌────────────────────────────────────────────────────────┐
       │             User Query / Research Topic                │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Agent 01: Grounding & Evidence Scraper                                  │
│ • Live Google Search grounding & content extraction                     │
│ • Compiles verified web sources with titles, snippets & URLs            │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Agent 02: Research Analyst                                              │
│ • Parses retrieved evidence and extracts verified facts                 │
│ • Summarizes empirical data, quantitative metrics, and industry trends  │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Agent 03: Synthesizing Writer                                           │
│ • Structures full research report in Markdown                           │
│ • Attributes statements with inline citations (e.g., [Source 1])        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Agent 04: Critic QC Auditor                                             │
│ • Audits draft against raw evidence to eliminate hallucinations         │
│ • Flags unsupported statements or approves (PASS)                       │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Agent 05: Finalizer & Source Bibliography                               │
│ • Re-integrates critic refinements if needed                            │
│ • Compiles verified source bibliography and execution metrics           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Interactive Features

### 1. Conversational Chat & Prompt Suggestions
- Welcome greeting screen with suggested frontier inquiries (humanoid robotics, quantum qubits, frontier reasoning, solid-state batteries).
- Fluid chat interface supporting continuous multi-turn conversations.

### 2. Live Agent Execution Telemetry
- Real-time step progress indicators displaying which agent is currently executing.
- Shimmer skeleton loaders illustrating the synthesis graph as sources are verified.

### 3. Multi-Tab Deep Dive
- **Synthesis Report**: Polished Markdown report with executive summary, core analysis, key takeaways, and source index.
- **Grounded Sources**: Interactive cards for each source showing domain badges, content excerpts, and direct external links.
- **Analyst Brief**: Raw structured facts extracted before writing.
- **Critic QC**: Detailed factuality audit verdict.
- **Raw Evidence**: Full text gathered during the search phase with real-time text search highlighting.

### 4. Direct Critic Revision
- Direct targeted revisions to the Writer & Critic agents to adjust tone, add specific sections, or emphasize quantitative benchmarks.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) Icons |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown) |
| **Backend** | [Express](https://expressjs.com/), [Node.js](https://nodejs.org/), [tsx](https://github.com/privatenumber/tsx) |
| **AI & LLM** | [@google/genai SDK](https://www.npmjs.com/package/@google/genai) (Gemini 2.5 / 3 Flash) |
| **Build Tool** | [esbuild](https://esbuild.github.io/) (CJS server bundling) & Vite (client SPA) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm** / **bun** / **yarn**
- **Gemini API Key**: Obtain a free key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/researchmind.git
   cd researchmind
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory (based on `.env.example`):

```bash
cp .env.example .env
```

Add your Google Gemini API key:

```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

> **Note**: In Google AI Studio, `GEMINI_API_KEY` is injected automatically via the platform environment.

### Running the Development Server

Start the full-stack application (Express + Vite) on port 3000:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

Compile both the client-side SPA and the backend Express bundle:

```bash
npm run build
```

This generates:
- `dist/`: Optimized client assets.
- `dist/server.cjs`: Self-contained bundled Node.js server.

To start the production server:

```bash
npm start
```

---

## 📁 Project Structure

```text
├── .env.example             # Documented environment variables
├── index.html               # Main HTML template with Google fonts
├── metadata.json            # Application metadata & AI Studio permissions
├── package.json             # Dependencies & build scripts
├── server.ts                # Express backend & Gemini multi-agent endpoints
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite + Tailwind v4 plugin configuration
├── src/
│   ├── main.tsx             # React client entry point
│   ├── index.css            # Gemini dark theme styling & typography
│   ├── types.ts             # Shared TypeScript models & data structures
│   ├── App.tsx              # Main application shell & session orchestrator
│   └── components/
│       ├── Sidebar.tsx      # Past sessions drawer, search, & user profile
│       ├── ChatGreeting.tsx # Welcome screen & research topic suggestions
│       ├── ChatTurn.tsx     # Message bubbles, step progression & tabs
│       ├── PromptBar.tsx    # Bottom input bar with RAG attachment modal
│       ├── ResultsSkeleton.tsx # Shimmer skeleton loader during execution
│       ├── ReportTab.tsx    # Markdown report viewer, copy & export tools
│       ├── SourcesTab.tsx   # Verified citation cards with domain links
│       ├── AnalystTab.tsx   # Structured analyst facts & findings
│       ├── CriticTab.tsx    # Factual verification report & pass/fail status
│       └── EvidenceTab.tsx  # Raw grounded evidence viewer with search
└── README.md                # Project documentation
```

---

## 🐙 Exporting & Syncing to GitHub

### Option A: Via AI Studio Settings (Recommended)
1. In the **Google AI Studio** top-right header, click the **Settings / More Options (⋮)** menu.
2. Select **Export to GitHub** (or **Export as ZIP**).
3. Connect your GitHub account and select or create your destination repository.
4. AI Studio will automatically push all files, including this `README.md`, directly to your repository!

### Option B: Via Local Git
If you downloaded or are running the project locally:

```bash
# Initialize git (if not already initialized)
git init
git branch -M main

# Stage and commit all files
git add .
git commit -m "feat: initial commit of ResearchMind multi-agent research engine"

# Add your GitHub repository remote
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push to main branch
git push -u origin main
```

---

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).
