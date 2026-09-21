// Stylized placeholder inspired by Bank of Baroda's "Baroda Sun" mark
// (radiating sun in brand orange). Swap for the official logo asset before
// this ships anywhere customer-facing.
export default function BobLogo({ withWordmark = true }) {
  return (
    <span className="bob-logo">
      <svg className="bob-logo-mark" width="34" height="34" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="8.5" fill="var(--bob-orange)" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const innerR = 11.5
          const outerR = i % 2 === 0 ? 19 : 16.5
          const x1 = 20 + innerR * Math.cos(angle)
          const y1 = 20 + innerR * Math.sin(angle)
          const x2 = 20 + outerR * Math.cos(angle)
          const y2 = 20 + outerR * Math.sin(angle)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--bob-orange)"
              strokeWidth="3.1"
              strokeLinecap="round"
            />
          )
        })}
      </svg>
      {withWordmark && (
        <span className="bob-logo-wordmark">
          <span className="bob-logo-wordmark-main">Bank of Baroda</span>
          <span className="bob-logo-wordmark-sub">AgenticOps</span>
        </span>
      )}
    </span>
  )
}
