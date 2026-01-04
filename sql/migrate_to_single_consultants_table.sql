-- ============================================================================
-- MIGRATION: Consolidate Multiple Consultant Tables into Single Table
-- ============================================================================
-- This migration creates a single 'consultants' table and migrates data
-- from all department-specific consultant tables.
-- ============================================================================

-- Step 1: Create the unified consultants table
-- ============================================================================
CREATE TABLE IF NOT EXISTS consultants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_code TEXT NOT NULL,
  consultant_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  designation TEXT NOT NULL,
  specialization TEXT,
  profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast department lookups
CREATE INDEX IF NOT EXISTS idx_consultants_department_code ON consultants(department_code);

-- Step 2: Migrate data from all consultant tables
-- ============================================================================

-- Migrate from consultant_CS
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'CS' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_CS
ON CONFLICT (consultant_code) DO NOTHING;

-- Migrate from consultant_SOCS
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'SOCS' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_SOCS
ON CONFLICT (consultant_code) DO NOTHING;

-- Migrate from consultant_SOES
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'SOES' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_SOES
ON CONFLICT (consultant_code) DO NOTHING;

-- Migrate from consultant_SOLS
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'SOLS' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_SOLS
ON CONFLICT (consultant_code) DO NOTHING;

-- Migrate from consultant_SOMS
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'SOMS' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_SOMS
ON CONFLICT (consultant_code) DO NOTHING;

-- Migrate from consultant_SOPS
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'SOPS' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_SOPS
ON CONFLICT (consultant_code) DO NOTHING;

-- Migrate from consultant_UICT
INSERT INTO consultants (department_code, consultant_code, name, email, designation, specialization, profile)
SELECT 'UICT' as department_code, consultant_code, name, email, designation, specialization, profile
FROM consultant_UICT
ON CONFLICT (consultant_code) DO NOTHING;

-- Step 3: Add foreign key constraint
-- ============================================================================
ALTER TABLE consultants
ADD CONSTRAINT fk_consultants_department
FOREIGN KEY (department_code)
REFERENCES departments(department_code)
ON DELETE CASCADE;

-- Step 4: Remove consultant_table column from departments
-- ============================================================================
ALTER TABLE departments DROP COLUMN IF EXISTS consultant_table;

-- Step 5: Enable Row Level Security
-- ============================================================================
ALTER TABLE consultants ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for consultants"
ON consultants FOR SELECT
TO public
USING (true);

-- Admin write access
CREATE POLICY "Admin full access for consultants"
ON consultants FOR ALL
TO authenticated
USING (true);

-- Step 6: Verification Query (Run this to verify migration)
-- ============================================================================
-- SELECT department_code, COUNT(*) as count 
-- FROM consultants 
-- GROUP BY department_code 
-- ORDER BY department_code;

-- Step 7: Drop old tables (ONLY AFTER VERIFICATION)
-- ============================================================================
-- UNCOMMENT THESE LINES ONLY AFTER VERIFYING THE MIGRATION IS SUCCESSFUL
-- DROP TABLE IF EXISTS consultant_CS;
-- DROP TABLE IF EXISTS consultant_SOCS;
-- DROP TABLE IF EXISTS consultant_SOES;
-- DROP TABLE IF EXISTS consultant_SOLS;
-- DROP TABLE IF EXISTS consultant_SOMS;
-- DROP TABLE IF EXISTS consultant_SOPS;
-- DROP TABLE IF EXISTS consultant_UICT;
