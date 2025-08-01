// دوال مساعدة للصفحات

export const getPageBreadcrumb = (pageName: string, role: string = 'student') => {
  const baseDashboard = role === 'student' ? '/student-dashboard' :
                       role === 'teacher' ? '/teacher-dashboard' :
                       role === 'parent' ? '/parent-dashboard' :
                       role === 'admin' ? '/school-admin-dashboard' :
                       role === 'supervisor' ? '/educational-supervisor-analytics' :
                       role === 'superadmin' ? '/admin-content-management' : 
                       '/student-dashboard';

  const baseDashboardLabel = role === 'student' ? 'لوحة الطالب' :
                            role === 'teacher' ? 'لوحة المعلم' :
                            role === 'parent' ? 'لوحة ولي الأمر' :
                            role === 'admin' ? 'لوحة المدير' :
                            role === 'supervisor' ? 'لوحة المفتش' :
                            role === 'superadmin' ? 'لوحة الأدمين العام' : 
                            'الرئيسية';

  const pageNames: { [key: string]: { label: string, icon: string } } = {
    // صفحات الطلاب
    'student-subjects': { label: 'موادي الدراسية', icon: '📚' },
    'student-homework': { label: 'واجباتي', icon: '📝' },
    'student-achievements': { label: 'إنجازاتي', icon: '🏆' },
    'student-points': { label: 'الدينار المعرفي', icon: '💰' },
    'student-schedule': { label: 'جدولي الدراسي', icon: '📅' },
    'student-library': { label: 'المكتبة', icon: '📖' },
    'student-profile': { label: 'ملفي الشخصي', icon: '👤' },
    'student-avatar-store': { label: 'متجر المستكشف', icon: '🛒' },

    // صفحات المعلمين
    'teacher-classroom': { label: 'فصولي الدراسية', icon: '🏫' },
    'teacher-class-details': { label: 'تفاصيل الفصل', icon: '👥' },
    'teacher-content-library': { label: 'مكتبة المحتوى', icon: '📚' },
    'teacher-assignments': { label: 'الواجبات والاختبارات', icon: '📋' },
    'teacher-grades': { label: 'الدرجات', icon: '📊' },
    'teacher-messages': { label: 'الرسائل', icon: '💬' },
    'teacher-settings': { label: 'الإعدادات', icon: '⚙️' },

    // صفحات أولياء الأمور
    'parent-child-progress': { label: 'تقدم الطفل', icon: '📈' },
    'parent-reports': { label: 'التقارير', icon: '📋' },
    'parent-messages': { label: 'الرسائل', icon: '💬' },
    'parent-settings': { label: 'الإعدادات', icon: '⚙️' },

    // صفحات المديرين
    'school-admin-users': { label: 'إدارة المستخدمين', icon: '👥' },
    'school-admin-classes': { label: 'إدارة الفصول', icon: '🏫' },
    'school-admin-reports': { label: 'التقارير الإدارية', icon: '📊' },
    'school-admin-settings': { label: 'إعدادات المدرسة', icon: '⚙️' },

    // صفحات عامة
    'support': { label: 'الدعم والمساعدة', icon: '❓' },
    'analytics': { label: 'التحليلات', icon: '📊' },
    'contact': { label: 'اتصل بنا', icon: '📞' }
  };

  const pageInfo = pageNames[pageName];
  
  return [
    { label: baseDashboardLabel, path: baseDashboard, icon: '🏠' },
    { label: pageInfo?.label || pageName, icon: pageInfo?.icon || '📄' }
  ];
};

export const getPageTitle = (pageName: string): string => {
  const titles: { [key: string]: string } = {
    // صفحات الطلاب
    'student-subjects': 'موادي الدراسية',
    'student-homework': 'واجباتي',
    'student-achievements': 'إنجازاتي',
    'student-points': 'النقاط والدنانير المعرفية',
    'student-schedule': 'جدولي الدراسي',
    'student-library': 'المكتبة',
    'student-profile': 'ملفي الشخصي',
    'student-avatar-store': 'متجر المستكشف',

    // صفحات المعلمين
    'teacher-classroom': 'فصولي الدراسية',
    'teacher-class-details': 'تفاصيل الفصل',
    'teacher-content-library': 'مكتبة المحتوى',
    'teacher-assignments': 'الواجبات والاختبارات',
    'teacher-grades': 'إدارة الدرجات',
    'teacher-messages': 'الرسائل',
    'teacher-settings': 'الإعدادات',

    // صفحات أولياء الأمور
    'parent-child-progress': 'تقدم الطفل',
    'parent-reports': 'التقارير',
    'parent-messages': 'الرسائل',
    'parent-settings': 'الإعدادات',

    // صفحات المديرين
    'school-admin-users': 'إدارة المستخدمين',
    'school-admin-classes': 'إدارة الفصول',
    'school-admin-reports': 'التقارير الإدارية',
    'school-admin-settings': 'إعدادات المدرسة'
  };

  return titles[pageName] || pageName;
};