import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Consultant } from '@/services/consultants'

interface FacultyCardProps {
  faculty: Consultant
  departmentCode: string
}

// UI cleanup: simplified faculty card; image section intentionally omitted
export function FacultyCard({ faculty, departmentCode }: FacultyCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="overflow-hidden p-0 flex flex-col h-full bg-white rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Image section intentionally removed – to be reintroduced later */}

      <div className="p-6 flex flex-col gap-4 flex-grow">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-slate-900">{faculty.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-1">{faculty.designation}</p>
        </div>

        {faculty.specialization && (
          <div>
            <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium leading-tight">
              {faculty.specialization}
            </span>
          </div>
        )}

        <div className="mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/consultancy/${departmentCode}/faculty/${faculty.consultant_code}`)}
            className="p-0 h-auto text-slate-700 hover:text-slate-900 justify-start"
          >
            View Profile →
          </Button>
        </div>
      </div>
    </Card>
  )
}
