import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findCategory } from '../data/applications.js'
import { SOURCE_ORDER, SOURCES } from '../data/sources.js'

const statusLabel = {
  filled: 'Filled',
  'needs-review': 'Needs review',
  pending: 'Pending',
}

function formatDate(iso) {
  if (!iso) return 'Not yet run'
  return new Date(iso).toLocaleString()
}

export default function DetailsPage() {
  const { appId, categoryId } = useParams()
  const match = findCategory(appId, categoryId)
  const [filterSource, setFilterSource] = useState(null)

  useEffect(() => {
    setFilterSource(null)
  }, [appId, categoryId])

  if (!match) {
    return <p className="details-empty">Select a category from the explorer to see its details.</p>
  }

  const { application, category } = match
  const hasSources = category.fields.some((f) => f.source)
  const legendIds = hasSources
    ? [...SOURCE_ORDER, 'unmapped'].filter((id) => category.fields.some((f) => f.source === id))
    : []
  const visibleFields = filterSource ? category.fields.filter((f) => f.source === filterSource) : category.fields

  function toggleFilter(id) {
    setFilterSource((current) => (current === id ? null : id))
  }

  return (
    <div className={hasSources ? 'details-page details-page-wide' : 'details-page'}>
      <div className="details-header">
        <div>
          <div className="details-breadcrumb">{application.label}</div>
          <h1 className="details-title">{category.label}</h1>
        </div>
        <div className="details-header-actions">
          <span className={`badge badge-${category.status}`}>{statusLabel[category.status]}</span>
          {hasSources && (
            <Link className="btn-primary" to={`/workspace/${appId}/${categoryId}/flow`}>
              Simulate Agent Flow
            </Link>
          )}
        </div>
      </div>

      <div className="details-meta">
        <div>
          <span className="details-meta-label">Source</span>
          <span>{category.source}</span>
        </div>
        <div>
          <span className="details-meta-label">Filled by</span>
          <span>{category.agent}</span>
        </div>
        <div>
          <span className="details-meta-label">Last updated</span>
          <span>{formatDate(category.updatedAt)}</span>
        </div>
      </div>

      <div className={hasSources ? 'details-body-split' : undefined}>
        <div className="details-body-fields">
          <h2 className="details-section-title">
            Fields
            {filterSource && (
              <button type="button" className="filter-clear" onClick={() => setFilterSource(null)}>
                Filtered by {SOURCES[filterSource].label} — click to clear
              </button>
            )}
          </h2>
          {category.fields.length === 0 ? (
            <p className="details-empty">No data collected for this category yet.</p>
          ) : (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Field Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {visibleFields.map((field) => {
                  const src = field.source ? SOURCES[field.source] : null
                  return (
                    <tr key={field.name} style={src ? { background: src.bg } : undefined}>
                      <td>
                        {src && <span className="source-dot" style={{ background: src.color }} />}
                        {field.name}
                      </td>
                      <td>{field.value || <span className="details-empty-value">missing</span>}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {hasSources && (
          <aside className="properties-panel">
            <h2 className="details-section-title properties-panel-title">Source Legend</h2>
            {legendIds.map((id) => {
              const src = SOURCES[id]
              const count = category.fields.filter((f) => f.source === id).length
              const isActive = filterSource === id
              return (
                <button
                  type="button"
                  className={`legend-item${isActive ? ' is-active' : ''}`}
                  style={{ background: src.bg, borderLeftColor: src.color }}
                  key={id}
                  onClick={() => toggleFilter(id)}
                  aria-pressed={isActive}
                >
                  <div className="legend-item-head">
                    <span className="source-dot" style={{ background: src.color }} />
                    <span className="legend-item-label">{src.label}</span>
                    <span className="legend-item-count">{count}</span>
                  </div>
                  <p className="legend-item-desc">{src.description}</p>
                </button>
              )
            })}
          </aside>
        )}
      </div>
    </div>
  )
}
