# TSNHRBPO: ERP Technical Architecture (v3.0)

## 1. System Architecture: Modular ERP
The TSNHRBPO system follows a **Modular Monorepo** architecture (Turborepo), separating global infrastructure from specific HRBPO functional modules. This allows for high-concurrency operations across 11 service pillars.

### 1.1 Core Stack
- **Edge Layer**: Next.js 15 (App Router) with React Server Components.
- **Style Layer**: Tailwind CSS v4 with the **Accentuated Design System**.
- **Logic Layer**: Node.js/TypeScript with separate service boundaries for each Pillar.
- **Intelligence Layer**: Google Gemini 1.5 Flash (API) + pgvector (Embeddings).
- **Data Layer**: High-availability PostgreSQL with specialized schemas for BPO Multi-tenancy.

---

## 2. ERP Database Schema (Institutional Scale)
The database is structured to handle the complexity of an HRBPO provider managing multiple clients and thousands of employees.

### 2.1 Multi-Tenant Core
- `Organizations`: The top-level entity (Clients).
- `Workgroups`: Departments within organizations.
- `Employees`: The central professional entity referenced across all modules.

### 2.2 Pillar-Specific Tables
- **Recruitment**: `Jobs`, `Applications`, `Candidate_Scores`, `Talent_Pipelines`.
- **Onboarding**: `Workflows`, `Document_Verifications`, `Inductions`.
- **Payroll**: `Salary_Structures`, `Disbursements`, `Tax_Profiles`, `Bonus_Rules`.
- **Performance**: `KPIs`, `Reviews`, `Feedback_Cycles`.

---

## 3. AI Infrastructure (Gemini 1.5 Integration)
The system utilizes Gemini's 1.2M token context window for deep document and workforce analysis.

### 3.1 RAG (Retrieval-Augmented Generation) Pipeline
1. **Ingestion**: Resume PDFs and Employee profiles are processed into vectors.
2. **Storage**: Vectors stored in `pgvector` alongside relationship metadata.
3. **Query**: Users chat with the HR data (e.g., "Find candidates who match our Organization Design for the new BPO wing").

### 3.2 Automation Pipelines
- **Batch Resume Processing**: Handling 100+ resumes per batch through Gemini.
- **Sentiment Analysis Pipeline**: Processing weekly pulse checks for departmental health.

---

## 4. Design Token Architecture
Tokens are mapped to the **Accentuated Minimalism (v2.3)** guidelines.

```css
:root {
  --authority-navy: #0A1F44;     /* Playfair headers, Primary buttons */
  --performance-emerald: #2D6A4F; /* Charts, Success states, Growth tags */
  --system-white: #FFFFFF;       /* Global canvas */
  --ink-black: #000000;         /* Technical data, hairline dividers */
  --slate-divider: #E2E2E2;     /* Subtle grid lines */
}
```

---

## 5. Deployment & Scalability
- **Frontend**: Scaled via Vercel Edge.
- **Backend API**: Stateless micro-services managed via high-availability clusters.
- **Asset Storage**: Institutional-grade document vault with absolute encryption and ClamAV scanning.
