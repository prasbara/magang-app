import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import Navbar from './components/Navbar'
import AdminLayout from './components/admin/AdminLayout'
import Register from './pages/Register'
import Applicants from './pages/Applicants'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import Home from './pages/Home'

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }
  return <>{children}</>
}

// Public Route wrapper
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          } />
          <Route path="/daftar" element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          } />
          <Route path="/peserta" element={
            <PublicLayout>
              <Applicants />
            </PublicLayout>
          } />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}