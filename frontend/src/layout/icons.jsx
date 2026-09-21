export function ChevronIcon({ open }) {
  return (
    <svg
      className={`icon icon-chevron ${open ? 'is-open' : ''}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path d="M2 1L7 5L2 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FolderIcon() {
  return (
    <svg className="icon" width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 3.5A1 1 0 0 1 2.5 2.5h3.1a1 1 0 0 1 .8.4l.9 1.1h5.2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FileIcon() {
  return (
    <svg className="icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 1.5h5.6l3.4 3.4v9.1a.5.5 0 0 1-.5.5h-8.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M9 1.6V5h3.4" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function SettingsIcon() {
  return (
    <svg className="icon" width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 12.7a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M16.6 12.1a1.4 1.4 0 0 0 .3 1.6l.1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.4 1.4 0 0 0-1.6-.3 1.4 1.4 0 0 0-.9 1.3v.2a1.7 1.7 0 0 1-3.4 0v-.1a1.4 1.4 0 0 0-.9-1.3 1.4 1.4 0 0 0-1.6.3l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.4 1.4 0 0 0 .3-1.6 1.4 1.4 0 0 0-1.3-.9h-.2a1.7 1.7 0 0 1 0-3.4h.1a1.4 1.4 0 0 0 1.3-.9 1.4 1.4 0 0 0-.3-1.6l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.4 1.4 0 0 0 1.6.3h.1a1.4 1.4 0 0 0 .9-1.3v-.2a1.7 1.7 0 0 1 3.4 0v.1a1.4 1.4 0 0 0 .9 1.3 1.4 1.4 0 0 0 1.6-.3l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.4 1.4 0 0 0-.3 1.6v.1a1.4 1.4 0 0 0 1.3.9h.2a1.7 1.7 0 0 1 0 3.4h-.1a1.4 1.4 0 0 0-1.3.9Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function DocumentIcon() {
  return (
    <svg className="icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 1.5h5.6l3.4 3.4v9.1a.5.5 0 0 1-.5.5h-8.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M9 1.6V5h3.4" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M5.2 8.4h5.6M5.2 10.4h5.6M5.2 12.4h3.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function LogoutIcon() {
  return (
    <svg className="icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 17.5h-3a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13 14l4-4-4-4M17 10H7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
