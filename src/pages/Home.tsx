import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900">
            Portal Pendaftaran Magang
          </h1>
          <p className="text-xl text-gray-600">
            Selamat datang di portal pendaftaran magang. 
            Bergabunglah dengan kami untuk pengalaman pembelajaran yang berharga.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/daftar" 
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-blue-700 transition-all"
            >
              Daftar Sekarang
            </Link>
            <Link 
              to="/peserta" 
              className="inline-flex items-center justify-center rounded-md border border-blue-600 px-8 py-3 text-lg font-medium text-blue-600 hover:bg-blue-50 transition-all"
            >
              Lihat Peserta
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pendaftaran Mudah</h3>
            <p className="text-gray-600">Cukup isi formulir tanpa perlu membuat akun atau email.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Proses Cepat</h3>
            <p className="text-gray-600">Pantau status pendaftaran Anda secara real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Dukungan Penuh</h3>
            <p className="text-gray-600">Tim HR kami siap membantu proses magang Anda.</p>
          </div>
        </div>
      </div>
    </div>
  )
}