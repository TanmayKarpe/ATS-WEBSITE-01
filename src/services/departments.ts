import { supabase } from '@/supabase/client'

export type Department = {
  id: string
  name: string
  department_code: string
  is_active: boolean
  coordinator_email?: string
  description?: string | null
}

export async function getActiveDepartments(): Promise<Department[]> {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })
  
  if (error) throw error
  return data as Department[]
}

export async function listDepartments() {
  return getActiveDepartments()
}

export async function getDepartments() {
  return getActiveDepartments()
}

export async function getDepartmentByCode(departmentCode: string): Promise<Department | null> {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('department_code', departmentCode)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data as Department | null
}

export async function listAllDepartments() {
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .order('name', { ascending: true })
  
  if (error) throw error
  return data as Department[]
}

export async function createDepartment(d: Department) {
  const { data, error } = await supabase.from('departments').insert(d).select().single()
  if (error) throw error
  return data as Department
}

export async function updateDepartment(id: string, d: Partial<Department>) {
  const { data, error } = await supabase.from('departments').update(d).eq('id', id).select().single()
  if (error) throw error
  return data as Department
}

export async function deleteDepartment(id: string) {
  const { error } = await supabase.from('departments').delete().eq('id', id)
  if (error) throw error
}
