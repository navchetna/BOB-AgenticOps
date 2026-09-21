import BobLogo from '../layout/BobLogo.jsx'

// Renders a document's fields as a letter-style layout. Only rows present
// in `colorByRowId` get a colored "bounding box" around their value — a
// stand-in for what a field-extraction agent would draw over a scanned
// document — so the highlight only ever shows what the active step
// actually pulled from this page. Everything else stays plain text.
function Value({ value, color }) {
  if (!color) return value
  return (
    <span className="doc-field-box" style={{ borderColor: color, background: `${color}1a`, color }}>
      {value}
    </span>
  )
}

export default function DocumentPreview({ doc, colorByRowId = {} }) {
  const headerRows = [
    { id: 'poNumber', label: 'AMC PO No.', value: doc.poNumber },
    { id: 'poDate', label: 'AMC PO Date', value: doc.poDate },
    { id: 'reference', label: 'Reference', value: doc.reference },
    { id: 'application', label: 'Application', value: doc.application },
  ]
  const vendorRows = [
    { id: 'vendorName', label: 'Vendor / Service Provider Name', value: doc.vendor.name },
    { id: 'vendorAddress', label: 'Address', value: doc.vendor.address },
    { id: 'vendorGstin', label: 'GSTIN', value: doc.vendor.gstin },
    { id: 'supportLeaderName', label: "Support Team Leader's Name", value: doc.vendor.supportLeaderName },
    { id: 'supportLeaderMobile', label: 'Support Team Leader Mobile No.', value: doc.vendor.supportLeaderMobile },
    { id: 'supportLeaderEmail', label: 'Support Team Leader Email ID', value: doc.vendor.supportLeaderEmail },
  ]
  const assetRows = [
    { id: 'hostName', label: 'Host Name', value: doc.asset.hostName },
    { id: 'assetType', label: 'Asset Type', value: doc.asset.assetType },
    { id: 'oemModel', label: 'OEM / Model', value: doc.asset.oemModel },
    { id: 'serialNo', label: 'Serial No.', value: doc.asset.serialNo },
    { id: 'assetLocation', label: 'Location', value: doc.asset.location },
  ]
  const scopeRows = [
    { id: 'scopeDescription', label: 'Description', value: doc.scope.description },
    { id: 'scopePeriod', label: 'Period', value: doc.scope.period },
    { id: 'scopeAmount', label: 'Amount', value: doc.scope.amount },
    { id: 'scopeGst', label: 'GST', value: doc.scope.gst },
    { id: 'scopeTotal', label: 'Total AMC Value (incl. GST)', value: doc.scope.total },
  ]
  const contractRows = [
    { id: 'supportStartDate', label: 'Support Start Date', value: doc.contract.supportStartDate },
    { id: 'contractEndDate', label: 'Support End Date / Contract End Date', value: doc.contract.contractEndDate },
    { id: 'contractType', label: 'Contract Type', value: doc.contract.contractType },
    { id: 'paymentTerms', label: 'Payment Terms', value: doc.contract.paymentTerms },
    { id: 'sla', label: 'SLA', value: doc.contract.sla },
  ]

  function renderRows(rows) {
    return rows.map((row) => (
      <tr key={row.id}>
        <td>{row.label}</td>
        <td>
          <Value value={row.value} color={colorByRowId[row.id]} />
        </td>
      </tr>
    ))
  }

  return (
    <div className="doc-letter">
      <div className="doc-letter-head">
        <div className="doc-letter-brand">
          <BobLogo withWordmark={false} />
          <span className="doc-letter-brand-name">Bank of Baroda</span>
        </div>
        <div className="doc-letter-brand-meta">
          <div>Information Technology — Procurement Department</div>
          <div>Baroda Sun Tower, C-34, G Block, Bandra Kurla Complex, Mumbai — 400051</div>
        </div>
      </div>

      <h1 className="doc-letter-title">{doc.docType}</h1>

      <table className="doc-letter-kv">
        <tbody>{renderRows(headerRows)}</tbody>
      </table>

      <h2 className="doc-letter-section">1. Service Provider (OEM)</h2>
      <table className="doc-letter-kv">
        <tbody>{renderRows(vendorRows)}</tbody>
      </table>

      <h2 className="doc-letter-section">2. Covered Asset</h2>
      <table className="doc-letter-kv">
        <tbody>{renderRows(assetRows)}</tbody>
      </table>

      <h2 className="doc-letter-section">3. AMC Scope and Charges</h2>
      <table className="doc-letter-kv">
        <tbody>{renderRows(scopeRows)}</tbody>
      </table>
      <p className="doc-letter-words">Amount in words: {doc.scope.totalWords} Only.</p>

      <h2 className="doc-letter-section">4. Contract Period</h2>
      <table className="doc-letter-kv">
        <tbody>{renderRows(contractRows)}</tbody>
      </table>

      <div className="doc-letter-signoff">
        <div>
          <div className="doc-letter-signoff-label">For Bank of Baroda</div>
          <div>Authorised Signatory</div>
          <div>{doc.signatory.bank}</div>
        </div>
        <div>
          <div className="doc-letter-signoff-label">Accepted for</div>
          <div>{doc.signatory.vendorAccepted}</div>
          <div>Authorised Signatory</div>
        </div>
      </div>

      <p className="doc-letter-disclaimer">{doc.disclaimer}</p>
    </div>
  )
}
