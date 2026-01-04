-- Add image_filename column to consultants table
ALTER TABLE consultants
ADD COLUMN IF NOT EXISTS image_filename text;

-- Populate image_filename with the exact filename from storage (manual or scripted load required)
-- Example (adjust filenames accordingly):
-- UPDATE consultants SET image_filename = 'CS_13.jpg' WHERE consultant_code = 'CS_13';
-- UPDATE consultants SET image_filename = 'SOCS_3.png' WHERE consultant_code = 'SOCS_3';
