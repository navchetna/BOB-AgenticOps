// Source documents an agent would actually ingest — referenced from the
// agentic-flow demo's Input panels so a step isn't just "an API call", it's
// grounded in a real piece of paperwork the bank already has. Content below
// is transcribed from a sample AMC/ATS purchase order supplied for this
// demo (fictitious data, not a real contract).

export const DOCUMENTS = {
  'amc-po-cbsprddb01': {
    id: 'amc-po-cbsprddb01',
    filename: 'BOB_PO_CBSPRDDB01_AMC.pdf',
    title: 'AMC Purchase Order — CBSPRDDB01',
    docType: 'Purchase Order — Annual Maintenance Contract (AMC / ATS)',
    poNumber: 'BOB/IT/AMC/2026-27/0312',
    poDate: '25-Aug-2026',
    reference:
      'Original Purchase Order BOB/IT/PROC/2023-24/0847 dated 14-Aug-2023; OEM Quotation VTX/AMC/26-27/1184 dated 10-Aug-2026',
    application: 'Core Banking System (CBS) — Production Database Tier (Application ID: APP-CBS-001)',
    vendor: {
      name: 'Vantex Technologies India Pvt. Ltd.',
      address: 'Plot 22, Electronic City Phase 1, Bengaluru - 560100',
      gstin: '29AABCV7788L1Z3',
      supportLeaderName: 'Anitha Ramachandran',
      supportLeaderMobile: '+91 98450 12345',
      supportLeaderEmail: 'anitha.r@vantex.example',
    },
    asset: {
      hostName: 'CBSPRDDB01',
      assetType: 'Server — Rack Mount, 4U',
      oemModel: 'Vantex / VX-9480-4S',
      serialNo: 'VX9480-CN23A0417',
      location: 'Bank of Baroda Primary Data Centre, Navi Mumbai — Hall 2, Row C',
    },
    scope: {
      description:
        'Comprehensive on-site AMC: 24x7, 4-hour response, parts replacement, firmware and patch support',
      period: '20-Oct-2026 to 19-Oct-2029 (3 years)',
      amount: 'INR 13,50,000.00',
      gst: 'INR 2,43,000.00 (18% — CGST 9% + SGST 9%)',
      total: 'INR 15,93,000.00',
      totalWords: 'Rupees Fifteen Lakh Ninety-Three Thousand',
    },
    contract: {
      supportStartDate: '20-Oct-2026',
      contractEndDate: '19-Oct-2029',
      contractType: 'Annual Technical Support (ATS) — billed annually, INR 4,50,000.00 + GST per year',
      paymentTerms: 'Annual in advance; payable within 30 days of invoice',
      sla: 'Availability 99.9% per quarter; penalty as per Annexure of RFP No. BOB/IT/RFP/2023-24/112',
    },
    signatory: {
      bank: 'Suresh Kulkarni, Chief Manager (IT Procurement)',
      vendorAccepted: 'Vantex Technologies India Pvt. Ltd.',
    },
    disclaimer: 'Sample document — fictitious data prepared for BOB AgenticOps demonstration only. Not a valid purchase order.',
    // Maps a row in this document (by id, see DocumentPreview.jsx) to the
    // output field name(s) an agent would extract from it. Only fields
    // listed here ever get a bounding box — everything else in the
    // document stays plain, so the highlight only ever shows what the
    // active step actually pulled from this page.
    fieldMap: {
      poNumber: ['AMC PO'],
      poDate: ['AMC PO Date'],
      contractEndDate: ['Contract End Date'],
      reference: ['PO No Purchase', 'PO No Purchase Date'],
    },
  },
}

export function findDocument(docId) {
  return DOCUMENTS[docId] || null
}
