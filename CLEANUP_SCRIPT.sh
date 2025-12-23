#!/bin/bash

# ATS Website Repository Cleanup Script
# This script removes dead code and temporary files identified in the cleanup analysis

echo "🧹 Starting ATS Website Repository Cleanup..."
echo ""

# Track deleted files
DELETED_COUNT=0

# Function to safely delete files
delete_file() {
    local file=$1
    if [ -f "$file" ]; then
        rm -f "$file"
        echo "✓ Deleted: $file"
        ((DELETED_COUNT++))
    else
        echo "- Skipped (not found): $file"
    fi
}

# Function to safely delete directories
delete_dir() {
    local dir=$1
    if [ -d "$dir" ] && [ -z "$(ls -A "$dir")" ]; then
        rmdir "$dir"
        echo "✓ Deleted directory: $dir"
        ((DELETED_COUNT++))
    elif [ -d "$dir" ]; then
        rm -rf "$dir"
        echo "✓ Deleted directory (with contents): $dir"
        ((DELETED_COUNT++))
    fi
}

echo "📋 Deleting dead code pages..."
delete_file "src/pages/InstrumentDetailLive.tsx"
delete_file "src/pages/InstrumentDetail.backup.tsx"

echo ""
echo "📋 Deleting unused data files..."
delete_file "src/data/news.ts"

echo ""
echo "📋 Deleting unused UI components..."
delete_file "src/components/ui/menubar.tsx"
delete_file "src/components/ui/context-menu.tsx"
delete_file "src/components/ui/input-otp.tsx"
delete_file "src/components/ui/chart.tsx"
delete_file "src/components/ui/resizable.tsx"
delete_file "src/components/ui/sidebar.tsx"
delete_file "src/components/ui/pagination.tsx"
delete_file "src/components/ui/breadcrumb.tsx"
delete_file "src/components/ui/navigation-menu.tsx"
delete_file "src/components/ui/hover-card.tsx"
delete_file "src/components/ui/aspect-ratio.tsx"
delete_file "src/components/ui/carousel.tsx"

echo ""
echo "📋 Deleting empty folders..."
delete_dir "src/components/chat"

echo ""
echo "📋 Deleting temporary and log files..."
delete_file "build-log.txt"
delete_file "test-log.txt"
delete_file "test-commands.txt"
delete_file "curl-root.txt"
delete_file "dev-server.pid"
delete_file "patch.diff"
delete_file "changes_storage.md"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Cleanup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Files/folders deleted: $DELETED_COUNT"
echo ""
echo "📝 Next steps:"
echo "  1. Run 'npm run build' to verify build succeeds"
echo "  2. Run 'npm run lint' to check for any import errors"
echo "  3. Commit changes: git add -A && git commit -m 'chore: cleanup dead code and temporary files'"
echo ""
