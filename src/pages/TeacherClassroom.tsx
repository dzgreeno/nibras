import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Users, BarChart3, BookOpen, TrendingUp, Plus, Search, Filter, Edit, Trash2, Eye, MessageSquare, CheckCircle, AlertCircle, Clock, Star, Download } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { SAMPLE_CLASSES, PRIMARY_GRADES } from '../data/algerianEducationSystem';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

interface Student {
  id: number;
  name: string;
  avatar: string;
  avgGrade: string;
  attendance: number;
  homeworkCompletion: number;
  lastActivity: string;
  status: 'excellent' | 'good' | 'needs-attention';
  notes: string;
}

interface ClassData {
  name: string;
  subject: string;
  teacher: string;
  studentsCount: number;
  avgGrade: string;
  completionRate: number;
}

interface Homework {
  id: number;
  title: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  submitted: number;
  total: number;
  avgGrade: string;
  status: 'active' | 'completed';
}

const TeacherClassroom: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'homework' | 'analytics'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'homework' | 'exam' | 'announcement'>('homework');
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'teacher' && currentUser.teacherData) {
      // استخدام أول فصل من فصول المعلم
      const teacherClass = SAMPLE_CLASSES.find(cls => 
        currentUser.teacherData?.classes?.includes(cls.id)
      );
      
      if (teacherClass) {
        const grade = PRIMARY_GRADES.find(g => g.id === teacherClass.grade);
        
        setClassData({
          name: `${grade?.name || teacherClass.grade} - ${teacherClass.name}`,
          subject: currentUser.teacherData.subjects[0] || 'المادة الدراسية',
          teacher: currentUser.name,
          studentsCount: teacherClass.currentStudents,
          avgGrade: (Math.random() * 5 + 10).toFixed(1),
          completionRate: Math.floor(Math.random() * 20 + 80)
        });

        // إنشاء قائمة طلاب تجريبية
        const generateStudents = () => {
          const firstNames = ['أحمد', 'فاطمة', 'محمد', 'عائشة', 'يوسف', 'خديجة', 'علي', 'زينب', 'عمر', 'مريم'];
          const lastNames = ['بن محمد', 'العلي', 'السعد', 'أحمد', 'إبراهيم', 'حسن', 'عثمان', 'الزهراء', 'المختار', 'بن علي'];
          
          return Array.from({ length: teacherClass.currentStudents }, (_, i) => {
            const firstName = firstNames[i % firstNames.length];
            const lastName = lastNames[i % lastNames.length];
            const fullName = `${firstName} ${lastName}`;
            
            return {
              id: i + 1,
              name: fullName,
              avatar: firstName[0] + '.' + lastName.split(' ')[1]?.[0] || lastName[0],
              avgGrade: (Math.random() * 8 + 8).toFixed(1),
              attendance: Math.floor(Math.random() * 20 + 80),
              homeworkCompletion: Math.floor(Math.random() * 30 + 70),
              lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: Math.random() > 0.7 ? 'excellent' as const : Math.random() > 0.4 ? 'good' as const : 'needs-attention' as const,
              notes: `ملاحظات حول الطالب ${fullName}`
            };
          });
        };

        setStudents(generateStudents());
      }
    }
  }, []);

  const homework: Homework[] = [
    {
      id: 1,
      title: 'تمارين في المادة الدراسية',
      subject: classData?.subject || 'المادة',
      assignedDate: '2024-01-15',
      dueDate: '2024-01-20',
      submitted: Math.floor(Math.random() * (classData?.studentsCount || 20) * 0.8),
      total: classData?.studentsCount || 20,
      avgGrade: (Math.random() * 5 + 10).toFixed(1),
      status: Math.random() > 0.5 ? 'active' as const : 'completed' as const
    }
  ];

  const subjects = ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التاريخ والجغرافيا'];

  const grades = students.map(student => ({
    studentId: student.id,
    studentName: student.name,
    'الفصل الأول': (Math.random() * 8 + 8).toFixed(1),
    'الفصل الثاني': (Math.random() * 8 + 8).toFixed(1),
    'الفصل الثالث': (Math.random() * 8 + 8).toFixed(1),
    average: student.avgGrade
  }));

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleGradeStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowGradeModal(true);
  };

  const handleSendMessage = (student: Student) => {
    showInfo('رسالة', `إرسال رسالة إلى ولي أمر ${student.name}...`);
  };

  const handleMessageParent = (student: Student) => {
    showInfo('رسالة', `إرسال رسالة إلى ولي أمر ${student.name}...`);
  };

  const handleCreateNew = (type: 'homework' | 'exam' | 'announcement') => {
    setCreateType(type);
    setShowCreateModal(true);
  };

  const handleSubmitCreate = () => {
    const typeText = createType === 'homework' ? 'الواجب' : createType === 'exam' ? 'الاختبار' : 'الإعلان';
    showSuccess('تم بنجاح', `تم إنشاء ${typeText} بنجاح!`);
    setShowCreateModal(false);
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Student['status']) => {
    switch (status) {
      case 'excellent': return 'ممتاز';
      case 'good': return 'جيد';
      case 'needs-attention': return 'يحتاج متابعة';
      default: return 'غير محدد';
    }
  };

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات الفصل...</p>
        </div>
      </div>
    );
  }

  const handleDownloadReport = () => {
    showInfo('تقرير', 'جاري تحميل تقرير الفصل...');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/teacher-dashboard', icon: '🏠' },
          { label: 'فصولي الدراسية', icon: '🏫' }
        ]} />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{classData.name}</h1>
              <p className="text-green-100">{classData.subject} - {classData.teacher}</p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{classData.studentsCount}</div>
                <div className="text-sm">طالب</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{classData.avgGrade}</div>
                <div className="text-sm">متوسط</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{classData.completionRate}%</div>
                <div className="text-sm">إنجاز</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'students'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="h-5 w-5 inline ml-2" />
              الطلاب
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'grades'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="h-5 w-5 inline ml-2" />
              سجل العلامات
            </button>
            <button
              onClick={() => setActiveTab('homework')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'homework'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="h-5 w-5 inline ml-2" />
              الواجبات
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="h-5 w-5 inline ml-2" />
              التحليلات
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'students' && (
              <div>
                {/* Search and Actions */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن طالب..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => showInfo('إشعار', '➕ جاري فتح نافذة إضافة طالب جديد...')}
                      className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 inline ml-1" />
                      إضافة طالب
                    </button>
                    <button 
                      onClick={handleDownloadReport}
                      className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Download className="h-4 w-4 inline ml-1" />
                      تصدير
                    </button>
                  </div>
                </div>

                {/* Students Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ml-3">
                          {student.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{student.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                            {getStatusText(student.status)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">متوسط الدرجات</span>
                          <span className="font-semibold">{student.avgGrade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحضور</span>
                          <span className="font-semibold">{student.attendance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">إنجاز الواجبات</span>
                          <span className="font-semibold">{student.homeworkCompletion}%</span>
                        </div>
                      </div>

                      {student.notes && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-700">{student.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewStudent(student)}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Eye className="h-4 w-4 inline ml-1" />
                          عرض
                        </button>
                        <button 
                          onClick={() => handleSendMessage(student)}
                          className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <MessageSquare className="h-4 w-4 inline ml-1" />
                          رسالة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'grades' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">سجل العلامات</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowGradeModal(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4 inline ml-1" />
                      إضافة درجات
                    </button>
                    <button 
                      onClick={() => showInfo('تقرير', 'جاري تصدير جدول الدرجات...')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Download className="h-4 w-4 inline ml-1" />
                      تصدير Excel
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الطالب
                        </th>
                        {subjects.map((subject) => (
                          <th key={subject} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {subject}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المتوسط
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          إجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {grades.map((grade) => (
                        <tr key={grade.studentId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{grade.studentName}</div>
                          </td>
                          {subjects.map((subject) => (
                            <td key={subject} className="px-6 py-4 whitespace-nowrap text-center">
                              <input
                                type="number"
                                min="0"
                                max="20"
                                value={grade[subject as keyof typeof grade] as string}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => {
                                  // Handle grade update
                                  console.log(`Updating ${subject} grade for student ${grade.studentName}: ${e.target.value}`);
                                }}
                              />
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`font-semibold ${
                              parseFloat(grade.average) >= 16 ? 'text-green-600' :
                              parseFloat(grade.average) >= 14 ? 'text-blue-600' :
                              parseFloat(grade.average) >= 10 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {grade.average}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button 
                              onClick={() => {
                                const student = students.find(s => s.id === grade.studentId);
                                if (student) handleGradeStudent(student);
                              }}
                              className="text-blue-600 hover:text-blue-800 mr-2"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'homework' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">إدارة الواجبات</h3>
                  <button 
                    onClick={() => handleCreateNew('homework')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline ml-1" />
                    إنشاء واجب جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {homework.map((hw) => (
                    <div key={hw.id} className="bg-white border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{hw.title}</h4>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <BookOpen className="h-4 w-4 ml-1" />
                            {hw.subject}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 ml-1" />
                            تاريخ التكليف: {new Date(hw.assignedDate).toLocaleDateString('ar-DZ')} | 
                            موعد التسليم: {new Date(hw.dueDate).toLocaleDateString('ar-DZ')}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          {hw.status === 'completed' ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              مكتمل
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                              نشط
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-800">{hw.submitted}</div>
                          <div className="text-sm text-gray-600">مُسلم</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-800">{hw.total - hw.submitted}</div>
                          <div className="text-sm text-gray-600">متبقي</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            {hw.avgGrade || Math.round((hw.submitted / hw.total) * 100) + '%'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {hw.avgGrade ? 'متوسط الدرجات' : 'نسبة التسليم'}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowHomeworkModal(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Eye className="h-4 w-4 inline ml-1" />
                          عرض التفاصيل
                        </button>
                        <button 
                          onClick={() => showInfo('إشعار', '📝 جاري فتح صفحة تصحيح الواجبات...')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <CheckCircle className="h-4 w-4 inline ml-1" />
                          تصحيح
                        </button>
                        <button 
                          onClick={() => showInfo('إشعار', '✏️ جاري فتح صفحة تعديل الواجب...')}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Edit className="h-4 w-4 inline ml-1" />
                          تعديل
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">تحليلات الأداء</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Performance by Subject */}
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">الأداء حسب المادة</h4>
                    <div className="space-y-4">
                      {subjects.map((subject, index) => {
                        const avgGrades = [16.2, 15.8, 14.5, 15.9];
                        return (
                          <div key={subject}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-700">{subject}</span>
                              <span className="font-semibold">{avgGrades[index]}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(avgGrades[index] / 20) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="bg-white border rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">أفضل الطلاب</h4>
                    <div className="space-y-3">
                      {students
                        .sort((a, b) => parseFloat(b.avgGrade) - parseFloat(a.avgGrade))
                        .slice(0, 5)
                        .map((student, index) => (
                          <div key={student.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ml-3 ${
                                index === 0 ? 'bg-yellow-500' :
                                index === 1 ? 'bg-gray-400' :
                                index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                              }`}>
                                {index + 1}
                              </div>
                              <span className="text-gray-800">{student.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 ml-1" />
                              <span className="font-semibold">{student.avgGrade}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Additional Analytics */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">+0.8</div>
                    <div className="text-sm text-gray-600">تحسن المتوسط العام</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">معدل إنجاز الواجبات</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-sm text-gray-600">معدل الحضور</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">{selectedStudent.avatar}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedStudent.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStudent.status)}`}>
                {getStatusText(selectedStudent.status)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{selectedStudent.avgGrade}</div>
                <div className="text-sm text-gray-600">المعدل العام</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{selectedStudent.attendance}%</div>
                <div className="text-sm text-gray-600">نسبة الحضور</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{selectedStudent.homeworkCompletion}%</div>
                <div className="text-sm text-gray-600">إنجاز الواجبات</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{new Date(selectedStudent.lastActivity).toLocaleDateString('ar-DZ')}</div>
                <div className="text-sm text-gray-600">آخر نشاط</div>
              </div>
            </div>

            {selectedStudent.notes && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">ملاحظات:</h4>
                <p className="text-gray-700">{selectedStudent.notes}</p>
              </div>
            )}
            
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
                  handleSendMessage(selectedStudent);
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                إرسال رسالة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {showGradeModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">إدخال درجات</h3>
              <p className="text-gray-600">{selectedStudent.name}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقييم</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>اختبار شهري</option>
                  <option>اختبار فصلي</option>
                  <option>واجب منزلي</option>
                  <option>مشاركة صفية</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الدرجة (من 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 16.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات (اختياري)</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
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
                onClick={() => {
                  showSuccess('تم بنجاح', 'تم حفظ الدرجة بنجاح!');
                  setShowGradeModal(false);
                }}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                حفظ الدرجة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Homework Modal */}
      {showHomeworkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تفاصيل الواجب</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">معلومات الواجب</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">العنوان:</span>
                    <span className="font-medium">تمارين في المادة الدراسية</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المادة:</span>
                    <span className="font-medium">{classData?.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">تاريخ التسليم:</span>
                    <span className="font-medium">2024-01-20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">الحالة:</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">نشط</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">إحصائيات التسليم</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-gray-600">مُسلم</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">8</div>
                    <div className="text-xs text-gray-600">متبقي</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowHomeworkModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowHomeworkModal(false);
                  showInfo('إشعار', '📝 جاري فتح صفحة تقييم الواجبات...');
                }}
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                تقييم الواجبات
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
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {createType === 'homework' ? 'إنشاء واجب جديد' :
                 createType === 'exam' ? 'إنشاء اختبار جديد' : 'إنشاء إعلان جديد'}
              </h3>
              <p className="text-gray-600">
                {createType === 'homework' ? 'أنشئ واجباً جديداً للفصل' :
                 createType === 'exam' ? 'أنشئ اختباراً جديداً' : 'أنشئ إعلاناً للفصل'}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {createType === 'homework' ? 'عنوان الواجب' :
                   createType === 'exam' ? 'عنوان الاختبار' : 'عنوان الإعلان'}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={createType === 'homework' ? 'مثال: واجب النحو - الدرس الخامس' :
                              createType === 'exam' ? 'مثال: اختبار نصف الفصل' : 'مثال: إعلان مهم للطلاب'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {createType === 'homework' ? 'وصف الواجب' :
                   createType === 'exam' ? 'تفاصيل الاختبار' : 'محتوى الإعلان'}
                </label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder={createType === 'homework' ? 'تفاصيل الواجب والمتطلبات...' :
                              createType === 'exam' ? 'تفاصيل الاختبار والمنهج المطلوب...' : 'محتوى الإعلان...'}
                />
              </div>

              {createType !== 'announcement' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الاستحقاق</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                إنشاء
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default TeacherClassroom;