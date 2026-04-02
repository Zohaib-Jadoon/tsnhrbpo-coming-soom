# LocalHR: Enterprise Frontend Development Guide (v3.0)

## 1. Development Focus: High-Authority ERP
The frontend implementation must reflect the scale of an ERP handling recruitment, onboarding, payroll, and 8 other institutional modules.

### 1.1 Structural Organization
Refer to the [Design System](../doc/DESIGN_SYSTEM.md) for pillar-specific UI patterns.
- **Pillar-Based Routing**: `/dashboard/[tenant]/recruitment`, `/dashboard/[tenant]/payroll`, etc.
- **Central Intelligence**: A global `AICommandCenter` component accessible from all modules.

---

## 2. Component Implementation (The 11 Pillars)

### 2.1 Recruitment Interface (P1)
- **Kanban Board**: Drag-and-drop Batches through the 10 hiring stages.
- **Search**: High-performance "Search by Skill" interface using vector search.

### 2.2 Onboarding Engine (P2)
- **Workflow Stepper**: Technical multi-step forms for document verification.
- **Vault**: Drag-and-drop encrypted file upload.

### 2.3 Payroll Grid (P3)
- **Disbursement Table**: High-precision tables with batch-action processing.
- **Analytics**: Recharts-based growth trends in Muted Emerald.

---

## 3. Technology Stack Integration
- **Next.js 15**: Use of Server Actions for direct database manipulation in ERP modules.
- **Tailwind v4**: Implementation of the custom "Authority" and "Performance" tokens.
- **Gemini 1.5**: Direct integration patterns for the streaming AI Recruiter interface.

---

## 4. Verification & Deployment
- Ensure every pillar (P1-P11) has a dedicated `ux_audit.py` check.
- Follow the [Implementation Plan](../doc/implementtion-plan.md) for the phased construction of the ERP modules.
