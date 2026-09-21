import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { applications } from '../data/applications.js'
import { ChevronIcon, FileIcon, FolderIcon } from './icons.jsx'

const statusDotClass = {
  filled: 'status-dot status-dot-filled',
  'needs-review': 'status-dot status-dot-review',
  pending: 'status-dot status-dot-pending',
}

export default function Sidebar() {
  const { appId, categoryId } = useParams()
  const navigate = useNavigate()
  const [openApps, setOpenApps] = useState(() => new Set(applications.map((a) => a.id)))

  function toggleApp(id) {
    setOpenApps((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-header">Applications</div>
      <div className="app-sidebar-tree">
        {applications.map((application) => {
          const isOpen = openApps.has(application.id)
          return (
            <div key={application.id} className="tree-category">
              <button
                type="button"
                className="tree-node tree-node-folder"
                onClick={() => toggleApp(application.id)}
              >
                <ChevronIcon open={isOpen} />
                <FolderIcon />
                <span className="tree-node-label">{application.label}</span>
              </button>
              {isOpen && (
                <div className="tree-children">
                  {application.categories.map((category) => {
                    const isSelected = appId === application.id && categoryId === category.id
                    return (
                      <button
                        key={category.id}
                        type="button"
                        className={`tree-node tree-node-file${isSelected ? ' is-selected' : ''}`}
                        onClick={() => navigate(`/workspace/${application.id}/${category.id}`)}
                      >
                        <span className={statusDotClass[category.status]} />
                        <FileIcon />
                        <span className="tree-node-label">{category.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
