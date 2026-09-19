import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function FormPage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function loadSubmissions() {
    try {
      const { data } = await api.get('/forms')
      setSubmissions(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load submissions')
    }
  }

  useEffect(() => {
    loadSubmissions()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api.post('/forms', { full_name: fullName, phone, address, details })
      setFullName('')
      setPhone('')
      setAddress('')
      setDetails('')
      loadSubmissions()
    } catch (err) {
      setError(err.response?.data?.detail || 'Submission failed')
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <h1>Submit details</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}

      <h2>Your submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            {s.full_name} - {s.phone} - {s.address} - {s.details}
          </li>
        ))}
      </ul>
    </div>
  )
}
