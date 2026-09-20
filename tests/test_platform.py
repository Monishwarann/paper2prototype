import os
try:
    import pytest
except ImportError:
    pytest = None

from apps.backend.app.models.schemas import EvidenceType, CitationEvidence, ResearchBlueprintArtifact
from services.ai_service.evidence_engine import evidence_engine
from services.document_service.pdf_parser import pdf_parser
from services.document_service.chunker import chunker
from services.ai_service.agent_orchestrator import agent_orchestrator
from services.ai_service.architecture_critic import architecture_critic
from services.ai_service.llm_client import llm_client

def test_evidence_engine_classification():
    ev_paper = evidence_engine.create_evidence(
        claim="ResNet50 Backbone",
        evidence_type=EvidenceType.PAPER_EVIDENCE,
        chunk={"document_id": "doc1", "page_number": 3, "section": "Methodology", "chunk_id": "c1", "source_text": "We employ ResNet50."}
    )
    assert ev_paper.evidence_type == EvidenceType.PAPER_EVIDENCE
    assert ev_paper.page_number == 3
    assert ev_paper.section_name == "Methodology"

    ev_rec = evidence_engine.create_evidence(
        claim="Use FastAPI",
        evidence_type=EvidenceType.ENGINEERING_RECOMMENDATION
    )
    assert ev_rec.evidence_type == EvidenceType.ENGINEERING_RECOMMENDATION

def test_evidence_coverage_scoring():
    ev1 = evidence_engine.create_evidence("Claim 1", EvidenceType.PAPER_EVIDENCE, chunk={"document_id": "d1", "page_number": 1})
    ev2 = evidence_engine.create_evidence("Claim 2", EvidenceType.AI_INFERENCE)
    score = evidence_engine.calculate_evidence_score([ev1, ev2])
    assert score["evidence_coverage_percent"] >= 85

def test_agent_orchestrator_blueprint():
    parsed = {"title": "Medical Imaging Paper", "abstract": "Test abstract text.", "pages": []}
    chunks = [{"chunk_id": "c1", "document_id": "p1", "page_number": 1, "section": "Abstract", "source_text": "Test abstract"}]
    artifact = agent_orchestrator.process_paper("p1", parsed, chunks)
    assert artifact.project_id == "p1"
    assert len(artifact.technology_recommendations) > 0
    assert len(artifact.starter_code_blueprint) > 0
    assert artifact.proto_readiness_score > 80

def test_architecture_critic():
    parsed = {"title": "Test Paper", "abstract": "Test abstract", "pages": []}
    chunks = [{"chunk_id": "c1", "document_id": "p1", "page_number": 1, "section": "Abstract", "source_text": "Test"}]
    artifact = agent_orchestrator.process_paper("p1", parsed, chunks)
    art_dict = artifact.model_dump()
    audit = architecture_critic.audit_architecture(art_dict)
    assert audit["feasibility_score"] >= 90
    assert "cost_estimation" in audit

def test_llm_client_initialization():
    assert llm_client.provider in ["groq", "gemini", "huggingface", "openai"]
