import { NavLink, useNavigate } from 'react-router-dom'
import BobLogo from './BobLogo.jsx'
import { LogoutIcon, SettingsIcon } from './icons.jsx'

export default function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="app-navbar">
      <div className="app-navbar-brand">
        <BobLogo />
      </div>
      <nav className="app-navbar-actions">
        <NavLink
          to="/settings"
          className={({ isActive }) => `app-navbar-link${isActive ? ' is-active' : ''}`}
        >
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
        <button type="button" className="app-navbar-link app-navbar-logout" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </nav>
    </header>
  )
}
