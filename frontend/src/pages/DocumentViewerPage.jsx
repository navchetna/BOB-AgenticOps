import { useParams } from 'react-router-dom'
import { findDocument } from '../data/documents.js'
import BobLogo from '../layout/BobLogo.jsx'
import DocumentPreview from './DocumentPreview.jsx'

export default function DocumentViewerPage() {
  const { docId } = useParams()
  const doc = findDocument(docId)

  if (!doc) {
    return <p className="details-empty">Document not found.</p>
  }

  return (
    <div className="doc-viewer-shell">
      <div className="doc-viewer-toolbar">
        <BobLogo withWordmark={false} />
        <span className="doc-viewer-toolbar-title">{doc.filename}</span>
        <button type="button" className="btn-secondary" onClick={() => window.close()}>
          Close
        </button>
      </div>

      <DocumentPreview doc={doc} />
    </div>
  )
}
