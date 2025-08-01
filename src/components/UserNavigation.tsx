import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Settings, Bell, Menu, X, Home, BookOpen, Users, BarChart3, MessageSquare, Award, HelpCircle, Calendar, FileText, School, TrendingUp, Database, Clock, Star, Library } from 'lucide-react';

interface UserData {
  role: string;
  name: string;
  email: string;
  dashboard: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const UserNavigation: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  const getNavigationItems = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case 'student':
        return [
          { path: '/student-dashboard', label: 'رحلتي', icon: Home },
          { path: '/student-subjects', label: 'موادي الدراسية', icon: BookOpen },
          { path: '/student-homework', label: 'واجباتي', icon: FileText },
          { path: '/student-schedule', label: 'جدولي', icon: Calendar },
          { path: '/student-achievements', label: 'إنجازاتي', icon: Award },
          { path: '/student-points', label: 'نقاطي', icon: Star },
          { path: '/student-library', label: 'المكتبة', icon: Library },
          { path: '/student-profile', label: 'ملفي الشخصي', icon: User },
          { path: '/support', label: 'المساعدة', icon: HelpCircle }
        ];
      case 'teacher':
        return [
          { path: '/teacher-dashboard', label: 'لوحة التحكم', icon: Home },
          { path: '/teacher-classroom', label: 'فصولي الدراسية', icon: School },
          { path: '/teacher-class-details', label: 'تفاصيل الفصل', icon: Users },
          { path: '/teacher-content-library', label: 'مكتبة المحتوى', icon: Library },
          { path: '/teacher-assignments', label: 'الواجبات والاختبارات', icon: FileText },
          { path: '/teacher-grades', label: 'الدرجات', icon: BarChart3 },
          { path: '/teacher-messages', label: 'الرسائل', icon: MessageSquare },
          { path: '/teacher-attendance', label: 'الحضور والغياب', icon: Clock },
          { path: '/teacher-settings', label: 'الإعدادات', icon: Settings },
          { path: '/support', label: 'المساعدة', icon: HelpCircle }
        ];
      case 'parent':
        return [
          { path: '/parent-dashboard', label: 'متابعة الأطفال', icon: Home },
          { path: '/parent-child-progress', label: 'تقدم الطفل', icon: TrendingUp },
          { path: '/parent-reports', label: 'التقارير', icon: BarChart3 },
          { path: '/parent-attendance', label: 'الحضور والغياب', icon: Calendar },
          { path: '/parent-messages', label: 'الرسائل', icon: MessageSquare },
          { path: '/parent-settings', label: 'الإعدادات', icon: Settings },
          { path: '/support', label: 'المساعدة', icon: HelpCircle }
        ];
      case 'admin':
        return [
          { path: '/school-admin-dashboard', label: 'لوحة التحكم', icon: Home },
          { path: '/school-admin-users', label: 'إدارة المستخدمين', icon: Users },
          { path: '/school-admin-classes', label: 'إدارة الفصول', icon: School },
          { path: '/school-admin-reports', label: 'التقارير', icon: BarChart3 },
          { path: '/school-admin-settings', label: 'الإعدادات', icon: Settings },
          { path: '/analytics', label: 'التحليلات', icon: TrendingUp },
          { path: '/news', label: 'الأخبار', icon: Bell },
          { path: '/activities', label: 'الأنشطة', icon: Calendar },
          { path: '/support', label: 'المساعدة', icon: HelpCircle }
        ];
      case 'supervisor':
        return [
          { path: '/educational-supervisor-analytics', label: 'التحليلات المقارنة', icon: TrendingUp },
          { path: '/support', label: 'المساعدة', icon: HelpCircle }
        ];
      case 'superadmin':
        return [
          { path: '/admin-content-management', label: 'إدارة المحتوى', icon: Database },
          { path: '/support', label: 'المساعدة', icon: HelpCircle }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="bg-gradient-to-r from-green-600 to-red-600 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ن</span>
            </div>
            <span className="text-xl font-bold text-gray-800">نبراس الجزائر</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4 ml-2" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`bg-${currentUser.color}-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                  <div className="text-xs text-gray-500">{currentUser.description}</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                    <div className="text-xs text-gray-500">{currentUser.email}</div>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="h-4 w-4 ml-2" />
                    الملف الشخصي
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4 ml-2" />
                    الإعدادات
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 ml-2" />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 ml-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default UserNavigation;