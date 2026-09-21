export default function SettingsPage() {
  return (
    <div className="details-page">
      <h1 className="details-title">Settings</h1>
      <p>Application and agent configuration will live here.</p>
      <div className="settings-group">
        <div className="settings-row">
          <div>
            <div className="settings-row-title">Auto-run agents on new documents</div>
            <div className="settings-row-desc">Automatically fill a category when a new source document arrives.</div>
          </div>
          <input type="checkbox" defaultChecked disabled />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-title">Confidence threshold for auto-approval</div>
            <div className="settings-row-desc">Fields below this confidence are flagged for manual review.</div>
          </div>
          <input type="text" defaultValue="90%" disabled />
        </div>
      </div>
    </div>
  )
}
