#!/usr/bin/env python3
"""
Script to update all pages with navigation components
"""

import os
import re

# الصفحات التي نريد تحديثها
pages_to_update = [
    # صفحات الطلاب
    {'file': 'StudentAchievements.tsx', 'breadcrumb': "الرئيسية,/student-dashboard,🏠|إنجازاتي,🏆"},
    {'file': 'StudentLibrary.tsx', 'breadcrumb': "الرئيسية,/student-dashboard,🏠|المكتبة,📖"},
    {'file': 'StudentAvatarStore.tsx', 'breadcrumb': "الرئيسية,/student-dashboard,🏠|متجر المستكشف,🛒"},
    
    # صفحات المعلمين
    {'file': 'TeacherSettings.tsx', 'breadcrumb': "الرئيسية,/teacher-dashboard,🏠|الإعدادات,⚙️"},
    {'file': 'TeacherClassDetails.tsx', 'breadcrumb': "الرئيسية,/teacher-dashboard,🏠|تفاصيل الفصل,👥"},
    {'file': 'TeacherContentLibrary.tsx', 'breadcrumb': "الرئيسية,/teacher-dashboard,🏠|مكتبة المحتوى,📚"},
    {'file': 'TeacherGrades.tsx', 'breadcrumb': "الرئيسية,/teacher-dashboard,🏠|الدرجات,📊"},
    {'file': 'TeacherAssignments.tsx', 'breadcrumb': "الرئيسية,/teacher-dashboard,🏠|الواجبات,📋"},
    {'file': 'TeacherMessages.tsx', 'breadcrumb': "الرئيسية,/teacher-dashboard,🏠|الرسائل,💬"},
    
    # صفحات أولياء الأمور
    {'file': 'ParentChildProgress.tsx', 'breadcrumb': "الرئيسية,/parent-dashboard,🏠|تقدم الطفل,📈"},
    {'file': 'ParentReports.tsx', 'breadcrumb': "الرئيسية,/parent-dashboard,🏠|التقارير,📋"},
    {'file': 'ParentMessages.tsx', 'breadcrumb': "الرئيسية,/parent-dashboard,🏠|الرسائل,💬"},
    {'file': 'ParentSettings.tsx', 'breadcrumb': "الرئيسية,/parent-dashboard,🏠|الإعدادات,⚙️"},
    
    # صفحات المديرين
    {'file': 'SchoolAdminUsers.tsx', 'breadcrumb': "الرئيسية,/school-admin-dashboard,🏠|إدارة المستخدمين,👥"},
    {'file': 'SchoolAdminReports.tsx', 'breadcrumb': "الرئيسية,/school-admin-dashboard,🏠|التقارير,📊"},
    {'file': 'SchoolAdminSettings.tsx', 'breadcrumb': "الرئيسية,/school-admin-dashboard,🏠|الإعدادات,⚙️"},
    {'file': 'SchoolAdminClasses.tsx', 'breadcrumb': "الرئيسية,/school-admin-dashboard,🏠|إدارة الفصول,🏫"},
]

def update_page(file_path, breadcrumb_data):
    """تحديث صفحة واحدة"""
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # إنشاء breadcrumb items من البيانات
    items = []
    for item in breadcrumb_data.split('|'):
        parts = item.split(',')
        if len(parts) == 3:
            label, path, icon = parts
            items.append(f"{{ label: '{label}', path: '{path}', icon: '{icon}' }}")
        elif len(parts) == 2:
            label, icon = parts
            items.append(f"{{ label: '{label}', icon: '{icon}' }}")
    
    breadcrumb_items = '[' + ', '.join(items) + ']'
    
    # إضافة imports إذا لم تكن موجودة
    if 'import Breadcrumb' not in content:
        content = re.sub(
            r'(import.*?from.*?;)\n',
            r'\1\nimport Breadcrumb from \'../components/Breadcrumb\';\nimport RoleBasedLayout from \'../components/RoleBasedLayout\';\n',
            content,
            count=1
        )
    
    # إضافة RoleBasedLayout wrapper
    if '<RoleBasedLayout>' not in content:
        content = re.sub(
            r'return \(\s*<div className="min-h-screen',
            r'return (\n    <RoleBasedLayout>\n      <div className="min-h-screen',
            content
        )
        
        # إضافة Breadcrumb
        content = re.sub(
            r'(<div className="min-h-screen[^>]*>)',
            f'\\1\n        {{/* Breadcrumb */}}\n        <Breadcrumb items={{breadcrumb_items}} />',
            content
        )
        
        # إغلاق RoleBasedLayout
        content = re.sub(
            r'    </div>\s*\);\s*};',
            r'      </div>\n    </RoleBasedLayout>\n  );\n};',
            content
        )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    """الدالة الرئيسية"""
    base_path = 'e:/NibrassSchool/BOLT/src/pages'
    
    for page in pages_to_update:
        file_path = os.path.join(base_path, page['file'])
        print(f"Updating {page['file']}...")
        
        if update_page(file_path, page['breadcrumb']):
            print(f"✅ Updated {page['file']}")
        else:
            print(f"❌ Failed to update {page['file']}")

if __name__ == '__main__':
    main()