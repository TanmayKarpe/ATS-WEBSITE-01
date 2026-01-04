import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDepartmentByCode, Department } from '@/services/departments'
import { getConsultantsByDepartment, Consultant } from '@/services/consultants'
import { FacultyCard } from '@/components/consultancy/FacultyCard'
import { Loader2 } from 'lucide-react'

// Valid department codes - must match database exactly
const VALID_DEPARTMENT_CODES = ['CS', 'SOCS', 'SOES', 'SOLS', 'SOMS', 'SOPS', 'UICT']
// TEMP: SOLS and SOCS hidden from frontend
const HIDDEN_DEPARTMENT_CODES = ['SOCS', 'SOLS']

export default function DepartmentDetailPage() {
  const { departmentCode } = useParams<{ departmentCode: string }>()
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState<Department | null>(null)
  const [faculty, setFaculty] = useState<Consultant[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!departmentCode) return
    
    // Normalize route param: uppercase and trim
    const normalizedCode = departmentCode.toUpperCase().trim()
    
    // Validate against allowed codes
    if (!VALID_DEPARTMENT_CODES.includes(normalizedCode)) {
      setError('Invalid department code')
      setLoading(false)
      return
    }

    // Short-circuit hidden departments
    if (HIDDEN_DEPARTMENT_CODES.includes(normalizedCode)) {
      setError('This department is temporarily unavailable.')
      setLoading(false)
      return
    }
    
    const loadData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Use normalized code in all queries
        const dept = await getDepartmentByCode(normalizedCode)
        
        if (!dept) {
          setError('Department not found')
          setLoading(false)
          return
        }
        
        setDepartment(dept)
        
        // Fetch consultants using normalized department_code
        const consultants = await getConsultantsByDepartment(normalizedCode)
        setFaculty(consultants)
        
      } catch (err: any) {
        console.error('Failed to load department details:', err)
        setError('Unable to load department details. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [departmentCode])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!department) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-slate-600">Department not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Department Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{department.name}</h1>
        {department.description && (
          <p className="text-lg text-slate-600 max-w-3xl">{department.description}</p>
        )}
      </div>

      {/* Faculty Grid */}
      {faculty.length === 0 ? (
        <div className="py-12 px-6 text-center">
          <p className="text-slate-600 text-lg">Faculty profiles will be available soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((f) => (
            <FacultyCard key={f.consultant_code} faculty={f} departmentCode={departmentCode!} />
          ))}
        </div>
      )}
    </div>
  )
}

