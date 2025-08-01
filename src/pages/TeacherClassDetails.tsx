import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Award, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar: string;
  performance: 'excellent' | 'good' | 'needs_improvement';
  averageGrade: number;
  attendance: number;
  lastActivity: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submitted: number;
  total: number;
  status: 'active' | 'completed' | 'overdue';
}

interface Grade {
  studentId: string;
  studentName: string;
  math: number;
  arabic: number;
  science: number;
  history: number;
  average: number;
}

const TeacherClassDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'assignments' | 'analytics'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  // بيانات وهمية للطلاب
  const students: Student[] = [
    {
      id: '1',
      name: 'أحمد محمد الأمين',
      avatar: '/api/placeholder/40/40',
      performance: 'excellent',
      averageGrade: 92.5,
      attendance: 95,
      lastActivity: 'منذ ساعتين'
    },
    {
      id: '2',
      name: 'فاطمة بن علي',
      avatar: '/api/placeholder/40/40',
      performance: 'good',
      averageGrade: 85.2,
      attendance: 88,
      lastActivity: 'منذ 4 ساعات'
    },
    {
      id: '3',
      name: 'محمد زكريا',
      avatar: '/api/placeholder/40/40',
      performance: 'needs_improvement',
      averageGrade: 68.7,
      attendance: 75,
      lastActivity: 'منذ يومين'
    },
    {
      id: '4',
      name: 'زينب مرادي',
      avatar: '/api/placeholder/40/40',
      performance: 'excellent',
      averageGrade: 94.1,
      attendance: 98,
      lastActivity: 'منذ ساعة'
    },
    {
      id: '5',
      name: 'عبد الرحمن قاسم',
      avatar: '/api/placeholder/40/40',
      performance: 'good',
      averageGrade: 81.3,
      attendance: 92,
      lastActivity: 'منذ 3 ساعات'
    }
  ];

  // بيانات وهمية للواجبات
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'واجب الرياضيات - الكسور',
      subject: 'الرياضيات',
      dueDate: '2024-01-15',
      submitted: 23,
      total: 28,
      status: 'active'
    },
    {
      id: '2',
      title: 'تعبير كتابي - وصف الطبيعة',
      subject: 'اللغة العربية',
      dueDate: '2024-01-12',
      submitted: 28,
      total: 28,
      status: 'completed'
    },
    {
      id: '3',
      title: 'بحث عن الماء',
      subject: 'العلوم',
      dueDate: '2024-01-10',
      submitted: 20,
      total: 28,
      status: 'overdue'
    }
  ];

  // بيانات وهمية للدرجات
  const grades: Grade[] = [
    {
      studentId: '1',
      studentName: 'أحمد محمد الأمين',
      math: 95,
      arabic: 90,
      science: 92,
      history: 93,
      average: 92.5
    },
    {
      studentId: '2',
      studentName: 'فاطمة بن علي',
      math: 88,
      arabic: 85,
      science: 82,
      history: 86,
      average: 85.2
    },
    {
      studentId: '3',
      studentName: 'محمد زكريا',
      math: 65,
      arabic: 70,
      science: 68,
      history: 72,
      average: 68.7
    },
    {
      studentId: '4',
      studentName: 'زينب مرادي',
      math: 96,
      arabic: 94,
      science: 93,
      history: 93,
      average: 94.1
    },
    {
      studentId: '5',
      studentName: 'عبد الرحمن قاسم',
      math: 82,
      arabic: 80,
      science: 81,
      history: 82,
      average: 81.3
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs_improvement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceText = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'ممتاز';
      case 'good': return 'جيد';
      case 'needs_improvement': return 'يحتاج تحسين';
      default: return 'غير محدد';
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAssignmentStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'overdue': return 'متأخر';
      default: return 'غير محدد';
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStudentsTab = () => (
    <div className="space-y-6">
      {/* أدوات البحث */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث عن طالب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">جميع الطلاب</option>
            <option value="excellent">الممتازون</option>
            <option value="good">الجيدون</option>
            <option value="needs_improvement">يحتاجون تحسين</option>
          </select>
        </div>
      </div>

      {/* قائمة الطلاب */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceColor(student.performance)}`}>
                  {getPerformanceText(student.performance)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">متوسط الدرجات</span>
                <span className="font-semibold text-gray-900">{student.averageGrade}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">نسبة الحضور</span>
                <span className="font-semibold text-gray-900">{student.attendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">آخر نشاط</span>
                <span className="text-sm text-gray-500">{student.lastActivity}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGradesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">سجل العلامات</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download className="w-4 h-4" />
          تصدير Excel
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم الطالب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الرياضيات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اللغة العربية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العلوم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المتوسط
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.studentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={grade.math}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={grade.arabic}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={grade.science}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={grade.history}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{grade.average.toFixed(1)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAssignmentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">الواجبات والاختبارات</h3>
        <button
          onClick={() => setShowAddAssignment(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إنشاء واجب جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{assignment.title}</h4>
                <p className="text-sm text-gray-600">{assignment.subject}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAssignmentStatusColor(assignment.status)}`}>
                {getAssignmentStatusText(assignment.status)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">تاريخ التسليم</span>
                <span className="text-sm font-medium text-gray-900">{assignment.dueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">المسلم / الإجمالي</span>
                <span className="text-sm font-medium text-gray-900">
                  {assignment.submitted} / {assignment.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1">
                <Eye className="w-4 h-4" />
                عرض
              </button>
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">تحليلات الأداء</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط الفصل</p>
              <p className="text-2xl font-bold text-gray-900">84.2%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">نسبة الحضور</p>
              <p className="text-2xl font-bold text-gray-900">89.6%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الواجبات المكتملة</p>
              <p className="text-2xl font-bold text-gray-900">92.3%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">طلاب يحتاجون دعم</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">أداء المواد</h4>
        <div className="space-y-4">
          {[
            { subject: 'الرياضيات', average: 87.5, color: 'bg-blue-500' },
            { subject: 'اللغة العربية', average: 82.3, color: 'bg-green-500' },
            { subject: 'العلوم', average: 85.1, color: 'bg-yellow-500' },
            { subject: 'التاريخ', average: 81.8, color: 'bg-purple-500' }
          ].map((subject) => (
            <div key={subject.subject} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-gray-700">{subject.subject}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${subject.color}`}
                  style={{ width: `${subject.average}%` }}
                ></div>
              </div>
              <div className="w-16 text-sm font-semibold text-gray-900">{subject.average}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">السنة الخامسة - فوج أ</h1>
              <p className="text-gray-600">إدارة شاملة للفصل الدراسي</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">عدد الطلاب</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </div>

          {/* التبويبات */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              {[
                { id: 'students', label: 'الطلاب', icon: Users },
                { id: 'grades', label: 'سجل العلامات', icon: BookOpen },
                { id: 'assignments', label: 'الواجبات', icon: Calendar },
                { id: 'analytics', label: 'التحليلات', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* محتوى التبويبات */}
        <div className="bg-gray-50">
          {activeTab === 'students' && renderStudentsTab()}
          {activeTab === 'grades' && renderGradesTab()}
          {activeTab === 'assignments' && renderAssignmentsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </div>

        {/* نافذة إضافة واجب جديد */}
        {showAddAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إنشاء واجب جديد</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان الواجب
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: واجب الرياضيات - الكسور"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المادة
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">اختر المادة</option>
                    <option value="math">الرياضيات</option>
                    <option value="arabic">اللغة العربية</option>
                    <option value="science">العلوم</option>
                    <option value="history">التاريخ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ التسليم
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وصف الواجب
                  </label>
                  <textarea
                    rows={3}
                    placeholder="اكتب وصف الواجب هنا..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddAssignment(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => setShowAddAssignment(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  إنشاء الواجب
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherClassDetails;