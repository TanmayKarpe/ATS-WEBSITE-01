#!/usr/bin/env python3
import os
import sys

# Files to delete
files_to_delete = [
    'src/pages/InstrumentDetailLive.tsx',
    'src/pages/InstrumentDetail.backup.tsx',
    'src/data/news.ts',
    'src/components/ui/menubar.tsx',
    'src/components/ui/context-menu.tsx',
    'src/components/ui/input-otp.tsx',
    'src/components/ui/chart.tsx',
    'src/components/ui/resizable.tsx',
    'src/components/ui/sidebar.tsx',
    'src/components/ui/pagination.tsx',
    'src/components/ui/breadcrumb.tsx',
    'src/components/ui/navigation-menu.tsx',
    'src/components/ui/hover-card.tsx',
    'src/components/ui/aspect-ratio.tsx',
    'src/components/ui/carousel.tsx',
    'build-log.txt',
    'test-log.txt',
    'test-commands.txt',
    'curl-root.txt',
    'dev-server.pid',
    'patch.diff',
    'changes_storage.md',
]

# Folders to delete
folders_to_delete = [
    'src/components/chat',
]

deleted_files = []
failed_files = []

# Delete files
for file_path in files_to_delete:
    full_path = os.path.join('/workspaces/ATS-WEBSITE-01', file_path)
    try:
        if os.path.exists(full_path):
            os.remove(full_path)
            deleted_files.append(file_path)
            print(f"✓ Deleted: {file_path}")
        else:
            print(f"⚠ Not found: {file_path}")
    except Exception as e:
        failed_files.append((file_path, str(e)))
        print(f"✗ Failed to delete {file_path}: {e}")

# Delete folders
for folder_path in folders_to_delete:
    full_path = os.path.join('/workspaces/ATS-WEBSITE-01', folder_path)
    try:
        if os.path.exists(full_path):
            import shutil
            shutil.rmtree(full_path)
            deleted_files.append(folder_path + '/')
            print(f"✓ Deleted: {folder_path}/")
        else:
            print(f"⚠ Not found: {folder_path}")
    except Exception as e:
        failed_files.append((folder_path, str(e)))
        print(f"✗ Failed to delete {folder_path}: {e}")

print(f"\n{'='*50}")
print(f"Deleted: {len(deleted_files)} items")
print(f"Failed: {len(failed_files)} items")

if failed_files:
    print("\nFailed deletions:")
    for path, error in failed_files:
        print(f"  {path}: {error}")
    sys.exit(1)

sys.exit(0)
