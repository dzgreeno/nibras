#!/usr/bin/env python3
"""
Script to replace alert() calls with notification system in React components
"""

import os
import re
import glob

def update_file_imports(file_path):
    """Add useNotification import to React files"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has useNotification import
    if 'useNotification' in content:
        return content
    
    # Add import after other React imports
    import_pattern = r"(import React[^;]*;)"
    if re.search(import_pattern, content):
        content = re.sub(
            import_pattern,
            r"\1\nimport { useNotification } from '../contexts/NotificationContext';",
            content
        )
    
    return content

def add_notification_hook(content):
    """Add useNotification hook to component"""
    if 'const { showSuccess, showError, showWarning, showInfo } = useNotification();' in content:
        return content
    
    # Find component function declaration
    component_pattern = r"(const \w+: React\.FC[^=]*= \([^)]*\) => \{)"
    if re.search(component_pattern, content):
        content = re.sub(
            component_pattern,
            r"\1\n  const { showSuccess, showError, showWarning, showInfo } = useNotification();",
            content
        )
    
    return content

def replace_alerts(content):
    """Replace alert() calls with appropriate notification calls"""
    
    # Success patterns
    success_patterns = [
        (r"alert\('🎉([^']*)'", r"showSuccess('تم بنجاح', '\1')"),
        (r"alert\('✅([^']*)'", r"showSuccess('تم بنجاح', '\1')"),
        (r"alert\('🎁([^']*)'", r"showSuccess('مكافأة!', '\1')"),
        (r"alert\(`🎉([^`]*)`", r"showSuccess('تم بنجاح', `\1`)"),
        (r"alert\(`✅([^`]*)`", r"showSuccess('تم بنجاح', `\1`)"),
        (r"alert\(`🎁([^`]*)`", r"showSuccess('مكافأة!', `\1`)"),
    ]
    
    # Error patterns
    error_patterns = [
        (r"alert\('❌([^']*)'", r"showError('خطأ', '\1')"),
        (r"alert\(`❌([^`]*)`", r"showError('خطأ', `\1`)"),
    ]
    
    # Info patterns
    info_patterns = [
        (r"alert\('📧([^']*)'", r"showInfo('رسالة', '\1')"),
        (r"alert\('📊([^']*)'", r"showInfo('تقرير', '\1')"),
        (r"alert\('📖([^']*)'", r"showInfo('جاري التحميل', '\1')"),
        (r"alert\('🔄([^']*)'", r"showInfo('جاري التحميل', '\1')"),
        (r"alert\('📅([^']*)'", r"showInfo('تذكير', '\1')"),
        (r"alert\('📞([^']*)'", r"showInfo('اتصال', '\1')"),
        (r"alert\('🛒([^']*)'", r"showInfo('قريباً', '\1')"),
        (r"alert\(`📧([^`]*)`", r"showInfo('رسالة', `\1`)"),
        (r"alert\(`📊([^`]*)`", r"showInfo('تقرير', `\1`)"),
        (r"alert\(`📖([^`]*)`", r"showInfo('جاري التحميل', `\1`)"),
        (r"alert\(`🔄([^`]*)`", r"showInfo('جاري التحميل', `\1`)"),
        (r"alert\(`📅([^`]*)`", r"showInfo('تذكير', `\1`)"),
        (r"alert\(`📞([^`]*)`", r"showInfo('اتصال', `\1`)"),
        (r"alert\(`🛒([^`]*)`", r"showInfo('قريباً', `\1`)"),
    ]
    
    # Apply replacements
    for pattern, replacement in success_patterns:
        content = re.sub(pattern, replacement, content)
    
    for pattern, replacement in error_patterns:
        content = re.sub(pattern, replacement, content)
    
    for pattern, replacement in info_patterns:
        content = re.sub(pattern, replacement, content)
    
    # Generic alert replacements (fallback)
    content = re.sub(r"alert\('([^']*)'", r"showInfo('إشعار', '\1')", content)
    content = re.sub(r"alert\(`([^`]*)`", r"showInfo('إشعار', `\1`)", content)
    
    return content

def process_file(file_path):
    """Process a single file"""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if no alert calls
        if 'alert(' not in content:
            return
        
        # Update imports
        content = update_file_imports(file_path)
        
        # Add notification hook
        content = add_notification_hook(content)
        
        # Replace alerts
        content = replace_alerts(content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated: {file_path}")
        
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")

def main():
    """Main function"""
    # Find all React files
    src_dir = "src"
    patterns = ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
    
    files = []
    for pattern in patterns:
        files.extend(glob.glob(os.path.join(src_dir, pattern), recursive=True))
    
    print(f"Found {len(files)} files to process")
    
    for file_path in files:
        process_file(file_path)
    
    print("✅ All files processed!")

if __name__ == "__main__":
    main()