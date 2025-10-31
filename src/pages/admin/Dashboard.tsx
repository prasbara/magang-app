import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

type Applicant = {
  id: string
  fullName: string
  phone: string
  university: string
  major: string
  semester: string
  status: string
  createdAt: string
  cv: string
  letter: string
  idCard?: string
}

const DUMMY_DATA: Applicant[] = [
  {
    id: '1',
    fullName: 'Budi Santoso',
    phone: '081234567890',
    university: 'Universitas Indonesia',
    major: 'Teknik Informatika',
    semester: '6',
    status: 'Menunggu',
    createdAt: '2025-10-31',
    cv: '/uploads/cv-1.pdf',
    letter: '/uploads/letter-1.pdf'
  },
  {
    id: '2',
    fullName: 'Siti Rahayu',
    phone: '081298765432',
    university: 'Institut Teknologi Bandung',
    major: 'Teknik Elektro',
    semester: '5',
    status: 'Dalam Proses',
    createdAt: '2025-10-30',
    cv: '/uploads/cv-2.pdf',
    letter: '/uploads/letter-2.pdf',
    idCard: '/uploads/id-2.pdf'
  },
  {
    id: '3',
    fullName: 'Ahmad Hidayat',
    phone: '087812345678',
    university: 'Universitas Gadjah Mada',
    major: 'Ilmu Komputer',
    semester: '7',
    status: 'Diterima',
    createdAt: '2025-10-29',
    cv: '/uploads/cv-3.pdf',
    letter: '/uploads/letter-3.pdf'
  },
  {
    id: '4',
    fullName: 'Dewi Lestari',
    phone: '089876543210',
    university: 'Universitas Brawijaya',
    major: 'Sistem Informasi',
    semester: '4',
    status: 'Ditolak',
    createdAt: '2025-10-28',
    cv: '/uploads/cv-4.pdf',
    letter: '/uploads/letter-4.pdf',
    idCard: '/uploads/id-4.pdf'
  },
  {
    id: '5',
    fullName: 'Rudi Hartono',
    phone: '082187654321',
    university: 'Universitas Diponegoro',
    major: 'Teknik Komputer',
    semester: '6',
    status: 'Menunggu',
    createdAt: '2025-10-31',
    cv: '/uploads/cv-5.pdf',
    letter: '/uploads/letter-5.pdf'
  }
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ university: '', status: '' })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    setTimeout(() => {
      setApplicants(DUMMY_DATA)
      setLoading(false)
    }, 1000)
  }, [navigate])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // TODO: Replace with actual API call
      setApplicants(applicants.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ))
      toast({
        title: 'Status Updated',
        description: 'Status pendaftar berhasil diperbarui.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal memperbarui status.',
        variant: 'destructive',
      })
    }
  }

  const filteredApplicants = applicants.filter(app => {
    const matchUniversity = filter.university 
      ? app.university.toLowerCase().includes(filter.university.toLowerCase())
      : true
    const matchStatus = filter.status 
      ? app.status === filter.status
      : true
    return matchUniversity && matchStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-800'
      case 'Dalam Proses':
        return 'bg-blue-100 text-blue-800'
      case 'Diterima':
        return 'bg-green-100 text-green-800'
      case 'Ditolak':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Statistik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Total Pendaftar</div>
                <div className="text-2xl font-bold">{applicants.length}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Menunggu</div>
                <div className="text-2xl font-bold">
                  {applicants.filter(a => a.status === 'Menunggu').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Diterima</div>
                <div className="text-2xl font-bold text-green-600">
                  {applicants.filter(a => a.status === 'Diterima').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Ditolak</div>
                <div className="text-2xl font-bold text-red-600">
                  {applicants.filter(a => a.status === 'Ditolak').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Pendaftar</CardTitle>
            <div className="flex gap-4">
              <Input
                placeholder="Filter kampus..."
                value={filter.university}
                onChange={(e) => setFilter({ ...filter, university: e.target.value })}
                className="max-w-[200px]"
              />
              <Select 
                value={filter.status}
                onValueChange={(value) => setFilter({ ...filter, status: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Status</SelectItem>
                  <SelectItem value="Menunggu">Menunggu</SelectItem>
                  <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                  <SelectItem value="Diterima">Diterima</SelectItem>
                  <SelectItem value="Ditolak">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Nama</th>
                      <th className="py-3 px-4 text-left">Kampus</th>
                      <th className="py-3 px-4 text-left">Prodi</th>
                      <th className="py-3 px-4 text-left">Tanggal Daftar</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Berkas</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants.map((applicant) => (
                      <tr key={applicant.id} className="border-b">
                        <td className="py-3 px-4">{applicant.fullName}</td>
                        <td className="py-3 px-4">{applicant.university}</td>
                        <td className="py-3 px-4">{applicant.major}</td>
                        <td className="py-3 px-4">
                          {new Date(applicant.createdAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(applicant.status)}`}>
                            {applicant.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <a 
                              href={applicant.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              CV
                            </a>
                            <a 
                              href={applicant.letter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Surat
                            </a>
                            {applicant.idCard && (
                              <a 
                                href={applicant.idCard}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                KTP/KTM
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={applicant.status}
                            onValueChange={(value) => handleStatusChange(applicant.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Menunggu">Menunggu</SelectItem>
                              <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                              <SelectItem value="Diterima">Diterima</SelectItem>
                              <SelectItem value="Ditolak">Ditolak</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}