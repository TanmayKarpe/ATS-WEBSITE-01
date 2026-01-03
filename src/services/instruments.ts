import type { Tables } from '@/integrations/supabase/types'
import { supabase } from '@/supabase/client'

const logPrefix = '[TEMP DEBUG][Supabase][Instruments]';

const requireSupabase = () => {
  if (!supabase) {
    // Surface the missing client early so Netlify deployments fail loudly instead of silently
    const error = new Error('Supabase client unavailable; check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    console.warn(`${logPrefix} Client missing`, { mode: import.meta.env.MODE });
    throw error;
  }
  return supabase;
};

export type Instrument = {
  id?: string
  slug: string
  name: string
  short_description?: string | null
  description?: string | null
  category?: string | null
  sample_requirements?: any
  metadata?: any
  is_active?: boolean
  coordinator_email?: string | null
}

export async function listInstruments(): Promise<Instrument[]> {
  const client = requireSupabase();
  console.log(`${logPrefix} listInstruments query fired`);
  const { data, error } = await client
    .from('instruments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`${logPrefix} listInstruments error`, {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }

  const instruments = ((data || []) as unknown) as Instrument[];
  if (instruments.length === 0) {
    console.warn(`${logPrefix} listInstruments returned no rows`);
  }
  return instruments;
}

export async function getInstrument(id: string): Promise<Instrument | null> {
  const client = requireSupabase();
  console.log(`${logPrefix} getInstrument query fired`, { id });
  const { data, error } = await client
    .from('instruments')
    .select('*')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error(`${logPrefix} getInstrument error`, {
      id,
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw error;
  }

  if (!data) {
    console.warn(`${logPrefix} getInstrument returned empty result`, { id });
    return null;
  }

  return (data as unknown) as Instrument | null
}

export async function createInstrument(instr: Instrument): Promise<Instrument> {
  const client = requireSupabase();
  console.log(`${logPrefix} createInstrument query fired`);
  const { data, error } = await client.from('instruments').insert(instr).select().single()
  if (error) {
    console.error(`${logPrefix} createInstrument error`, {
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw error;
  }
  return data as Instrument
}

export async function updateInstrument(id: string, instr: Partial<Instrument>): Promise<Instrument> {
  const client = requireSupabase();
  console.log(`${logPrefix} updateInstrument query fired`, { id });
  const { data, error } = await client.from('instruments').update(instr).eq('id', id).select().single()
  if (error) {
    console.error(`${logPrefix} updateInstrument error`, {
      id,
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw error;
  }
  return data as Instrument
}

export async function deleteInstrument(id: string): Promise<void> {
  const client = requireSupabase();
  console.log(`${logPrefix} deleteInstrument query fired`, { id });
  const { error } = await client.from('instruments').delete().eq('id', id)
  if (error) {
    console.error(`${logPrefix} deleteInstrument error`, {
      id,
      message: error.message,
      code: error.code,
      details: error.details,
    });
    throw error
  }
}
