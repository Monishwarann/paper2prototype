import uuid
from typing import List, Dict, Any

class DocumentChunker:
    """
    Semantic Document Chunker enriching each text chunk with strict source metadata.
    """

    def chunk_document(self, document_id: str, parsed_pdf: Dict[str, Any], chunk_size: int = 500, overlap: int = 100) -> List[Dict[str, Any]]:
        chunks = []
        
        for page in parsed_pdf.get("pages", []):
            page_num = page.get("page_number", 1)
            section = page.get("section", "General")
            text = page.get("text", "")
            
            words = text.split()
            if not words:
                continue

            step = chunk_size - overlap
            for i in range(0, len(words), step):
                chunk_words = words[i:i + chunk_size]
                chunk_text = " ".join(chunk_words)
                
                chunk_id = f"chunk_{document_id}_p{page_num}_{uuid.uuid4().hex[:8]}"
                chunks.append({
                    "chunk_id": chunk_id,
                    "document_id": document_id,
                    "page_number": page_num,
                    "section": section,
                    "source_text": chunk_text,
                    "word_count": len(chunk_words)
                })

        return chunks

chunker = DocumentChunker()
