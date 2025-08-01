import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Link } from 'react-router-dom';
import { Users, BookOpen, MessageSquare, Calendar, AlertCircle, CheckCircle, Clock, TrendingUp, BarChart3, Bell, Plus, Eye, Award } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_SUBJECTS, SAMPLE_CLASSES } from '../data/algerianEducationSystem';
import QuickActions from '../components/QuickActions';
import { teacherQuickActions } from '../data/quickActions';

const TeacherDashboard: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'homework' | 'announcement' | 'grade'>('homework');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  
  const [teacherData, setTeacherData] = useState<any>(null);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'teacher' && currentUser.teacherData) {
      const teacherClasses = SAMPLE_CLASSES.filter(cls => 
        currentUser.teacherData!.classes?.includes(cls.id)
      );
      
      setTeacherData({
        name: currentUser.name,
        teacherId: currentUser.teacherData.teacherId,
        specialization: currentUser.teacherData.specialization,
        subjects: currentUser.teacherData.subjects,
        school: currentUser.schoolName,
        wilaya: currentUser.wilaya,
        experience: currentUser.teacherData.experience,
        qualification: currentUser.teacherData.qualification,
        classes: teacherClasses.map(cls => ({
          id: cls.id,
          name: cls.name,
          grade: cls.grade,
          students: cls.currentStudents,
          capacity: cls.capacity,
          teacher: cls.teacher,
          avgGrade: (Math.random() * 5 + 10).toFixed(1) // درجة عشوائية للعرض
        }))
      });
    }
  }, []);

  const urgentTasks = [
    {
      id: 1,
      type: 'homework',
      title: 'تصحيح واجبات النحو',
      class: 'السنة الثالثة - فوج أ',
      count: 15,
      dueDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      type: 'absence',
      title: 'غياب مستمر - أحمد بن علي',
      class: 'السنة الثالثة - فوج ب',
      days: 5,
      priority: 'high'
    },
    {
      id: 3,
      type: 'grade',
      title: 'إدخال درجات الاختبار الشهري',
      class: 'السنة الثالثة - فوج أ',
      count: 28,
      dueDate: '2024-01-16',
      priority: 'medium'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'والدة سارة محمد',
      subject: 'استفسار عن الواجبات',
      time: '10:30 ص',
      unread: true
    },
    {
      id: 2,
      from: 'والد كريم أحمد',
      subject: 'طلب موعد للقاء',
      time: 'أمس',
      unread: true
    },
    {
      id: 3,
      from: 'إدارة المدرسة',
      subject: 'اجتماع المعلمين',
      time: 'أمس',
      unread: false
    }
  ];

  const todaySchedule = [
    { time: '08:00', class: 'السنة الثالثة - فوج أ', subject: 'النحو والصرف', room: 'قاعة 12' },
    { time: '09:00', class: 'السنة الثالثة - فوج ب', subject: 'الأدب والنصوص', room: 'قاعة 15' },
    { time: '10:30', class: 'السنة الثالثة - فوج أ', subject: 'التعبير الكتابي', room: 'قاعة 12' },
    { time: '14:00', activity: 'اجتماع المعلمين', location: 'قاعة الاجتماعات' }
  ];

  const classPerformance = [
    { class: 'فوج أ', students: 28, avgGrade: 15.2, improvement: '+0.8' },
    { class: 'فوج ب', students: 26, avgGrade: 14.8, improvement: '+0.3' }
  ];

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      showSuccess('تم بنجاح', `تم إكمال المهمة: ${selectedTask.title}`);
      setShowTaskModal(false);
    }
  };

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };



  const handleReplyMessage = () => {
    if (selectedMessage) {
      showSuccess('تم الإرسال', `تم إرسال الرد إلى ${selectedMessage.from}`);
      setShowMessageModal(false);
    }
  };

  const handleCreateNew = (type: 'homework' | 'announcement' | 'grade') => {
    setCreateType(type);
    setShowCreateModal(true);
  };

  const handleSubmitCreate = () => {
    const typeText = 
      createType === 'homework' ? 'الواجب' :
      createType === 'announcement' ? 'الإعلان' : 'الدرجة';
    showSuccess('تم بنجاح', `تم إنشاء ${typeText} بنجاح!`);
    setShowCreateModal(false);
  };



  const handleGradeStudent = (student: any) => {
    setSelectedStudent(student);
    setShowGradeModal(true);
  };

  const handleSubmitGrade = () => {
    if (selectedStudent) {
      showSuccess('تم بنجاح', `تم تسجيل الدرجة للطالب ${selectedStudent.name}`);
      setShowGradeModal(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'homework': return CheckCircle;
      case 'absence': return AlertCircle;
      case 'grade': return BarChart3;
      default: return Clock;
    }
  };

  const getTaskTypeText = (type: string) => {
    switch (type) {
      case 'homework': return 'إنشاء واجب';
      case 'absence': return 'متابعة غياب';
      case 'grade': return 'تسجيل درجات';
      default: return 'مهمة عامة';
    }
  };

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المعلم...</p>
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
              <h1 className="text-3xl font-bold mb-2">مرحباً {teacherData.name}! 👋</h1>
              <p className="text-green-100">{teacherData.specialization} - {teacherData.school}</p>
              <p className="text-green-200 text-sm mt-1">
                المواد: {teacherData.subjects.join('، ')} | الخبرة: {teacherData.experience} سنوات
              </p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button 
                onClick={() => showInfo('إشعار', '🔔 لديك 3 إشعارات جديدة!')}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/30 transition-colors"
              >
                <Bell className="h-6 w-6" />
              </button>
              <button 
                onClick={() => handleCreateNew('homework')}
                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                <Plus className="h-4 w-4 ml-1 inline" />
                إنشاء واجب
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Urgent Tasks */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-500 ml-2" />
                  المهام العاجلة
                </h2>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {urgentTasks.length} مهام
                </span>
              </div>
              
              <div className="space-y-4">
                {urgentTasks.map((task) => {
                  const TaskIcon = getTaskIcon(task.type);
                  return (
                    <div key={task.id} className={`border-l-4 rounded-lg p-4 ${getPriorityColor(task.priority)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <TaskIcon className="h-5 w-5 text-gray-600 mt-1 ml-3" />
                          <div>
                            <h3 className="font-semibold text-gray-800">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.class}</p>
                            {task.count && (
                              <p className="text-sm text-gray-500">{task.count} عنصر</p>
                            )}
                            {task.days && (
                              <p className="text-sm text-red-600">{task.days} أيام غياب</p>
                            )}
                          </div>
                        </div>
                        <div className="text-left">
                          {task.dueDate && (
                            <p className="text-sm text-gray-500">
                              {new Date(task.dueDate).toLocaleDateString('ar-DZ')}
                            </p>
                          )}
                          <button 
                            onClick={() => handleViewTask(task)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                          >
                            معالجة
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Class Performance Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-500 ml-2" />
                ملخص أداء الفصول
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {classPerformance.map((classData, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{classData.class}</h3>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">عدد الطلاب</span>
                        <span className="font-semibold">{classData.students}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">متوسط الدرجات</span>
                        <span className="font-semibold">{classData.avgGrade}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">التحسن</span>
                        <span className="font-semibold text-green-600">{classData.improvement}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => showInfo('تقرير', `عرض تفاصيل ${classData.class}: ${classData.students} طالب، المعدل: ${classData.avgGrade}`)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 ml-2" />
                جدول اليوم
              </h2>
              
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium ml-4">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      {item.class ? (
                        <>
                          <h3 className="font-semibold text-gray-800">{item.subject}</h3>
                          <p className="text-sm text-gray-600">{item.class} - {item.room}</p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-semibold text-gray-800">{item.activity}</h3>
                          <p className="text-sm text-gray-600">{item.location}</p>
                        </>
                      )}
                    </div>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">54</div>
                <div className="text-sm text-gray-600">إجمالي الطلاب</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600">واجبات نشطة</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">15.0</div>
                <div className="text-sm text-gray-600">متوسط عام</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-600">رسائل جديدة</div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 text-purple-500 ml-2" />
                الرسائل الحديثة
              </h3>
              
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <button 
                    key={message.id}
                    onClick={() => handleViewMessage(message)}
                    className={`w-full p-3 rounded-lg border text-left hover:shadow-md transition-shadow ${
                      message.unread ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          message.unread ? 'text-blue-800' : 'text-gray-800'
                        }`}>
                          {message.from}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
                      </div>
                      <div className="text-xs text-gray-500">{message.time}</div>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => showInfo('رسالة', 'جاري تحميل جميع الرسائل...')}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                عرض جميع الرسائل
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => handleCreateNew('homework')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء واجب جديد
                </button>
                <button 
                  onClick={() => showInfo('إشعار', 'جاري فتح صفحة تسجيل الحضور...')}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 ml-2" />
                  تسجيل الحضور
                </button>
                <button 
                  onClick={() => showInfo('رسالة', 'جاري فتح نافذة إرسال الرسائل الجماعية...')}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold flex items-center justify-center"
                >
                  <MessageSquare className="h-4 w-4 ml-2" />
                  إرسال رسالة جماعية
                </button>
                <button 
                  onClick={() => showInfo('تقرير', 'جاري إنشاء تقرير أداء الطلاب...')}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold flex items-center justify-center"
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  إنشاء تقرير
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                selectedTask.type === 'urgent' ? 'bg-red-100' :
                selectedTask.type === 'homework' ? 'bg-blue-100' :
                selectedTask.type === 'grade' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {React.createElement(getTaskIcon(selectedTask.type), {
                  className: `h-8 w-8 ${
                    selectedTask.type === 'urgent' ? 'text-red-600' :
                    selectedTask.type === 'homework' ? 'text-blue-600' :
                    selectedTask.type === 'grade' ? 'text-green-600' : 'text-gray-600'
                  }`
                })}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedTask.title}</h3>
              <p className="text-gray-600">{selectedTask.description}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">النوع:</span>
                    <div className="font-medium">{getTaskTypeText(selectedTask.type)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">الأولوية:</span>
                    <div className={`font-medium ${
                      selectedTask.priority === 'high' ? 'text-red-600' :
                      selectedTask.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {selectedTask.priority === 'high' ? 'عالية' :
                       selectedTask.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </div>
                  </div>
                  {selectedTask.dueDate && (
                    <>
                      <div>
                        <span className="text-gray-500">موعد الاستحقاق:</span>
                        <div className="font-medium">{new Date(selectedTask.dueDate).toLocaleDateString('ar-DZ')}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowTaskModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={handleCompleteTask}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إكمال المهمة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedMessage.subject}</h3>
              <p className="text-gray-600">من: {selectedMessage.from}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedMessage.preview || 'محتوى الرسالة سيظهر هنا...'}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>تاريخ الإرسال:</span>
                <span>{selectedMessage.time}</span>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={handleReplyMessage}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                رد
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {createType === 'homework' ? 'إنشاء واجب جديد' :
                 createType === 'announcement' ? 'إنشاء إعلان جديد' : 'تسجيل الدرجات'}
              </h3>
              <p className="text-gray-600">
                {createType === 'homework' ? 'أنشئ واجباً جديداً للطلاب' :
                 createType === 'announcement' ? 'أنشئ إعلاناً للفصل' : 'سجل درجات الطلاب'}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {createType === 'homework' ? 'عنوان الواجب' :
                   createType === 'announcement' ? 'عنوان الإعلان' : 'اسم الاختبار'}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={createType === 'homework' ? 'مثال: واجب الرياضيات - الدرس 5' :
                              createType === 'announcement' ? 'مثال: إعلان مهم للطلاب' : 'مثال: اختبار نصف الفصل'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {createType === 'homework' ? 'وصف الواجب' :
                   createType === 'announcement' ? 'محتوى الإعلان' : 'ملاحظات'}
                </label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={createType === 'homework' ? 'تفاصيل الواجب والمتطلبات...' :
                              createType === 'announcement' ? 'محتوى الإعلان...' : 'ملاحظات حول الدرجات...'}
                />
              </div>
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
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                إنشاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Student Modal */}
      {showGradeModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تسجيل درجة</h3>
              <p className="text-gray-600">{selectedStudent.name}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقييم</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option>اختبار فصلي</option>
                  <option>واجب منزلي</option>
                  <option>مشاركة في الصف</option>
                  <option>مشروع</option>
                  <option>اختبار شفهي</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الدرجة (من 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="مثال: 16"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات (اختياري)</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  placeholder="ملاحظات حول أداء الطالب..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowGradeModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmitGrade}
                className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                حفظ الدرجة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedStudent.name}</h3>
              <p className="text-gray-600">السنة الثالثة - فوج أ</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">16.5</div>
                <div className="text-sm text-gray-600">متوسط المادة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
                <div className="text-sm text-gray-600">نسبة الحضور</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
                <div className="text-sm text-gray-600">الواجبات المسلمة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                <div className="text-sm text-gray-600">المشاركات</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">آخر التقييمات:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>اختبار النحو</span>
                  <span className="font-semibold text-green-600">18/20</span>
                </div>
                <div className="flex justify-between">
                  <span>واجب الإعراب</span>
                  <span className="font-semibold text-blue-600">15/20</span>
                </div>
                <div className="flex justify-between">
                  <span>مشاركة في الصف</span>
                  <span className="font-semibold text-purple-600">17/20</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowStudentModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowStudentModal(false);
                  handleGradeStudent(selectedStudent);
                }}
                className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                إضافة درجة
              </button>
              <button
                onClick={() => {
                  setShowStudentModal(false);
                  showInfo('رسالة', `إرسال رسالة إلى ولي أمر ${selectedStudent.name}...`);
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                مراسلة الولي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <QuickActions actions={teacherQuickActions} />
    </div>
  );
};

export default TeacherDashboard;