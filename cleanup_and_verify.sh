#!/bin/bash
# Cleanup script for dead code removal
# This script removes all identified dead code and temporary files

set -e

cd /workspaces/ATS-WEBSITE-01

echo "=== Starting cleanup ==="

# Files to delete
DELETE_FILES=(
    "src/pages/InstrumentDetailLive.tsx"
    "src/pages/InstrumentDetail.backup.tsx"
    "src/data/news.ts"
    "src/components/ui/menubar.tsx"
    "src/components/ui/context-menu.tsx"
    "src/components/ui/input-otp.tsx"
    "src/components/ui/chart.tsx"
    "src/components/ui/resizable.tsx"
    "src/components/ui/sidebar.tsx"
    "src/components/ui/pagination.tsx"
    "src/components/ui/breadcrumb.tsx"
    "src/components/ui/navigation-menu.tsx"
    "src/components/ui/hover-card.tsx"
    "src/components/ui/aspect-ratio.tsx"
    "src/components/ui/carousel.tsx"
    "build-log.txt"
    "test-log.txt"
    "test-commands.txt"
    "curl-root.txt"
    "dev-server.pid"
    "patch.diff"
    "changes_storage.md"
)

# Delete files
for file in "${DELETE_FILES[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
        echo "✓ Deleted: $file"
    else
        echo "⚠ Not found: $file"
    fi
done

# Delete directories
if [ -d "src/components/chat" ]; then
    rm -rf "src/components/chat"
    echo "✓ Deleted: src/components/chat/"
else
    echo "⚠ Not found: src/components/chat/"
fi

echo ""
echo "=== Cleanup complete ==="
echo ""
echo "=== Building project ==="
npm run build

echo ""
echo "=== Build complete ==="
