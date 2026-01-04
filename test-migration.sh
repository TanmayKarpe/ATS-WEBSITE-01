#!/bin/bash

# ========================================
# Quick Migration & Test Script
# ========================================
# This script helps you verify the migration
# ========================================

echo "🚀 ATS Consultancy Module Migration Helper"
echo "==========================================="
echo ""

echo "📋 STEP 1: Run SQL Migration"
echo "----------------------------"
echo "1. Open your Supabase Dashboard"
echo "2. Navigate to: SQL Editor"
echo "3. Copy contents from: sql/migrate_to_single_consultants_table.sql"
echo "4. Paste and run in SQL Editor"
echo ""
echo "⚠️  CRITICAL: Do not proceed until migration completes successfully!"
echo ""
read -p "Have you run the migration successfully? (yes/no): " migration_done

if [ "$migration_done" != "yes" ]; then
    echo "❌ Please run the migration first!"
    exit 1
fi

echo ""
echo "✅ Migration confirmed!"
echo ""

echo "📋 STEP 2: Verify Data Migration"
echo "--------------------------------"
echo "Run this query in Supabase SQL Editor:"
echo ""
echo "SELECT department_code, COUNT(*) as count"
echo "FROM consultants"
echo "GROUP BY department_code"
echo "ORDER BY department_code;"
echo ""
read -p "Does each department show data? (yes/no): " data_verified

if [ "$data_verified" != "yes" ]; then
    echo "⚠️  Data verification issue detected!"
    echo "Check migration logs in Supabase"
    exit 1
fi

echo ""
echo "✅ Data verified!"
echo ""

echo "📋 STEP 3: Start Development Server"
echo "-----------------------------------"
echo "Starting server..."
echo ""

npm run dev

echo ""
echo "📋 STEP 4: Manual Testing Checklist"
echo "-----------------------------------"
echo "Test these URLs in your browser:"
echo ""
echo "1. http://localhost:5173/consultancy"
echo "   → Should list all departments"
echo ""
echo "2. http://localhost:5173/consultancy/SOMS"
echo "   → Should show SOMS faculty"
echo ""
echo "3. http://localhost:5173/consultancy/CS"
echo "   → Should show CS faculty"
echo ""
echo "4. Click on individual faculty profiles"
echo "   → Should show full profile with image"
echo ""
echo "5. Check browser console"
echo "   → Should have NO errors"
echo ""
echo "✅ If all tests pass, migration is successful!"
echo ""
