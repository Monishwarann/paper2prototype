# Paper2Prototype 🚀
> **Turn Research Papers Into Real-World Software Prototypes.**

Paper2Prototype is an enterprise AI-powered research-to-implementation platform. It transforms research paper PDFs into comprehensive, implementation-ready software blueprints, interactive system architectures, PostgreSQL database schemas, FastAPI REST specs, ML pipelines, 8-phase engineering roadmaps, and starter code blueprints with strict anti-hallucination source evidence attribution.

---

## 🌟 Key Features

- 📑 **PDF Research Ingestion**: Parses arXiv, IEEE, ACM, Springer research paper PDFs, extracting methodology, formulas, algorithms, datasets, and references.
- 🤖 **12 Specialized AI Agents**: Document Analyst, Research Analyst, Technical Analyst, Requirements Engineer, System Architect, Database Architect, API Architect, ML Engineer, Implementation Planner, Code Architect, Testing Engineer, Deployment Engineer.
- ⚡ **Multi-Provider AI Routing**: High-speed AI generation powered by **Groq** (`llama-3.3-70b-versatile`), **Google Gemini** (`gemini-2.5-flash`), and **HuggingFace** (`feature-extraction` embeddings).
- 🛡️ **Anti-Hallucination Evidence Engine**: Every requirement and technical claim is tagged with `PAPER_EVIDENCE` (with exact page & section quotes), `AI_INFERENCE`, `ENGINEERING_RECOMMENDATION`, or `NOT_SPECIFIED`.
- 📊 **Interactive Architecture Canvas**: Visual node topology graph powered by React Flow.
- 💻 **Monaco Code Blueprint Editor**: Integrated VS Code-like editor for FastAPI, PyTorch, and Docker starter files.
- 📁 **28 Artifact Export**: Instant export to Markdown, JSON, PDF, or downloadable ZIP repositories.
- ☁️ **Vercel Serverless & Docker Ready**: Optimized for Vercel Next.js + Python serverless functions or local Docker Compose deployment.

---

## 🏗️ Detailed Frontend & Backend Architecture

```
paper2prototype/
├── api/
│   └── index.py                      # Vercel Serverless Function entry point
│
├── apps/
│   ├── frontend/                     # Next.js 14 Web Application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx        # App Root Layout & Theme Provider
│   │   │   │   ├── page.tsx          # Landing Page & Drag-and-Drop PDF Upload Zone
│   │   │   │   ├── globals.css       # Tailwind Glassmorphism & Dark Design Tokens
│   │   │   │   └── projects/[id]/
│   │   │   │       └── page.tsx      # Interactive Engineering Workspace Dashboard
│   │   │   └── components/
│   │   │       ├── ReactFlowCanvas.tsx   # Interactive Architecture Node Diagram
│   │   │       ├── MonacoCodeViewer.tsx  # Multi-File Starter Code Editor
│   │   │       └── EvidenceBadge.tsx     # Provenance Badge & Source Quote Renderer
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/                      # FastAPI Backend Gateway
│       ├── app/
│       │   ├── main.py               # REST API Routes, File Handlers, Exception Middleware
│       │   └── models/
│       │       └── schemas.py        # Pydantic v2 Models for 28 Output Artifacts
│       └── requirements.txt
│
├── services/
│   ├── document_service/             # Document Processing Pipeline
│   │   ├── pdf_parser.py             # PyMuPDF Section Detector & Metadata Extractor
│   │   └── chunker.py                # Semantic Chunker with Page/Section Metadata
│   └── ai_service/                   # Multi-Agent & RAG Engine
│       ├── agent_orchestrator.py     # 12 Specialized AI Agents Coordinator
│       ├── evidence_engine.py        # Anti-Hallucination Source Attribution Engine
│       ├── llm_client.py             # Groq, Gemini & HuggingFace Unified LLM Router
│       └── rag_engine.py             # Embedding Generation & Semantic Retriever
│
├── workers/                          # Celery & Redis Task Queue
├── docker/                           # Container Infrastructure
├── tests/
│   └── test_platform.py              # Pytest Verification Suite
├── vercel.json                       # Vercel Deployment Route Map
├── requirements.txt                  # Root Dependencies for Vercel Python Runtime
├── .gitignore
├── .env.example
└── README.md
```

---

## ⚡ Multi-Provider AI Engine Setup

Paper2Prototype supports multi-provider fallback out of the box:
- **Groq API**: `GROQ_API_KEY` (Ultra-fast Llama-3.3-70B inference)
- **Google Gemini API**: `GEMINI_API_KEY` (Gemini 2.5 Flash & Embeddings)
- **HuggingFace API**: `HUGGINGFACE_API_KEY` (Feature Extraction Embeddings)

---

## ☁️ Deploying to Vercel (2-Step Guide)

### **Step 1: Import Repository in Vercel**
1. Open **[vercel.com/new](https://vercel.com/new)**.
2. Select repository **`Monishwarann/paper2prototype`** and click **Import**.

### **Step 2: Add Environment Variables & Deploy**
Add environment variables in Vercel settings:
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `HUGGINGFACE_API_KEY`
- `DEFAULT_AI_PROVIDER` (`groq`)

Click **Deploy**!

---

## 💻 Running Locally

### 1. Backend Server (FastAPI)
```bash
cd apps/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Client (Next.js)
```bash
cd apps/frontend
npm install
npm run dev
```

---

## 📜 License

MIT License &copy; 2026 Paper2Prototype Team.
