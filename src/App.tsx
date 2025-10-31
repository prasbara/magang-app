import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from './components/ui/toaster'
import Navbar from './components/Navbar'

// Lazy load components
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'))
const Register = lazy(() => import('./pages/Register'))
const Applicants = lazy(() => import('./pages/Applicants'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Home = lazy(() => import('./pages/Home'))

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
          <Route path="/admin/login" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>}>
              <AdminLogin />
            </Suspense>
          } />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>}>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </Suspense>
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>}>
                <Home />
              </Suspense>
            </PublicLayout>
          } />
          <Route path="/daftar" element={
            <PublicLayout>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>}>
                <Register />
              </Suspense>
            </PublicLayout>
          } />
          <Route path="/peserta" element={
            <PublicLayout>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>}>
                <Applicants />
              </Suspense>
            </PublicLayout>
          } />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}