import { 
  BookOpen, FileText, Calendar, Award, Star, Library, User, ShoppingCart,
  Users, BarChart3, MessageSquare, Settings, School, HelpCircle,
  TrendingUp, Phone, Database, UserCheck
} from 'lucide-react';

// أزرار التنقل السريع للطلاب
export const studentQuickActions = [
  {
    label: 'موادي الدراسية',
    path: '/student-subjects',
    icon: BookOpen,
    color: 'blue',
    description: 'عرض جميع المواد الدراسية والدروس'
  },
  {
    label: 'واجباتي',
    path: '/student-homework',
    icon: FileText,
    color: 'green',
    description: 'إدارة الواجبات والمهام'
  },
  {
    label: 'جدولي الدراسي',
    path: '/student-schedule',
    icon: Calendar,
    color: 'purple',
    description: 'الجدول الأسبوعي للحصص'
  },
  {
    label: 'إنجازاتي',
    path: '/student-achievements',
    icon: Award,
    color: 'yellow',
    description: 'الشارات والإنجازات المحققة'
  },
  {
    label: 'الدينار المعرفي',
    path: '/student-points',
    icon: Star,
    color: 'orange',
    description: 'النقاط المكتسبة والمكافآت'
  },
  {
    label: 'المكتبة',
    path: '/student-library',
    icon: Library,
    color: 'indigo',
    description: 'مكتبة الكتب والقصص'
  },
  {
    label: 'متجر المستكشف',
    path: '/student-avatar-store',
    icon: ShoppingCart,
    color: 'pink',
    description: 'شراء الأفاتار والعناصر'
  },
  {
    label: 'ملفي الشخصي',
    path: '/student-profile',
    icon: User,
    color: 'gray',
    description: 'إدارة البيانات الشخصية'
  }
];

// أزرار التنقل السريع للمعلمين
export const teacherQuickActions = [
  {
    label: 'فصولي الدراسية',
    path: '/teacher-classroom',
    icon: School,
    color: 'blue',
    description: 'عرض جميع الفصول المُدرّسة'
  },
  {
    label: 'تفاصيل الفصل',
    path: '/teacher-class-details',
    icon: Users,
    color: 'green',
    description: 'إدارة شاملة للفصل'
  },
  {
    label: 'مكتبة المحتوى',
    path: '/teacher-content-library',
    icon: Library,
    color: 'purple',
    description: 'المحتوى التعليمي والموارد'
  },
  {
    label: 'الواجبات والاختبارات',
    path: '/teacher-assignments',
    icon: FileText,
    color: 'yellow',
    description: 'إنشاء وإدارة الواجبات'
  },
  {
    label: 'الدرجات',
    path: '/teacher-grades',
    icon: BarChart3,
    color: 'orange',
    description: 'إدارة درجات الطلاب'
  },
  {
    label: 'الحضور والغياب',
    path: '/teacher-attendance',
    icon: UserCheck,
    color: 'red',
    description: 'تسجيل حضور الطلاب'
  },
  {
    label: 'الرسائل',
    path: '/teacher-messages',
    icon: MessageSquare,
    color: 'indigo',
    description: 'التواصل مع الطلاب وأولياء الأمور'
  },
  {
    label: 'الإعدادات',
    path: '/teacher-settings',
    icon: Settings,
    color: 'pink',
    description: 'إعدادات المعلم'
  },
  {
    label: 'المساعدة',
    path: '/support',
    icon: HelpCircle,
    color: 'gray',
    description: 'الدعم والمساعدة'
  }
];

// أزرار التنقل السريع لأولياء الأمور
export const parentQuickActions = [
  {
    label: 'تقدم الطفل',
    path: '/parent-child-progress',
    icon: TrendingUp,
    color: 'blue',
    description: 'تتبع أداء الطفل الأكاديمي'
  },
  {
    label: 'التقارير',
    path: '/parent-reports',
    icon: BarChart3,
    color: 'green',
    description: 'التقارير الدورية والإحصائيات'
  },
  {
    label: 'الحضور والغياب',
    path: '/parent-attendance',
    icon: Calendar,
    color: 'orange',
    description: 'متابعة حضور الطفل'
  },
  {
    label: 'الرسائل',
    path: '/parent-messages',
    icon: MessageSquare,
    color: 'purple',
    description: 'التواصل مع المعلمين'
  },
  {
    label: 'الإعدادات',
    path: '/parent-settings',
    icon: Settings,
    color: 'yellow',
    description: 'إعدادات الحساب'
  },
  {
    label: 'الدعم والمساعدة',
    path: '/support',
    icon: HelpCircle,
    color: 'orange',
    description: 'مركز المساعدة'
  },
  {
    label: 'اتصل بالمدرسة',
    path: '/contact',
    icon: Phone,
    color: 'indigo',
    description: 'التواصل مع إدارة المدرسة'
  }
];

// أزرار التنقل السريع لمديري المدارس
export const adminQuickActions = [
  {
    label: 'إدارة المستخدمين',
    path: '/school-admin-users',
    icon: Users,
    color: 'blue',
    description: 'إدارة المعلمين والطلاب'
  },
  {
    label: 'إدارة الفصول',
    path: '/school-admin-classes',
    icon: School,
    color: 'green',
    description: 'إنشاء وإدارة الفصول'
  },
  {
    label: 'التقارير',
    path: '/school-admin-reports',
    icon: BarChart3,
    color: 'purple',
    description: 'التقارير الإدارية'
  },
  {
    label: 'الإعدادات',
    path: '/school-admin-settings',
    icon: Settings,
    color: 'yellow',
    description: 'إعدادات المدرسة'
  },
  {
    label: 'الدعم والمساعدة',
    path: '/support',
    icon: HelpCircle,
    color: 'orange',
    description: 'مركز الدعم'
  },
  {
    label: 'التحليلات',
    path: '/analytics',
    icon: TrendingUp,
    color: 'indigo',
    description: 'تحليلات الأداء'
  }
];

// أزرار التنقل السريع للمسؤولين التربويين
export const supervisorQuickActions = [
  {
    label: 'التحليلات المقارنة',
    path: '/educational-supervisor-analytics',
    icon: TrendingUp,
    color: 'blue',
    description: 'تحليلات مقارنة بين المدارس'
  },
  {
    label: 'الدعم والمساعدة',
    path: '/support',
    icon: HelpCircle,
    color: 'green',
    description: 'مركز المساعدة'
  }
];

// أزرار التنقل السريع للأدمين العام
export const superAdminQuickActions = [
  {
    label: 'إدارة المحتوى (CMS)',
    path: '/admin-content-management',
    icon: Database,
    color: 'blue',
    description: 'نظام إدارة المحتوى الشامل'
  },
  {
    label: 'الدعم والمساعدة',
    path: '/support',
    icon: HelpCircle,
    color: 'green',
    description: 'مركز المساعدة'
  }
];

// دالة للحصول على الأزرار حسب نوع المستخدم
export const getQuickActionsByRole = (role: string) => {
  switch (role) {
    case 'student':
      return studentQuickActions;
    case 'teacher':
      return teacherQuickActions;
    case 'parent':
      return parentQuickActions;
    case 'admin':
      return adminQuickActions;
    case 'supervisor':
      return supervisorQuickActions;
    case 'superadmin':
      return superAdminQuickActions;
    default:
      return [];
  }
};