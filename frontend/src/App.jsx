import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import FormPage from './pages/FormPage.jsx'
import WorkspaceHome from './pages/WorkspaceHome.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import AgentFlowPage from './pages/AgentFlowPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import DocumentViewerPage from './pages/DocumentViewerPage.jsx'
import AppLayout from './layout/AppLayout.jsx'

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
        path="/documents/:docId"
        element={
          <PrivateRoute>
            <DocumentViewerPage />
          </PrivateRoute>
        }
      />
      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/workspace" element={<WorkspaceHome />} />
        <Route path="/workspace/:appId/:categoryId" element={<DetailsPage />} />
        <Route path="/workspace/:appId/:categoryId/flow" element={<AgentFlowPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/form" element={<FormPage />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated() ? '/workspace' : '/login'} replace />} />
    </Routes>
  )
}
