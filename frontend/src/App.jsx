import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import FormPage from './pages/FormPage.jsx'

function isAuthenticated() {
  return Boolean(localStorage.getItem('token'))
}

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/form"
        element={
          <PrivateRoute>
            <FormPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated() ? '/form' : '/login'} replace />} />
    </Routes>
  )
}
