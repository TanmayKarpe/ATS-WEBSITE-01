import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDepartments } from '@/services/departments'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { supabase } from '@/supabase/client'

// TEMP: SOLS and SOCS hidden from frontend
const HIDDEN_DEPARTMENTS = ['SOCS', 'SOLS']

export default function ConsultancyPage() {
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getDepartments()
      .then((d) => setDepartments(d))
      .catch((err) => setError(err.message || 'Failed to load departments'))
      .finally(() => setLoading(false))
  }, [])

  const visibleDepartments = departments.filter((d) => !HIDDEN_DEPARTMENTS.includes(d.department_code))

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Consultancy</h1>
        <p className="mt-2 text-sm text-muted-foreground">We provide consultancy services across our departments. Select a department to read details and contact the coordinator directly for consultancy requests.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">Loading departments…</div>
      )}

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      {!loading && visibleDepartments.length === 0 && (
        <div className="py-12">
          <Card>
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">No consultancy departments available</h2>
              <p className="mt-2 text-sm text-muted-foreground">There are currently no departments listed for consultancy. Please check back later or contact our office for more information.</p>
              <div className="mt-4 flex items-center justify-center">
                <Button asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleDepartments.map((d) => {
          // Normalize department code and generate image URL (single source of truth)
          const deptCode = d.department_code?.trim().toUpperCase()
          const imageUrl = deptCode 
            ? supabase.storage.from('consultancy').getPublicUrl(`department_images/${deptCode}DEP.png`).data.publicUrl
            : null
          
          return (
            <Card key={d.id} className="overflow-hidden p-0 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Department Image */}
              {imageUrl && (
                <div className="w-full aspect-video bg-slate-100 overflow-hidden rounded-t-lg">
                  <img 
                    src={imageUrl} 
                    alt={d.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/department-placeholder.png'
                    }}
                  />
                </div>
              )}
              
              {/* Card Content - Simplified */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <h3 className="text-xl font-semibold text-slate-900">{d.name}</h3>
                
                <div className="mt-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate(`/consultancy/${d.department_code}`)}
                    className="p-0 h-auto text-slate-600 hover:text-slate-900"
                  >
                    View department →
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
