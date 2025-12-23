#!/usr/bin/env python3
"""
ATS Website Repository Cleanup Script
Removes dead code and temporary files identified in the cleanup analysis.
"""

import os
import shutil
from pathlib import Path

def delete_file(filepath):
    """Safely delete a file and return status."""
    path = Path(filepath)
    if path.exists() and path.is_file():
        path.unlink()
        print(f"✓ Deleted: {filepath}")
        return True
    else:
        print(f"- Skipped (not found): {filepath}")
        return False

def delete_dir(dirpath):
    """Safely delete a directory and return status."""
    path = Path(dirpath)
    if path.exists() and path.is_dir():
        # Check if empty
        try:
            if not any(path.iterdir()):
                path.rmdir()
                print(f"✓ Deleted directory: {dirpath}")
                return True
            else:
                # Non-empty, remove with contents
                shutil.rmtree(path)
                print(f"✓ Deleted directory (with contents): {dirpath}")
                return True
        except Exception as e:
            print(f"✗ Failed to delete {dirpath}: {e}")
            return False
    else:
        print(f"- Skipped (not found): {dirpath}")
        return False

def main():
    """Run the cleanup."""
    os.chdir("/workspaces/ATS-WEBSITE-01")
    
    print("🧹 Starting ATS Website Repository Cleanup...")
    print()
    
    deleted_count = 0
    
    # Dead code pages
    print("📋 Deleting dead code pages...")
    deleted_count += delete_file("src/pages/InstrumentDetailLive.tsx")
    deleted_count += delete_file("src/pages/InstrumentDetail.backup.tsx")
    
    print()
    print("📋 Deleting unused data files...")
    deleted_count += delete_file("src/data/news.ts")
    
    print()
    print("📋 Deleting unused UI components...")
    ui_files = [
        "src/components/ui/menubar.tsx",
        "src/components/ui/context-menu.tsx",
        "src/components/ui/input-otp.tsx",
        "src/components/ui/chart.tsx",
        "src/components/ui/resizable.tsx",
        "src/components/ui/sidebar.tsx",
        "src/components/ui/pagination.tsx",
        "src/components/ui/breadcrumb.tsx",
        "src/components/ui/navigation-menu.tsx",
        "src/components/ui/hover-card.tsx",
        "src/components/ui/aspect-ratio.tsx",
        "src/components/ui/carousel.tsx",
    ]
    for f in ui_files:
        deleted_count += delete_file(f)
    
    print()
    print("📋 Deleting empty folders...")
    deleted_count += delete_dir("src/components/chat")
    
    print()
    print("📋 Deleting temporary and log files...")
    temp_files = [
        "build-log.txt",
        "test-log.txt",
        "test-commands.txt",
        "curl-root.txt",
        "dev-server.pid",
        "patch.diff",
        "changes_storage.md",
    ]
    for f in temp_files:
        deleted_count += delete_file(f)
    
    print()
    print("=" * 50)
    print("✨ Cleanup Complete!")
    print("=" * 50)
    print()
    print(f"Files/folders deleted: {deleted_count}")
    print()
    print("📝 Next steps:")
    print("  1. Run 'npm run build' to verify build succeeds")
    print("  2. Run 'npm run lint' to check for any import errors")
    print("  3. Commit: git add -A && git commit -m 'chore: cleanup dead code'")

if __name__ == "__main__":
    main()
