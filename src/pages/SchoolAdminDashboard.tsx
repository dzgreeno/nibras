import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Users, TrendingUp, Calendar, MessageSquare, AlertCircle, CheckCircle, Clock, Star, BarChart3, School, UserCheck, Plus, Eye, Edit, MapPin } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { SAMPLE_SCHOOLS, SAMPLE_CLASSES, PRIMARY_GRADES } from '../data/algerianEducationSystem';
import QuickActions from '../components/QuickActions';
import { adminQuickActions } from '../data/quickActions';

interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  performance: number;
}

interface Teacher {
  id: string | number;
  name: string;
  subject: string;
  classes: string[];
  performance: string;
  experience?: string;
  studentsCount?: number;
  avgStudentGrade?: number;
}

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface AdminData {
  name: string;
  principal: string;
  position: string;
  location: string;
  address: string;
  phone: string;
  capacity: number;
  established: number;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageGrade: string;
}

const SchoolAdminDashboard: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'teachers' | 'students' | 'reports'>('overview');
  const [showClassModal, setShowClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'class' | 'teacher' | 'student' | 'announcement'>('class');

  const [schoolData, setSchoolData] = useState<AdminData | null>(null);
  const [classesData, setClassesData] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'admin' && currentUser.adminData) {
      const school = SAMPLE_SCHOOLS.find(s => s.id === currentUser.school);
      const schoolClasses = SAMPLE_CLASSES.filter(c => c.school === currentUser.school);
      
      setSchoolData({
        name: currentUser.schoolName,
        principal: currentUser.name,
        position: currentUser.adminData.position,
        location: currentUser.wilaya,
        address: school?.address || '',
        phone: school?.phone || '',
        capacity: school?.capacity || 0,
        established: school?.established || 0,
        totalStudents: schoolClasses.reduce((sum, cls) => sum + cls.currentStudents, 0),
        totalTeachers: Math.floor(schoolClasses.length * 0.8), // تقدير عدد المعلمين
        totalClasses: schoolClasses.length,
        averageGrade: (Math.random() * 3 + 12).toFixed(1)
      });

      const classesWithGrades = schoolClasses.map(cls => {
        const grade = PRIMARY_GRADES.find(g => g.id === cls.grade);
        return {
          id: cls.id,
          name: `${grade?.name} - ${cls.name}`,
          level: grade?.name || cls.grade,
          students: cls.currentStudents,
          capacity: cls.capacity,
          teacher: cls.teacher,
          avgGrade: (Math.random() * 5 + 10).toFixed(1),
          attendance: Math.floor(Math.random() * 10 + 85),
          subjects: grade?.subjects || []
        };
      });

      setClassesData(classesWithGrades);
    }
  }, []);

  const teachersData = [
    {
      id: 1,
      name: 'أ. فاطمة أحمد',
      subject: 'اللغة العربية',
      classes: ['الثالثة أ', 'الثالثة ب'],
      experience: '8 سنوات',
      performance: 'ممتاز',
      studentsCount: 54,
      avgStudentGrade: 15.8
    },
    {
      id: 2,
      name: 'أ. محمد العلي',
      subject: 'الرياضيات',
      classes: ['الأولى أ', 'الثانية أ'],
      experience: '12 سنة',
      performance: 'ممتاز',
      studentsCount: 53,
      avgStudentGrade: 14.9
    },
    {
      id: 3,
      name: 'أ. سارة أحمد',
      subject: 'العلوم الطبيعية',
      classes: ['الأولى ب', 'الثانية ب'],
      experience: '5 سنوات',
      performance: 'جيد جداً',
      studentsCount: 51,
      avgStudentGrade: 15.2
    },
    {
      id: 4,
      name: 'أ. خالد السعد',
      subject: 'التاريخ والجغرافيا',
      classes: ['الثالثة أ', 'الثالثة ب'],
      experience: '15 سنة',
      performance: 'ممتاز',
      studentsCount: 48,
      avgStudentGrade: 16.1
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'urgent',
      title: 'غياب مستمر - طالب أحمد بن علي',
      description: 'غاب لمدة 5 أيام متتالية بدون مبرر',
      class: 'الثالثة أ',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'صيانة مطلوبة في المختبر',
      description: 'تحتاج أجهزة الكمبيوتر إلى صيانة',
      location: 'مختبر الحاسوب',
      date: '2024-01-14',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'تفوق الفصل الثاني أ',
      description: 'حقق أعلى معدل في الاختبار الشهري',
      class: 'الثانية أ',
      date: '2024-01-13',
      priority: 'low'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'اجتماع المعلمين الشهري',
      date: '2024-01-18',
      time: '14:00',
      location: 'قاعة الاجتماعات',
      attendees: 28
    },
    {
      id: 2,
      title: 'اجتماع أولياء الأمور',
      date: '2024-01-20',
      time: '15:00',
      location: 'القاعة الكبرى',
      attendees: 200
    },
    {
      id: 3,
      title: 'الاختبارات الفصلية',
      date: '2024-01-25',
      time: '08:00',
      location: 'جميع القاعات',
      attendees: 450
    }
  ];

  const monthlyStats = {
    totalRevenue: '2,450,000 دج',
    expenses: '1,890,000 دج',
    newEnrollments: 15,
    graduations: 0,
    teacherSatisfaction: 92,
    parentSatisfaction: 88
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'ممتاز': return 'text-green-600 bg-green-100';
      case 'جيد جداً': return 'text-blue-600 bg-blue-100';
      case 'جيد': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewClass = (classData: any) => {
    setSelectedClass(classData);
    setShowClassModal(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowTeacherModal(true);
  };



  const handleCreateNew = (type: 'class' | 'teacher' | 'student' | 'announcement') => {
    setCreateType(type);
    setShowCreateModal(true);
  };

  const handleSubmitCreate = () => {
    const typeText = 
      createType === 'class' ? 'الفصل' :
      createType === 'teacher' ? 'المعلم' :
      createType === 'student' ? 'الطالب' : 'الإعلان';
    showSuccess('تم بنجاح', `تم إنشاء ${typeText} بنجاح!`);
    setShowCreateModal(false);
  };

  const handleDownloadReport = () => {
    showInfo('تقرير', 'جاري تحميل التقرير الشامل للمدرسة...');
  };

  const handleResolveAlert = (alertId: number) => {
    showSuccess('تم بنجاح', `تم حل التنبيه رقم ${alertId} بنجاح!`);
  };

  if (!schoolData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المدرسة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">مرحباً {schoolData.principal}! 🏫</h1>
              <p className="text-green-100">{schoolData.name} - {schoolData.location}</p>
              <p className="text-green-200 text-sm mt-1">
                {schoolData.position} | تأسست عام {schoolData.established}
              </p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{schoolData.totalStudents}</div>
                <div className="text-sm">طالب</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{schoolData.totalTeachers}</div>
                <div className="text-sm">معلم</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{schoolData.totalClasses}</div>
                <div className="text-sm">فصل</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="h-5 w-5 inline ml-2" />
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'classes'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <School className="h-5 w-5 inline ml-2" />
              الفصول
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'teachers'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="h-5 w-5 inline ml-2" />
              المعلمون
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'students'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <UserCheck className="h-5 w-5 inline ml-2" />
              الطلاب
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'reports'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="h-5 w-5 inline ml-2" />
              التقارير
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{schoolData.totalStudents}</div>
                    <div className="text-sm text-gray-600">إجمالي الطلاب</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{schoolData.totalTeachers}</div>
                    <div className="text-sm text-gray-600">إجمالي المعلمين</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <School className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{schoolData.totalClasses}</div>
                    <div className="text-sm text-gray-600">إجمالي الفصول</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{schoolData.averageGrade}</div>
                    <div className="text-sm text-gray-600">المعدل العام</div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <AlertCircle className="h-6 w-6 text-red-500 ml-2" />
                    التنبيهات الحديثة
                  </h3>
                  
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className={`border-l-4 rounded-lg p-4 ${getPriorityColor(alert.priority)}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                              {alert.class && <span className="ml-4">الفصل: {alert.class}</span>}
                              {alert.location && <span className="ml-4">المكان: {alert.location}</span>}
                              <span>التاريخ: {new Date(alert.date).toLocaleDateString('ar-DZ')}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleResolveAlert(alert.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            معالجة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Calendar className="h-6 w-6 text-blue-500 ml-2" />
                    الأحداث القادمة
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 ml-1" />
                            {new Date(event.date).toLocaleDateString('ar-DZ')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 ml-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 ml-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 ml-1" />
                            {event.attendees} مشارك
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'classes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">إدارة الفصول الدراسية</h3>
                  <button 
                    onClick={() => handleCreateNew('class')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline ml-1" />
                    إضافة فصل جديد
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {classesData.map((classItem) => (
                    <div key={classItem.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">{classItem.name}</h4>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button 
                            onClick={() => handleViewClass(classItem)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => showInfo('إشعار', `✏️ تعديل ${classItem.name}...`)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">المعلم المسؤول</span>
                          <span className="font-semibold">{classItem.teacher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الطلاب</span>
                          <span className="font-semibold">{classItem.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المعدل العام</span>
                          <span className={`font-semibold ${
                            classItem.avgGrade >= 15 ? 'text-green-600' :
                            classItem.avgGrade >= 12 ? 'text-blue-600' : 'text-red-600'
                          }`}>
                            {classItem.avgGrade}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">نسبة الحضور</span>
                          <span className="font-semibold text-blue-600">{classItem.attendance}%</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-gray-600 mb-2 block">المواد:</span>
                        <div className="flex flex-wrap gap-2">
                          {classItem.subjects.map((subject: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleViewClass(classItem)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        عرض تفاصيل الفصل
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teachers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">إدارة المعلمين</h3>
                  <button 
                    onClick={() => handleCreateNew('teacher')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline ml-1" />
                    إضافة معلم جديد
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {teachersData.map((teacher) => (
                    <div key={teacher.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ml-4">
                          {teacher.name.split(' ')[1]?.charAt(0) || 'م'}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">{teacher.name}</h4>
                          <p className="text-gray-600">{teacher.subject}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(teacher.performance)}`}>
                          {teacher.performance}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">سنوات الخبرة</span>
                          <span className="font-semibold">{teacher.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الطلاب</span>
                          <span className="font-semibold">{teacher.studentsCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">متوسط درجات الطلاب</span>
                          <span className="font-semibold text-green-600">{teacher.avgStudentGrade}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-gray-600 mb-2 block">الفصول المسؤول عنها:</span>
                        <div className="flex flex-wrap gap-2">
                          {teacher.classes.map((className, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {className}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewTeacher(teacher)}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          عرض الملف
                        </button>
                        <button 
                          onClick={() => showInfo('رسالة', `إرسال رسالة إلى ${teacher.name}...`)}
                          className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          إرسال رسالة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">إدارة الطلاب</h3>
                <p className="text-gray-500 mb-6">عرض وإدارة جميع طلاب المدرسة</p>
                <button 
                  onClick={() => showInfo('إشعار', '👥 جاري تحميل قائمة الطلاب الشاملة (450 طالب)...')}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  عرض قائمة الطلاب
                </button>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">التقارير والإحصائيات</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{monthlyStats.totalRevenue}</div>
                    <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-6 text-center">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-600">{monthlyStats.expenses}</div>
                    <div className="text-sm text-gray-600">إجمالي المصروفات</div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{monthlyStats.newEnrollments}</div>
                    <div className="text-sm text-gray-600">تسجيلات جديدة</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{monthlyStats.teacherSatisfaction}%</div>
                    <div className="text-sm text-gray-600">رضا المعلمين</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{monthlyStats.parentSatisfaction}%</div>
                    <div className="text-sm text-gray-600">رضا أولياء الأمور</div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-xl p-6 text-center">
                    <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{monthlyStats.graduations}</div>
                    <div className="text-sm text-gray-600">خريجون هذا الشهر</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">تقارير سريعة</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => showInfo('تقرير', 'جاري إنشاء تقرير الحضور الشهري...')}
                        className="w-full text-right p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        تقرير الحضور الشهري
                      </button>
                      <button 
                        onClick={() => showInfo('تقرير', 'جاري إنشاء تقرير الدرجات الفصلية...')}
                        className="w-full text-right p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        تقرير الدرجات الفصلية
                      </button>
                      <button 
                        onClick={() => showInfo('تقرير', 'جاري إنشاء تقرير أداء المعلمين...')}
                        className="w-full text-right p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        تقرير أداء المعلمين
                      </button>
                      <button 
                        onClick={() => showInfo('تقرير', 'جاري إنشاء تقرير الأنشطة المدرسية...')}
                        className="w-full text-right p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        تقرير الأنشطة المدرسية
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">تقارير مخصصة</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقرير</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>تقرير شامل</option>
                          <option>تقرير الفصل</option>
                          <option>تقرير المعلم</option>
                          <option>تقرير الطالب</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الفترة الزمنية</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>هذا الشهر</option>
                          <option>الشهر الماضي</option>
                          <option>هذا الفصل</option>
                          <option>السنة الدراسية</option>
                        </select>
                      </div>
                      <button 
                        onClick={handleDownloadReport}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        إنشاء التقرير
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Class Details Modal */}
      {showClassModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedClass.name}</h3>
              <p className="text-gray-600">{selectedClass.level}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{selectedClass.students}</div>
                <div className="text-sm text-gray-600">عدد الطلاب</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{selectedClass.avgGrade}</div>
                <div className="text-sm text-gray-600">المعدل العام</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{selectedClass.attendance}%</div>
                <div className="text-sm text-gray-600">نسبة الحضور</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{selectedClass.subjects.length}</div>
                <div className="text-sm text-gray-600">عدد المواد</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">المعلم المسؤول:</h4>
              <p className="text-gray-700">{selectedClass.teacher}</p>
              
              <h4 className="font-semibold text-gray-800 mb-2 mt-4">المواد الدراسية:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedClass.subjects.map((subject: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowClassModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowClassModal(false);
                  showInfo('تقرير', `عرض تقرير مفصل عن ${selectedClass.name}...`);
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تقرير مفصل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Details Modal */}
      {showTeacherModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {selectedTeacher.name.split(' ')[1]?.charAt(0) || 'م'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedTeacher.name}</h3>
              <p className="text-gray-600">{selectedTeacher.subject}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{selectedTeacher.experience}</div>
                <div className="text-sm text-gray-600">سنوات الخبرة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{selectedTeacher.studentsCount}</div>
                <div className="text-sm text-gray-600">عدد الطلاب</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{selectedTeacher.avgStudentGrade}</div>
                <div className="text-sm text-gray-600">متوسط درجات الطلاب</div>
              </div>
              <div className="text-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(selectedTeacher.performance)}`}>
                  {selectedTeacher.performance}
                </span>
                <div className="text-sm text-gray-600 mt-1">التقييم</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">الفصول المسؤول عنها:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTeacher.classes.map((className: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {className}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowTeacherModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowTeacherModal(false);
                  showInfo('رسالة', `إرسال رسالة إلى ${selectedTeacher.name}...`);
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                إرسال رسالة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {createType === 'class' ? 'إضافة فصل جديد' :
                 createType === 'teacher' ? 'إضافة معلم جديد' :
                 createType === 'student' ? 'إضافة طالب جديد' : 'إنشاء إعلان'}
              </h3>
              <p className="text-gray-600">
                {createType === 'class' ? 'أضف فصلاً دراسياً جديداً' :
                 createType === 'teacher' ? 'أضف معلماً جديداً للمدرسة' :
                 createType === 'student' ? 'أضف طالباً جديداً' : 'أنشئ إعلاناً للمدرسة'}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {createType === 'class' ? 'اسم الفصل' :
                   createType === 'teacher' ? 'اسم المعلم' :
                   createType === 'student' ? 'اسم الطالب' : 'عنوان الإعلان'}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={createType === 'class' ? 'مثال: السنة الأولى متوسط - فوج ج' :
                              createType === 'teacher' ? 'مثال: أ. محمد أحمد' :
                              createType === 'student' ? 'مثال: علي محمد' : 'مثال: إعلان مهم للمدرسة'}
                />
              </div>
              
              {createType !== 'announcement' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {createType === 'class' ? 'المستوى الدراسي' :
                     createType === 'teacher' ? 'التخصص' : 'الفصل'}
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {createType === 'class' ? (
                      <>
                        <option>الأولى متوسط</option>
                        <option>الثانية متوسط</option>
                        <option>الثالثة متوسط</option>
                        <option>الرابعة متوسط</option>
                      </>
                    ) : createType === 'teacher' ? (
                      <>
                        <option>الرياضيات</option>
                        <option>اللغة العربية</option>
                        <option>العلوم الطبيعية</option>
                        <option>التاريخ والجغرافيا</option>
                        <option>الفيزياء</option>
                        <option>الكيمياء</option>
                      </>
                    ) : (
                      <>
                        <option>الأولى أ</option>
                        <option>الأولى ب</option>
                        <option>الثانية أ</option>
                        <option>الثانية ب</option>
                        <option>الثالثة أ</option>
                        <option>الثالثة ب</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {createType === 'announcement' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">محتوى الإعلان</label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="اكتب محتوى الإعلان هنا..."
                  />
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmitCreate}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إنشاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <QuickActions actions={adminQuickActions} title="الوصول السريع للإدارة" columns={3} />
    </div>
  );
};

export default SchoolAdminDashboard;