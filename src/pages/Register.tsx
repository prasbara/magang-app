import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'

type FormData = {
  fullName: string
  phone: string
  university: string
  major: string
  semester: string
  cv: FileList
  letter: FileList
  idCard?: FileList
}

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement form submission
      console.log(data)
      toast({
        title: "Pendaftaran Berhasil",
        description: "Data Anda telah berhasil dikirim.",
      })
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Mohon coba lagi nanti.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pendaftaran Magang</CardTitle>
            <CardDescription>
              Silakan lengkapi formulir di bawah ini untuk mendaftar program magang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP/WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 081234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asal Kampus</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama universitas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Studi</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan program studi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih semester" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cv"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>CV (PDF/DOCX)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf,.docx"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                          value={undefined}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload CV Anda dalam format PDF atau DOCX
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="letter"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Surat Pengantar Kampus (PDF)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                          value={undefined}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload surat pengantar dari kampus dalam format PDF
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idCard"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>KTP atau KTM (Opsional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                          value={undefined}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload KTP atau KTM Anda (format PDF/JPG/PNG)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => window.history.back()}>
                    Kembali
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}