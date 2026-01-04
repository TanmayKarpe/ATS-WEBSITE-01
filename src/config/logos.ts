// Logo URLs from Supabase Storage
// Logos bucket: https://ytlfnctrroljvfzsqzhc.supabase.co/storage/v1/object/public/logos/

const SUPABASE_PROJECT_ID = 'ytlfnctrroljvfzsqzhc';
const LOGOS_BUCKET_BASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/logos`;

export const LOGOS = {
  ats: `${LOGOS_BUCKET_BASE_URL}/logo.jpg`,
  university: `${LOGOS_BUCKET_BASE_URL}/grand.jpg`,
} as const;
