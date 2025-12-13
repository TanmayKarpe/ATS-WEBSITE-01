import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDepartments } from '@/services/departments'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

export default function ConsultancyPage() {
  const [departments, setDepartments] = useState<any[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getDepartments()
      .then((d) => setDepartments(d))
      .finally(() => setLoading(false))
  }, [])

  const dept = departments.find((d) => d.slug === selected)

  const handleContact = () => {
    if (!dept) return
    const mailto = `mailto:${dept.coordinator_email}?subject=Consultancy%20Inquiry%20${encodeURIComponent(dept.name)}&body=Hello%20${encodeURIComponent(dept.name)}%20team,%0D%0A%0D%0AI'd%20like%20to%20inquire%20about%20consultancy%20services.`
    window.location.href = mailto
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Consultancy</h1>
      </div>
      <div className="space-y-6">
        <div>
          <Select onValueChange={(v) => setSelected(v)}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d.slug} value={d.slug}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {dept && (
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{dept.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{dept.description}</p>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleContact}>Contact Coordinator</Button>
                <Button variant="ghost" onClick={() => navigate(`/departments/${dept.slug}`)}>View page</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
