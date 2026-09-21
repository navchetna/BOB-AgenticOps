// Canonical list of "who fills this field" sources, taken from the bank's
// asset-attribute sourcing sheet (Automation / MSP / Asset Team / OEM /
// Inspection Team), plus a synthetic "unmapped" bucket for attributes the
// sheet leaves blank — i.e. fields nobody currently owns.

export const SOURCE_ORDER = ['automation', 'msp', 'asset-team', 'oem', 'inspection-team']

export const SOURCES = {
  automation: {
    id: 'automation',
    label: 'Automation',
    agent: 'Automation Agent',
    color: '#2563eb',
    bg: '#eaf1fd',
    description:
      'Discovered directly from infrastructure via automated scans — CMDB agent, SNMP walk, SCCM/Ansible facts.',
    input: [
      'Trigger: scheduled nightly discovery scan',
      'Tooling: CMDB agent, SNMP walk, Ansible facts',
      'Credentials: read-only service account (svc-discovery)',
    ],
    note: 'Fully automated, no human involvement — but only as good as network reachability and agent coverage.',
  },
  msp: {
    id: 'msp',
    label: 'MSP',
    agent: 'MSP Service-Desk Agent',
    color: '#7c3aed',
    bg: '#f1eafd',
    description:
      "Pulled from the Managed Service Provider's ITSM/CMDB via API, keyed off the host Automation identified.",
    input: [
      'Trigger: API call to MSP ITSM (ServiceNow) app-mapping endpoint',
      'Query key: Global ID from the Automation step',
      'Contractual SLA: 4 business hours response time',
    ],
    note: "Depends on the MSP's own CMDB hygiene — a stale ticket on their side becomes stale data on ours.",
  },
  'asset-team': {
    id: 'asset-team',
    label: 'Asset Team',
    agent: 'Asset Register Agent',
    color: '#0d9488',
    bg: '#e4f6f4',
    description: "Looked up in the bank's fixed-asset register (SAP Fixed Assets) by serial number.",
    input: ['Trigger: asset register lookup by Serial #', 'System of record: SAP Fixed Assets'],
    note: 'A point-in-time snapshot — warranty/PO data is only as current as the last asset audit cycle.',
  },
  oem: {
    id: 'oem',
    label: 'OEM',
    agent: 'OEM Support-Portal Agent',
    color: '#64748b',
    bg: '#eef1f4',
    description: "Queried from the hardware OEM's support/warranty portal using the serial number.",
    input: ['Trigger: query OEM support portal (HPE / Dell / Lenovo) by Serial #'],
    note: 'Several OEM portals rate-limit or return no match — needs manual escalation when that happens.',
  },
  'inspection-team': {
    id: 'inspection-team',
    label: 'Inspection Team',
    agent: 'Physical Inspection Agent (Manual)',
    color: '#d97706',
    bg: '#fdf1e0',
    description: 'Manually verified on-site by the data-centre operations team — not automatable today.',
    input: ['Trigger: inspection checklist assigned to DC ops', 'Typical turnaround: ~6 business days'],
    note: 'The slowest, least reliable step in the pipeline — the clearest automation opportunity in this flow.',
  },
  unmapped: {
    id: 'unmapped',
    label: 'No Source Mapped',
    agent: null,
    color: '#dc2626',
    bg: '#fdeaea',
    description: 'No team or system currently owns filling this field.',
    input: [],
    note: 'A process gap: this falls through unless someone remembers to fill it in by hand.',
  },
}
