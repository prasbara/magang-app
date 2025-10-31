import { Link } from 'react-router-dom'

export default function Navbar() {
  const isAdmin = localStorage.getItem('adminToken')

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Portal Magang
          </Link>
          <div className="flex gap-6">
            <Link to="/daftar" className="text-gray-600 hover:text-blue-600">
              Daftar
            </Link>
            <Link to="/peserta" className="text-gray-600 hover:text-blue-600">
              Peserta
            </Link>
            {isAdmin ? (
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" className="text-gray-600 hover:text-blue-600">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}