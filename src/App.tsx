import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import UserNavigation from './components/UserNavigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Programs from './pages/Programs';
import StudentDashboard from './pages/StudentDashboard';
import StudentSubjects from './pages/StudentSubjects';
import StudentHomework from './pages/StudentHomework';
import StudentAchievements from './pages/StudentAchievements';
import StudentAvatarStore from './pages/StudentAvatarStore';
import StudentPoints from './pages/StudentPoints';
import StudentProfile from './pages/StudentProfile';
import StudentSchedule from './pages/StudentSchedule';
import StudentLibrary from './pages/StudentLibrary';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherClassroom from './pages/TeacherClassroom';
import TeacherClassDetails from './pages/TeacherClassDetails';
import TeacherContentLibrary from './pages/TeacherContentLibrary';
import TeacherGrades from './pages/TeacherGrades';
import TeacherAssignments from './pages/TeacherAssignments';
import TeacherMessages from './pages/TeacherMessages';
import TeacherSettings from './pages/TeacherSettings';
import ParentDashboard from './pages/ParentDashboard';
import ParentChildProgress from './pages/ParentChildProgress';
import ParentMessages from './pages/ParentMessages';
import ParentReports from './pages/ParentReports';
import ParentSettings from './pages/ParentSettings';
import SchoolAdminDashboard from './pages/SchoolAdminDashboard';
import SchoolAdminUsers from './pages/SchoolAdminUsers';
import SchoolAdminReports from './pages/SchoolAdminReports';
import SchoolAdminSettings from './pages/SchoolAdminSettings';
import SchoolAdminClasses from './pages/SchoolAdminClasses';
import EducationalSupervisorAnalytics from './pages/EducationalSupervisorAnalytics';
import AdminContentManagement from './pages/AdminContentManagement';
import Activities from './pages/Activities';
import News from './pages/News';
import Analytics from './pages/Analytics';
import SupportCenter from './pages/SupportCenter';
import Support from './pages/Support';
import ParentAttendance from './pages/ParentAttendance';
import TeacherAttendance from './pages/TeacherAttendance';
import TestPages from './pages/TestPages';
import AlgerianCurriculum from './pages/AlgerianCurriculum';
import DetailedCurriculum from './pages/DetailedCurriculum';
import AccountsManager from './pages/AccountsManager';
import Welcome from './pages/Welcome';
import SystemValidation from './pages/SystemValidation';
import LessonModalTest from './components/LessonModalTest';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  // صفحات لوحة التحكم التي تحتاج UserNavigation
  const dashboardRoutes = [
    '/student-dashboard',
    '/student-subjects', 
    '/student-homework',
    '/student-achievements',
    '/student-avatar-store',
    '/student-points',
    '/student-profile',
    '/student-schedule',
    '/student-library',
    '/teacher-dashboard',
    '/teacher-classroom',
    '/teacher-class-details',
    '/teacher-content-library',
    '/teacher-grades',
    '/teacher-assignments',
    '/teacher-messages',
    '/teacher-attendance',
    '/teacher-settings',
    '/parent-dashboard',
    '/parent-child-progress',
    '/parent-attendance',
    '/parent-messages',
    '/parent-reports',
    '/parent-settings',
    '/school-admin-dashboard',
    '/school-admin-users',
    '/school-admin-reports',
    '/school-admin-settings',
    '/school-admin-classes',
    '/educational-supervisor-analytics',
    '/admin-content-management',
    '/activities',
    '/news',
    '/analytics',
    '/support'
  ];
  
  const isDashboardRoute = dashboardRoutes.includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-white">
      {isDashboardRoute ? <UserNavigation /> : <Header />}
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-subjects" element={<StudentSubjects />} />
            <Route path="/student-homework" element={<StudentHomework />} />
            <Route path="/student-achievements" element={<StudentAchievements />} />
            <Route path="/student-avatar-store" element={<StudentAvatarStore />} />
            <Route path="/student-points" element={<StudentPoints />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route path="/student-schedule" element={<StudentSchedule />} />
            <Route path="/student-library" element={<StudentLibrary />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher-classroom" element={<TeacherClassroom />} />
            <Route path="/teacher-class-details" element={<TeacherClassDetails />} />
            <Route path="/teacher-content-library" element={<TeacherContentLibrary />} />
            <Route path="/teacher-grades" element={<TeacherGrades />} />
            <Route path="/teacher-assignments" element={<TeacherAssignments />} />
            <Route path="/teacher-messages" element={<TeacherMessages />} />
            <Route path="/teacher-attendance" element={<TeacherAttendance />} />
            <Route path="/teacher-settings" element={<TeacherSettings />} />
            
            {/* Parent Routes */}
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/parent-child-progress" element={<ParentChildProgress />} />
            <Route path="/parent-attendance" element={<ParentAttendance />} />
            <Route path="/parent-messages" element={<ParentMessages />} />
            <Route path="/parent-reports" element={<ParentReports />} />
            <Route path="/parent-settings" element={<ParentSettings />} />
            
            {/* School Admin Routes */}
            <Route path="/school-admin-dashboard" element={<SchoolAdminDashboard />} />
            <Route path="/school-admin-users" element={<SchoolAdminUsers />} />
            <Route path="/school-admin-reports" element={<SchoolAdminReports />} />
            <Route path="/school-admin-settings" element={<SchoolAdminSettings />} />
            <Route path="/school-admin-classes" element={<SchoolAdminClasses />} />
            
            {/* Educational Supervisor Routes */}
            <Route path="/educational-supervisor-analytics" element={<EducationalSupervisorAnalytics />} />
            
            {/* Admin Routes */}
            <Route path="/admin-content-management" element={<AdminContentManagement />} />
            
            {/* General Routes */}
            <Route path="/activities" element={<Activities />} />
            <Route path="/news" element={<News />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* Support */}
            <Route path="/support-center" element={<SupportCenter />} />
            <Route path="/support" element={<Support />} />
            
            {/* Test Pages */}
            <Route path="/test" element={<TestPages />} />
            
            {/* Keep old programs route for backward compatibility */}
            <Route path="/programs" element={<Programs />} />
            
            {/* Algerian Curriculum */}
            <Route path="/curriculum" element={<AlgerianCurriculum />} />
            <Route path="/detailed-curriculum" element={<DetailedCurriculum />} />
            
            {/* Admin Tools */}
            <Route path="/accounts-manager" element={<AccountsManager />} />
            <Route path="/system-validation" element={<SystemValidation />} />
            
            {/* Welcome Page */}
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
};

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </Router>
  );
}

export default App;
