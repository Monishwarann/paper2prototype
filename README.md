# Paper2Prototype 🚀
> **"Turn Research Papers Into Real-World Software Prototypes."**

Paper2Prototype is an enterprise-grade AI research-to-implementation platform. It bridges the gap between academic research literature and real-world software engineering by transforming uploaded research paper PDFs into comprehensive, implementation-ready software blueprints, interactive system architectures, PostgreSQL database schemas, FastAPI REST specifications, machine learning pipelines, 8-phase engineering roadmaps, and starter code blueprints—all with strict anti-hallucination source evidence attribution.

---

## 📑 Table of Contents
1. [Product Vision & Core Problem](#-product-vision--core-problem)
2. [Key Capabilities & Features](#-key-capabilities--features)
3. [The 28 Generated Engineering Artifacts](#-the-28-generated-engineering-artifacts)
4. [Monorepo Architecture & Directory Structure](#-monorepo-architecture--directory-structure)
5. [The 12 Specialized AI Agents](#-the-12-specialized-ai-agents)
6. [RAG Pipeline & Semantic Vector Search](#-rag-pipeline--semantic-vector-search)
7. [Anti-Hallucination & Provenance Engine](#-anti-hallucination--provenance-engine)
8. [Multi-Provider AI Engine Setup](#-multi-provider-ai-engine-setup)
9. [Connected REST API Specification (17 Endpoints)](#-connected-rest-api-specification-17-endpoints)
10. [Local Development & Docker Execution](#-local-development--docker-execution)
11. [Vercel Deployment (2-Step Guide)](#-vercel-deployment-2-step-guide)
12. [Testing & Quality Assurance](#-testing--quality-assurance)

---

## 🎯 Product Vision & Core Problem

Translating an academic paper into a working software application is historically slow, manual, and error-prone. Engineers spend days or weeks deciphering complex mathematical formulations, pseudo-code, domain jargon, and unspecified infrastructure assumptions.

Paper2Prototype solves this by ingesting PDFs from arXiv, IEEE, ACM, and PubMed, parsing document layout and mathematical formulas, indexing text chunks into a vector database, and executing a coordinated pipeline of 12 specialized AI agents to generate 28 production-ready software artifacts.

---

## ✨ Key Capabilities & Features

- **Document Analysis & OCR Fallback**: Built-in PyMuPDF parser extracts section hierarchies, figure captions, tables, and references with fallback text extraction.
- **Strict Anti-Hallucination Guardrails**: Distinguishes between direct quotes found in the paper, logical methodology inferences, standard engineering recommendations, and missing details.
- **Interactive React Flow Topology**: Generates drag-and-drop system component architecture diagrams with zoom, pan, and live node inspection.
- **Monaco Code Blueprint Viewer**: Embedded VS Code-like multi-file code editor to review and copy FastAPI backend code, PyTorch model wrappers, and Docker configurations.
- **8-Phase Engineering Roadmap**: Generates structured implementation phases with task dependencies, priority levels, estimated developer hours, and acceptance criteria.
- **Multi-Format Export**: Export entire projects into Markdown, JSON schemas, standalone PDF reports, or downloadable ZIP repositories.

---

## 📄 The 28 Generated Engineering Artifacts

For every uploaded paper, Paper2Prototype synthesizes 28 distinct implementation artifacts:

1. **Research Summary**: High-level executive synthesis of paper findings.
2. **Research Problem**: Core real-world problem addressed by the authors.
3. **Research Gap**: Deficiencies in existing state-of-the-art methods identified in the literature.
4. **Objectives**: Concrete quantitative and qualitative goals of the implementation.
5. **Methodology**: Step-by-step mathematical and procedural breakdown.
6. **Algorithms**: Detailed pseudo-code, mathematical formulas, and algorithmic complexity estimations ($O(N \log N)$).
7. **Dataset Requirements**: Format specifications (DICOM, PNG, CSV), recommended sizing, augmentations, and preprocessing steps.
8. **Technology Recommendations**: Categorized tech stack choices (Frontend, Backend, DB, AI) with rationale and alternative options.
9. **System Requirements**: Overview of compute, storage, latency, and throughput requirements.
10. **Functional Requirements (FR-1 to FR-N)**: Detailed software feature specifications.
11. **Non-Functional Requirements (NFR-1 to NFR-N)**: Security, availability, fault tolerance, and compliance standards.
12. **System Architecture Overview**: High-level microservice and data pipeline topology.
13. **Component Architecture**: Deep-dive component breakdown (Inputs, Outputs, Technologies).
14. **Data Flow Specification**: Step-by-step data processing lifecycle across services.
15. **Database Schema**: Full PostgreSQL DDL entity-relationship schemas, primary/foreign keys, and data types.
16. **API Specification**: REST OpenAPI endpoints with paths, HTTP methods, request bodies, and response types.
17. **ML Pipeline**: End-to-end machine learning lifecycle (Preprocessing, Feature Extraction, Model Training, Inference, Metrics).
18. **Software Modules**: Granular folder and file mapping for backend and service layers.
19. **Project Folder Structure**: Visual directory tree for the generated repository.
20. **Development Roadmap**: 8-phase execution timeline with milestone goals.
21. **Implementation Tasks**: Actionable developer tasks with priority tags ($P0, P1, P2$), time estimates, and acceptance criteria.
22. **Testing Strategy**: Comprehensive plan covering unit tests, integration tests, API validation, and load testing.
23. **Evaluation Metrics**: Benchmarks for model precision, recall, API latency ($P95 \le 120\text{ms}$), and evidence coverage score.
24. **Deployment Architecture**: Docker containerization, AWS cloud architecture (S3, RDS, ECS Fargate), and CI/CD workflows.
25. **Risks and Limitations**: Identified technical bottlenecks and mitigation strategies.
26. **Future Enhancements**: Post-prototype feature roadmap and scaling options.
27. **Starter Code Blueprint**: Production starter files written in Python FastAPI, PyTorch, and Dockerfile configs.
28. **Research Citations & Evidence**: Exact page numbers, section headers, and text chunk quotes backing generated claims.

---

## 🏗️ Monorepo Architecture & Directory Structure

Paper2Prototype is organized as a production monorepo separating web frontend, core API gateway, document parsing services, AI multi-agent orchestrator, and background workers:

```
paper2prototype/
├── api/
│   └── index.py                      # Vercel Serverless Function entry point
│
├── apps/
│   ├── frontend/                     # Next.js 14 Web Application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx        # Root layout & dark glassmorphism theme
│   │   │   │   ├── page.tsx          # Landing page & drag-and-drop PDF upload zone
│   │   │   │   ├── globals.css       # Tailwind CSS custom styling tokens
│   │   │   │   └── projects/[id]/
│   │   │   │       └── page.tsx      # Interactive Engineering Workspace Dashboard
│   │   │   └── components/
│   │   │       ├── ReactFlowCanvas.tsx   # Interactive Architecture Node Diagram (React Flow)
│   │   │       ├── MonacoCodeViewer.tsx  # Multi-File Starter Code Editor (Monaco Editor)
│   │   │       └── EvidenceBadge.tsx     # Provenance Badge & Source Quote Renderer
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/                      # FastAPI Backend Gateway
│       ├── app/
│       │   ├── main.py               # 17 Connected REST API Routes & File Handlers
│       │   └── models/
│       │       └── schemas.py        # Pydantic v2 Schemas for 28 Output Artifacts
│       └── requirements.txt
│
├── services/
│   ├── document_service/             # Document Ingestion Pipeline
│   │   ├── pdf_parser.py             # PyMuPDF Section Detector & Layout Extractor
│   │   └── chunker.py                # Semantic Chunker with Page/Section Metadata
│   └── ai_service/                   # AI Intelligence & RAG Engine
│       ├── agent_orchestrator.py     # 12 Specialized AI Agents Coordinator
│       ├── evidence_engine.py        # Anti-Hallucination Evidence Attribution Engine
│       ├── llm_client.py             # Unified Groq, Gemini & HuggingFace LLM Router
│       └── rag_engine.py             # Embedding Generation & Vector Semantic Retriever
│
├── workers/                          # Celery & Redis Task Queue
├── docker/                           # Multi-container Docker Compose setup
├── tests/
│   └── test_platform.py              # Pytest Verification Suite
├── vercel.json                       # Vercel Routing Map
├── requirements.txt                  # Root Dependencies for Vercel Python Runtime
├── .env.example
└── README.md
```

---

## 🤖 The 12 Specialized AI Agents

The core reasoning engine consists of 12 domain-specific AI agents working in sequence:

1. **Agent 1: Document Analyst**: Parses layout, classifies paper sections, extracts title, authors, abstract, figures, and tables.
2. **Agent 2: Research Analyst**: Extracts the core research problem, literature gap, primary objectives, methodology, and limitations.
3. **Agent 3: Technical Analyst**: Formulates mathematical equations, underlying algorithms, network architectures, and dataset requirements.
4. **Agent 4: Requirements Engineer**: Translates scientific concepts into formal Functional ($FR$) and Non-Functional ($NFR$) software requirements.
5. **Agent 5: System Architect**: Generates system architecture topology, component interfaces, microservices, and data flow descriptions.
6. **Agent 6: Database Architect**: Formulates PostgreSQL entity-relationship tables, columns, data types, constraints, and indexes.
7. **Agent 7: API Architect**: Builds REST OpenAPI endpoints, HTTP methods, request payloads, response objects, and authentication rules.
8. **Agent 8: ML Engineer**: Designs end-to-end ML training, feature engineering, loss functions, GPU inference workers, and evaluation metrics.
9. **Agent 9: Implementation Planner**: Constructs an 8-phase engineering roadmap, developer task breakdowns, priority rankings, and time estimates.
10. **Agent 10: Code Architect**: Constructs the target folder structure and writes runnable starter code files (FastAPI, PyTorch, Docker).
11. **Agent 11: Testing Engineer**: Formulates unit tests, integration tests, ML model validation rules, API tests, and Locust load test scripts.
12. **Agent 12: Deployment Engineer**: Generates Docker Compose configurations, AWS infrastructure architectures (S3, ECS, RDS), and CI/CD pipelines.

---

## 🔍 RAG Pipeline & Semantic Vector Search

The platform implements a Retrieval-Augmented Generation (RAG) pipeline to maintain high fidelity to the uploaded PDF text:

```
Uploaded PDF ──► PyMuPDF Layout Parser ──► Section Detector ──► Semantic Chunker
                                                                    │
                                                                    ▼
Structured Output ◄── 12 AI Agents ◄── Context Reranker ◄── Vector Search (Qdrant/In-Memory)
```

Each text chunk retains explicit source tags:
- `document_id`: Unique project reference.
- `page_number`: Exact PDF page location.
- `section`: Target section header (e.g., *Section 3.2 Methodology*).
- `chunk_id`: Hash identifier.
- `source_text`: Raw extracted text snippet.

---

## 🛡️ Anti-Hallucination & Provenance Engine

To guarantee scientific reliability, generated claims are categorized into 4 evidence tiers:

- 🟢 **`PAPER_EVIDENCE`**: Directly supported by text or formulas in the PDF (includes page number and exact quote).
- 🟣 **`AI_INFERENCE`**: Logical extension deduced from paper methodology.
- 🔵 **`ENGINEERING_RECOMMENDATION`**: Industry standard engineering practice introduced to complete the implementation.
- 🟡 **`NOT_SPECIFIED`**: Explicitly flagged when details are missing from the research paper (e.g., exact GPU hardware or dataset license).

---

## ⚡ Multi-Provider AI Engine Setup

Paper2Prototype features a multi-provider fallback engine:
- **Groq API**: High-speed Llama-3.3-70B model inference (`GROQ_API_KEY`).
- **Google Gemini API**: Gemini 2.5 Flash model & text embeddings (`GEMINI_API_KEY`).
- **HuggingFace API**: Feature extraction embeddings (`HUGGINGFACE_API_KEY`).

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

## 🌐 Connected REST API Specification (17 Endpoints)

All 17 core REST endpoints are active and connected between the FastAPI gateway and Next.js frontend:

| # | Endpoint Path | Method | Description | Status |
| :-: | :--- | :--- | :--- | :-: |
| **1** | `/api/projects` | `POST` | Create a new research project | 🟢 Connected |
| **2** | `/api/projects` | `GET` | List all user projects | 🟢 Connected |
| **3** | `/api/projects/{project_id}` | `GET` | Get project status & paper details | 🟢 Connected |
| **4** | `/api/projects/{project_id}/papers` | `POST` | Upload research paper PDF file | 🟢 Connected |
| **5** | `/api/papers/{paper_id}` | `GET` | Get uploaded paper metadata | 🟢 Connected |
| **6** | `/api/papers/{paper_id}/analyze` | `POST` | Trigger multi-agent RAG analysis | 🟢 Connected |
| **7** | `/api/papers/{paper_id}/analysis` | `GET` | Get research problem & gap synthesis | 🟢 Connected |
| **8** | `/api/projects/{project_id}/architecture/generate` | `POST` | Generate system component architecture | 🟢 Connected |
| **9** | `/api/projects/{project_id}/architecture` | `GET` | Get React Flow node graph topology | 🟢 Connected |
| **10** | `/api/projects/{project_id}/requirements/generate` | `POST` | Generate FR & NFR software requirements | 🟢 Connected |
| **11** | `/api/projects/{project_id}/requirements` | `GET` | Get evidence-attributed requirements | 🟢 Connected |
| **12** | `/api/projects/{project_id}/roadmap/generate` | `POST` | Generate 8-phase engineering roadmap | 🟢 Connected |
| **13** | `/api/projects/{project_id}/roadmap` | `GET` | Get implementation tasks & effort hours | 🟢 Connected |
| **14** | `/api/projects/{project_id}/code/generate` | `POST` | Generate starter code blueprints | 🟢 Connected |
| **15** | `/api/projects/{project_id}/artifacts` | `GET` | Get master 28-field research blueprint | 🟢 Connected |
| **16** | `/api/artifacts/{artifact_id}/regenerate` | `POST` | Regenerate specific section artifacts | 🟢 Connected |
| **17** | `/api/projects/{project_id}/export` | `POST/GET` | Export blueprint to Markdown, JSON, PDF, or ZIP | 🟢 Connected |

---

## 💻 Local Development & Docker Execution

### 1. Run Backend Gateway (FastAPI)
```bash
cd apps/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
- Interactive Swagger API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Run Frontend Web App (Next.js)
```bash
cd apps/frontend
npm install
npm run dev
```
- Dashboard UI: [http://localhost:3000](http://localhost:3000)
- Pre-loaded Demo Workspace: [http://localhost:3000/projects/demo-medical-classifier](http://localhost:3000/projects/demo-medical-classifier)

### 3. Run via Docker Compose
```bash
docker-compose up --build
```

---

## ☁️ Vercel Deployment (2-Step Guide)

Paper2Prototype is optimized for Vercel Next.js + Serverless Python Function deployment.

### **Step 1: Import GitHub Repository**
1. Open **[vercel.com/new](https://vercel.com/new)**.
2. Select repository **`Monishwarann/paper2prototype`** and click **Import**.

### **Step 2: Add Environment Variables & Deploy**
Under **Environment Variables**, configure:
- `GROQ_API_KEY`: Your Groq API key
- `GEMINI_API_KEY`: Your Gemini API key
- `HUGGINGFACE_API_KEY`: Your HuggingFace API key
- `DEFAULT_AI_PROVIDER`: `groq`

Click **Deploy**! Vercel will build the Next.js frontend and Python serverless API functions automatically.

---

## 🧪 Testing & Quality Assurance

Run the platform test suite:
```bash
python -c "import sys, os; sys.path.extend(['.', 'apps/backend']); from tests.test_platform import *; test_evidence_engine_classification(); test_evidence_coverage_scoring(); test_agent_orchestrator_blueprint(); test_llm_client_initialization(); print('ALL TESTS PASSED CLEANLY!')"
```

---

## 📜 License

Copyright (c) 2026 Monishwaran. All Rights Reserved.  
Released under the [MIT License](LICENSE).

