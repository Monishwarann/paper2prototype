# Security Policy & Guidelines - Paper2Prototype 🛡️

At **Paper2Prototype**, security, research data integrity, and privacy are foundational. This document outlines our security architecture, file validation rules, secret management standards, and vulnerability reporting procedures.

---

## 🔒 Security Architecture Overview

1. **Authentication & Authorization**:
   - JSON Web Token (JWT) stateless authentication (`HS256` / `RS256`).
   - Role-Based Access Control (RBAC) enforcing principle of least privilege across projects and administrative operations.

2. **File Upload Security & Validation**:
   - Mandatory MIME type validation (`application/pdf`) and file extension checks.
   - Magic number binary signature verification (`%PDF-1.`).
   - Maximum upload payload limit capped at 50 MB to prevent resource exhaustion attacks.
   - Path traversal mitigation: Input filenames are sanitized and stored using randomized UUID keys.
   - Malicious content and archive bomb inspection.

3. **Data Protection & Encryption**:
   - **In Transit**: Mandatory TLS 1.3 encryption for all REST API endpoints and WebSockets/SSE channels.
   - **At Rest**: AES-256 encryption for database storage and external S3 object buckets.

4. **Injection & XSS Protection**:
   - SQLAlchemy 2.0 ORM parameterization preventing SQL injection vulnerabilities.
   - Pydantic v2 schema validation filtering malformed JSON payloads.
   - Next.js auto-escaping preventing Cross-Site Scripting (XSS).

5. **Secrets & Credentials Management**:
   - **Zero Hardcoded Secrets**: All API keys (`GROQ_API_KEY`, `GEMINI_API_KEY`, `HUGGINGFACE_API_KEY`, `AUTH_SECRET`) are loaded strictly from environment variables.
   - Automated GitHub Push Protection scanning active on every commit.

---

## 🛡️ Security Headers Enforced

The FastAPI gateway enforces standard HTTP security response headers:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

---

## 📋 Reporting a Vulnerability

If you discover a security vulnerability within Paper2Prototype, please report it privately:

- **Email**: `security@paper2prototype.dev` (or open a confidential GitHub Security Advisory)
- **Response SLA**: Initial triage within 24 hours; patch deployment within 72 hours.

Please do **NOT** open public GitHub issues for security vulnerabilities.

---

## 📜 Supported Versions

| Version | Supported |
| :--- | :--- |
| 1.0.x | 🟢 Active Security Support |
| < 1.0.0 | 🔴 Unsupported |
