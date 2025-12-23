# Facility Updates & Instrument Highlights Setup

This document explains how to set up and use the dynamic facility updates system on the homepage.

## Overview

The homepage "News & Updates" section has been modernized to use a **dynamic, admin-managed system** that:
- Pulls data from Supabase
- Is always tied to real instruments
- Can be safely managed by non-technical staff
- Displays the latest 3 active updates

## Database Setup

### 1. Create the Table

Run the SQL file to create the `facility_updates` table:

```bash
# Using Supabase CLI
supabase db reset

# Or execute the SQL directly in Supabase Studio
```

The SQL file is located at: `sql/facility_updates.sql`

### 2. Table Structure

```sql
facility_updates (
  id                  UUID PRIMARY KEY
  instrument_id       UUID (FK → instruments)
  update_type         TEXT ('training', 'availability', 'maintenance', 'highlight')
  title               TEXT
  short_description   TEXT
  detailed_description TEXT (nullable)
  is_active           BOOLEAN
  created_at          TIMESTAMPTZ
  updated_at          TIMESTAMPTZ
)
```

### 3. Security (RLS)

- **Public**: Can read active updates (`is_active = true`)
- **Admins**: Can create, update, and delete all updates

## Update Types & Colors

| Type | Badge Label | Color | Icon | Use Case |
|------|------------|-------|------|----------|
| `training` | Training | Green | GraduationCap | Workshops, training sessions |
| `availability` | Availability | Emerald | CheckCircle | Instrument now available |
| `maintenance` | Maintenance | Amber | Wrench | Scheduled maintenance |
| `highlight` | Highlight | Violet | Zap | New features, capabilities |

## Creating Updates (Admin)

### Example: Training Workshop

```sql
INSERT INTO facility_updates (
  instrument_id,
  update_type,
  title,
  short_description,
  detailed_description,
  is_active
) VALUES (
  '12345678-1234-1234-1234-123456789012', -- FE-SEM instrument ID
  'training',
  'Hands-on FE-SEM Workshop',
  'Two-day intensive workshop on sample preparation and imaging techniques.',
  'Join us for a comprehensive hands-on workshop covering:\n- Sample preparation best practices\n- Advanced imaging techniques\n- Data analysis and interpretation\n\nLimited seats available. Register by email.',
  true
);
```

### Example: Maintenance Notice

```sql
INSERT INTO facility_updates (
  instrument_id,
  update_type,
  title,
  short_description,
  detailed_description,
  is_active
) VALUES (
  '87654321-4321-4321-4321-210987654321', -- XRD instrument ID
  'maintenance',
  'Scheduled XRD Maintenance',
  'The X-Ray Diffractometer will be under maintenance Dec 5-8.',
  'Scheduled maintenance for system calibration and upgrades. Samples submitted before Dec 1 will be processed before maintenance begins.',
  true
);
```

## Homepage Behavior

### Display
- Shows **3 most recent** active updates
- Cards show:
  - Update type badge (color-coded)
  - Update title
  - Instrument name
  - Short description

### Read More Modal
- Clicking "Read More" opens a modal (no page navigation)
- Modal displays:
  - Update type badge
  - Full title
  - Instrument name
  - Detailed description (or short description if no detailed one exists)

### Loading States
- Shows skeleton loaders while fetching
- Displays "No updates available" if empty

## Managing Updates

### To Add a New Update
1. Get the instrument ID from the `instruments` table
2. Insert a new row in `facility_updates`
3. Set `is_active = true`

### To Hide an Update
```sql
UPDATE facility_updates
SET is_active = false
WHERE id = 'update-uuid-here';
```

### To Update Content
```sql
UPDATE facility_updates
SET 
  title = 'Updated Title',
  short_description = 'New description',
  detailed_description = 'Updated detailed content'
WHERE id = 'update-uuid-here';
```

## File Structure

```
src/
├── services/
│   └── facilityUpdates.ts         # Data fetching & utilities
├── components/sections/
│   └── NewsSection.tsx            # Homepage updates section
sql/
└── facility_updates.sql           # Table creation script
```

## Key Features

✅ **Safe**: All updates must reference real instruments (FK constraint)  
✅ **Clean**: No dates, no fake announcements  
✅ **Institutional**: Professional, modern design  
✅ **Dynamic**: Updates appear immediately when set to active  
✅ **Consistent**: All cards follow same layout  

## Important Notes

- **NO static data**: All content comes from Supabase
- **Instrument required**: Every update MUST reference an instrument
- **Admin-managed**: Only authenticated users can create/edit
- **Public-visible**: Anyone can see active updates
