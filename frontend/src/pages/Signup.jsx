import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/signup', { email, password })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed')
    }
  }

  return (
    <div className="auth-page">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create account</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p>Account created, redirecting to login...</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
