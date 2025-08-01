import React from 'react';
import { AccountManager } from '../utils/accountManager';
import QuickActions from './QuickActions';
import FloatingActionButton from './FloatingActionButton';
import { getQuickActionsByRole } from '../data/quickActions';
import { Home, HelpCircle, MessageSquare, Settings, BookOpen, FileText, Users, BarChart3 } from 'lucide-react';

interface RoleBasedLayoutProps {
  children: React.ReactNode;
  showQuickActions?: boolean;
  showFloatingButton?: boolean;
}

const RoleBasedLayout: React.FC<RoleBasedLayoutProps> = ({
  children,
  showQuickActions = true,
  showFloatingButton = true
}) => {
  const currentUser = AccountManager.getCurrentUser();
  const role = currentUser?.role || 'student';
  const quickActions = getQuickActionsByRole(role);

  // إعداد الأزرار العائمة حسب النوع
  const getFloatingActions = (role: string) => {
    const baseDashboard = role === 'student' ? '/student-dashboard' :
                         role === 'teacher' ? '/teacher-dashboard' :
                         role === 'parent' ? '/parent-dashboard' :
                         role === 'admin' ? '/school-admin-dashboard' :
                         role === 'supervisor' ? '/educational-supervisor-analytics' :
                         role === 'superadmin' ? '/admin-content-management' : 
                         '/student-dashboard';

    switch (role) {
      case 'student':
        return [
          { label: 'الرئيسية', path: baseDashboard, icon: Home, color: 'blue' },
          { label: 'موادي الدراسية', path: '/student-subjects', icon: BookOpen, color: 'green' },
          { label: 'واجباتي', path: '/student-homework', icon: FileText, color: 'purple' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'orange' }
        ];
      case 'teacher':
        return [
          { label: 'الرئيسية', path: baseDashboard, icon: Home, color: 'blue' },
          { label: 'فصولي', path: '/teacher-classroom', icon: Users, color: 'green' },
          { label: 'الرسائل', path: '/teacher-messages', icon: MessageSquare, color: 'purple' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'orange' }
        ];
      case 'parent':
        return [
          { label: 'الرئيسية', path: baseDashboard, icon: Home, color: 'blue' },
          { label: 'تقدم الطفل', path: '/parent-child-progress', icon: BarChart3, color: 'green' },
          { label: 'الرسائل', path: '/parent-messages', icon: MessageSquare, color: 'purple' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'orange' }
        ];
      case 'admin':
        return [
          { label: 'الرئيسية', path: baseDashboard, icon: Home, color: 'blue' },
          { label: 'إدارة المستخدمين', path: '/school-admin-users', icon: Users, color: 'green' },
          { label: 'التقارير', path: '/school-admin-reports', icon: BarChart3, color: 'purple' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'orange' }
        ];
      default:
        return [
          { label: 'الرئيسية', path: baseDashboard, icon: Home, color: 'blue' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'green' },
          { label: 'الإعدادات', path: '/settings', icon: Settings, color: 'gray' }
        ];
    }
  };

  const floatingActions = getFloatingActions(role);

  return (
    <div className="relative">
      {children}
      
      {showQuickActions && quickActions.length > 0 && (
        <div className="container mx-auto px-4 pb-8">
          <QuickActions actions={quickActions} />
        </div>
      )}
      
      {showFloatingButton && (
        <FloatingActionButton actions={floatingActions} />
      )}
    </div>
  );
};

export default RoleBasedLayout;