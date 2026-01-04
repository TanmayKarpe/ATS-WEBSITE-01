import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDepartmentByCode, Department } from '@/services/departments'
import { getConsultantByCode, Consultant } from '@/services/consultants'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, ChevronLeft } from 'lucide-react'
import { openEmailDraft } from '@/lib/emailDraft'

// Valid department codes - must match database exactly
const VALID_DEPARTMENT_CODES = ['CS', 'SOCS', 'SOES', 'SOLS', 'SOMS', 'SOPS', 'UICT']

export default function FacultyDetailPage() {
  const { departmentCode, consultantCode } = useParams<{ departmentCode: string; consultantCode: string }>()
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState<Department | null>(null)
  const [faculty, setFaculty] = useState<Consultant | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!departmentCode || !consultantCode) return

    // Normalize route param: uppercase and trim
    const normalizedDeptCode = departmentCode.toUpperCase().trim()
    
    // Validate against allowed codes
    if (!VALID_DEPARTMENT_CODES.includes(normalizedDeptCode)) {
      setError('Invalid department code')
      setLoading(false)
      return
    }

    const loadData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Use normalized code
        const dept = await getDepartmentByCode(normalizedDeptCode)
        
        if (!dept) {
          setError('Department not found')
          setLoading(false)
          return
        }
        
        setDepartment(dept)

        const consultant = await getConsultantByCode(consultantCode)
        
        if (!consultant) {
          setError('Faculty profile not found')
          setLoading(false)
          return
        }
        
        // Verify consultant belongs to this department
        if (consultant.department_code !== normalizedDeptCode) {
          setError('Faculty profile not found in this department')
          setLoading(false)
          return
        }
        
        setFaculty(consultant)
        
      } catch (err: any) {
        console.error('Failed to load faculty profile:', err)
        setError('Unable to load faculty profile. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [departmentCode, consultantCode])

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

  if (!faculty || !department) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-slate-600">Faculty profile not found.</p>
      </div>
    )
  }

  // Normalize department code for back navigation
  const normalizedDeptCode = departmentCode?.toUpperCase().trim()

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Back Navigation */}
      <Link 
        to={`/consultancy/${normalizedDeptCode}`}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to {department.name}
      </Link>

      {/* Hero Section */}
      {/* Image section intentionally removed – to be reintroduced later */}
      <div className="mb-16 space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">{faculty.name}</h1>
        <p className="text-xl text-slate-600">{faculty.designation}</p>

        {faculty.specialization && (
          <div className="mt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md">
              <span className="text-sm font-medium text-slate-700">{faculty.specialization}</span>
            </div>
          </div>
        )}

        {faculty.email && (
          <div className="pt-2">
            <Button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg"
              size="sm"
              onClick={() => {
                const subject = `Instrument Request – ${department?.name || 'Department'}`
                const body = `
Dear Sir/Madam,

I would like to request the following service:

Instrument: ${department?.name || 'Department'}
Purpose of Analysis:

Sample Details:

User Details:
Name: ${faculty.name}
Institution:
Phone:
Email: ${faculty.email}

Regards,
${faculty.name}
`.trim()

                openEmailDraft(faculty.email, subject, body)
              }}
            >
              <Mail className="w-4 h-4" />
              Contact Faculty
            </Button>
          </div>
        )}
      </div>

      {/* Expertise & Profile Section */}
      {faculty.profile && (
        <Card className="p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Areas of Expertise & Professional Profile
          </h2>
          <div 
            className="prose prose-slate max-w-none"
            style={{
              lineHeight: '1.8',
              color: '#475569', // slate-600
            }}
          >
            <p className="whitespace-pre-wrap">{faculty.profile}</p>
          </div>
        </Card>
      )}
    </div>
  )
}
