import { supabase } from '@/supabase/client'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')

export type Consultant = {
  id: string
  department_code: string
  consultant_code: string
  image_filename?: string | null
  name: string
  email: string
  designation: string
  specialization: string
  profile: string
  created_at?: string
  updated_at?: string
}

/**
 * Fetch all consultants for a specific department
 * Uses proper relational query on single consultants table
 * 
 * Note: Type errors will appear until Supabase types are regenerated after migration
 */
export async function getConsultantsByDepartment(departmentCode: string): Promise<Consultant[]> {
  const { data, error } = await (supabase as any)
    .from('consultants')
    .select('*')
    .eq('department_code', departmentCode)
    .order('name', { ascending: true })
  
  if (error) throw error
  return (data || []) as Consultant[]
}

/**
 * Fetch a single consultant by their code
 * 
 * Note: Type errors will appear until Supabase types are regenerated after migration
 */
export async function getConsultantByCode(consultantCode: string): Promise<Consultant | null> {
  const { data, error } = await (supabase as any)
    .from('consultants')
    .select('*')
    .eq('consultant_code', consultantCode)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data as Consultant | null
}

/**
 * Generate the image URL for a consultant using their stored image filename
 */
export function getFacultyImageUrl(imageFilename?: string | null): string | null {
  const safeName = imageFilename?.trim()

  if (!safeName) {
    return null
  }

  if (!supabaseUrl) {
    console.warn('[FacultyImage] Missing Supabase URL; using placeholder', { imageFilename: safeName })
    return null
  }

  const encodedName = encodeURIComponent(safeName)
  return `${supabaseUrl}/storage/v1/object/public/faculty_images/${encodedName}`
}

// Backwards compatibility (deprecated)
export function getConsultantImageUrl(imageFilename?: string | null): string | null {
  return getFacultyImageUrl(imageFilename)
}

/**
 * Create a new consultant
 * 
 * Note: Type errors will appear until Supabase types are regenerated after migration
 */
export async function createConsultant(consultant: Omit<Consultant, 'id' | 'created_at' | 'updated_at'>): Promise<Consultant> {
  const { data, error } = await (supabase as any)
    .from('consultants')
    .insert(consultant)
    .select()
    .single()
  
  if (error) throw error
  return data as Consultant
}

/**
 * Update an existing consultant
 * 
 * Note: Type errors will appear until Supabase types are regenerated after migration
 */
export async function updateConsultant(id: string, updates: Partial<Consultant>): Promise<Consultant> {
  const { data, error } = await (supabase as any)
    .from('consultants')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Consultant
}

/**
 * Delete a consultant
 * 
 * Note: Type errors will appear until Supabase types are regenerated after migration
 */
export async function deleteConsultant(id: string): Promise<void> {
  const { error } = await (supabase as any)
    .from('consultants')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
