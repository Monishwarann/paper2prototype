import os
import json
import logging
from typing import Type, TypeVar, Dict, Any, Optional
from pydantic import BaseModel

logger = logging.getLogger(__name__)

T = TypeVar("T", bound=BaseModel)

class LLMClient:
    """
    Unified LLM Client supporting Groq, Google Gemini AI, and HuggingFace API providers.
    Provides structured JSON generation with Pydantic validation & repair retries.
    """

    def __init__(self, provider: Optional[str] = None):
        self.provider = provider or os.getenv("DEFAULT_AI_PROVIDER", "groq")
        self.groq_api_key = os.getenv("GROQ_API_KEY", "")
        self.gemini_api_key = os.getenv("GEMINI_API_KEY", "")
        self.hf_api_key = os.getenv("HUGGINGFACE_API_KEY", "")
        
        self.groq_client = None
        self.gemini_client = None
        self.hf_client = None

        if self.groq_api_key:
            try:
                from groq import Groq
                self.groq_client = Groq(api_key=self.groq_api_key)
                logger.info("Initialized Groq client successfully.")
            except Exception as e:
                logger.warning(f"Failed to initialize Groq client: {e}")

        if self.gemini_api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.gemini_api_key)
                self.gemini_client = genai
                logger.info("Initialized Google Gemini AI client successfully.")
            except Exception as e:
                logger.warning(f"Failed to initialize Google Gemini client: {e}")

        if self.hf_api_key:
            try:
                from huggingface_hub import InferenceClient
                self.hf_client = InferenceClient(token=self.hf_api_key)
                logger.info("Initialized HuggingFace Inference client successfully.")
            except Exception as e:
                logger.warning(f"Failed to initialize HuggingFace client: {e}")

    def generate_structured(
        self,
        prompt: str,
        response_model: Type[T],
        system_instruction: str = "You are an expert AI Research Architect.",
        temperature: float = 0.2,
        max_retries: int = 2
    ) -> T:
        schema_json = json.dumps(response_model.model_json_schema(), indent=2)
        full_prompt = (
            f"{system_instruction}\n\n"
            f"PROMPT:\n{prompt}\n\n"
            f"You MUST respond ONLY with valid JSON matching this JSON Schema:\n"
            f"{schema_json}\n\n"
            f"Do NOT include markdown formatting wrappers like ```json unless valid."
        )

        for attempt in range(max_retries + 1):
            try:
                raw_response = self._call_llm_raw(full_prompt, temperature)
                cleaned = self._clean_json_str(raw_response)
                data = json.loads(cleaned)
                return response_model.model_validate(data)
            except Exception as e:
                logger.warning(f"Structured LLM generation attempt {attempt + 1} failed: {e}")
                if attempt == max_retries:
                    raise RuntimeError(f"LLM failed to output valid schema for {response_model.__name__}: {e}")

    def _call_llm_raw(self, prompt: str, temperature: float) -> str:
        # 1. Groq high-speed LLM inference
        if self.groq_client and self.provider == "groq":
            model_name = os.getenv("AI_MODEL_NAME", "llama-3.3-70b-versatile")
            try:
                res = self.groq_client.chat.completions.create(
                    model=model_name,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=temperature
                )
                return res.choices[0].message.content or ""
            except Exception as e:
                logger.error(f"Groq API call error: {e}. Trying Gemini or HuggingFace fallback.")

        # 2. Gemini fallback / primary
        if self.gemini_client:
            model_name = "gemini-2.5-flash"
            try:
                model = self.gemini_client.GenerativeModel(model_name)
                res = model.generate_content(prompt, generation_config={"temperature": temperature})
                return res.text
            except Exception as e:
                logger.error(f"Gemini API call error: {e}")

        # 3. HuggingFace Inference API fallback
        if self.hf_client:
            try:
                res = self.hf_client.text_generation(prompt, max_new_tokens=1500, temperature=temperature)
                return res
            except Exception as e:
                logger.error(f"HuggingFace API error: {e}")

        if self.groq_client:
            res = self.groq_client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=temperature
            )
            return res.choices[0].message.content or ""

        raise ValueError("No active AI Provider API key found.")

    def generate_embeddings(self, text_chunks: list[str]) -> list[list[float]]:
        if not text_chunks:
            return []
            
        if self.hf_client:
            try:
                embeddings = []
                for chunk in text_chunks:
                    emb = self.hf_client.feature_extraction(chunk, model="sentence-transformers/all-MiniLM-L6-v2")
                    if isinstance(emb, list) and isinstance(emb[0], list):
                        embeddings.append(emb[0])
                    else:
                        embeddings.append(list(emb))
                return embeddings
            except Exception as e:
                logger.warning(f"HuggingFace embedding error: {e}")

        if self.gemini_client:
            try:
                result = []
                for chunk in text_chunks:
                    emb = self.gemini_client.embed_content(
                        model="models/embedding-001",
                        content=chunk
                    )
                    result.append(emb["embedding"])
                return result
            except Exception as e:
                logger.warning(f"Gemini embedding error: {e}")

        import hashlib
        dummy_embeddings = []
        for chunk in text_chunks:
            h = hashlib.sha256(chunk.encode()).digest()
            vec = [float(b) / 255.0 for b in h[:64]] * 12
            dummy_embeddings.append(vec[:768])
        return dummy_embeddings

    def _clean_json_str(self, text: str) -> str:
        text = text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        return text.strip()

llm_client = LLMClient()
