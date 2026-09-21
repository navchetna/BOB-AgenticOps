# BOB AgenticOps — Feature Description

A demo application for Bank of Baroda showing how AI agents could fill in a
bank's multi-source application-onboarding forms. Built on a FastAPI +
React + PostgreSQL stack, with real authentication wired up and the
workspace content currently mocked on the frontend (see
[frontend/src/data/applications.js](../frontend/src/data/applications.js),
[frontend/src/data/sources.js](../frontend/src/data/sources.js),
[frontend/src/data/documents.js](../frontend/src/data/documents.js) and
[frontend/src/data/fieldColors.js](../frontend/src/data/fieldColors.js)).

## Features

### 1. Authenticated Access
Signup/login with JWT-based sessions (real backend calls, not mocked) —
gates access to the workspace.

### 2. Multi-Application Portfolio
The system isn't built around a single form — it models a portfolio of
applications (e.g. Core Banking System, UPI Payment Gateway), each carrying
its own independent set of onboarding data. This demonstrates the tool
scaling across a bank's actual application inventory, not just one
one-off form.

### 3. Categorized Information Collection
For each application, information is broken into the distinct categories a
real bank onboarding process requires: Application Details, Asset &
Infrastructure Details, Application Owner Information, Business Owner
Information, Hosting Environment, Initial Procurement, and Current ATS.
This mirrors how the data is actually gathered in practice — as separate
work-streams, not one giant form.

### 4. Per-Category Fill Status
Every category tracks whether it's **Filled**, **Needs Review**, or
**Pending** — giving an at-a-glance view of how complete an application's
record is, and which parts still need attention.

### 5. Provenance Tracking (Category Level)
Each category records *where* its data came from and *which agent* was
responsible for filling it (e.g. "Active Directory / HRMS" via the
"Identity & Ownership Agent"), plus a last-updated timestamp — an audit
trail of how the record was assembled.

### 6. Field-Level Source Attribution
Going deeper than category-level provenance, the Asset & Infrastructure
category attributes *individual fields* to the specific team or system
responsible for them — Automation, MSP, Asset Team, OEM, or Inspection
Team — based on the bank's actual sourcing sheet. This makes visible
something most systems hide: that a single "form" is really assembled from
five-plus independent processes with very different reliability and speed
characteristics.

The **Source Legend** panel next to the field table renders each source as
a row tinted with that source's exact color (matching the field rows it
describes), starting flush with the top of the table. Clicking a legend
entry filters the table down to only that source's fields; clicking it
again clears the filter — letting you isolate, say, "just the fields
Inspection Team is responsible for" in one click.

### 7. Process Gap Detection
Fields that no team or system currently owns (e.g. Rack's Asset Tag,
Server Installation Date) are explicitly flagged rather than silently left
blank. This turns a data-quality problem into a visible, discussable gap —
deliberately giving stakeholders something concrete to react to about
their own process maturity.

### 8. Agentic Fill Simulation
A step-through simulation of how an agentic pipeline would actually
populate a category: each step represents one source's agent, showing
what triggers it (the input — e.g. "API call to MSP ITSM, 4-hour SLA") and
what it produces (the output — the specific fields it resolves). A
stepper across the top lets you jump to any agent directly; Previous
step / Next step / Back to details controls sit together at the top of
the page for quick walkthroughs. This demonstrates the *mechanics* of
multi-agent data collection, not just the end result.

### 9. Document-Grounded Extraction
Some steps aren't just an API call — they're an agent reading an actual
document. The **Asset Register Agent** and **OEM Support-Portal Agent**
steps (Asset & Infrastructure Details, Core Banking System) link to a
real AMC/ATS purchase order (`BOB_PO_CBSPRDDB01_AMC.pdf`, transcribed as
sample data). Clicking it expands the document inline, in the same
window, directly below the step's Input/Output panels.

Every value the *active step* actually extracts gets a colored bounding
box in the document, and the matching output-table row gets a box in the
exact same color — so a field pulled from one sentence (e.g. the
document's "Reference" line yields both `PO No Purchase` and
`PO No Purchase Date`) visibly shares one color across both. Fields the
current step doesn't use stay plain text, so the highlight never gets
noisier than the step you're looking at — switching steps recomputes the
highlight set, and the panel automatically closes if you navigate to a
step the document isn't relevant to.

### 10. Consolidation & Validation
A final "merge" step reconciles all the upstream agents' outputs into one
record and reports resolution coverage (e.g. "52 of 56 fields resolved"),
while surfacing any fields still unresolved. This models the
reconciliation/validation stage a real agentic system would need — where
conflicting or missing data gets caught before the record is considered
complete.

### 11. Bank-Branded Presentation
The entire experience is skinned in Bank of Baroda's identity (logo mark,
brand colors) rather than generic tooling chrome — reinforcing that this
is a proposal for the bank's own internal system, not a third-party
product demo.

**Net effect**: the app doesn't just display filled-in data — it
demonstrates the *provenance*, *ownership*, *speed*, *documentary
evidence*, and *gaps* behind each piece of data, which is the material a
customer needs to start reasoning about what implementing this for real
would actually take.

---

## Category → Fields

**1. Application Details** *(filled by: Application Discovery Agent, from
CMDB / Application Inventory)*

Application ID · Application Name · Application Category · Application
Purpose · Application AD ID Integration Status · Application URL ·
Application Status · Application Go-live Date · Application OEM Name ·
Application Version · Internet Facing (Yes/No) · Criticality ·
Application Managed By (Deptt Name) · Risk Classification · Application
Team Type (Projects/Operations) · Remarks

**2. Asset & Infrastructure Details** *(filled by 5 separate agents — see
mapping below)*

56 fields covering host identity, OS/hardware specs, EOSL dates,
ownership, location, asset/PO/warranty records, AMC/contract data, and
onboarding flags. Full list in the mapping table below.

**3. Application Owner Information** *(filled by: Identity & Ownership
Agent, from Active Directory / HRMS)*

Application Team's Info (Name, Contact No. & email ID) · then for each of
three roles — **Chief Manager, Assistant General Manager, General
Manager** — a repeating block of: Name · AD-ID · Mobile No · email ID
(13 fields total)

**4. Business Owner Information** *(filled by: Identity & Ownership
Agent, from HRMS / Org Directory)*

Same repeating pattern for Chief Manager and Assistant General Manager
(Name/AD-ID/Mobile/email), plus General Manager Name, Business Owner
Department Name, and Business Owner Department Location (Office/ZO, City
& State) (11 fields)

**5. Hosting Environment** *(filled by: Hosting & DR Agent, from Infra
CMDB / DR Runbook)*

Hosting Type · Hosting Provider · Hosting Locality (Domestic/Overseas) ·
Hosting Location (DC) · Hosting Location (DR) · DR Setup Readiness as per
BCP Policy (Yes/No/NA) · Last BCP Drill Date · RTO (in Minutes) · RPO (in
Minutes)

**6. Details of Initial Procurement** *(filled by: Vendor & Contracts
Agent, from Procurement System / SAP Ariba)*

System Integrator/Vendor/Service Provider Name · Support Team Leader's
Name · Support Team Leader Mobile No/Contact No · Support Team Leader
email ID · PO Number · PO Date · Support Start Date · Support End Date

**7. Details of Current ATS** *(filled by: Vendor & Contracts Agent, from
Vendor Management System)*

Same 8 fields as Initial Procurement, plus ATS Current Status

---

## Field → Source Mapping (Asset & Infrastructure Details)

This is the category built directly from the bank's sourcing sheet — every
field tagged to the team/system that owns it. In the UI, the Source Legend
lists these same five groups (plus "No Source Mapped"), color-matched to
the field rows, and clicking one filters the table to just that group.

**Automation** (15 fields) — discovered via CMDB agent / SNMP /
SCCM-Ansible scan

Host Name · IP Address · Asset Type · OS Description · Version · Serial #
· OEM · Model · CPU Details · Memory Size (GB) · HDD Size (GB) · Number Of
CPU · Total Core · Location · Global Id

**MSP** (19 fields) — pulled from MSP's ITSM/CMDB via API

App ID · Hosted Application/Software · Sub App ID · Sub App Name · Tier ·
Production/UAT · Application Owner - CM · CM_AD ID · Application Owner -
AGM · AGM_AD ID · Asset Owner · Maintenance Mode · Internet Facing (Y/N) ·
Security Risk Classification · Criticality · Pim Onboarding Status · DSA
Onboarding Status · BOB_CommissionedRFC/SR · EOSL Last update

**Asset Team** (9 fields) — looked up in SAP Fixed Assets by serial number

OS License Managed By · OS Cluster Status · Asset Tag · Asset Code ·
Purchase Cost · PO No Purchase · PO No Purchase Date · Warranty Start Date
· Warranty End Date

**OEM** (3 fields) — queried from OEM support/warranty portal

AMC PO · AMC PO Date · Contract End Date

**Inspection Team** (6 fields) — manual on-site verification, ~6-day
turnaround

OS EOSL Date · Operating System EOSL Declared · Hardware EOSL Date ·
Hardware EOSL Declared · Servers Managed By · Sub Location

**No Source Mapped** (4 fields) — the process gap

Asset Row Location · Rack's Asset Tag · Server Installation Date · Last
Discovery Date

---

## Source Document: AMC Purchase Order

The Core Banking System's host (`CBSPRDDB01`) has a real supporting
document — `BOB_PO_CBSPRDDB01_AMC.pdf`, an Annual Maintenance Contract
purchase order from vendor Vantex Technologies. It's linked from two
steps in the agentic-flow simulator, each highlighting only what that
step actually pulls from it:

| Document line | Feeds output field(s) | Visible from step |
|---|---|---|
| AMC PO No. | `AMC PO` | OEM Support-Portal Agent |
| AMC PO Date | `AMC PO Date` | OEM Support-Portal Agent |
| Support End Date / Contract End Date | `Contract End Date` | OEM Support-Portal Agent |
| Reference (original PO) | `PO No Purchase`, `PO No Purchase Date` | Asset Register Agent |

The hardware identity fields (OEM: Vantex Technologies, Model: VX-9480-4S,
Serial No: VX9480-CN23A0417, Asset Type: Server — Rack Mount, 4U) and the
original-purchase timeline were reconciled to match this document: the
asset's 3-year warranty (20-Oct-2023 to 19-Oct-2026) runs right up to the
day before the AMC contract begins (20-Oct-2026) — a clean, believable
coverage handoff rather than a gap.

The document can also be opened standalone at `/documents/:docId`, shown
plain (no highlights) — the color-coded extraction view is specific to
viewing it from within a flow step.

---

### Note on the two demo applications

Core Banking System (host `CBSPRDDB01`) has all 56 fields fully resolved
except the 4 unmapped ones (43/47 automatable fields filled), with the
AMC/procurement fields backed by an actual source document. UPI Payment
Gateway (host `UPIGWPRD03`) is deliberately left partway through —
Automation, MSP, Asset Team, and OEM fields are filled, but the Inspection
Team's fields (EOSL dates, Servers Managed By, Sub Location) are still
blank, showing what an in-flight agent run looks like versus a completed
one.

---

## Architecture Notes

- **Backend**: FastAPI + SQLAlchemy + JWT, unchanged from the original
  scaffold — `POST /auth/signup`, `POST /auth/login`,
  `POST`/`GET /forms`.
- **Frontend**: React + Vite + React Router.
- **Real vs. mock**: auth, JWT storage, routing, and all UI/CSS are real.
  Every application/category/field/source/document value currently lives
  in static JS files (`applications.js`, `sources.js`, `documents.js`,
  `fieldColors.js`) — nothing is fetched from the backend yet.

### Routes

| Path | Page |
|---|---|
| `/login`, `/signup` | Auth |
| `/workspace` | Landing page — counts of applications/categories/filled |
| `/workspace/:appId/:categoryId` | Category details (table + legend) |
| `/workspace/:appId/:categoryId/flow` | Agentic flow simulator |
| `/documents/:docId` | Standalone document viewer (plain, no highlights) |
| `/settings` | Placeholder settings page |
| `/form` | The original single-form page (kept, unused in the new flow) |

**Natural next step**: replace the mock data files with real API calls
(e.g. `GET /applications`, `GET /applications/:id/categories/:categoryId`)
once there's a backend model and agent pipeline to back them.
