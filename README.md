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

## 🏗️ Monorepo Architecture

```
paper2prototype/
├── api/
│   └── index.py             # Vercel Serverless Function entry point
├── apps/
│   ├── frontend/            # Next.js 14 (App Router), React Flow, Monaco Editor, Tailwind CSS
│   └── backend/             # FastAPI API Gateway, Pydantic v2, SQLAlchemy, Auth
├── services/
│   ├── document_service/    # PyMuPDF & pdfplumber document parser, section detector, semantic chunker
│   └── ai_service/          # 12 Specialized AI Agents, RAG Vector Engine & Evidence Mapper
├── workers/                 # Celery & Redis task queue
├── docker/                  # Docker Compose orchestration
├── database/                # PostgreSQL DDL schemas & Alembic migrations
├── tests/                   # Pytest test suite
├── vercel.json              # Vercel deployment configuration
├── requirements.txt         # Root Python requirements for Vercel
├── .env.example
└── README.md
```

---

## ⚡ Multi-Provider AI Engine Setup

Paper2Prototype supports multi-provider fallback out of the box:
- **Groq API**: `GROQ_API_KEY` (Ultra-fast Llama-3.3-70B inference)
- **Google Gemini API**: `GEMINI_API_KEY` (Gemini 2.5 Flash & Embeddings)
- **HuggingFace API**: `HUGGINGFACE_API_KEY` (Feature Extraction Embeddings)

### Environment Variables (`.env`)

```env
# Application
APP_NAME="Paper2Prototype"
APP_ENV="development"
PORT=8000
FRONTEND_URL="http://localhost:3000"

# AI Provider Keys
GROQ_API_KEY="your-groq-api-key"
GEMINI_API_KEY="your-gemini-api-key"
HUGGINGFACE_API_KEY="your-huggingface-api-key"
DEFAULT_AI_PROVIDER="groq"
AI_MODEL_NAME="llama-3.3-70b-versatile"

# Database
DATABASE_URL="sqlite+aiosqlite:///./paper2prototype.db"

# Security
AUTH_SECRET="super-secret-key-min-32-chars"
```

---

## ☁️ Deploying to Vercel

Paper2Prototype includes native Vercel support (`vercel.json` & `api/index.py`).

### Method 1: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Method 2: Deploy via GitHub & Vercel Dashboard
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Paper2Prototype commit"
   git remote add origin https://github.com/Monishwarann/paper2prototype.git
   git push -u origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)** and import your GitHub repository.
3. Configure your environment variables in Vercel.
4. Click **Deploy**. Vercel will build the Next.js frontend and Python serverless API functions automatically!

---

## 💻 Running Locally

### 1. Run Backend Server (FastAPI)
```bash
cd apps/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
- API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Run Frontend Client (Next.js)
```bash
cd apps/frontend
npm install
npm run dev
```
- Dashboard UI: [http://localhost:3000](http://localhost:3000)
- Demo Workspace: [http://localhost:3000/projects/demo-medical-classifier](http://localhost:3000/projects/demo-medical-classifier)

### 3. Run via Docker Compose
```bash
docker-compose up --build
```

---

## 🧪 Testing

Run platform test suite:
```bash
python -c "import sys, os; sys.path.extend(['.', 'apps/backend']); from tests.test_platform import *; test_evidence_engine_classification(); test_evidence_coverage_scoring(); test_agent_orchestrator_blueprint(); test_llm_client_initialization(); print('ALL TESTS PASSED!')"
```

---

## 📜 License

MIT License &copy; 2026 Paper2Prototype Team.
