import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BookOpen, TrendingUp, ArrowLeft, Target, CheckCircle, AlertTriangle, Star, MessageSquare, Award } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

interface Subject {
  id: string;
  name: string;
  teacher: string;
  currentGrade: number;
  previousGrade: number;
  trend: string;
  assignments: number;
  completedAssignments: number;
  lastExamGrade: number;
  lastExamDate: string;
  strengths: string[];
  weaknesses: string[];
  teacherNotes: string;
}

const ParentChildProgress: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedChild, setSelectedChild] = useState('1');

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const children = [
    {
      id: '1',
      name: 'أحمد محمد',
      grade: 'السنة الثالثة متوسط',
      class: 'فوج أ',
      avatar: '👦',
      overallAverage: 16.5,
      rank: 3,
      totalStudents: 28,
      attendance: 95
    },
    {
      id: '2',
      name: 'فاطمة محمد',
      grade: 'السنة الأولى متوسط',
      class: 'فوج ب',
      avatar: '👧',
      overallAverage: 18.2,
      rank: 1,
      totalStudents: 25,
      attendance: 98
    }
  ];

  const [progressData] = useState({
    '1': {
      subjects: [
        {
          id: 'arabic',
          name: 'اللغة العربية',
          teacher: 'أ. فاطمة أحمد',
          currentGrade: 16.5,
          previousGrade: 15.2,
          trend: 'up',
          assignments: 8,
          completedAssignments: 7,
          lastExamGrade: 17,
          lastExamDate: '2024-01-10',
          strengths: ['النحو', 'الإملاء'],
          weaknesses: ['التعبير الكتابي'],
          teacherNotes: 'طالب مجتهد، يحتاج لتحسين مهارات الكتابة'
        },
        {
          id: 'math',
          name: 'الرياضيات',
          teacher: 'أ. محمد علي',
          currentGrade: 18.0,
          previousGrade: 17.5,
          trend: 'up',
          assignments: 6,
          completedAssignments: 6,
          lastExamGrade: 19,
          lastExamDate: '2024-01-12',
          strengths: ['الجبر', 'الهندسة'],
          weaknesses: ['الإحصاء'],
          teacherNotes: 'أداء ممتاز، يظهر فهماً عميقاً للمفاهيم'
        },
        {
          id: 'physics',
          name: 'الفيزياء',
          teacher: 'أ. سارة حسن',
          currentGrade: 15.0,
          previousGrade: 16.0,
          trend: 'down',
          assignments: 5,
          completedAssignments: 4,
          lastExamGrade: 14,
          lastExamDate: '2024-01-08',
          strengths: ['الميكانيكا'],
          weaknesses: ['الكهرباء', 'البصريات'],
          teacherNotes: 'يحتاج لمزيد من التركيز والمراجعة'
        },
        {
          id: 'history',
          name: 'التاريخ',
          teacher: 'أ. أحمد بن علي',
          currentGrade: 17.5,
          previousGrade: 16.8,
          trend: 'up',
          assignments: 4,
          completedAssignments: 4,
          lastExamGrade: 18,
          lastExamDate: '2024-01-15',
          strengths: ['التاريخ الإسلامي', 'تاريخ الجزائر'],
          weaknesses: ['التاريخ المعاصر'],
          teacherNotes: 'يظهر اهتماماً كبيراً بالمادة'
        }
      ],
      weeklyProgress: [
        { week: 'الأسبوع 1', average: 15.8, attendance: 100 },
        { week: 'الأسبوع 2', average: 16.2, attendance: 95 },
        { week: 'الأسبوع 3', average: 16.5, attendance: 90 },
        { week: 'الأسبوع 4', average: 16.8, attendance: 100 }
      ],
      recentActivities: [
        {
          date: '2024-01-15',
          type: 'exam',
          subject: 'التاريخ',
          description: 'اختبار شهري - التاريخ الإسلامي',
          grade: 18,
          maxGrade: 20
        },
        {
          date: '2024-01-12',
          type: 'assignment',
          subject: 'الرياضيات',
          description: 'واجب الجبر - المعادلات',
          grade: 19,
          maxGrade: 20
        },
        {
          date: '2024-01-10',
          type: 'participation',
          subject: 'اللغة العربية',
          description: 'مشاركة في النقاش',
          grade: 16,
          maxGrade: 20
        }
      ],
      behaviorReport: {
        discipline: 'ممتاز',
        participation: 'جيد جداً',
        homework: 'منتظم',
        punctuality: 'ممتاز',
        notes: 'طالب مهذب ومتعاون مع زملائه'
      }
    }
  });

  const selectedChildData = children.find(child => child.id === selectedChild);
  const childProgress = progressData[selectedChild as keyof typeof progressData];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
    return <TrendingUp className="h-4 w-4 text-gray-600 rotate-90" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-600 bg-green-50';
    if (grade >= 12) return 'text-blue-600 bg-blue-50';
    if (grade >= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleViewSubjectDetails = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowDetailsModal(true);
  };

  const handleContactTeacher = (teacherName: string) => {
    showInfo('إشعار', `سيتم فتح محادثة مع ${teacherName}`);
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/parent-dashboard', icon: '🏠' },
          { label: 'تقدم الطفل', icon: '📈' }
        ]} />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold mb-2">📊 متابعة أداء الأطفال</h1>
                <p className="text-blue-100">تتبع التقدم الأكاديمي والسلوكي لأطفالك</p>
              </div>
            </div>
            {selectedChildData && (
              <div className="text-center">
                <div className="text-4xl mb-2">{selectedChildData.avatar}</div>
                <div className="text-lg font-bold">{selectedChildData.name}</div>
                <div className="text-sm text-blue-100">{selectedChildData.grade}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Child Selection */}
        {children.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">اختر الطفل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedChild === child.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{child.avatar}</div>
                    <h3 className="font-bold text-gray-800">{child.name}</h3>
                    <p className="text-sm text-gray-600">{child.grade} - {child.class}</p>
                    <div className="mt-2 flex justify-center space-x-4 rtl:space-x-reverse text-xs">
                      <span className="text-green-600">المعدل: {child.overallAverage}</span>
                      <span className="text-blue-600">الترتيب: {child.rank}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{selectedChildData?.overallAverage}</div>
                <div className="text-sm text-gray-600">المعدل العام</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">#{selectedChildData?.rank}</div>
                <div className="text-sm text-gray-600">الترتيب</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{selectedChildData?.attendance}%</div>
                <div className="text-sm text-gray-600">الحضور</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{childProgress?.subjects.length}</div>
                <div className="text-sm text-gray-600">المواد</div>
              </div>
            </div>

            {/* Subjects Performance */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">أداء المواد الدراسية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {childProgress?.subjects.map((subject) => (
                  <div key={subject.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.teacher}</p>
                      </div>
                      <div className="text-left">
                        <div className={`px-3 py-1 rounded-lg font-bold ${getGradeColor(subject.currentGrade)}`}>
                          {subject.currentGrade}/20
                        </div>
                        <div className={`flex items-center justify-end mt-1 ${getTrendColor(subject.trend)}`}>
                          {getTrendIcon(subject.trend)}
                          <span className="text-xs mr-1">
                            {subject.trend === 'up' ? '+' : subject.trend === 'down' ? '-' : ''}
                            {Math.abs(subject.currentGrade - subject.previousGrade).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">الواجبات المكتملة</span>
                        <span className="font-medium">{subject.completedAssignments}/{subject.assignments}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(subject.completedAssignments / subject.assignments) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleViewSubjectDetails(subject)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        عرض التفاصيل
                      </button>
                      <button
                        onClick={() => handleContactTeacher(subject.teacher)}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition-colors"
                      >
                        تواصل مع المعلم
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">الأنشطة الأخيرة</h2>
              
              <div className="space-y-4">
                {childProgress?.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ml-4 ${
                        activity.type === 'exam' ? 'bg-purple-100 text-purple-600' :
                        activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {activity.type === 'exam' ? <BookOpen className="h-4 w-4" /> :
                         activity.type === 'assignment' ? <CheckCircle className="h-4 w-4" /> :
                         <MessageSquare className="h-4 w-4" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{activity.description}</h4>
                        <p className="text-sm text-gray-600">{activity.subject} - {activity.date}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg font-bold ${getGradeColor(activity.grade)}`}>
                      {activity.grade}/{activity.maxGrade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Weekly Progress Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">التقدم الأسبوعي</h3>
              <div className="space-y-4">
                {childProgress?.weeklyProgress.map((week, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{week.week}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(week.average / 20) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{week.average}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavior Report */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">التقرير السلوكي</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">الانضباط</span>
                  <span className="font-medium text-green-600">{childProgress?.behaviorReport.discipline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المشاركة</span>
                  <span className="font-medium text-blue-600">{childProgress?.behaviorReport.participation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الواجبات</span>
                  <span className="font-medium text-green-600">{childProgress?.behaviorReport.homework}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الالتزام بالوقت</span>
                  <span className="font-medium text-green-600">{childProgress?.behaviorReport.punctuality}</span>
                </div>
              </div>
              
              {childProgress?.behaviorReport.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">ملاحظات المعلمين</h4>
                  <p className="text-sm text-blue-700">{childProgress.behaviorReport.notes}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  طلب موعد مع المعلم
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  عرض التقرير الشامل
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  تحميل شهادة الدرجات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Details Modal */}
      {showDetailsModal && selectedSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedSubject.name}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Grade Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">معلومات الدرجات</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">الدرجة الحالية</span>
                    <div className={`text-2xl font-bold ${getGradeColor(selectedSubject.currentGrade).split(' ')[0]}`}>
                      {selectedSubject.currentGrade}/20
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">آخر اختبار</span>
                    <div className={`text-2xl font-bold ${getGradeColor(selectedSubject.lastExamGrade).split(' ')[0]}`}>
                      {selectedSubject.lastExamGrade}/20
                    </div>
                    <div className="text-xs text-gray-500">{selectedSubject.lastExamDate}</div>
                  </div>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">نقاط القوة</h4>
                  <ul className="space-y-1">
                    {selectedSubject.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-sm text-green-700 flex items-center">
                        <CheckCircle className="h-3 w-3 ml-1" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">نقاط التحسين</h4>
                  <ul className="space-y-1">
                    {selectedSubject.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="text-sm text-red-700 flex items-center">
                        <AlertTriangle className="h-3 w-3 ml-1" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Teacher Notes */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">ملاحظات المعلم</h4>
                <p className="text-sm text-blue-700">{selectedSubject.teacherNotes}</p>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => handleContactTeacher(selectedSubject.teacher)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                تواصل مع المعلم
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default ParentChildProgress;