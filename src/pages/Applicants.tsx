import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Applicant = {
  id: string
  fullName: string
  university: string
  major: string
  status: 'Menunggu' | 'Dalam Proses' | 'Diterima' | 'Ditolak'
  createdAt: string
}

const DUMMY_DATA: Applicant[] = [
  {
    id: '1',
    fullName: 'Budi Santoso',
    university: 'Universitas Indonesia',
    major: 'Teknik Informatika',
    status: 'Menunggu',
    createdAt: '2025-10-31'
  },
  {
    id: '2',
    fullName: 'Siti Rahayu',
    university: 'Institut Teknologi Bandung',
    major: 'Teknik Elektro',
    status: 'Dalam Proses',
    createdAt: '2025-10-30'
  },
  {
    id: '3',
    fullName: 'Ahmad Hidayat',
    university: 'Universitas Gadjah Mada',
    major: 'Ilmu Komputer',
    status: 'Diterima',
    createdAt: '2025-10-29'
  },
  {
    id: '4',
    fullName: 'Dewi Lestari',
    university: 'Universitas Brawijaya',
    major: 'Sistem Informasi',
    status: 'Ditolak',
    createdAt: '2025-10-28'
  },
  {
    id: '5',
    fullName: 'Rudi Hartono',
    university: 'Universitas Diponegoro',
    major: 'Teknik Komputer',
    status: 'Menunggu',
    createdAt: '2025-10-31'
  }
]

export default function Applicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        // TODO: Replace with actual API call when backend is ready
        setApplicants(DUMMY_DATA)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent>
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Daftar Peserta Magang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Nama</th>
                    <th className="py-3 px-4 text-left">Asal Kampus</th>
                    <th className="py-3 px-4 text-left">Program Studi</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td className="py-3 px-4">{applicant.fullName}</td>
                      <td className="py-3 px-4">{applicant.university}</td>
                      <td className="py-3 px-4">{applicant.major}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}