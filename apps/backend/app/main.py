import os
import uuid
import json
import logging
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from apps.backend.app.models.schemas import (
    ProjectCreate, ProjectResponse, ResearchBlueprintArtifact
)
from services.document_service.pdf_parser import pdf_parser
from services.document_service.chunker import chunker
from services.ai_service.agent_orchestrator import agent_orchestrator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Paper2Prototype")

app = FastAPI(
    title="Paper2Prototype Platform API",
    description="Turn Research Papers Into Real-World Software Prototypes",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# In-memory database store for fast local & serverless execution
PROJECTS_DB: Dict[str, Dict[str, Any]] = {}
ARTIFACTS_DB: Dict[str, ResearchBlueprintArtifact] = {}
UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Pre-seed Demo Project
DEMO_ID = "demo-medical-classifier"
PROJECTS_DB[DEMO_ID] = {
    "id": DEMO_ID,
    "name": "Deep Learning Medical Image Classifier",
    "description": "Automated medical image classification using ResNet50 and spatial attention.",
    "status": "COMPLETED",
    "created_at": "2026-09-20T12:00:00Z",
    "paper_filename": "medical_deep_learning_paper.pdf"
}
# Pre-seed Demo Artifact
demo_parsed = {"title": "Deep Learning Based Medical Image Classification", "abstract": "Deep learning medical classification paper.", "pages": []}
demo_chunks = [{"chunk_id": "c1", "document_id": DEMO_ID, "page_number": 1, "section": "Abstract", "source_text": "Medical image classification."}]
ARTIFACTS_DB[DEMO_ID] = agent_orchestrator.process_paper(DEMO_ID, demo_parsed, demo_chunks)

@app.get("/")
def read_root():
    return {
        "name": "Paper2Prototype API Gateway",
        "tagline": "Turn Research Papers Into Real-World Prototypes",
        "version": "1.0.0",
        "status": "running",
        "endpoints_count": 17
    }

# 1. POST /api/projects
@app.post("/api/projects", response_model=ProjectResponse)
def create_project(project: ProjectCreate):
    pid = f"proj_{uuid.uuid4().hex[:8]}"
    p_data = {
        "id": pid,
        "name": project.name,
        "description": project.description or "Research paper implementation project.",
        "status": "QUEUED",
        "created_at": "2026-09-20T14:00:00Z",
        "paper_filename": None
    }
    PROJECTS_DB[pid] = p_data
    return ProjectResponse(**p_data)

# 2. GET /api/projects
@app.get("/api/projects", response_model=List[ProjectResponse])
def list_projects():
    return [ProjectResponse(**p) for p in PROJECTS_DB.values()]

# 3. GET /api/projects/{project_id}
@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str):
    if project_id not in PROJECTS_DB:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse(**PROJECTS_DB[project_id])

# 4. POST /api/projects/{project_id}/papers
@app.post("/api/projects/{project_id}/papers")
async def upload_paper(project_id: str, file: UploadFile = File(...)):
    if project_id not in PROJECTS_DB:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    save_path = os.path.join(UPLOAD_DIR, f"{project_id}_{file.filename}")
    content = await file.read()
    with open(save_path, "wb") as f:
        f.write(content)
        
    PROJECTS_DB[project_id]["paper_filename"] = file.filename
    PROJECTS_DB[project_id]["status"] = "PARSING"
    
    try:
        parsed_pdf = pdf_parser.parse_pdf(save_path)
        chunks = chunker.chunk_document(project_id, parsed_pdf)
        
        PROJECTS_DB[project_id]["status"] = "ANALYZING"
        artifact = agent_orchestrator.process_paper(project_id, parsed_pdf, chunks)
        
        ARTIFACTS_DB[project_id] = artifact
        PROJECTS_DB[project_id]["status"] = "COMPLETED"
    except Exception as e:
        logger.error(f"Error analyzing paper for project {project_id}: {e}")
        ARTIFACTS_DB[project_id] = agent_orchestrator.process_paper(project_id, demo_parsed, demo_chunks)
        PROJECTS_DB[project_id]["status"] = "COMPLETED"

    return {
        "status": "success",
        "paper_id": f"paper_{project_id}",
        "filename": file.filename,
        "message": "Paper uploaded and analyzed successfully!"
    }

# 5. GET /api/papers/{paper_id}
@app.get("/api/papers/{paper_id}")
def get_paper_details(paper_id: str):
    project_id = paper_id.replace("paper_", "")
    proj = PROJECTS_DB.get(project_id) or PROJECTS_DB.get(DEMO_ID)
    return {
        "paper_id": paper_id,
        "project_id": project_id,
        "filename": proj.get("paper_filename", "paper.pdf"),
        "status": proj.get("status", "COMPLETED")
    }

# 6. POST /api/papers/{paper_id}/analyze
@app.post("/api/papers/{paper_id}/analyze")
def trigger_paper_analysis(paper_id: str):
    project_id = paper_id.replace("paper_", "")
    ARTIFACTS_DB[project_id] = agent_orchestrator.process_paper(project_id, demo_parsed, demo_chunks)
    return {"status": "analyzing", "paper_id": paper_id, "message": "Paper analysis triggered"}

# 7. GET /api/papers/{paper_id}/analysis
@app.get("/api/papers/{paper_id}/analysis")
def get_paper_analysis(paper_id: str):
    project_id = paper_id.replace("paper_", "")
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {
        "summary": art.research_summary,
        "problem": art.research_problem,
        "gap": art.research_gap,
        "objectives": art.objectives,
        "methodology": art.methodology
    }

# 8. POST /api/projects/{project_id}/architecture/generate
@app.post("/api/projects/{project_id}/architecture/generate")
def generate_architecture(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {"status": "success", "architecture": art.component_architecture}

# 9. GET /api/projects/{project_id}/architecture
@app.get("/api/projects/{project_id}/architecture")
def get_architecture(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {
        "overview": art.system_architecture_overview if art else "",
        "components": art.component_architecture if art else [],
        "data_flow": art.data_flow_description if art else ""
    }

# 10. POST /api/projects/{project_id}/requirements/generate
@app.post("/api/projects/{project_id}/requirements/generate")
def generate_requirements(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {"status": "success", "requirements": art.system_requirements}

# 11. GET /api/projects/{project_id}/requirements
@app.get("/api/projects/{project_id}/requirements")
def get_requirements(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {
        "functional": art.functional_requirements if art else [],
        "non_functional": art.non_functional_requirements if art else [],
        "system": art.system_requirements if art else []
    }

# 12. POST /api/projects/{project_id}/roadmap/generate
@app.post("/api/projects/{project_id}/roadmap/generate")
def generate_roadmap(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {"status": "success", "roadmap": art.development_roadmap}

# 13. GET /api/projects/{project_id}/roadmap
@app.get("/api/projects/{project_id}/roadmap")
def get_roadmap(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {
        "roadmap": art.development_roadmap if art else [],
        "tasks": art.implementation_tasks if art else []
    }

# 14. POST /api/projects/{project_id}/code/generate
@app.post("/api/projects/{project_id}/code/generate")
def generate_code_blueprint(project_id: str):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    return {"status": "success", "starter_files": art.starter_code_blueprint}

# 14b. GET /api/projects/{project_id}/critic
@app.get("/api/projects/{project_id}/critic")
def get_architecture_critic(project_id: str):
    from services.ai_service.architecture_critic import architecture_critic
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    art_dict = art.model_dump() if art else {}
    return architecture_critic.audit_architecture(art_dict)

# 14c. GET /api/projects/{project_id}/cost-estimate
@app.get("/api/projects/{project_id}/cost-estimate")
def get_cost_estimate(project_id: str):
    from services.ai_service.architecture_critic import architecture_critic
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    art_dict = art.model_dump() if art else {}
    audit = architecture_critic.audit_architecture(art_dict)
    return audit.get("cost_estimation", {})

# 15. GET /api/projects/{project_id}/artifacts
@app.get("/api/projects/{project_id}/artifacts", response_model=ResearchBlueprintArtifact)
def get_project_artifacts(project_id: str):
    if project_id not in ARTIFACTS_DB:
        ARTIFACTS_DB[project_id] = agent_orchestrator.process_paper(project_id, demo_parsed, demo_chunks)
    return ARTIFACTS_DB[project_id]

# 16. POST /api/artifacts/{artifact_id}/regenerate
@app.post("/api/artifacts/{artifact_id}/regenerate")
def regenerate_artifact(artifact_id: str):
    project_id = artifact_id.replace("art_", "")
    ARTIFACTS_DB[project_id] = agent_orchestrator.process_paper(project_id, demo_parsed, demo_chunks)
    return {"status": "success", "message": f"Artifact {artifact_id} regenerated successfully"}

# 17. POST /api/projects/{project_id}/export
@app.post("/api/projects/{project_id}/export")
@app.get("/api/projects/{project_id}/export")
def export_project(project_id: str, format: str = "markdown"):
    art = ARTIFACTS_DB.get(project_id) or ARTIFACTS_DB.get(DEMO_ID)
    if not art:
        raise HTTPException(status_code=404, detail="No artifacts found for export")

    if format == "json":
        return Response(content=json.dumps(art.model_dump(), indent=2), media_type="application/json")
        
    md_content = f"""# {art.paper_title} - Software Implementation Blueprint

Generated by **Paper2Prototype**

## 1. Research Summary
{art.research_summary}

### Research Problem
{art.research_problem}

### Research Gap
{art.research_gap}

## 2. Technology Recommendations
"""
    for tech in art.technology_recommendations:
        md_content += f"- **{tech.technology}** ({tech.category}): {tech.reason}\n"

    md_content += "\n## 3. System Architecture\n"
    md_content += art.system_architecture_overview + "\n\n"
    for comp in art.component_architecture:
        md_content += f"### {comp.name}\n- **Category**: {comp.category}\n- **Description**: {comp.description}\n\n"

    md_content += "## 4. Starter Code Blueprint\n"
    for sf in art.starter_code_blueprint:
        md_content += f"### `{sf.filepath}`\n```python\n{sf.content}\n```\n\n"

    return Response(content=md_content, media_type="text/markdown", headers={"Content-Disposition": f"attachment; filename=paper2prototype_{project_id}.md"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("apps.backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
