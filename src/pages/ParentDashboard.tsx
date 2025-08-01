import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Users, BookOpen, TrendingUp, Calendar, MessageSquare, AlertCircle, CheckCircle, Clock, Star, Phone, BarChart3 } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_GRADES } from '../data/algerianEducationSystem';
import QuickActions from '../components/QuickActions';
import { parentQuickActions } from '../data/quickActions';

interface Message {
  id: number;
  from: string;
  subject: string;
  content: string;
  date: string;
  type?: string;
  isRead: boolean;
  childName?: string;
}

interface Teacher {
  name: string;
  subject: string;
  email: string;
  phone: string;
}



interface Child {
  id: string;
  name: string;
  studentId?: string;
  grade: string;
  class: string;
  school: string;
  avatar: string;
  overallGrade: string;
  attendance: number;
  behavior: string;
  subjects: Subject[];
  recentActivities: Activity[];
  upcomingEvents: Event[];
}

interface Activity {
  type: string;
  title: string;
  date: string;
  status?: string;
  grade?: number;
  reason?: string;
  description?: string;
  time?: string;
  subject?: string;
  note?: string;
}

interface Event {
  type: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  location?: string;
}

interface Subject {
  name: string;
  grade: string;
  teacher: string;
  lastTest: string;
}

interface ParentData {
  name: string;
  phone?: string;
  email: string;
  profession?: string;
  address?: string;
  children: Child[];
}

const ParentDashboard: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedChild, setSelectedChild] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const [parentData, setParentData] = useState<ParentData | null>(null);
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'parent' && currentUser.parentData) {
      setParentData({
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        profession: currentUser.parentData.profession,
        address: currentUser.parentData.address,
        children: [] // Will be set below
      });

      // تحويل بيانات الأطفال
      const childrenData = currentUser.parentData.children.map((child: any, index: number) => {
        const grade = PRIMARY_GRADES.find(g => g.id === child.grade);
        const subjects = grade ? grade.subjects : [];
        
        return {
          id: (index + 1).toString(),
          name: child.name,
          studentId: child.studentId,
          grade: child.gradeName,
          class: child.class,
          school: child.schoolName,
          avatar: child.name.split(' ').map((n: string) => n[0]).join('.'),
          overallGrade: (Math.random() * 5 + 10).toFixed(1),
          attendance: Math.floor(Math.random() * 10 + 90),
          behavior: ['ممتاز', 'جيد جداً', 'جيد'][Math.floor(Math.random() * 3)],
          subjects: subjects.map((subject: string) => ({
            name: subject,
            grade: (Math.random() * 5 + 10).toFixed(1),
            teacher: `أ. ${['محمد العلي', 'فاطمة أحمد', 'خالد السعد', 'عائشة بن علي'][Math.floor(Math.random() * 4)]}`,
            lastTest: (Math.random() * 5 + 10).toFixed(1)
          })),
          recentActivities: [
            { type: 'homework', title: `أكمل واجب ${subjects[0] || 'اللغة العربية'}`, date: '2024-01-15', status: 'completed' },
            { type: 'test', title: `اختبار ${subjects[1] || 'الرياضيات'}`, date: '2024-01-14', grade: 16 },
            { type: 'absence', title: 'غياب مبرر', date: '2024-01-12', reason: 'مرض' },
            { type: 'achievement', title: 'حصل على شارة المتفوق', date: '2024-01-10' }
          ],
          upcomingEvents: [
            { type: 'test', title: `اختبار ${subjects[1] || 'الرياضيات'}`, date: '2024-01-18', time: '08:00' },
            { type: 'meeting', title: 'اجتماع أولياء الأمور', date: '2024-01-20', time: '14:00' },
            { type: 'homework', title: `موعد تسليم بحث ${subjects[2] || 'التربية الإسلامية'}`, date: '2024-01-22', time: '12:00' }
          ]
        };
      });

      setChildren(childrenData);
      
      // Update parentData with children
      setParentData(prev => prev ? { ...prev, children: childrenData } : null);
    }
  }, []);

  const messages = [
    {
      id: 1,
      from: 'أ. فاطمة أحمد',
      subject: 'تحسن ملحوظ في الأداء',
      content: 'أحمد يظهر تحسناً كبيراً في مادة اللغة العربية. أنصح بمواصلة المراجعة المنزلية.',
      date: '2024-01-15',
      isRead: false,
      childName: 'أحمد محمد'
    },
    {
      id: 2,
      from: 'إدارة المدرسة',
      subject: 'اجتماع أولياء الأمور',
      content: 'يسرنا دعوتكم لحضور اجتماع أولياء الأمور يوم السبت الموافق 20/01/2024 في تمام الساعة 2 مساءً.',
      date: '2024-01-14',
      isRead: true,
      childName: 'عام'
    },
    {
      id: 3,
      from: 'أ. محمد العلي',
      subject: 'واجب الرياضيات',
      content: 'يرجى التأكد من أن أحمد يكمل واجب الرياضيات المطلوب لهذا الأسبوع.',
      date: '2024-01-13',
      isRead: true,
      childName: 'أحمد محمد'
    }
  ];

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const handleContactTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    if (selectedTeacher) {
      showSuccess('تم الإرسال', `تم إرسال الرسالة إلى ${selectedTeacher.name} بنجاح!`);
      setShowContactModal(false);
    }
  };



  const handleViewSubjectDetails = (subject: Subject) => {
    showInfo('تقرير', `عرض تفاصيل أداء الطفل في مادة ${subject.name}:\n\nالمعدل: ${subject.grade}/20\nالمعلم: ${subject.teacher}\nآخر اختبار: ${subject.lastTest}/20`);
  };





  if (!parentData || children.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات ولي الأمر...</p>
        </div>
      </div>
    );
  }

  const currentChild = children[selectedChild];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'homework': return BookOpen;
      case 'test': return BarChart3;
      case 'absence': return AlertCircle;
      case 'achievement': return Star;
      case 'meeting': return Users;
      case 'competition': return TrendingUp;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'homework': return 'blue';
      case 'test': return 'purple';
      case 'absence': return 'red';
      case 'achievement': return 'yellow';
      case 'meeting': return 'green';
      case 'competition': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">مرحباً {parentData.name}! 👨‍👧‍👦</h1>
              <p className="text-green-100">تابع تقدم أطفالك الأكاديمي والسلوكي</p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{children.length}</div>
                <div className="text-sm">أطفال</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{messages.filter(m => !m.isRead).length}</div>
                <div className="text-sm">رسائل جديدة</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Children Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">اختر الطفل</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {children.map((child, index) => (
              <div
                key={child.id}
                onClick={() => setSelectedChild(index)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedChild === index
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ml-4">
                    {child.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{child.name}</h3>
                    <p className="text-gray-600">{child.grade} - {child.class}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-600">{child.overallGrade}</div>
                    <div className="text-xs text-gray-600">المعدل العام</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">{child.attendance}%</div>
                    <div className="text-xs text-gray-600">الحضور</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600">{child.behavior}</div>
                    <div className="text-xs text-gray-600">السلوك</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Academic Performance */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 text-blue-500 ml-2" />
                الأداء الأكاديمي - {currentChild.name}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {currentChild.subjects.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                      <span className={`text-lg font-bold ${
                        parseFloat(subject.grade) >= 16 ? 'text-green-600' :
                        parseFloat(subject.grade) >= 14 ? 'text-blue-600' :
                        parseFloat(subject.grade) >= 10 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {subject.grade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-600">
                        المعلم: {subject.teacher}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewSubjectDetails(subject)}
                          className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                        >
                          تفاصيل
                        </button>
                        <button
                          onClick={() => handleContactTeacher({ 
                            name: subject.teacher, 
                            subject: subject.name, 
                            email: '', 
                            phone: '' 
                          })}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                        >
                          تواصل
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      آخر اختبار: {subject.lastTest}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full ${
                          parseFloat(subject.grade) >= 16 ? 'bg-green-600' :
                          parseFloat(subject.grade) >= 14 ? 'bg-blue-600' :
                          parseFloat(subject.grade) >= 10 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(parseFloat(subject.grade) / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-purple-500 ml-2" />
                الأنشطة الأخيرة
              </h3>
              
              <div className="space-y-4">
                {currentChild.recentActivities.map((activity, index) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  const color = getActivityColor(activity.type);
                  
                  return (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className={`bg-${color}-100 p-2 rounded-full ml-4`}>
                        <ActivityIcon className={`h-5 w-5 text-${color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.date).toLocaleDateString('ar-DZ')}
                        </p>
                        {activity.grade && (
                          <p className="text-sm font-semibold text-green-600">
                            الدرجة: {activity.grade}/20
                          </p>
                        )}
                        {activity.reason && (
                          <p className="text-sm text-gray-600">
                            السبب: {activity.reason}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">المعدل العام</span>
                  <span className="text-2xl font-bold text-green-600">{currentChild.overallGrade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">نسبة الحضور</span>
                  <span className="text-2xl font-bold text-blue-600">{currentChild.attendance}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">السلوك</span>
                  <span className="text-lg font-bold text-purple-600">{currentChild.behavior}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">عدد المواد</span>
                  <span className="text-2xl font-bold text-orange-600">{currentChild.subjects.length}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-green-500 ml-2" />
                الأحداث القادمة
              </h3>
              
              <div className="space-y-3">
                {currentChild.upcomingEvents.map((event, index) => {
                  const EventIcon = getActivityIcon(event.type);
                  const color = getActivityColor(event.type);
                  
                  return (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className={`bg-${color}-100 p-2 rounded-full ml-3`}>
                        <EventIcon className={`h-4 w-4 text-${color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600">
                          {new Date(event.date).toLocaleDateString('ar-DZ')} - {event.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 text-blue-500 ml-2" />
                الرسائل الحديثة
              </h3>
              
              <div className="space-y-3">
                {messages.slice(0, 3).map((message) => (
                  <button 
                    key={message.id}
                    onClick={() => handleViewMessage(message)}
                    className={`w-full p-3 rounded-lg border text-left hover:shadow-md transition-shadow ${
                      message.isRead ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-semibold text-sm ${
                        message.isRead ? 'text-gray-800' : 'text-blue-800'
                      }`}>
                        {message.from}
                      </h4>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{message.subject}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{message.childName}</span>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
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

            {/* Contact Teachers */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">تواصل مع المعلمين</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleContactTeacher({ name: 'المعلم المناوب', subject: 'عام', email: '', phone: '' })}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="h-4 w-4 ml-2" />
                  إرسال رسالة
                </button>
                <button 
                  onClick={() => showInfo('اتصال', 'سيتم الاتصال بك خلال 24 ساعة من المعلم المناسب')}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <Phone className="h-4 w-4 ml-2" />
                  طلب مكالمة
                </button>
                <button 
                  onClick={() => showInfo('تذكير', 'جاري توجيهك لحجز موعد مع إدارة المدرسة...')}
                  className="w-full bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4 ml-2" />
                  حجز موعد
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  {selectedMessage.content || 'محتوى الرسالة سيظهر هنا. هذه رسالة تجريبية من المعلم حول أداء الطالب في المادة.'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">الطالب:</span>
                  <div className="font-medium">{selectedMessage.childName}</div>
                </div>
                <div>
                  <span className="text-gray-500">التاريخ:</span>
                  <div className="font-medium">{selectedMessage.date}</div>
                </div>
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
                onClick={() => {
                  setShowMessageModal(false);
                  handleContactTeacher({ name: selectedMessage.from, subject: 'رد على الرسالة', email: '', phone: '' });
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                رد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Teacher Modal */}
      {showContactModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تواصل مع المعلم</h3>
              <p className="text-gray-600">{selectedTeacher.name}</p>
              <p className="text-sm text-gray-500">{selectedTeacher.subject}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">موضوع الرسالة</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: استفسار حول أداء الطالب"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center text-blue-700 text-sm">
                  <AlertCircle className="h-4 w-4 ml-2" />
                  <span>سيتم إرسال نسخة من الرسالة إلى بريدك الإلكتروني</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h3>
              <p className="text-gray-600">{selectedEvent.date}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">تفاصيل الحدث:</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedEvent.description || 'حدث مهم في المدرسة'}</p>
                
                <div className="text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">التاريخ:</span>
                    <span className="font-medium">{selectedEvent.date}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">الوقت:</span>
                    <span className="font-medium">{selectedEvent.time || '09:00 صباحاً'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المكان:</span>
                    <span className="font-medium">{selectedEvent.location || 'المدرسة'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center text-blue-700 text-sm">
                  <AlertCircle className="h-4 w-4 ml-2" />
                  <span>سيتم إرسال تذكير قبل الحدث بيوم واحد</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  showSuccess('تم الإضافة', 'تم إضافة تذكير للحدث في التقويم!');
                }}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                إضافة تذكير
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Details Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تفاصيل النشاط</h3>
              <p className="text-gray-600">{selectedActivity.description}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">التاريخ:</span>
                    <span className="font-medium">{selectedActivity.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الوقت:</span>
                    <span className="font-medium">{selectedActivity.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المادة:</span>
                    <span className="font-medium">{selectedActivity.subject || 'متنوعة'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">النوع:</span>
                    <span className="font-medium">{selectedActivity.type}</span>
                  </div>
                </div>
              </div>
              
              {selectedActivity.note && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-semibold text-yellow-800 mb-1">ملاحظة المعلم:</h4>
                  <p className="text-sm text-yellow-700">{selectedActivity.note}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setShowActivityModal(false)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              فهمت
            </button>
          </div>
        </div>
      )}

      {/* Detailed Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">التقرير التفصيلي</h3>
              <p className="text-gray-600">{children[selectedChild].name} - {children[selectedChild].grade}</p>
            </div>
            
            <div className="space-y-6 mb-6">
              {/* Academic Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">الملخص الأكاديمي</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">المعدل العام:</span>
                    <span className="font-bold text-blue-600 mr-2">{children[selectedChild].overallGrade}/20</span>
                  </div>
                  <div>
                    <span className="text-gray-500">الترتيب في الفصل:</span>
                    <span className="font-bold text-green-600 mr-2">3 من 28</span>
                  </div>
                  <div>
                    <span className="text-gray-500">نسبة الحضور:</span>
                    <span className="font-bold text-purple-600 mr-2">{children[selectedChild].attendance}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">السلوك:</span>
                    <span className="font-bold text-green-600 mr-2">{children[selectedChild].behavior}</span>
                  </div>
                </div>
              </div>

              {/* Subject Details */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">تفاصيل المواد</h4>
                <div className="space-y-3">
                  {children[selectedChild].subjects.map((subject, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{subject.name}</span>
                        <span className="font-bold text-lg">{subject.grade}/20</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            parseFloat(subject.grade) >= 16 ? 'bg-green-600' :
                            parseFloat(subject.grade) >= 14 ? 'bg-blue-600' :
                            parseFloat(subject.grade) >= 10 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${(parseFloat(subject.grade) / 20) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        المعلم: {subject.teacher}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">التوصيات</h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• استمرار الأداء الممتاز في الرياضيات</li>
                  <li>• تحسين الأداء في مادة الفيزياء بمراجعة إضافية</li>
                  <li>• المشاركة أكثر في الأنشطة الصفية</li>
                  <li>• الحفاظ على الانضباط والحضور المنتظم</li>
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  showSuccess('تم التحميل', '📄 تم تنزيل التقرير التفصيلي بصيغة PDF');
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تحميل PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <QuickActions actions={parentQuickActions} columns={3} />
    </div>
  );
};

export default ParentDashboard;