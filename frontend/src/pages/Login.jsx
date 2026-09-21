import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'
import BobLogo from '../layout/BobLogo.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const form = new URLSearchParams()
      form.set('username', email)
      form.set('password', password)
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('token', data.access_token)
      navigate('/workspace')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page-logo">
        <BobLogo />
      </div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}
