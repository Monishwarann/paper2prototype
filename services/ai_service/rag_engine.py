import logging
from typing import List, Dict, Any
from services.ai_service.llm_client import llm_client

logger = logging.getLogger(__name__)

class RAGEngine:
    """
    RAG Research Engine performing chunk indexing, vector embedding, and semantic retrieval.
    """

    def __init__(self):
        self.vector_store: List[Dict[str, Any]] = []

    def index_chunks(self, chunks: List[Dict[str, Any]]):
        if not chunks:
            return
            
        texts = [c["source_text"] for c in chunks]
        embeddings = llm_client.generate_embeddings(texts)
        
        for chunk, emb in zip(chunks, embeddings):
            self.vector_store.append({
                "chunk": chunk,
                "embedding": emb
            })
        logger.info(f"Indexed {len(chunks)} chunks into vector store.")

    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        if not self.vector_store:
            return []

        query_emb = llm_client.generate_embeddings([query])[0]
        
        # Calculate cosine similarities
        results = []
        for item in self.vector_store:
            score = self._cosine_similarity(query_emb, item["embedding"])
            results.append((score, item["chunk"]))

        results.sort(key=lambda x: x[0], reverse=True)
        return [chunk for score, chunk in results[:top_k]]

    def _cosine_similarity(self, vec_a: List[float], vec_b: List[float]) -> float:
        if not vec_a or not vec_b or len(vec_a) != len(vec_b):
            return 0.0
        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = sum(a * a for a in vec_a) ** 0.5
        norm_b = sum(b * b for b in vec_b) ** 0.5
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot_product / (norm_a * norm_b)

rag_engine = RAGEngine()
