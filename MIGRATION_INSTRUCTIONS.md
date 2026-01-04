# 🔄 Consultancy Module Migration Instructions

## Overview
This migration consolidates 7 separate consultant tables into a single `consultants` table with proper relational architecture.

## ⚠️ BEFORE YOU START

1. **Backup your database** - This is critical!
2. **Access Supabase SQL Editor** - Go to your Supabase project dashboard
3. **Verify current data** - Check that consultant tables have data

## 📋 Migration Steps

### Step 1: Run the Migration SQL

1. Open Supabase Dashboard → SQL Editor
2. Open the file: `sql/migrate_to_single_consultants_table.sql`
3. Copy the entire contents
4. Paste into Supabase SQL Editor
5. Click "Run"

The migration will:
- ✅ Create new `consultants` table
- ✅ Migrate all data from 7 tables
- ✅ Add foreign key constraints
- ✅ Remove `consultant_table` column from departments
- ✅ Set up Row Level Security

### Step 2: Verify the Migration

Run this query in SQL Editor:

```sql
SELECT department_code, COUNT(*) as count 
FROM consultants 
GROUP BY department_code 
ORDER BY department_code;
```

**Expected output:**
```
department_code | count
----------------|------
CS              | X
SOCS            | X
SOES            | X
SOLS            | X
SOMS            | X
SOPS            | X
UICT            | X
```

### Step 3: Test the Application

1. Start the dev server: `npm run dev`
2. Navigate to `/consultancy`
3. Click on each department
4. Verify faculty members load correctly
5. Click on individual faculty profiles
6. Verify images load properly

### Step 4: Clean Up Old Tables (Optional)

**ONLY AFTER SUCCESSFUL TESTING**, uncomment and run these lines from the migration file:

```sql
DROP TABLE IF EXISTS consultant_CS;
DROP TABLE IF EXISTS consultant_SOCS;
DROP TABLE IF EXISTS consultant_SOES;
DROP TABLE IF EXISTS consultant_SOLS;
DROP TABLE IF EXISTS consultant_SOMS;
DROP TABLE IF EXISTS consultant_SOPS;
DROP TABLE IF EXISTS consultant_UICT;
```

## 🎯 What Changed

### Database Schema
- ❌ **Before:** 7 tables (`consultant_CS`, `consultant_SOCS`, etc.)
- ✅ **After:** 1 table (`consultants`) with `department_code` field

### Code Architecture
- ❌ **Before:** Dynamic table names with `(supabase as any).from(tableName)`
- ✅ **After:** Type-safe queries with `supabase.from('consultants')`

### Service Functions
- ❌ **Before:** `getConsultantsByTable(tableName)`
- ✅ **After:** `getConsultantsByDepartment(departmentCode)`

### Department Type
- ❌ **Before:** `consultant_table: string` field
- ✅ **After:** No `consultant_table` field needed

## 🐛 Troubleshooting

### Issue: "relation does not exist" error
**Solution:** Make sure you ran the migration SQL completely

### Issue: Empty faculty lists after migration
**Solution:** 
1. Check data was migrated: `SELECT COUNT(*) FROM consultants;`
2. Verify department codes match: `SELECT DISTINCT department_code FROM consultants;`

### Issue: Foreign key constraint error
**Solution:** Ensure all `department_code` values in consultants exist in departments table

## 🔄 Rollback (If Needed)

If something goes wrong, the old tables still exist until you run Step 4. You can:

1. Drop the new consultants table: `DROP TABLE consultants;`
2. Re-add `consultant_table` column to departments
3. Restore old code from git

## ✅ Success Criteria

- [ ] Migration SQL runs without errors
- [ ] Consultant counts match across all departments
- [ ] All departments display faculty in UI
- [ ] Faculty images load correctly
- [ ] Individual faculty profiles work
- [ ] No console errors in browser
- [ ] No TypeScript errors in code

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs
3. Verify the migration SQL ran completely
4. Check that RLS policies are active
