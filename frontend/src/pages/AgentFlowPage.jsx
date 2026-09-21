import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findCategory } from '../data/applications.js'
import { findDocument } from '../data/documents.js'
import { buildExtractionColors } from '../data/fieldColors.js'
import { SOURCE_ORDER, SOURCES } from '../data/sources.js'
import { DocumentIcon } from '../layout/icons.jsx'
import DocumentPreview from './DocumentPreview.jsx'

function buildSteps(category) {
  const sourceSteps = SOURCE_ORDER.map((id) => ({
    kind: 'source',
    id,
    source: SOURCES[id],
    outputFields: category.fields.filter((f) => f.source === id),
    documents: (category.documents || []).filter((d) => d.appliesTo.includes(id)),
  })).filter((step) => step.outputFields.length > 0)

  const unmapped = category.fields.filter((f) => f.source === 'unmapped' || !f.source)
  const resolved = category.fields.filter((f) => f.value).length

  sourceSteps.push({
    kind: 'merge',
    id: 'merge',
    source: null,
    outputFields: [],
    unmapped,
    resolved,
    total: category.fields.length,
  })

  return sourceSteps
}

export default function AgentFlowPage() {
  const { appId, categoryId } = useParams()
  const match = findCategory(appId, categoryId)
  const [activeIndex, setActiveIndex] = useState(0)
  const [openDocId, setOpenDocId] = useState(null)

  const steps = useMemo(() => (match ? buildSteps(match.category) : []), [match])

  if (!match) {
    return <p className="details-empty">Nothing to simulate — pick a category first.</p>
  }

  const { application, category } = match
  const step = steps[activeIndex]

  // The doc panel only stays visible while it's actually one of the
  // documents listed for the step being viewed — otherwise switching steps
  // would leave a highlighted document open with nothing left to highlight.
  const isDocApplicable = step.kind === 'source' && step.documents.some((d) => d.id === openDocId)
  const openDoc = isDocApplicable ? findDocument(openDocId) : null
  const extractionColors = openDoc ? buildExtractionColors(openDoc, step.outputFields) : null

  function toggleDoc(docId) {
    setOpenDocId((current) => (current === docId ? null : docId))
  }

  return (
    <div className="flow-page">
      <div className="flow-header">
        <div>
          <div className="details-breadcrumb">
            {application.label} / {category.label}
          </div>
          <h1 className="details-title">Agentic Fill — Simulated Run</h1>
        </div>
        <div className="flow-header-actions">
          <button
            type="button"
            className="btn-secondary"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          >
            Previous step
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={activeIndex === steps.length - 1}
            onClick={() => setActiveIndex((i) => Math.min(steps.length - 1, i + 1))}
          >
            Next step
          </button>
          <Link className="btn-secondary" to={`/workspace/${appId}/${categoryId}`}>
            Back to details
          </Link>
        </div>
      </div>

      <div className="flow-stepper">
        {steps.map((s, i) => {
          const label = s.kind === 'merge' ? 'Merge & Validate' : s.source.agent
          const color = s.kind === 'merge' ? 'var(--bob-maroon)' : s.source.color
          return (
            <button
              key={s.id}
              type="button"
              className={`flow-step${i === activeIndex ? ' is-active' : ''}${i < activeIndex ? ' is-done' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="flow-step-index" style={{ borderColor: color, color }}>
                {i < activeIndex ? '✓' : i + 1}
              </span>
              <span className="flow-step-label">{label}</span>
            </button>
          )
        })}
      </div>

      {step.kind === 'source' ? (
        <SourceStep
          step={step}
          openDocId={openDocId}
          onToggleDoc={toggleDoc}
          fieldColors={extractionColors?.byFieldName || {}}
        />
      ) : (
        <MergeStep step={step} />
      )}

      {openDoc && (
        <div className="flow-document-preview">
          <div className="flow-document-preview-header">
            <DocumentIcon />
            <span>
              Extracted fields from <strong>{openDoc.filename}</strong> — matching colors on the left link each
              box to the output field it fills.
            </span>
            <button type="button" className="btn-secondary" onClick={() => setOpenDocId(null)}>
              Close
            </button>
          </div>
          <DocumentPreview doc={openDoc} colorByRowId={extractionColors?.byRowId || {}} />
        </div>
      )}
    </div>
  )
}

function SourceStep({ step, openDocId, onToggleDoc, fieldColors }) {
  const { source, outputFields, documents } = step
  return (
    <div className="flow-grid">
      <div className="flow-panel">
        <div className="flow-panel-head">
          <span className="source-dot" style={{ background: source.color }} />
          <h2>Input</h2>
        </div>
        <p className="flow-panel-desc">{source.description}</p>
        <ul className="flow-list">
          {source.input.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {documents.length > 0 && (
          <div className="flow-documents">
            <h3 className="flow-documents-title">Source Documents</h3>
            {documents.map((doc) => (
              <button
                key={doc.id}
                type="button"
                className={`flow-document-link${openDocId === doc.id ? ' is-open' : ''}`}
                onClick={() => onToggleDoc(doc.id)}
              >
                <DocumentIcon />
                <span>{doc.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flow-panel" style={{ background: source.bg }}>
        <div className="flow-panel-head">
          <span className="source-dot" style={{ background: source.color }} />
          <h2>Output — {outputFields.length} field{outputFields.length === 1 ? '' : 's'}</h2>
        </div>
        <table className="details-table flow-output-table">
          <tbody>
            {outputFields.map((f) => {
              const color = fieldColors[f.name]
              return (
                <tr key={f.name}>
                  <td>{f.name}</td>
                  <td>
                    {f.value ? (
                      color ? (
                        <span className="doc-field-box" style={{ borderColor: color, background: `${color}1a`, color }}>
                          {f.value}
                        </span>
                      ) : (
                        f.value
                      )
                    ) : (
                      <span className="details-empty-value">not yet resolved</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="flow-note">{source.note}</p>
      </div>
    </div>
  )
}

function MergeStep({ step }) {
  const { unmapped, resolved, total } = step
  return (
    <div className="flow-grid">
      <div className="flow-panel">
        <div className="flow-panel-head">
          <h2>Input</h2>
        </div>
        <p className="flow-panel-desc">
          The outputs of all upstream agents — {SOURCE_ORDER.map((id) => SOURCES[id].label).join(', ')} —
          are reconciled into a single record for this category.
        </p>
        <ul className="flow-list">
          {SOURCE_ORDER.map((id) => (
            <li key={id}>
              <span className="source-dot" style={{ background: SOURCES[id].color }} /> {SOURCES[id].label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flow-panel">
        <div className="flow-panel-head">
          <h2>Output — Consolidated Record</h2>
        </div>
        <p className="flow-panel-desc">
          <strong>
            {resolved} of {total}
          </strong>{' '}
          fields resolved across all sources.
        </p>
        {unmapped.length > 0 && (
          <div className="flow-gap-callout">
            <h3>Fields with no owning source — process gap</h3>
            <p>
              Nobody currently fills these automatically. In a live rollout, this is exactly the kind of gap an
              agent (or a clearer ownership rule) should close.
            </p>
            <ul>
              {unmapped.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
