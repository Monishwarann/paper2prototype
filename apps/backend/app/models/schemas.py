from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

class EvidenceType(str, Enum):
    PAPER_EVIDENCE = "PAPER_EVIDENCE"
    AI_INFERENCE = "AI_INFERENCE"
    ENGINEERING_RECOMMENDATION = "ENGINEERING_RECOMMENDATION"
    NOT_SPECIFIED = "NOT_SPECIFIED"

class CitationEvidence(BaseModel):
    claim: str
    evidence_type: EvidenceType
    document_id: Optional[str] = None
    page_number: Optional[int] = None
    section_name: Optional[str] = None
    source_chunk_id: Optional[str] = None
    exact_quote: Optional[str] = None
    reasoning: Optional[str] = None

class TechRecommendation(BaseModel):
    technology: str
    category: str  # Frontend, Backend, Database, AI/ML, Infrastructure
    reason: str
    evidence_type: EvidenceType
    source_reference: Optional[str] = None
    alternatives: List[str] = []
    complexity: str  # Low, Medium, High
    cost_consideration: str
    integration_notes: str

class SystemRequirement(BaseModel):
    id: str
    title: str
    description: str
    req_type: str  # Functional vs Non-Functional
    priority: str  # P0 (Critical), P1 (High), P2 (Medium)
    evidence: CitationEvidence

class ArchitectureComponent(BaseModel):
    id: str
    name: str
    category: str  # Frontend, Backend, Database, AI, Storage, External API, Infrastructure
    description: str
    technologies: List[str]
    inputs: List[str] = []
    outputs: List[str] = []

class DatabaseEntity(BaseModel):
    table_name: str
    description: str
    columns: List[Dict[str, str]]  # name, type, constraints, description
    relationships: List[str] = []

class ApiEndpoint(BaseModel):
    path: str
    method: str  # GET, POST, PUT, DELETE
    summary: str
    request_body: Optional[Dict[str, Any]] = None
    responses: Dict[str, Any]
    auth_required: bool = True

class MlPipelineStep(BaseModel):
    step_number: int
    name: str  # Data Preprocessing, Feature Extraction, Model Training, Inference, Evaluation
    description: str
    tools: List[str]
    inputs: List[str]
    outputs: List[str]
    evidence_type: EvidenceType

class ImplementationTask(BaseModel):
    task_id: str
    phase: str  # Phase 1 to Phase 8
    title: str
    description: str
    priority: str
    dependencies: List[str] = []
    estimated_hours: int
    technology: str
    acceptance_criteria: List[str]

class StarterFile(BaseModel):
    filepath: str
    description: str
    language: str
    content: str

# Master 28 Output Artifact Model
class ResearchBlueprintArtifact(BaseModel):
    project_id: str
    paper_title: str
    paper_authors: List[str] = []
    
    # 1-5 Core Research
    research_summary: str
    research_problem: str
    research_gap: str
    objectives: List[str]
    methodology: List[str]
    
    # 6-7 Technical Specs
    algorithms: List[Dict[str, Any]]
    dataset_requirements: Dict[str, Any]
    
    # 8-11 Tech & Requirements
    technology_recommendations: List[TechRecommendation]
    system_requirements: List[SystemRequirement]
    functional_requirements: List[SystemRequirement]
    non_functional_requirements: List[SystemRequirement]
    
    # 12-16 Architecture & Data
    system_architecture_overview: str
    component_architecture: List[ArchitectureComponent]
    data_flow_description: str
    database_schema: List[DatabaseEntity]
    api_specifications: List[ApiEndpoint]
    
    # 17-19 ML & Structure
    ml_pipeline: List[MlPipelineStep]
    software_modules: List[Dict[str, str]]
    project_folder_structure: str
    
    # 20-23 Planning & Strategy
    development_roadmap: List[Dict[str, str]]
    implementation_tasks: List[ImplementationTask]
    testing_strategy: Dict[str, Any]
    evaluation_metrics: List[Dict[str, str]]
    
    # 24-28 Ops & Evidence
    deployment_architecture: Dict[str, Any]
    risks_and_limitations: List[Dict[str, str]]
    future_enhancements: List[str]
    starter_code_blueprint: List[StarterFile]
    citations_and_evidence: List[CitationEvidence]
    
    proto_readiness_score: int = 88
    evidence_coverage_percent: int = 92

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = ""

class ProjectResponse(BaseModel):
    id: str
    name: str
    description: str
    status: str  # QUEUED, PARSING, ANALYZING, COMPLETED, FAILED
    created_at: str
    paper_filename: Optional[str] = None
