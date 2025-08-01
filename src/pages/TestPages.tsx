import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Award, MessageSquare, School, UserCheck, HelpCircle, Home, BarChart3, Settings, Calendar, FileText, Star, Library, TrendingUp, Database, GraduationCap, Clock, Folder } from 'lucide-react';

const TestPages: React.FC = () => {
  const pageCategories = [
    {
      title: 'الصفحات العامة',
      color: 'blue',
      pages: [
        { path: '/', title: 'الصفحة الرئيسية', icon: Home, description: 'صفحة الترحيب والتعريف بالمنصة' },
        { path: '/about', title: 'من نحن', icon: Users, description: 'معلومات عن المنصة والفريق' },
        { path: '/features', title: 'الميزات', icon: Settings, description: 'ميزات وخصائص المنصة' },
        { path: '/pricing', title: 'الأسعار', icon: BarChart3, description: 'خطط الاشتراك والأسعار' },
        { path: '/contact', title: 'اتصل بنا', icon: MessageSquare, description: 'نموذج التواصل والاستفسارات' },
        { path: '/login', title: 'تسجيل الدخول', icon: UserCheck, description: 'صفحة تسجيل الدخول مع الحسابات الوهمية' },
        { path: '/support', title: 'مركز الدعم', icon: HelpCircle, description: 'مركز المساعدة وقاعدة المعرفة' }
      ]
    },
    {
      title: 'صفحات التلميذ',
      color: 'green',
      pages: [
        { path: '/student-dashboard', title: 'رحلتي', icon: Home, description: 'لوحة تحكم التلميذ مع خريطة الجزائر التفاعلية' },
        { path: '/student-subjects', title: 'موادي الدراسية', icon: BookOpen, description: 'عرض المواد والدروس والوحدات' },
        { path: '/student-homework', title: 'واجباتي', icon: FileText, description: 'إدارة الواجبات (جديد، قيد الإنجاز، مكتمل)' },
        { path: '/student-schedule', title: 'جدولي الدراسي', icon: Calendar, description: 'الجدول الأسبوعي للحصص والأنشطة' },
        { path: '/student-achievements', title: 'إنجازاتي وشخصيتي', icon: Award, description: 'الشارات والإنجازات ومتجر المستكشف' },
        { path: '/student-points', title: 'الدينار المعرفي', icon: Star, description: 'النقاط المكتسبة والمكافآت' },
        { path: '/student-library', title: 'المكتبة', icon: Library, description: 'مكتبة الكتب والقصص التعليمية' },
        { path: '/student-profile', title: 'ملفي الشخصي', icon: Users, description: 'إدارة البيانات الشخصية والإعدادات' },
        { path: '/student-avatar-store', title: 'متجر المستكشف', icon: GraduationCap, description: 'شراء الأفاتار والعناصر بالنقاط' }
      ]
    },
    {
      title: 'صفحات المعلم',
      color: 'purple',
      pages: [
        { path: '/teacher-dashboard', title: 'لوحة التحكم', icon: Home, description: 'نظرة شاملة على المهام والفصول' },
        { path: '/teacher-classroom', title: 'فصولي الدراسية', icon: School, description: 'عرض جميع الفصول المُدرّسة' },
        { path: '/teacher-class-details', title: 'تفاصيل الفصل', icon: Users, description: 'إدارة شاملة للفصل (طلاب، درجات، واجبات، تحليلات)' },
        { path: '/teacher-content-library', title: 'مكتبة المحتوى', icon: Library, description: 'مجموعة شاملة من المحتوى التعليمي' },
        { path: '/teacher-assignments', title: 'الواجبات والاختبارات', icon: FileText, description: 'إنشاء وإدارة الواجبات والاختبارات' },
        { path: '/teacher-grades', title: 'الدرجات', icon: BarChart3, description: 'إدارة درجات الطلاب والتقييمات' },
        { path: '/teacher-messages', title: 'الرسائل', icon: MessageSquare, description: 'التواصل مع الطلاب وأولياء الأمور' },
        { path: '/teacher-settings', title: 'الإعدادات', icon: Settings, description: 'إعدادات المعلم والتفضيلات' }
      ]
    },
    {
      title: 'صفحات ولي الأمر',
      color: 'orange',
      pages: [
        { path: '/parent-dashboard', title: 'لوحة التحكم', icon: Home, description: 'نظرة شاملة على تقدم الأطفال' },
        { path: '/parent-child-progress', title: 'تقدم الطفل', icon: TrendingUp, description: 'تتبع مفصل لأداء الطفل الأكاديمي' },
        { path: '/parent-reports', title: 'التقارير', icon: BarChart3, description: 'التقارير الدورية والإحصائيات' },
        { path: '/parent-messages', title: 'الرسائل', icon: MessageSquare, description: 'التواصل مع المعلمين والإدارة' },
        { path: '/parent-settings', title: 'الإعدادات', icon: Settings, description: 'إعدادات الحساب والإشعارات' }
      ]
    },
    {
      title: 'صفحات مدير المدرسة',
      color: 'red',
      pages: [
        { path: '/school-admin-dashboard', title: 'لوحة التحكم', icon: Home, description: 'نظرة شاملة على المدرسة والإحصائيات' },
        { path: '/school-admin-users', title: 'إدارة المستخدمين', icon: Users, description: 'إدارة المعلمين والطلاب وأولياء الأمور' },
        { path: '/school-admin-classes', title: 'إدارة الفصول', icon: School, description: 'إنشاء وإدارة الفصول الدراسية' },
        { path: '/school-admin-reports', title: 'التقارير', icon: BarChart3, description: 'التقارير الإدارية والأكاديمية' },
        { path: '/school-admin-settings', title: 'الإعدادات', icon: Settings, description: 'إعدادات المدرسة والنظام' }
      ]
    },
    {
      title: 'صفحات المسؤول التربوي',
      color: 'indigo',
      pages: [
        { path: '/educational-supervisor-analytics', title: 'التحليلات المقارنة', icon: TrendingUp, description: 'تحليلات مقارنة للأداء التعليمي بين المدارس' }
      ]
    },
    {
      title: 'صفحات الأدمين العام',
      color: 'gray',
      pages: [
        { path: '/admin-content-management', title: 'إدارة المحتوى (CMS)', icon: Database, description: 'نظام إدارة المحتوى التعليمي الشامل' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">🧪 صفحة اختبار المنصة</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            اختبر جميع صفحات منصة نبراس الجزائر التعليمية
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
            <p className="text-sm">
              💡 <strong>نصيحة:</strong> استخدم صفحة تسجيل الدخول للوصول إلى الحسابات الوهمية
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {pageCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className={`text-3xl font-bold text-${category.color}-600 text-center mb-8`}>
              {category.title}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.pages.map((page, pageIndex) => (
                <Link
                  key={pageIndex}
                  to={page.path}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className={`bg-${category.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <page.icon className={`h-8 w-8 text-${category.color}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                    {page.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {page.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-${category.color}-600 font-semibold group-hover:text-green-600 transition-colors`}>
                      زيارة الصفحة →
                    </span>
                    <div className={`w-2 h-2 bg-${category.color}-600 rounded-full group-hover:bg-green-600 transition-colors`}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Access to Demo Accounts */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">🚀 الوصول السريع للحسابات الوهمية</h2>
          <p className="text-xl mb-8 opacity-90">
            انقر على الأزرار أدناه للدخول مباشرة إلى لوحات التحكم المختلفة
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-colors group"
            >
              <Users className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-2">تلميذ</div>
              <div className="text-sm opacity-80">أحمد بن محمد</div>
            </Link>
            
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-colors group"
            >
              <UserCheck className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-2">معلم</div>
              <div className="text-sm opacity-80">أ. فاطمة أحمد</div>
            </Link>
            
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-colors group"
            >
              <Users className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-2">ولي أمر</div>
              <div className="text-sm opacity-80">محمد والد أحمد</div>
            </Link>
            
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-colors group"
            >
              <School className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-2">مدير مدرسة</div>
              <div className="text-sm opacity-80">د. خالد مدير</div>
            </Link>
            
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-colors group"
            >
              <TrendingUp className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-2">مسؤول تربوي</div>
              <div className="text-sm opacity-80">د. أمينة مشرف</div>
            </Link>
            
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-colors group"
            >
              <Database className="h-8 w-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-semibold mb-2">أدمين عام</div>
              <div className="text-sm opacity-80">م. يوسف أدمين</div>
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <p className="text-sm">
              📧 <strong>البريد:</strong> [نوع المستخدم]@demo.com | 
              🔑 <strong>كلمة المرور:</strong> 123456
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">📊 إحصائيات المشروع</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
              <div className="text-gray-600">إجمالي الصفحات</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">29</div>
              <div className="text-gray-600">صفحات تفاعلية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-gray-600">أنواع مستخدمين</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">متجاوب</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPages;