import { applications } from '../data/applications.js'

export default function WorkspaceHome() {
  const allCategories = applications.flatMap((a) => a.categories)
  const filled = allCategories.filter((c) => c.status === 'filled').length

  return (
    <div className="details-page">
      <h1 className="details-title">Application Onboarding Workspace</h1>
      <p>
        Select an application in the explorer, then a category, to review the information agents
        have gathered for it. Each category is filled from a different system of record —
        application inventory, HR directory, hosting CMDB, or the procurement system — by the
        agent responsible for it.
      </p>
      <div className="details-meta">
        <div>
          <span className="details-meta-label">Applications</span>
          <span>{applications.length}</span>
        </div>
        <div>
          <span className="details-meta-label">Categories</span>
          <span>{allCategories.length}</span>
        </div>
        <div>
          <span className="details-meta-label">Filled</span>
          <span>
            {filled} / {allCategories.length}
          </span>
        </div>
      </div>
    </div>
  )
}
